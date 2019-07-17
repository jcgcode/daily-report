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

    selectedUser: User;
    selectedProjects: Project[];

    constructor(private authService: AuthService) {
    }

    handleProjects(projects) {
        if (projects.length === 0) {
            this.selectedProjects = null;
        } else {
            this.selectedProjects = projects;
        }
    }

    handleUser(user) {
        this.selectedUser = user;
    }

    login() {
        this.authService.login(this.selectedUser, this.selectedProjects);
    }

}
