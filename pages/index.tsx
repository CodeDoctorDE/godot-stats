import Head from 'next/head'
import Image from 'next/image'
import React, { Suspense } from 'react'
import { ReactElement } from 'react'
import Compare from '../components/Compare'
import Container from '../components/Container'
import List, { ListItem } from '../components/List'
import Panel from '../components/Panel'
import Property from '../components/Property'
import { Row } from '../components/Layout'
import Select from '../components/Select'
import Tabs, { Tab } from '../components/Tab'
import { fetchIssues, fetchMilestones, fetchProposals, Issue, Milestone, TimeSpan } from '../lib/stats'
import { MilestoneHistory, ProposalHistory, readMilestoneStats, readProposalStats, saveMilestoneStats, saveProposalStats } from '../lib/stats_history'
import { BarChart } from 'recharts'
import Stats from '../components/Stats'
import dynamic from 'next/dynamic'



const DynamicStats = dynamic(() => import('../components/Stats'), {
  ssr: false
})

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
  const [span, setSpan] = React.useState<TimeSpan>('daily');
  const milestoneDays = Object.keys(milestoneHistory);
  const lastMilestonesDay = milestoneDays.length > 1 ? milestoneDays[milestoneDays.length - 2] : null;
  const lastMilestones = lastMilestonesDay ? milestoneHistory[lastMilestonesDay] : null;
  return (
    <>
      <Head>
        <title>Godot stats</title>
      </Head>

      <main>
        <Suspense fallback={<p>Loading...</p>}>
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
              <Container align="center">
                <h2>Proposals</h2>
                <DynamicStats history={proposalHistory} />
                <Row wrap spacing={16}>
                  <Panel flex={1}>
                    <h3>Open issues ({openProposals[span].count})</h3>
                    <List>
                      {openProposals[span].data.map(issue => (
                        <ListItem key={issue.id} href={issue.link}>
                          #{issue.number}: {issue.title}
                        </ListItem>
                      ))}
                    </List>
                  </Panel>
                  <Panel flex={1}>
                    <h3>Closed issues ({closedProposals[span].count})</h3>
                    <List>
                      {closedProposals[span].data.map(issue => (
                        <ListItem key={issue.id} href={issue.link}>
                          #{issue.number}: {issue.title}
                        </ListItem>
                      ))}
                    </List>
                  </Panel>
                </Row>
              </Container>
            </Tab>
            {milestones.map(milestone => {
              const lastMilestone = lastMilestones?.find((m) => m.milestone.id === milestone.milestone.id);
              const lastPlus = lastMilestone?.milestone.openIssues;
              const lastMinus = lastMilestone?.milestone.closedIssues;
              return (
                <Tab label={`Issues (${milestone.milestone.title})`} key={milestone.milestone.id}>
                  <Container align="center">
                    <h2>{milestone.milestone.title}</h2>
                    <p>
                      {milestone.milestone.description}
                    </p>
                    <Compare
                      plus={milestone.milestone.openIssues}
                      minus={milestone.milestone.closedIssues}
                      lastPlus={lastPlus}
                      lastMinus={lastMinus} />
                    <DynamicStats history={Object.fromEntries(Object.entries(milestoneHistory).map((e) => {
                      const histories = e[1].filter((e) => e.milestone.id == milestone.milestone.id);
                      const current = histories.length > 0 ? histories[0] : null;
                      return [e[0], {
                        openIssues: current?.openIssues ?? NaN,
                        closedIssues: current?.closedIssues ?? NaN
                      }]
                    }))} />
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
              )
            }) as ReactElement[]}
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
        </Suspense>
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const milestones = await fetchMilestones();
  const lastUpdated = new Date().toISOString();

  var nowOpenIssues = 0, nowClosedIssues = 0;

  const milestoneProps: MilestoneProps[] = await Promise.all(milestones.map(async milestone => {
    var openIssues = {} as SpanBasedProps<CountedData<Issue>>;
    var closedIssues = {} as SpanBasedProps<CountedData<Issue>>;
    await Promise.all((['daily', 'weekly'] as TimeSpan[]).map(async span => {
      const fetchedOpen = await fetchIssues({ span: span, milestone: milestone.title, status: 'open' });
      const fetchedClosed = await fetchIssues({ span: span, milestone: milestone.title, status: 'closed' });
      openIssues[span as TimeSpan] = fetchedOpen;
      closedIssues[span as TimeSpan] = fetchedClosed;
    }));
    nowOpenIssues += openIssues['daily'].count;
    nowClosedIssues += closedIssues['daily'].count;
    openIssues['daily'] = openIssues['daily'];
    closedIssues['daily'] = closedIssues['daily'];
    return {
      milestone,
      openIssues,
      closedIssues
    } as MilestoneProps;
  }));

  const openProposals = {} as SpanBasedProps<CountedData<Issue>>;
  const closedProposals = {} as SpanBasedProps<CountedData<Issue>>;
  await Promise.all((['daily', 'weekly'] as TimeSpan[]).map(async span => {
    const fetchedOpen = await fetchProposals({ span: span, status: 'open' });
    const fetchedClosed = await fetchProposals({ span: span, status: 'closed' });
    openProposals[span as TimeSpan] = fetchedOpen;
    closedProposals[span as TimeSpan] = fetchedClosed;
  }));

  const shouldWriteHistory = process.env.WRITE_HISTORY === 'true';
  if (shouldWriteHistory) {
    saveProposalStats(nowOpenIssues, nowClosedIssues);
    saveMilestoneStats(milestoneProps.map(m => ({
      milestone: m.milestone,
      openIssues: m.openIssues['daily'].count,
      closedIssues: m.closedIssues['daily'].count
    })));
  }
  const milestoneHistory = await readMilestoneStats();
  const proposalHistory = await readProposalStats();

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
