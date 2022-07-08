import React, { PropsWithChildren, ReactElement } from 'react'
import classes from '../styles/components/Tab.module.scss';

export function Tab({ children, active, label }: PropsWithChildren<{ active?: boolean, label: string }>) {
    return (
        <div className={active ? 'active' : ''}>
            {children}
        </div>
    )
}

export type TabProps = {
    initialValue?: number,
    onChange?: (value: number) => void
}


export default function Tabs({ initialValue, onChange, children }: PropsWithChildren<TabProps>) {
    const [value, setValue] = React.useState(initialValue || 0);

    const changeValue = (index: number) => {
        setValue(index);
        if (onChange) {
            onChange(index);
        }
    }
    const childrenList = React.Children.toArray(children);
    return (
        <div className={classes.tabs}>
            <ol className={classes.tabList}>
                {childrenList.map((child, index) => {
                    const isActive = value === index;
                    const childElement = React.isValidElement(child) ? child as ReactElement : null;
                    return (
                        <li key={index} className={classes.tabItem + (isActive ? ` ${classes.tabItemActive}` : '')} onClick={() => changeValue(index)}>
                            {childElement?.props.label}
                        </li>
                    );
                })}
            </ol>
            <div className={classes.tabContent}>
                {childrenList.map((child, index) => {
                    if (value === index) {
                        return child;
                    }
                })}
            </div>
        </div>
    );
}