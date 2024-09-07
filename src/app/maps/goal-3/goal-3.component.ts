import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { DataService } from '../../service/data.service';
import {LoadingController} from '@ionic/angular';   

declare var window:any;

@Component({
  selector: 'app-goal-3',
  templateUrl: './goal-3.component.html',
  styleUrls: ['./goal-3.component.scss'],
})
export class Goal3Component  implements AfterViewInit {

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
        this.dataService.getData('trackerdata/' + deviceId + '/last_points?lastPoints=50').subscribe((response: any) => {
          let arrayLatLng: any = [];

          this.loadMap(response.success[0].lat,response.success[0].lng);
          response.success.forEach((data:any) => {
            arrayLatLng.push({ 
              lat: data.lat, 
              lng: data.lng 
            });
            this.addMarker(new window.google.maps.LatLng(data.lat,data.lng, deviceId));
          });
          this.drawPolyline(arrayLatLng);
        });
    }

    loadMap(lat:any = 17.385044, lng:any = 78.486671){
        this.map = new window.google.maps.Map(this.mapRef.nativeElement,{
            center: new window.google.maps.LatLng(lat,lng),
            zoom:10,
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

    drawPolyline(arrayLatLng: any = []) {
      var flightPath = new window.google.maps.Polyline({
        path: arrayLatLng,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 4,
      });

      flightPath.setMap(this.map);
    }
}
