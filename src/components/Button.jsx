import React from 'react'

export default function Button(props) {
    return (
        <a href={props.href} target="_blank"  onClick={props.onClick}>{props.text}</a>
    )
}