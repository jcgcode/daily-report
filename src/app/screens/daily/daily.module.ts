import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DailyPage} from './daily.page';
import {NewDailyComponent} from '../../components/new-daily/new-daily.component';
import {SharedModule} from '../../shared/shared.module';

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
        NewDailyComponent
    ],
    entryComponents: [NewDailyComponent]
})
export class DailyPageModule {
}
