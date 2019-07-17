import {Injectable} from '@angular/core';
import {TOKENS_KEYS} from './util';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class DailyService {

    constructor(private storage: Storage) {
    }

    isTodaysDailyDone(): Promise<boolean> {
        return this.storage.get(TOKENS_KEYS.TODAY_DAILY).then((response) => {
            return !!response;
        });
    }
}
