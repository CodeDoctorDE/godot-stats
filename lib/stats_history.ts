import { readHistory, writeHistory } from './history';
import { Milestone } from './stats';


export type ProposalHistory = {
    openIssues: number,
    closedIssues: number,
}

export type MilestoneHistory = {
    milestone: Milestone,
    openIssues: number,
    closedIssues: number,
}

export function saveProposalStats(openIssues: number, closedIssues: number) {
    writeHistory('proposals', {
        openIssues,
        closedIssues,
    } as ProposalHistory);
}

export async function readProposalStats() : Promise<{[key in string]: ProposalHistory}> {
    const history = readHistory('proposals');
    return history;
}

export function saveMilestoneStats(milestones: {milestone: Milestone, openIssues: number, closedIssues: number}[]) {
    writeHistory('milestones', milestones);
}

export async function readMilestoneStats() : Promise<{[key in string]: MilestoneHistory[]}> {
    const history = readHistory('milestones');
    return history;
}
