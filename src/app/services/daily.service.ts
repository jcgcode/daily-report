import {Injectable} from '@angular/core';
import {TOKENS_KEYS} from './util';
import {Storage} from '@ionic/storage';
import Daily from './interfaces/daily.interface';
import Section from './interfaces/section.interface';

@Injectable({
    providedIn: 'root'
})
export class DailyService {

    constructor(private storage: Storage) {
    }

    isTodaysDailyDone(): Promise<any> {
        return this.storage.get(TOKENS_KEYS.TODAY_DAILY).then((response: Daily) => {
            if (response) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (response.date.getTime() === today.getTime()) {
                    return response;
                } else {
                    this.removeTodaysDaily().then(
                        () => {
                            return false;
                        }
                    );
                }
            }
            return false;
        });
    }

    setTodaysDaily(sections: Section[]) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const daily: Daily = {
            date: today,
            yesterday: {
                title: 'What did you do yesterday?',
                creation: {
                    title: '',
                    items: []
                },
                developing: {
                    title: '',
                    items: []
                },
                testing: {
                    title: '',
                    items: []
                }
            },
            today: {
                title: 'What will you do today?',
                developing: {
                    title: '',
                    items: []
                },
                testing: {
                    title: '',
                    items: []
                }
            }
        };
        sections.forEach(section => {
            switch (section.source) {
                case 'new':
                    if (section.issues[0]) {
                        daily.yesterday.creation.title = section.name;
                        section.issues[0].forEach(issue => {
                            if (issue.checked)
                            // tslint:disable-next-line:max-line-length
                                daily.yesterday.creation.items.push(`I created the issue #${issue.iid}: ${issue.title}. Link: ${issue.web_url}`);
                        });
                    }
                    break;
                case 'dev':
                    if (section.issues[0]) {
                        daily.yesterday.developing.title = section.name;
                        section.issues[0].forEach(issue => {
                            if (issue.checked)
                            // tslint:disable-next-line:max-line-length
                                daily.yesterday.developing.items.push(`I worked on the issue #${issue.iid}: ${issue.title}. Link: ${issue.web_url}`);
                        });
                    }
                    if (section.issues[1]) {
                        daily.today.developing.title = section.name;
                        section.issues[1].forEach(issue => {
                            if (issue.checked)
                            // tslint:disable-next-line:max-line-length
                                daily.today.developing.items.push(`I'll work on the issue #${issue.iid}: ${issue.title}. Link: ${issue.web_url}`);
                        });
                    }
                    break;
                case 'test':
                    if (section.issues[0]) {
                        daily.yesterday.testing.title = section.name;
                        section.issues[0].forEach(issue => {
                            if (issue.checked)
                            // tslint:disable-next-line:max-line-length
                                daily.yesterday.testing.items.push(`I tested the issue #${issue.iid}: ${issue.title}. Link: ${issue.web_url}`);
                        });
                    }
                    if (section.issues[1]) {
                        daily.today.testing.title = section.name;
                        section.issues[1].forEach(issue => {
                            if (issue.checked)
                                daily.today.testing.items.push(`I'll test the issue #${issue.iid}: ${issue.title}. Link: ${issue.web_url}`);
                        });
                    }
                    break;
            }
        });
        return this.storage.set(TOKENS_KEYS.TODAY_DAILY, daily);
    }

    removeTodaysDaily() {
        return this.storage.remove(TOKENS_KEYS.TODAY_DAILY);
    }
}
