import Link from 'next/link';
import React, { PropsWithChildren, ReactElement } from 'react'
import classes from '../styles/components/List.module.scss';

export function ListItem({ children, href }: PropsWithChildren<{ href?: string }>) {
    return (
        <li>
            <a className={classes.listItem} href={href ?? ''} target="_blank" rel="noreferrer">
                {children}
            </a>
        </li>
    )
}


export default function List({ children }: PropsWithChildren<{}>) {
    return (
        <ul className={classes.list}>
            {children}
        </ul>
    );
}