export default interface Daily {
    date: Date;
    yesterday: {
        title: string,
        creation: {
            title: string,
            items: string[]
        },
        developing: {
            title: string,
            items: string[]
        },
        testing: {
            title: string,
            items: string[]
        }
    };
    today: {
        title: string,
        developing: {
            title: string,
            items: string[]
        },
        testing: {
            title: string,
            items: string[]
        }
    };
}
