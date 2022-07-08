import React from 'react'
import classes from '../styles/components/Select.module.scss'

type SelectProps = {
    label: string,
    options: string[],
    value: string,
    onChange: (value: string) => void
}

export default function Select({label, options, value, onChange}: SelectProps) {
  return (
    <div className={classes.select}>
        <label>{label}</label>
        <select className={classes.selectMenu} value={value} onChange={e => onChange(e.target.value)}>
            {options.map((option, index) => {
                return <option key={index} value={option}>{option}</option>
            }
            )}
        </select>
    </div>
  )
}