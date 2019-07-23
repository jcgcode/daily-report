import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {
    NEW_YESTERDAY_LABELS,
    concatChildArrays,
    DEV_YESTERDAY_LABELS,
    omitDuplicates,
    TEST_YESTERDAY_LABELS
} from '../../services/util';
import {ProjectService} from '../../services/project.service';
import Issue from '../../services/interfaces/issue.interface';

@Component({
    selector: 'IssuesMgtComponent',
    templateUrl: './issues-mgt.component.html',
    styleUrls: ['./issues-mgt.component.scss'],
})
export class IssuesMgtComponent implements OnInit {

    @Input() source: string;
    @Input() issues: Issue[];
    @Output() collapsed: EventEmitter<any> = new EventEmitter();

    localIssues: Issue[];

    constructor(private modalController: ModalController,
                private projectService: ProjectService) {
    }

    ngOnInit() {
        if (this.issues) {
            this.localIssues = this.issues;
        } else {
            switch (this.source) {
                case 'dev':
                    this.projectService.getProjectsIssues('Doing,Done,QA review,Reviewed,Approved', 'dev').then(
                        response => {
                            response.subscribe(
                                data => {
                                    this.assignIssues(data);
                                }, error => {
                                    console.log(error);
                                }
                            );
                        }
                    );
                    break;
                case 'test':
                    this.projectService.getProjectsIssues('QA review,Reviewed', 'test').then(
                        response => {
                            response.subscribe(
                                data => {
                                    this.assignIssues(data);
                                }, error => {
                                    console.log(error);
                                }
                            );
                        }
                    );
                    break;
                case 'new':
                    this.projectService.getProjectsIssues('To Do,Doing,Done,QA review,Reviewed,Approved', 'new').then(
                        response => {
                            response.subscribe(
                                data => {
                                    this.assignIssues(data);
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

    checkedIssue(event, issue: Issue) {
        issue.checked = event.target.checked;
    }

    private assignIssues(data) {
        this.localIssues = omitDuplicates(concatChildArrays(data), 'id');
        this.localIssues.forEach((issue: any) => {
            issue.labels = issue.labels.filter(label => {
                switch (this.source) {
                    case 'dev':
                        return DEV_YESTERDAY_LABELS[label.name];
                    case 'test':
                        return TEST_YESTERDAY_LABELS[label.name];
                    case 'new':
                        return NEW_YESTERDAY_LABELS[label.name];
                }
            });
        });
        this.collapsed.emit(this.localIssues);
    }

}
