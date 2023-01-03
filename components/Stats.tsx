import React, { useEffect } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

type Props = {
    history: {
        [key in string]: {
            openIssues: number,
            closedIssues: number
        }
    }
}

export default function Stats({history }: Props) {
    const entries = Object.entries(history);
    const divRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollLeft = divRef.current.scrollWidth;
        }
    }, [entries.length]);
    return (
    <div style={{overflowX: 'auto', maxWidth: "100%", height: "300px"}} ref={divRef}>
    <BarChart width={(entries.length * 16)} height={250} data={
        entries.map((history) => {
            return {
                name: history[0],
                'Closed Issues': -history[1].closedIssues,
                'Open Issues': history[1].openIssues
            };
        })}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip 
            contentStyle={{ background: '#232f57' }} 
            formatter={(value, name, props) => {
                if (name == 'Closed Issues') {
                    return -value;
                }
                return value;
            }} />
        <Legend />
        <Bar dataKey="Open Issues" fill="#00b300" />
        <Bar dataKey="Closed Issues" fill="#ff0000" />

    </BarChart>
    </div>
    )
}