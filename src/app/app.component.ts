import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { DataService } from './service/data.service';
import {LoadingController,NavController} from '@ionic/angular';   
import { Router } from '@angular/router';

declare var window:any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

    public isLogin:boolean = false;

    constructor(
        private router: Router,
        private dataService: DataService,
        public loadingController: LoadingController
    ) { 

    }

    ngOnInit() {
        this.dataService.isUserSessionActive.subscribe((data:any) => {
            this.isLogin = data;
            if(this.isLogin === false) {
                this.router.navigateByUrl('/login');
            } else {
                this.router.navigateByUrl('/maps/goal-first');
            }
        });
    }

    logout() {
        this.dataService.logout();
        this.router.navigateByUrl('/login');
    }

}