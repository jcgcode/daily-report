import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DailyPage} from './daily.page';
import {NewDailyComponent} from '../../components/new-daily/new-daily.component';
import {SharedModule} from '../../shared/shared.module';
import {IssuesMgtComponent} from '../../components/issues-mgt/issues-mgt.component';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';

const routes: Routes = [
    {
        path: '',
        component: DailyPage
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        DailyPage,
        NewDailyComponent,
        IssuesMgtComponent
    ],
    entryComponents: [
        NewDailyComponent,
        IssuesMgtComponent
    ],
    providers: [
        SocialSharing
    ]
})
export class DailyPageModule {
}
