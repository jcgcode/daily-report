import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';

interface SectionInterface {
    name: string;
    image: string;
    source: string;
    opened: boolean;
    issues: any[];
}

@Component({
    selector: 'app-new-daily',
    templateUrl: './new-daily.component.html',
    styleUrls: ['./new-daily.component.scss'],
})
export class NewDailyComponent {

    sections: Array<SectionInterface>;

    constructor(private modalController: ModalController) {
        this.sections = [
            {
                name: 'Issues creation',
                image: '/assets/create-issues.svg',
                source: 'new',
                opened: false,
                issues: [null]
            },
            {
                name: 'Issues developing',
                image: '/assets/develop-issues.svg',
                source: 'dev',
                opened: false,
                issues: [null, null]
            },
            {
                name: 'Issues testing',
                image: '/assets/test-issues.svg',
                source: 'test',
                opened: false,
                issues: [null, null]
            },
        ];
    }

    dismiss() {
        this.modalController.dismiss({
            dismissed: true
        });
    }

}
