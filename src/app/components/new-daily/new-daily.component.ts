import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

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

}
