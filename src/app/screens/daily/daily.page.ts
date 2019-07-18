import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {DailyService} from '../../services/daily.service';
import {ModalController} from '@ionic/angular';
import {NewDailyComponent} from '../../components/new-daily/new-daily.component';

@Component({
    selector: 'app-new-daily',
    templateUrl: './daily.page.html',
    styleUrls: ['./daily.page.scss'],
})
export class DailyPage implements OnInit {

    dailyDone: boolean;

    constructor(private authService: AuthService,
                private dailyService: DailyService,
                private modalController: ModalController) {
    }

    ngOnInit() {
        this.dailyService.isTodaysDailyDone().then((response) => {
            this.dailyDone = response;
        });
    }

    /*ionViewDidEnter() {
        document.addEventListener('backbutton', e => {
            console.log('disable back button');
        }, false);
    }*/

    logout() {
        this.authService.logout();
    }

    async toNewDaily() {
        const modal = await this.modalController.create({
            component: NewDailyComponent,
            componentProps: {
                firstName: 'Douglas',
                lastName: 'Adams',
                middleInitial: 'N'
            }
        });
        await modal.present();
        const { data } = await modal.onWillDismiss();
        console.log(data);
    }

}
