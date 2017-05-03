import React from 'react'
import {Button} from 'reactstrap'
import './styles.css'

export default (props) => (
    <div>
        <Button onClick={() => props.fetch()} /*disabled={!props.polygon.length}*/>Analyze nearist buildings in radius 10 km</Button>
        <p>{JSON.stringify(props.buildings)}</p>
    </div>
)

