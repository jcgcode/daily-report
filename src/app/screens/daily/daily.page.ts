import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {DailyService} from '../../services/daily.service';
import {AlertController, ModalController} from '@ionic/angular';
import {NewDailyComponent} from '../../components/new-daily/new-daily.component';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {composeDiscordMessage, presentAlertConfirm} from '../../services/util';

@Component({
    selector: 'app-new-daily',
    templateUrl: './daily.page.html',
    styleUrls: ['./daily.page.scss'],
})
export class DailyPage implements OnInit {

    dailyDone: any;

    constructor(private authService: AuthService,
                private dailyService: DailyService,
                private modalController: ModalController,
                private alertController: AlertController,
                private socialSharing: SocialSharing) {
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
        presentAlertConfirm('log out', 'All the saved data for the current user will be deleted.')
            .then(() => {
                this.authService.logout();
            });
    }

    removeTodaysDaily() {
        this.dailyService.removeTodaysDaily().then(response => this.ngOnInit());
    }

    toDiscord() {
        this.socialSharing.shareVia(`com.discord`, composeDiscordMessage(this.dailyDone))
            .then(() => {
                console.log('Success');
            }).catch((error) => {
            console.log('Error: ', error);
        });
    }

    async toNewDaily() {
        const modal = await this.modalController.create({
            component: NewDailyComponent
        });
        await modal.present();
        const {data} = await modal.onWillDismiss();
        if (data.completed) {
            this.ngOnInit();
        }
    }

    handleAlert(strong: string) {
        presentAlertConfirm(`${strong}`)
            .then(() => {
                this.removeTodaysDaily();
            });
    }
}
