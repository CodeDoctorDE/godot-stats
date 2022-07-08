import React, { PropsWithChildren } from 'react'
import classes from '../styles/components/Compare.module.scss';

export default function Compare({ plus, minus }: { plus: number, minus: number }) {
    // Round 2 digits after comma
    const progress = Math.round((minus / (plus + minus)) * 100 * 100) / 100;
    return (
        <div className={classes.compare}>
            <div className={classes.compareHeader}>
                <p className={classes.comparePlus}>{plus}</p>
                <p className={classes.compareBetween}>-</p>
                <p className={classes.compareMinus}>{minus}</p>
            </div>
            <div className={classes.compareDiff}>
                {progress}%
            </div>
        </div>
    )
}