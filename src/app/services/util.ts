import Daily from './interfaces/daily.interface';
import {AlertController, LoadingController} from '@ionic/angular';

const alertController = new AlertController();
const loadingController = new LoadingController();

export const TOKENS_KEYS = {
    AUTH: 'Auth',
    TODAY_DAILY: 'TodayDaily',
    ALL_DAILY: 'AllDaily'
};

export const NEW_LABELS = {
    'To Do': true,
    Doing: true,
    Done: true,
    'QA review': true,
    Reviewed: true
};
export const TEST_LABELS = {
    'QA review': true,
    Reviewed: true
};

export const DEV_YESTERDAY_LABELS = {
    Doing: true,
    Done: true,
    'QA review': true,
    Reviewed: true,
    Approved: true
};
export const DEV_TODAY_LABELS = {
    'To Do': true,
    Doing: true
};

/**
 * For an array given, concat two or more child arrays into one
 * @param (parentArray) Array
 */
export function concatChildArrays(parentArray) {
    const singleArray = [];
    parentArray.forEach((childArray) => {
        singleArray.push(...childArray);
    });
    return singleArray;
}

/**
 * For an array given, delete items duplicated from a key given
 * @param (array) Array
 * @param (key) String of the key used as unique value
 */
export function omitDuplicates(array, key) {
    const itemsObject = {};
    array.forEach(item => itemsObject[item[key]] = item);
    return Object.keys(itemsObject).map(itemKey => itemsObject[itemKey]);
    /*return Array.from(new Set(array.map(item => item[key]))).map(usedKey => {
        return array.find(item => {
            return item[key] === usedKey;
        });
    });*/
}

/**
 * For source given, return the labels separated by comas
 * @param (source) String for section source
 * @param (today) Boolean to indicate if it's today
 */
export function sourceLabels(source: string, today: boolean = false) {
    let LABELS;
    if (source === 'dev' && today) {
        LABELS = DEV_TODAY_LABELS;
    } else if (source === 'dev' && !today) {
        LABELS = DEV_YESTERDAY_LABELS;
    } else if (source === 'test') {
        LABELS = TEST_LABELS;
    } else {
        LABELS = NEW_LABELS;
    }
    return Object.keys(LABELS).reduce((cad, label) => {
        return cad += `${label},`;
    }, '').slice(0, -1);
}

/**
 * For daily given, return the discord message
 * @param (daily) Daily to be converted into a message
 */
export function composeDiscordMessage(daily: Daily) {
    let message = '';

    message += `**${daily.yesterday.title}**\n\n\n`;
    if (daily.yesterday.creation.title !== '') {
        message += `--> ${daily.yesterday.creation.title}\n\n`;
        daily.yesterday.creation.items.forEach(item => {
            message += `- ${item}\n`;
        });
        message += `\n`;
    }
    if (daily.yesterday.developing.title !== '') {
        message += `--> ${daily.yesterday.developing.title}\n\n`;
        daily.yesterday.developing.items.forEach(item => {
            message += `- ${item}\n`;
        });
        message += `\n`;
    }
    if (daily.yesterday.testing.title !== '') {
        message += `--> ${daily.yesterday.testing.title}\n\n`;
        daily.yesterday.testing.items.forEach(item => {
            message += `- ${item}\n`;
        });
        message += `\n\n`;
    }

    message += `**${daily.today.title}**\n\n\n`;
    if (daily.today.developing.title !== '') {
        message += `--> ${daily.today.developing.title}\n\n`;
        daily.today.developing.items.forEach(item => {
            message += `- ${item}\n`;
        });
        message += `\n`;
    }
    if (daily.today.testing.title !== '') {
        message += `--> ${daily.today.testing.title}\n\n`;
        daily.today.testing.items.forEach(item => {
            message += `- ${item}\n`;
        });
        message += `\n\n`;
    }

    return message;
}

/**
 * Presents a system confirm alert
 * @param (strongMessage) String for the strong text of the alert message
 * @param (extraInfo) String for extra info to be shown
 */
export function presentAlertConfirm(strongMessage: string, extraInfo?: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
        const alert = await alertController.create({
            header: 'Confirm!',
            message: `Are you sure you want to <strong>${strongMessage}</strong>? ${extraInfo || ''}`,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Okay',
                    handler: () => {
                        alert.dismiss().then(() => {
                            resolve(true);
                        });
                        return false;
                    }
                }
            ]
        });

        alert.present();
    });
}

/**
 * Presents a system loading
 * @param (message) String for the text next to the spinner
 */
export async function presentLoading(message: string) {
    const loading = await loadingController.create({
        message: `${message}...`
    });
    await loading.present();
    return loading;
}
