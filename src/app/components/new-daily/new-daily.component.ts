import {Component, ViewChild} from '@angular/core';
import {AlertController, IonSlides, LoadingController, ModalController} from '@ionic/angular';
import Section from '../../services/interfaces/section.interface';
import {DailyService} from '../../services/daily.service';

@Component({
    selector: 'app-new-daily',
    templateUrl: './new-daily.component.html',
    styleUrls: ['./new-daily.component.scss'],
})
export class NewDailyComponent {

    sections: Array<Section>;
    title: string;

    @ViewChild('slider') slider: IonSlides;

    constructor(private modalController: ModalController,
                private alertController: AlertController,
                private loadingController: LoadingController,
                private dailyService: DailyService) {
        this.sections = [
            {
                name: 'Issues creation',
                image: '/assets/create-issues.svg',
                source: 'new',
                opened: [false],
                issues: [null]
            },
            {
                name: 'Issues developing',
                image: '/assets/develop-issues.svg',
                source: 'dev',
                opened: [false, false],
                issues: [null, null]
            },
            {
                name: 'Issues testing',
                image: '/assets/test-issues.svg',
                source: 'test',
                opened: [false, false],
                issues: [null, null]
            },
        ];
        this.title = 'What did you do yesterday?';
    }

    dismiss(completed: boolean = false) {
        this.modalController.dismiss({
            completed
        });
    }

    changeTitle() {
        this.slider.getActiveIndex().then(
            index => {
                if (index === 0) {
                    this.title = 'What did you do yesterday?';
                } else {
                    this.title = 'What will you do today?';
                }
            }
        );
    }

    async presentAlertConfirm(strong: string, completed: boolean = false) {
        const alert = await this.alertController.create({
            header: 'Confirm!',
            message: `Are you sure you want to <strong>${strong}</strong>?`,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Okay',
                    handler: () => {
                        if (completed) {
                            this.presentDailyLoading('Creating the daily', completed);
                        } else {
                            this.dismiss();
                        }
                    }
                }
            ]
        });

        await alert.present();
    }

    async presentDailyLoading(message: string, completed: boolean) {
        const loading = await this.loadingController.create({
            message: `${message}...`
        });
        await loading.present();
        this.dailyService.setTodaysDaily(this.sections).then(
            response => {
                loading.dismiss();
                this.dismiss(completed);
            }
        );
    }

}
