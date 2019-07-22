import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {IssuesMgtComponent} from '../issues-mgt/issues-mgt.component';
import Issue from '../../services/interfaces/issue.interface';

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

    sections: Array<{ name: string, image: string, source: string }> = [
        {
            name: 'Issues developing',
            image: '/assets/develop-issues.svg',
            source: 'dev'
        },
        /*{
            name : 'Issues testing',
            image: '/assets/test-issues.svg'
        },
        {
            name : 'Issues creation',
            image: '/assets/create-issues.svg'
        },
        {
            name : 'Issues supporting',
            image: '/assets/support-issues.svg'
        },*/
    ];

    selectedSection: { name: string, image: string, source: string };

    constructor(private modalController: ModalController) {
    }

    ngOnInit() {
        this.selectedSection = null;
        console.log(this.firstName);
    }

    dismiss() {
        this.modalController.dismiss({
            dismissed: true
        });
    }

    public captureObject(event: any): void {
        this.selectedSection = event;
    }

}
