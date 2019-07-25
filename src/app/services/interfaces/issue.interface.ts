export default interface Issue {
    id: number;
    iid: number;
    labels: [{name: string, color: string}];
    title: string;
    web_url: string;
    checked?: boolean;
}
