import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {
    NEW_LABELS,
    TEST_LABELS,
    DEV_YESTERDAY_LABELS,
    DEV_TODAY_LABELS,
    concatChildArrays,
    omitDuplicates,
    sourceLabels
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
    @Input() today: boolean;
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
                    this.projectService.getProjectsIssues(sourceLabels('dev', this.today), 'dev').then(
                        response => {
                            response.subscribe(
                                data => {
                                    this.assignIssues(data);
                                }
                            );
                        }
                    );
                    break;
                case 'test':
                    this.projectService.getProjectsIssues(sourceLabels('test'), 'test').then(
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
                    this.projectService.getProjectsIssues(sourceLabels('new'), 'new').then(
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
                        return this.today ? DEV_TODAY_LABELS[label.name] : DEV_YESTERDAY_LABELS[label.name];
                    case 'test':
                        return TEST_LABELS[label.name];
                    case 'new':
                        return NEW_LABELS[label.name];
                }
            });
        });
        this.collapsed.emit(this.localIssues);
    }

}
