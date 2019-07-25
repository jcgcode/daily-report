import Issue from './issue.interface';

export default interface Section {
    name: string;
    image: string;
    source: string;
    opened: boolean[];
    issues: Array<Issue[]>;
}
