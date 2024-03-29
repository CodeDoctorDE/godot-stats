import { readLastHistory } from './history';
import dayjs from 'dayjs';

export type Issue = {
    id: number;
    title: string;
    link: string;
    number: number;
}

type IssueReponse = {
    html_url: string;
    title: string;
    id: number;
    number: number;
}

type MilestoneResponse = {
    title: string;
    description: string;
    open_issues: number;
    closed_issues: number;
    number: number;
}


export type Milestone = {
    title: string;
    description: string;
    openIssues: number;
    closedIssues: number;
    id: number;
}

export type TimeSpan = 'daily' | 'weekly' | 'lastProposalHistory' | 'lastMilestoneHistory';
export type Status = 'open' | 'closed';

const getDate = (timeSpan: TimeSpan) => {
    switch (timeSpan) {
        case 'daily':
            return dayjs().subtract(1, 'days').format('YYYY-MM-DDTHH:mm:ss');
        case 'weekly':
            return dayjs().subtract(1, 'weeks').format('YYYY-MM-DDTHH:mm:ss');
        case 'lastProposalHistory':
            const lastProposalHistory = readLastHistory('proposals');
            return lastProposalHistory?.date ?? dayjs().subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss');
        case 'lastMilestoneHistory':
            const lastHistory = readLastHistory('milestones');
            return lastHistory?.date ?? dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    }
}

const generateHeader = () => {
    const token = process.env.GITHUB_TOKEN;
    var header = {};
    if (token) {
        header = {
            Authorization: `token ${token}`
        }
    }
    return header;
}

export const fetchProposals = async ({ span, status }: { span: TimeSpan, status: Status }): Promise<{ data: Issue[], count: number }> => {
    const sort = status === 'open' ? 'created' : 'closed';
    const query = `https://api.github.com/search/issues?q=repo%3Agodotengine%2Fgodot-proposals+is%3A${status}+${sort}%3A%3E%3D${getDate(span)}`;
    const response = await fetch(query, {
        headers: generateHeader()
    });
    const proposals = await response.json() as { items?: IssueReponse[], total_count: number };
    return {
        data: proposals.items?.map(proposal => ({
            id: proposal.id,
            title: proposal.title,
            link: proposal.html_url,
            number: proposal.number
        }) as Issue) ?? [], count: proposals.total_count ?? 0
    };
}

export const fetchIssues = async ({ span, milestone, status }: { span: TimeSpan, milestone?: string, status: Status }): Promise<{ data: Issue[], count: number }> => {
    const sort = status === 'open' ? 'created' : 'closed';
    const query = `https://api.github.com/search/issues?q=repo%3Agodotengine%2Fgodot+is%3A${status}+${sort}%3A%3E%3D${getDate(span)}+milestone%3A${milestone}`;
    const response = await fetch(query, {
        headers: generateHeader()
    });
    
    const issues = await response.json() as { items?: IssueReponse[], total_count: number };
    return {
        data: issues.items?.map(issue => ({
            id: issue.id,
            title: issue.title,
            link: issue.html_url,
            number: issue.number
        }) as Issue) ?? [], count: issues.total_count ?? 0
    };
}

export const fetchMilestones = async (): Promise<Milestone[]> => {
    const response = await fetch(`https://api.github.com/repos/godotengine/godot/milestones?state=open`, {
        headers: generateHeader()
    });
    const milestones = (await response.json() ?? []) as MilestoneResponse[];
    return milestones.map(milestone => ({
        title: milestone.title,
        description: milestone.description,
        openIssues: milestone.open_issues,
        closedIssues: milestone.closed_issues,
        id: milestone.number
    } as Milestone));
}

