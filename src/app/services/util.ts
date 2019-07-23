export const TOKENS_KEYS = {
    AUTH: 'Auth',
    TODAY_DAILY: 'TodayDaily'
};

export const NEW_YESTERDAY_LABELS = {
    'To Do': true,
    Doing: true,
    Done: true,
    'QA review': true,
    Reviewed: true,
    Approved: true
};
export const DEV_YESTERDAY_LABELS = {
    Doing: true,
    Done: true,
    'QA review': true,
    Reviewed: true,
    Approved: true
};
export const TEST_YESTERDAY_LABELS = {
    'QA review': true,
    Reviewed: true
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
    array.forEach(item => itemsObject[item[key]] = item );
    return Object.keys(itemsObject).map(itemKey => itemsObject[itemKey]);
    /*return Array.from(new Set(array.map(item => item[key]))).map(usedKey => {
        return array.find(item => {
            return item[key] === usedKey;
        });
    });*/
}
