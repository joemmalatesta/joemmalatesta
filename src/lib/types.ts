export type trainingData = {
    id: string; //UUID
    url: string;
    label: string;
    status: string;
    votes: number;
    createdAt: Date;
    lastVoted: Date;
    totalVotes: number;
}