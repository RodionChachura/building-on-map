import React from 'react'
import {Button} from 'reactstrap'

import {buildingShapes} from './models'

import './styles.css'

/*class Statistic extends React.Component {
    state: {
        triangle: [],
        square: [],
        rectangulares: [],
        complex: [],
    }

    constructor(props) {
        super(props)

        statePropertyChangeListener('analyzer.buildings', (buildings) => {
            this.setState({triangles: buildings.filter(b => b.shape === 'triangle')})
            this.setState({squares: buildings.filter(b => b.shape === 'squares')})
            this.setState({rectangulares: buildings.filter(b => b.shape === 'rectangulares')})
            this.setState({complex: buildings.filter(b => b.shape === 'complex')})            
        })
    }

    render = () => (
        <div>
            
        </div>
    )
}*/

const Statistic = (props) => {
    const shapeLens = buildingShapes.map(shape => ({
        shape,
        len: props.buildings.filter(b => b.shape === shape).length
    })).sort((a, b) => b.len - a.len)
    console.log(shapeLens)
    const list = shapeLens.map((v) => (
            <li key={v.shape}>
                <h5>Number of {v.shape} buildings: <span>{v.len}</span></h5>
            </li>
        )
    )

    return <ul>{list}</ul>
}


export default class Analyzer extends React.Component {
    // state: {
    //     dataGathered: false
    // }

    // constructor(props) {
    //     super(props)

    //     statePropertyChangeListener('analyzer.buildings', (buildings) => {
    //         this.setState({dataGathered: buildings.length > 0})
    //     })
    // }

    render = () => {
        let dataGathered = this.props.buildings.length > 0
        return (
            <div>
                <Button onClick={() => this.props.fetch()} hidden={dataGathered}>Analyze nearist buildings</Button>
                <h5 hidden={!dataGathered}>Data gathered</h5>
                <ul hidden={!dataGathered}>
                    <Statistic buildings={this.props.buildings}></Statistic>
                </ul>
            </div>
        )
    }
}
