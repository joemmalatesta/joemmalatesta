export type Question = {
    id: string;
    question: string;
    answer: string;
    likes?: number;
    deleted?: boolean;
    dateAsked: Date;
    dateAnswered?: Date;
}