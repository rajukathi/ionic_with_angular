import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { DataService } from '../../service/data.service';
import {LoadingController} from '@ionic/angular';   

declare var window:any;

@Component({
  selector: 'app-goal-2',
  templateUrl: './goal-2.component.html',
  styleUrls: ['./goal-2.component.scss'],
})
export class Goal2Component  implements AfterViewInit {

    allDevices: any;
    lastLocation: any;
    map: any;

    @ViewChild('map', {static:true}) mapRef:any;
    constructor(private dataService: DataService,public loadingController: LoadingController) { 
      this.getDevices();
    }

    getDevices() {
      this.dataService.getData('device').subscribe((response: any) => {
        this.allDevices = response.success;
        console.log(this.allDevices);
      }); 
    }

    ngAfterViewInit() {
        this.loadMap();
    }

    deviceOnMap(deviceId: any) {
        this.dataService.getData('trackerdata/' + deviceId + '/last_points?lastPoints=1').subscribe((response: any) => {
            this.loadMap(response.success[0].lat, response.success[0].lng);
        });
    }

    loadMap(lat:any = 17.385044, lng:any = 78.486671){
        this.map = new window.google.maps.Map(this.mapRef.nativeElement,{
            center: new window.google.maps.LatLng(lat,lng),
            zoom:5,
            streetViewControl:false,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP
        });
        this.addMarker(new window.google.maps.LatLng(lat,lng));
    }

    addMarker(position:any, deviceId: any = '') {
        let markupObj:any = new window.google.maps.Marker({
            position: position,
            map: this.map,
            title: deviceId
        });
    }


}
