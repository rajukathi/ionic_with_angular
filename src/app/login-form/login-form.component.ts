import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import {LoadingController, ToastController} from '@ionic/angular'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent  implements OnInit {

  username:any;
  password:any;

  constructor(private dataService: DataService,public loadingController: LoadingController, private toastController: ToastController,private router: Router) { 
  }

  ngOnInit(){
  }

  async signIn() {
    let response:any;
    const loading = await this.loadingController.create({
        message: 'Please wait...'
    });
    loading.present();
    response = this.dataService.postData('login',{
      email: this.username,
      password: this.password
    }).subscribe(
      (response: any) => {
        this.dataService.setToken(response.success.token);
        loading.dismiss();
        this.router.navigateByUrl('/maps/goal-first');
      },
      (err: any) => {
          this.presentToast('bottom',err);
          loading.dismiss();
      }
    );
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', messaage:any='') {
    const toast = await this.toastController.create({
      message: messaage,
      duration: 3000,
      position: position,
    });

    await toast.present();
  }
}
