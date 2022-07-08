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
import Select from '../components/Select'
import Tabs, { Tab } from '../components/Tab'
import { fetchIssues, fetchMilestones, fetchProposals, Issue, Milestone, TimeSpan } from '../lib/stats'


type HomeProps = {
  milestones: MilestoneProps[],
  openProposals: SpanBasedProps<CountedData<Issue>>,
  closedProposals: SpanBasedProps<CountedData<Issue>>,
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


const Home = ({ openProposals, closedProposals, milestones }: HomeProps) => {
  const [span, setSpan] = React.useState<TimeSpan>('daily');
  console.log(milestones);
  return (
    <>
      <Head>
        <title>Godot stats</title>
        <meta name="description" content="Statistics about the godot engine github repository" />
        <link rel="icon" href="/favicon.ico" />
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
                <Panel>
                  <h3>Open issues ({openProposals[span].count})</h3>
                  <List>
                    {openProposals[span].data.map(issue => (
                      <ListItem key={issue.id} href={issue.link}>
                        {issue.title}
                      </ListItem>
                    ))}
                  </List>
                </Panel>
                <Panel>
                  <h3>Closed issues ({closedProposals[span].count})</h3>
                  <List>
                    {closedProposals[span].data.map(issue => (
                      <ListItem key={issue.id} href={issue.link}>
                        {issue.title}
                      </ListItem>
                    ))}
                  </List>
                </Panel>
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
                <Panel>
                  <h3>Open issues ({milestone.openIssues[span].count})</h3>
                  <List>
                    {milestone.openIssues[span].data.map(issue => (
                      <ListItem key={issue.id} href={issue.link}>
                        {issue.title}
                      </ListItem>
                    ))}
                  </List>
                </Panel>
                <Panel>
                  <h3>Closed issues ({milestone.closedIssues[span].count})</h3>
                  <List>
                    {milestone.closedIssues[span].data.map(issue => (
                      <ListItem key={issue.id} href={issue.link}>
                        {issue.title}
                      </ListItem>
                    ))}
                  </List>
                </Panel>
              </Container>
            </Tab>
          )) as ReactElement[]}
          <Tab label="About">
            <Container>
              <h2>About</h2>
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

  const props: HomeProps = {
    milestones: milestoneProps,
    openProposals,
    closedProposals
  }
  return {
    props: props
  };
}

export default Home
