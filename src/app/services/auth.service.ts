import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Storage} from '@ionic/storage';
import {Platform} from '@ionic/angular';
import {environment} from '../../environments/environment';
import User from './interfaces/user.interface';
import Project from './interfaces/project.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authenticationState = new BehaviorSubject(false);

    constructor(private storage: Storage, private platform: Platform) {
        this.platform.ready().then(() => {
            this.checkToken();
        });
    }

    login(gitlabUser: User, gitlabProjects: Project[]) {
        return this.storage.set(environment.TOKEN_KEY, {gitlab_user: gitlabUser, gitlab_projects: gitlabProjects}).then(response => {
            this.authenticationState.next(true);
        });
    }

    logout() {
        return this.storage.remove(environment.TOKEN_KEY).then(() => {
            this.authenticationState.next(false);
        });
    }

    isAuthenticated() {
        return this.authenticationState.value;
    }

    checkToken() {
        return this.storage.get(environment.TOKEN_KEY).then(response => {
            if (response) { this.authenticationState.next(true); }
        });
    }
}
