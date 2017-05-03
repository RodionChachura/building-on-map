import React from 'react'
import {Button} from 'reactstrap'
import './styles.css'

export default (props) => (
    <div>
        <Button onClick={props.fetch} disabled={!props.polygon.length}>Analyze nearist buildings in radius 1 km</Button>
        <h1>{JSON.stringify(props.center)}</h1>
    </div>
)

