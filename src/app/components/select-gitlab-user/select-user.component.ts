import {Component, EventEmitter, Input, OnChanges, Output, ViewChild} from '@angular/core';
import User from '../../services/interfaces/user.interface';
import {UserService} from '../../services/user.service';
import {IonicSelectableComponent} from 'ionic-selectable';
import Project from '../../services/interfaces/project.interface';
import {concatChildArrays, omitDuplicates} from '../../services/util';

@Component({
    selector: 'SelectUserComponent',
    templateUrl: './select-user.component.html',
    styleUrls: ['./select-user.component.scss'],
})
export class SelectUserComponent {

    gitlabUsers: User[];
    @Input() user: User;
    @Input() set projects(projects: Project[]) {
        if (projects && projects.length > 0) {
            this.userService.getProjectsUsers(projects).subscribe(
                data => {
                    this.gitlabUsers = omitDuplicates(concatChildArrays(data), 'id');
                    if (this.user && !this.gitlabUsers.some(user => user.id === this.user.id)) {
                        this.selectedUser.emit(null);
                        this.userSelectable.clear();
                    }
                }, error => {
                    console.log(error);
                }
            );
        }
    }
    @Output() selectedUser = new EventEmitter();
    @ViewChild('userSelectable') userSelectable: IonicSelectableComponent;

    constructor(private userService: UserService) {
    }

    handleUser(event: {
        component: IonicSelectableComponent,
        value: any
    }) {
        this.selectedUser.emit(event.value);
    }

}
