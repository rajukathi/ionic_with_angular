import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MapsModule } from './maps/maps.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { 
    path: '', 
    component: AppComponent
  },
  { 
    path: 'home', 
    component: AppComponent
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'maps',
    loadChildren: () => import('./maps/maps.module').then( m => m.MapsModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
