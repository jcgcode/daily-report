import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {LoginPage} from './login.page';
import {LayoutComponent} from '../../components/UI/layout/layout.component';
import {IonicSelectableModule} from 'ionic-selectable';

const routes: Routes = [
    {
        path: '',
        component: LoginPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IonicSelectableModule,
        RouterModule.forChild(routes)
    ],
    declarations: [LoginPage, LayoutComponent]
})
export class LoginPageModule {
}
