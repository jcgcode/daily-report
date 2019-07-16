import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {IonicSelectableComponent} from 'ionic-selectable';
import User from '../../services/interfaces/user.interface';
import Project from '../../services/interfaces/project.interface';
import {ProjectService} from '../../services/project.service';
import {UserService} from '../../services/user.service';
import {concatChildArrays, omitDuplicates} from '../../services/util';

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
    @ViewChild('userSelectable') userSelectable: IonicSelectableComponent;

    constructor(private authService: AuthService,
                private projectService: ProjectService,
                private userService: UserService) {
    }

    ngOnInit(): void {
        this.projectService.getProjectList().subscribe(
            data => {
                this.gitlabProjects = concatChildArrays(data);
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
            this.userService.getProjectsUsers(this.selectedProjects).subscribe(
                data => {
                    this.gitlabUsers = omitDuplicates(concatChildArrays(data), 'id');
                    if (this.selectedUser && !this.gitlabUsers.some(user => user.id === this.selectedUser.id)) {
                        this.selectedUser = null;
                        this.userSelectable.clear();
                    }
                }, error => {
                    console.log(error);
                }
            );
        }
    }
}
