import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { DataService } from '../../service/data.service';
import {LoadingController} from '@ionic/angular';   

declare var window:any;

@Component({
  selector: 'app-goal-1',
  templateUrl: './goal-1.component.html',
  styleUrls: ['./goal-1.component.scss'],
})
export class Goal1Component  implements AfterViewInit {

    allDevices: any;
    map: any;

    @ViewChild('map', {static:true}) mapRef:any;
    constructor(private dataService: DataService,public loadingController: LoadingController) { 
        this.dataService.getData('device').subscribe((response: any) => {
            this.allDevices = response.success;
            this.goalFirst();        
        }); 
    }

    ngAfterViewInit() {
        this.loadMap();
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
            loading.dismiss();
            let latLongArr: any = [];
            for (const key in response.success) {
              if (response.success.hasOwnProperty(key)) {
                let lengthArr:any;
                let lastArr:any;
                lengthArr = response.success[key].length;
                lastArr = response.success[key][lengthArr-1];
                latLongArr.push(lastArr);
              }
            }
            this.loadMap(latLongArr[0].lat,latLongArr[0].lng);
            latLongArr.forEach((data:any, key:any) => {
                this.addMarker(new window.google.maps.LatLng(data.lat,data.lng), 'device ' + key);
            });
        });
    }

    loadMap(lat:any = 17.385044, lng:any = 78.486671){
        this.map = new window.google.maps.Map(this.mapRef.nativeElement,{
            center: new window.google.maps.LatLng(lat,lng),
            zoom:5,
            streetViewControl:false,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP
        });
    }

    addMarker(position:any, deviceId: any = '') {
        let markupObj:any = new window.google.maps.Marker({
            position: position,
            map: this.map,
            title: deviceId
        });
    }


}
