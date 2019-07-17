import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Storage} from '@ionic/storage';
import {Platform} from '@ionic/angular';
import User from './interfaces/user.interface';
import Project from './interfaces/project.interface';
import {TOKENS_KEYS} from './util';

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
        return this.storage.set(TOKENS_KEYS.AUTH, {gitlab_user: gitlabUser, gitlab_projects: gitlabProjects}).then(response => {
            this.authenticationState.next(true);
        });
    }

    logout() {
        return this.storage.remove(TOKENS_KEYS.AUTH).then(() => {
            this.authenticationState.next(false);
        });
    }

    isAuthenticated() {
        return this.authenticationState.value;
    }

    checkToken() {
        return this.storage.get(TOKENS_KEYS.AUTH).then(response => {
            if (response) { this.authenticationState.next(true); }
        });
    }
}
