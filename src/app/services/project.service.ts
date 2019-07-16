import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {forkJoin} from 'rxjs';

const fleksGroupID = 2102581;
const elementoGroupID = 3320863;

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(private http: HttpClient) {
    }

    getProjectList() {
        const requestForFleks = this.http.get
        (`${environment.GITLAB_URL}groups/${fleksGroupID}/projects?include_subgroups=true`);

        const requestForE43 = this.http.get
        (`${environment.GITLAB_URL}groups/${elementoGroupID}/projects?include_subgroups=true`);

        return forkJoin([requestForFleks, requestForE43]);
    }
}
