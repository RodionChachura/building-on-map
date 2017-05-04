import React from 'react'
import {Button} from 'reactstrap'

import {statePropertyChangeListener} from '../utils'
import './styles.css'


export default class Analyzer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataGathered: false
        }

        statePropertyChangeListener('analyzer.buildings', (buildings) => {
            this.setState({dataGathered: buildings.length > 0})
        })
    }

    render = () => (
        <div>
            <Button onClick={() => this.props.fetch()} hidden={this.state.dataGathered}>Analyze nearist buildings in radius 10 km</Button>
            <h5 hidden={!this.state.dataGathered}>Data gathered</h5>
        </div>
    )
}
