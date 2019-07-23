export default interface Issue {
    id: number;
    iid: number;
    labels: [{name: string, color: string}];
    title: string;
    checked?: boolean;
}
