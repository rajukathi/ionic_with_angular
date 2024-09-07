import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent  implements OnInit {

  constructor(private router: Router,private dataService: DataService,) { 

  }

  ngOnInit() {
    
  }

  logout() {
        this.dataService.logout();
        this.router.navigateByUrl('/login');
    }

}
