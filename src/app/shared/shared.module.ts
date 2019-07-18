import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SelectProjectsComponent} from '../components/select-projects/select-projects.component';
import {IonicModule} from '@ionic/angular';
import {IonicSelectableModule} from 'ionic-selectable';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [SelectProjectsComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
  ],
  exports: [
    SelectProjectsComponent,
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
  ]
})
export class SharedModule { }
