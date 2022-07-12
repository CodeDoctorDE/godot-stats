import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { ReactElement } from 'react'
import Compare from '../components/Compare'
import Container from '../components/Container'
import List, { ListItem } from '../components/List'
import Panel from '../components/Panel'
import Property from '../components/Property'
import { Flex, Row } from '../components/Layout'
import Select from '../components/Select'
import Tabs, { Tab } from '../components/Tab'
import { fetchIssues, fetchMilestones, fetchProposals, Issue, Milestone, TimeSpan } from '../lib/stats'
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import saveStats, { MilestoneHistory, ProposalHistory, readMilestoneStats, readProposalStats } from '../lib/stats_history'

type HomeProps = {
  milestones: MilestoneProps[],
  openProposals: SpanBasedProps<CountedData<Issue>>,
  closedProposals: SpanBasedProps<CountedData<Issue>>,
  lastUpdated: string,
  proposalHistory: { [key in string]: ProposalHistory },
  milestoneHistory: { [key in string]: MilestoneHistory[] },
}

type MilestoneProps = {
  milestone: Milestone,
  openIssues: SpanBasedProps<CountedData<Issue>>,
  closedIssues: SpanBasedProps<CountedData<Issue>>
}

type SpanBasedProps<K> = {
  [key in TimeSpan]: K
}

type CountedData<T> = {
  data: T[],
  count: number
}


const Home = ({ milestoneHistory, proposalHistory, openProposals, closedProposals, milestones, lastUpdated }: HomeProps) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const [span, setSpan] = React.useState<TimeSpan>('daily');
  const barOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  return (
    <>
      <Head>
        <title>Godot stats</title>
      </Head>

      <main>
        <Panel head>
          <Image src="/godot-logo.svg" alt="Godot Logo" width={512} height={207} />
          <Property>
            <h1>
              Statistics
            </h1>
            <Select label='Span' options={["Daily", "Weekly"]} value={span[0].toUpperCase() + span.substring(1)} onChange={(value) => {
              setSpan(value.toLowerCase() as TimeSpan);
            }} />
          </Property>
        </Panel>
        <Tabs>
          <Tab label="Proposals">
            <Container>
              <h2>Proposals</h2>
              <Bar options={barOptions} data={{
                labels: Object.keys(proposalHistory),
                datasets: [
                  {
                    label: "Open",
                    backgroundColor: '#FF6384',
                    data: Object.values(proposalHistory).map(h => h.openIssues),
                    stack: 'Stack 0'
                  },
                  {
                    label: "Closed",
                    backgroundColor: '#36A2EB',
                    data: Object.values(proposalHistory).map(h => -h.closedIssues),
                    stack: 'Stack 0'
                  }
                ]
              }} />
              <Row wrap spacing={16}>
                <Panel flex={1}>
                  <h3>Open issues ({openProposals[span].count})</h3>
                  <List>
                    {openProposals[span].data.map(issue => (
                      <ListItem key={issue.id} href={issue.link}>
                        #{issue.id}: {issue.title}
                      </ListItem>
                    ))}
                  </List>
                </Panel>
                <Panel flex={1}>
                  <h3>Closed issues ({closedProposals[span].count})</h3>
                  <List>
                    {closedProposals[span].data.map(issue => (
                      <ListItem key={issue.id} href={issue.link}>
                        #{issue.id}: {issue.title}
                      </ListItem>
                    ))}
                  </List>
                </Panel>
              </Row>
            </Container>
          </Tab>
          {milestones.map(milestone => (
            <Tab label={`Issues (${milestone.milestone.title})`} key={milestone.milestone.id}>
              <Container>
                <h2>{milestone.milestone.title}</h2>
                <p>
                  {milestone.milestone.description}
                </p>
                <Compare plus={milestone.milestone.openIssues} minus={milestone.milestone.closedIssues} />
                <Bar options={barOptions} data={{
                  labels: Object.keys(milestoneHistory),
                  datasets: [
                    {
                      label: "Open",
                      backgroundColor: '#FF6384',
                      data: Object.values(milestoneHistory).map(h => h.find(m => m.milestone.id === milestone.milestone.id)?.openIssues ?? 0),
                      stack: 'Stack 0'
                    },
                    {
                      label: "Closed",
                      backgroundColor: '#36A2EB',
                      data: Object.values(milestoneHistory).map(h => -(h.find(m => m.milestone.id === milestone.milestone.id)?.closedIssues ?? 0)),
                      stack: 'Stack 0'
                    }
                  ]
                }} />
                <Row wrap spacing={16}>
                  <Panel flex={1}>
                    <h3>Open issues ({milestone.openIssues[span].count})</h3>
                    <List>
                      {milestone.openIssues[span].data.map(issue => (
                        <ListItem key={issue.id} href={issue.link}>
                          #{issue.id}: {issue.title}
                        </ListItem>
                      ))}
                    </List>
                  </Panel>
                  <Panel flex={1}>
                    <h3>Closed issues ({milestone.closedIssues[span].count})</h3>
                    <List>
                      {milestone.closedIssues[span].data.map(issue => (
                        <ListItem key={issue.id} href={issue.link}>
                          #{issue.id}: {issue.title}
                        </ListItem>
                      ))}
                    </List>
                  </Panel>
                </Row>
              </Container>
            </Tab>
          )) as ReactElement[]}
          <Tab label="About">
            <Container>
              <h2>About</h2>
              <p>Last updated: {lastUpdated}</p>
              <p><a href="https://github.com/CodeDoctorDE/godot-stats">GitHub Repository</a></p>
              <p><a href="https://godotengine.org">Godot Engine website</a></p>
              <p>Developed by <a href="https://github.com/CodeDoctorDE">CodeDoctor</a></p>
              <a href="https://linwood.dev/imprint">Imprint</a>
            </Container>
          </Tab>
        </Tabs>
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const milestones = await fetchMilestones();
  const lastUpdated = new Date().toISOString();

  const milestoneProps: MilestoneProps[] = await Promise.all(milestones.map(async milestone => {
    var openIssues = {} as SpanBasedProps<CountedData<Issue>>;
    var closedIssues = {} as SpanBasedProps<CountedData<Issue>>;
    await Promise.all(['daily', 'weekly'].map(async span => {
      const fetchedOpen = await fetchIssues({ span: span as TimeSpan, milestone: milestone.title, status: 'open' });
      const fetchedClosed = await fetchIssues({ span: span as TimeSpan, milestone: milestone.title, status: 'closed' });
      openIssues[span as TimeSpan] = fetchedOpen;
      closedIssues[span as TimeSpan] = fetchedClosed;
    }));
    return {
      milestone,
      openIssues,
      closedIssues
    } as MilestoneProps;
  }));

  const openProposals = {} as SpanBasedProps<CountedData<Issue>>;
  const closedProposals = {} as SpanBasedProps<CountedData<Issue>>;
  await Promise.all(['daily', 'weekly'].map(async span => {
    const fetchedOpen = await fetchProposals({ span: span as TimeSpan, status: 'open' });
    const fetchedClosed = await fetchProposals({ span: span as TimeSpan, status: 'closed' });
    openProposals[span as TimeSpan] = fetchedOpen;
    closedProposals[span as TimeSpan] = fetchedClosed;
  }));

  const shouldWriteHistory = process.env.WRITE_HISTORY === 'true';
  if (shouldWriteHistory) {
    await saveStats(milestoneProps.map(m => m.milestone));
  }
  const milestoneHistory = await readMilestoneStats();
  const proposalHistory = await readProposalStats();
  const history: History[] = [];


  const props: HomeProps = {
    milestones: milestoneProps,
    openProposals,
    closedProposals,
    lastUpdated,
    proposalHistory,
    milestoneHistory,
  }
  return {
    props: props
  };
}

export default Home
