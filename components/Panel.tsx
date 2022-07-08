import React, { PropsWithChildren } from 'react'
import classes from '../styles/components/Panel.module.scss';

export default function Panel({ head, children }: PropsWithChildren<{ head?: boolean }>) {
    return (
        <div className={head ? classes.head : classes.panel}>{children}</div>
    )
}