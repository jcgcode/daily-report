import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-new-daily',
    templateUrl: './new-daily.page.html',
    styleUrls: ['./new-daily.page.scss'],
})
export class NewDailyPage implements OnInit {

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        document.addEventListener('backbutton', e => {
            console.log('disable back button');
        }, false);
    }

    logout() {
        this.authService.logout();
    }

}
