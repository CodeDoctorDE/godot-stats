import { readHistory, writeHistory } from './history';
import { fetchProposals, Milestone, fetchIssues } from './stats';


export type ProposalHistory = {
    openIssues: number,
    closedIssues: number,
}

export type MilestoneHistory = {
    milestone: Milestone,
    openIssues: number,
    closedIssues: number,
}

export default async function saveStats(milestones: Milestone[]) {
    await saveProposalStats();
    await saveMilestoneStats(milestones);
}

async function saveProposalStats() {
    const fetchedOpen = await fetchProposals({ span: 'lastProposalHistory', status: 'open' });
    const fetchedClosed = await fetchProposals({ span: 'lastProposalHistory', status: 'closed' });
    writeHistory('proposals', {
        openIssues: fetchedOpen.count,
        closedIssues: fetchedClosed.count,
    } as ProposalHistory);
}

export async function readProposalStats() : Promise<{[key in string]: ProposalHistory}> {
    const history = readHistory('proposals');
    return history;
}

async function saveMilestoneStats(milestones: Milestone[]) {
    const milestoneHistory = await Promise.all(milestones.map(async milestone => {
        const openIssues = await fetchIssues({ milestone: milestone.title, status: 'open', span: 'lastMilestoneHistory' });
        const closedIssues = await fetchIssues({ milestone: milestone.title, status: 'closed', span: 'lastMilestoneHistory' });
        return {
            milestone: milestone,
            openIssues: openIssues.count,
            closedIssues: closedIssues.count,
        } as MilestoneHistory;
    }));


    writeHistory('milestones', milestoneHistory);
}

export async function readMilestoneStats() : Promise<{[key in string]: MilestoneHistory[]}> {
    const history = readHistory('milestones');
    return history;
}
