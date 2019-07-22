import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {concatChildArrays} from '../../services/util';
import {ProjectService} from '../../services/project.service';
import Issue from '../../services/interfaces/issue.interface';

@Component({
    selector: 'IssuesMgtComponent',
    templateUrl: './issues-mgt.component.html',
    styleUrls: ['./issues-mgt.component.scss'],
})
export class IssuesMgtComponent implements OnInit {

    @Input() source: string;

    issuesList: Issue[];

    constructor(private modalController: ModalController,
                private projectService: ProjectService) {
    }

    ngOnInit() {
        switch (this.source) {
            case 'dev':
                this.projectService.getProjectsIssues().then(
                    response => {
                        response.subscribe(
                            data => {
                                this.issuesList = concatChildArrays(data);
                                console.log(data);
                            }, error => {
                                console.log(error);
                            }
                        );
                    }
                );
                break;
            default:
                return;
        }
    }

}
