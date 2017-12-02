import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAppComponent } from './main-app.component';
import { HomepageComponent } from './homepage/homepage.component';

const mainAppRoutes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [
      { path: '', component: HomepageComponent, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(mainAppRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainAppRoutingModule {}
