import React, { PropsWithChildren } from 'react'
import classes from '../styles/components/Layout.module.scss';

export function Row({ wrap, children, spacing = 0 }: PropsWithChildren<{ wrap?: boolean, spacing?: number }>) {
    return (
        <div className={classes.row + (wrap ? ` ${classes.wrap}` : '')} style={{gap: spacing}}>{children}</div>
    )
}

export function Flex({flex = 1, children}: PropsWithChildren<{flex?: number}>) {
    return (
        <div style={{flex: flex}}>{children}</div>
    )
}