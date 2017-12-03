import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentComponent } from './document.component';

const documentRoutes: Routes = [
  {
    path: '',
    component: DocumentComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(documentRoutes)
  ],
  exports: [
    RouterModule
  ],
})
export class DocumentRoutingModule {}
