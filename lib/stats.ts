import dayjs from 'dayjs';

export type Issue = {
    id: number;
    title: string;
    link: string;
}

type IssueReponse = {
    html_url: string;
    title: string;
    id: number;
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

export type TimeSpan = 'daily' | 'weekly';
export type Status = 'open' | 'closed';

const getDate = (timeSpan: TimeSpan) => {
    switch (timeSpan) {
        case 'daily':
            return dayjs().subtract(1, 'days').format('YYYY-MM-DD');
        case 'weekly':
            return dayjs().subtract(1, 'weeks').format('YYYY-MM-DD');
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

export const fetchProposals = async ({span, status} : {span : TimeSpan, status: Status}) : Promise<{data: Issue[], count: number}> => {
    const sort = status === 'open' ? 'created' : 'closed';
    const response = await fetch(`https://api.github.com/search/issues?q=repo%3Agodotengine%2Fgodot-proposals+is%3A${status}+${sort}%3A%3E%3D${getDate(span)}`, {
        headers: generateHeader()
    });
    console.log(`https://api.github.com/search/issues?q=repo%3Agodotengine%2Fgodot-proposals+is%3A${status}+${sort}%3A%3E%3D${getDate(span)}`);
    const proposals = await response.json() as {items?: IssueReponse[], total_count: number};
    return {data: proposals.items?.map(proposal => ({
        id: proposal.id,
        title: proposal.title,
        link: proposal.html_url
    }) as Issue) ?? [], count: proposals.total_count ?? 0};
}

export const fetchIssues = async ({span, milestone, status} : {span : TimeSpan, milestone?: string, status: Status}) : Promise<{data: Issue[], count: number}> => {
    const sort = status === 'open' ? 'created' : 'closed';
    const response = await fetch(`https://api.github.com/search/issues?q=repo%3Agodotengine%2Fgodot+is%3A${status}+${sort}%3A%3E%3D${getDate(span)}+milestone%3A${milestone}`, {
        headers: generateHeader()
    });
    const issues = await response.json() as {items?: IssueReponse[], total_count: number};
    return {data: issues.items?.map(proposal => ({
        id: proposal.id,
        title: proposal.title,
        link: proposal.html_url
    }) as Issue) ?? [], count: issues.total_count ?? 0};
}

export const fetchMilestones = async () : Promise<Milestone[]> => {
    const response = await fetch(`https://api.github.com/repos/godotengine/godot/milestones?state=open`, {
        headers: generateHeader()
    });
    const milestones = await response.json() as MilestoneResponse[];
    return milestones.map(milestone => ({
        title: milestone.title,
        description: milestone.description,
        openIssues: milestone.open_issues,
        closedIssues: milestone.closed_issues,
        id: milestone.number
    } as Milestone));
}

