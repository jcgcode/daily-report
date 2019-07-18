import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginPage} from './login.page';
import {LayoutComponent} from '../../components/UI/layout/layout.component';
import {SelectUserComponent} from '../../components/select-user/select-user.component';
import {SharedModule} from '../../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: LoginPage
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        LoginPage,
        LayoutComponent,
        SelectUserComponent
    ]
})
export class LoginPageModule {
}
