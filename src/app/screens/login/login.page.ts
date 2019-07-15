import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    constructor(private authService: AuthService) {
    }

    ionViewDidEnter() {
        document.addEventListener('backbutton', e => {
            console.log('disable back button');
        }, false);
    }

    ngOnInit() {
    }

    login() {
        this.authService.login();
    }

    handleFirstNameValue(event) {
        console.log(event.target.value);
    }
    handleLastNameValue(event) {
        console.log(event.target.value);
    }

}
