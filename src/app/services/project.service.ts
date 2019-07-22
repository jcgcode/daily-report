import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {forkJoin} from 'rxjs';
import {Storage} from '@ionic/storage';
import {TOKENS_KEYS} from './util';
import User from './interfaces/user.interface';
import Project from './interfaces/project.interface';

const GROUPS = [
    {
        name: 'Fleks',
        id: 2102581
    },
    {
        name: 'E43',
        id: 3320863
    }
];

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(private storage: Storage, private http: HttpClient) {
    }

    getProjectList() {
        return forkJoin(
            GROUPS.map((group) => {
                return this.http.get(`${environment.GITLAB_URL}groups/${group.id}/projects?include_subgroups=true`);
            })
        );
    }

    getProjectsIssues() {
        return this.storage.get(TOKENS_KEYS.AUTH).then(
            (auth: { gitlab_user: User, gitlab_projects: Project[] }) => {
                return forkJoin(
                    auth.gitlab_projects.map((project) => {
                        return this.http.get(`${environment.GITLAB_URL}projects/${project.id}/issues`, { params: {
                            per_page: '100',
                            with_labels_details: 'true',
                            assignee_username: [auth.gitlab_user.username],
                            state: 'opened'
                        }});
                    })
                );
            }
        );
    }
}
