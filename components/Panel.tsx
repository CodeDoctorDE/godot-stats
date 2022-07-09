import React, { PropsWithChildren } from 'react'
import classes from '../styles/components/Panel.module.scss';

export default function Panel({ head, children, flex = 0 }: PropsWithChildren<{ head?: boolean, flex?:number}>) {
    return (
        <div className={head ? classes.head : classes.panel} style={{flex: flex}}>{children}</div>
    )
}