import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import Project from '../../services/interfaces/project.interface';
import {IonicSelectableComponent} from 'ionic-selectable';
import {concatChildArrays} from '../../services/util';
import {ProjectService} from '../../services/project.service';

@Component({
    selector: 'SelectProjectsComponent',
    templateUrl: './select-projects.component.html',
    styleUrls: ['./select-projects.component.scss'],
})
export class SelectProjectsComponent implements OnInit {

    gitlabProjects: Project[];
    @Output() selectedProjects = new EventEmitter();

    constructor(private projectService: ProjectService) {
    }

    ngOnInit() {
        this.projectService.getProjectList().subscribe(
            data => {
                this.gitlabProjects = concatChildArrays(data);
            }, error => {
                console.log(error);
            }
        );
    }

    handleProjects(event: {
        component: IonicSelectableComponent,
        value: any
    }) {
        this.selectedProjects.emit(event.value);
    }

}
