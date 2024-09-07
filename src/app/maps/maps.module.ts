import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapsComponent } from './maps.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Goal1Component } from './goal-1/goal-1.component';
import { Goal2Component } from './goal-2/goal-2.component';
import { Goal3Component } from './goal-3/goal-3.component';
import { Goal4Component } from './goal-4/goal-4.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'goal-first',
    component: Goal1Component
  },
  {
    path: 'goal-second',
    component: Goal2Component
  },
  {
    path: 'goal-third',
    component: Goal3Component
  },
  {
    path: 'goal-fourth',
    component: Goal4Component
  }
];

@NgModule({
  declarations: [MapsComponent,DashboardComponent,Goal1Component,Goal2Component,Goal3Component,Goal4Component],
  imports: [RouterModule.forChild(routes),FormsModule,IonicModule,CommonModule],
  exports: [RouterModule],
  bootstrap: [DashboardComponent]
})
export class MapsModule { }
