import React, { PropsWithChildren } from 'react'
import classes from '../styles/components/Container.module.scss';

export default function Panel({ children }: PropsWithChildren<{}>) {
    return (
        <div className={classes.container}>{children}</div>
    )
}