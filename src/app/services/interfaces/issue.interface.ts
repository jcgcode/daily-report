export default interface Issue {
    id: number;
    labels: [{name: string, color: string}];
    title: string;
}
