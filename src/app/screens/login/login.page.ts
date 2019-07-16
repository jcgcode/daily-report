import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {IonicSelectableComponent} from 'ionic-selectable';
import User from '../../services/interfaces/user.interface';
import Project from '../../services/interfaces/project.interface';
import {ProjectService} from '../../services/project.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    gitlabUsers: User[];
    selectedUser: User;
    gitlabProjects: Project[];
    selectedProjects: Project[];

    constructor(private authService: AuthService, private projectService: ProjectService) {
        this.gitlabUsers = [
            {id: 1, name: '@jcantillog'},
            {id: 2, name: '@guerrero7'},
            {id: 3, name: '@elementooro'}
        ];
    }

    ngOnInit(): void {
        this.projectService.getProjectList().subscribe(
            (data: any) => {
                this.gitlabProjects = data[0].concat(data[1]);
            }, error => {
                console.log(error);
            }
        );
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
