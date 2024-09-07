import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { DataService } from '../../service/data.service';
import {LoadingController} from '@ionic/angular';   

declare var window:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  implements OnInit {

  data: any;
    allDevices: any;
    map: any;

    @ViewChild('map', {static:true}) mapRef:any;
    constructor(private dataService: DataService,public loadingController: LoadingController) { 
        this.dataService.getData('device').subscribe((response: any) => {
            this.allDevices = response.success;
        }); 
    }

    ngOnInit() {
               
    }

    ngAfterViewInit() {
        this.loadMap();
    }

    login() {
        this.dataService.generateToken();
    }

    async goalFirst() {
        let deviceRequestObj: any = [];
        let requestObj:any;
        this.allDevices.forEach((data:any) => {
          deviceRequestObj.push({
            "deviceId": data.id,
            "dateunix": data.updatedate
          });
        });
        requestObj = {
            "deviceIDs":deviceRequestObj,
            "fromLastPoint": true
        };
        const loading = await this.loadingController.create({
            message: 'Please wait...'
        });
        loading.present();     

        this.dataService.postData('trackerdata/getalllastpositions', requestObj).subscribe((response: any) => {
            let latLongArr: any = [];
            for (const key in response.success) {
              if (response.success.hasOwnProperty(key)) {
                let lengthArr:any;
                let lastArr:any;
                lengthArr = response.success[key].length;
                lastArr = response.success[key][lengthArr-1];
                this.addMarker(new window.google.maps.LatLng(lastArr.lat,lastArr.lng), key);
                loading.dismiss();
              }
            }
        });
    }

    goalThird() {
        
    }


    loadMap(){
        this.map = new window.google.maps.Map(this.mapRef.nativeElement,{
            center: new window.google.maps.LatLng(17.385044,78.486671),
            zoom:5,
            streetViewControl:false,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP
        });
        this.addMarker(new window.google.maps.LatLng(17.385044,78.486671));
    }

    addMarker(position:any, deviceId: any = '') {
        let markupObj:any = new window.google.maps.Marker({
            position: position,
            map: this.map,
            title: deviceId
        });
    }


}
