import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-issues-mgt',
    templateUrl: './issues-mgt.component.html',
    styleUrls: ['./issues-mgt.component.scss'],
})
export class IssuesMgtComponent implements OnInit {

    @Input() title: string;

    constructor(private modalController: ModalController) {
    }

    ngOnInit() {
    }

    dismiss() {
        this.modalController.dismiss({
            dismissed: true
        });
    }

}
