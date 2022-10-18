import React, { PropsWithChildren } from 'react'
import classes from '../styles/components/Container.module.scss';

export default function Container({ children, align }: PropsWithChildren<{align?: 'left' | 'center'}>) {
    return (
        <div className={classes.container} style={{
            alignItems: align === 'center' ? 'center' : 'flex-start'
        }}>{children}</div>
    )
}