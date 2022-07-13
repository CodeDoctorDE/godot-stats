import React, { PropsWithChildren } from 'react'
import classes from '../styles/components/Compare.module.scss';

export default function Compare({ plus, minus, lastPlus, lastMinus }: { plus: number, minus: number, lastPlus?: number, lastMinus?: number }) {
    // Round 2 digits after comma
    const progress = Math.round((minus / (plus + minus)) * 100 * 100) / 100;
    const lastProgress = (lastMinus && lastPlus) ? (Math.round((lastMinus / (lastPlus + lastMinus)) * 100 * 100) / 100) : 0;
    const diff = (lastMinus && lastPlus) ? Math.round((progress - lastProgress) * 100) / 100 : 0;
    return (
        <div className={classes.compare}>
            <div className={classes.compareHeader}>
                <p className={classes.comparePlus}>{plus}</p>
                <p className={classes.compareBetween}>-</p>
                <p className={classes.compareMinus}>{minus}</p>
            </div>
            <p className={classes.compareDiff}>
                {progress}%
            </p>
            {diff != 0 && (<>
                {diff > 0 &&
                    <p className={classes.compareProgressPlus}>+{diff}%</p>
                }
                {diff < 0 &&
                    <p className={classes.compareProgressMinus}>{diff}%</p>
                }
            </>
            )}
        </div>
    )
}