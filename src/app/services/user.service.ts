import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {forkJoin} from 'rxjs';
import Project from './interfaces/project.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    getProjectsUsers(selectedProjects: Project[]) {
        return forkJoin(
            selectedProjects.map((project) => {
                return this.http.get(`${environment.GITLAB_URL}projects/${project.id}/members`);
            })
        );
    }
}
