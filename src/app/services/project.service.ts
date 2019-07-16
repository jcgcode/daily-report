import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {forkJoin} from 'rxjs';

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

    constructor(private http: HttpClient) {
    }

    getProjectList() {
        return forkJoin(
            GROUPS.map((group) => {
                return this.http.get(`${environment.GITLAB_URL}groups/${group.id}/projects?include_subgroups=true`);
            })
        );
    }
}
