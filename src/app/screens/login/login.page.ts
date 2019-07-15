import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {IonicSelectableComponent} from 'ionic-selectable';
import User from '../../services/interfaces/user.interface';
import Project from '../../services/interfaces/project.interface';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage {

    gitlabUsers: User[];
    selectedUser: User;
    gitlabProjects: Project[];
    selectedProjects: Project[];

    constructor(private authService: AuthService) {
        this.gitlabUsers = [
            {id: 1, name: '@jcantillog'},
            {id: 2, name: '@guerrero7'},
            {id: 3, name: '@elementooro'}
        ];
        this.gitlabProjects = [
            {id: 1, name: 'Fleks Dashboard'},
            {id: 2, name: 'Fleks Backend'},
            {id: 3, name: 'Fleks Android'},
            {id: 4, name: 'Fleks iOS'}
        ];
    }

    login() {
        this.authService.login(this.selectedUser, this.selectedProjects);
    }

    handleUser(event: {
        component: IonicSelectableComponent,
        value: any
    }) {
        this.selectedUser = event.value;
    }

    handleProjects(event: {
        component: IonicSelectableComponent,
        value: any
    }) {
        if (event.value.length === 0) {
            this.selectedProjects = null;
        } else {
            this.selectedProjects = event.value;
        }
    }
}
