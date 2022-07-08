import React, { PropsWithChildren } from 'react'
import classes from '../styles/components/Property.module.scss';

export default function Property({ children }: PropsWithChildren<{}>) {
    return (
        <div className={classes.property}>{children}</div>
    )
}