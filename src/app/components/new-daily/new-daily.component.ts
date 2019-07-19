import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {IssuesMgtComponent} from '../issues-mgt/issues-mgt.component';

@Component({
    selector: 'app-new-daily',
    templateUrl: './new-daily.component.html',
    styleUrls: ['./new-daily.component.scss'],
})
export class NewDailyComponent implements OnInit {

    // Data passed in by componentProps
    @Input() firstName: string;
    @Input() lastName: string;
    @Input() middleInitial: string;

    constructor(private modalController: ModalController) {
    }

    ngOnInit() {
        console.log(this.firstName);
    }

    dismiss() {
        this.modalController.dismiss({
            dismissed: true
        });
    }

    async toIssuesMgt(title: string) {
        const modal = await this.modalController.create({
            component: IssuesMgtComponent,
            componentProps: {
                title: `${title}`
            }
        });
        await modal.present();
        const { data } = await modal.onWillDismiss();
        console.log(data);
    }

}
