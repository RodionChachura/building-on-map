// @flow

import React from 'react'
import {Button} from 'reactstrap'

import {buildingShapes, buildingShapesColors, Building} from './models'

import './styles.css'

type StatisticProps = {
    buildings: Array<Building>
}

const Statistic = ({buildings}: StatisticProps) => {
    const shapeLens = buildingShapes.map(shape => ({
        shape,
        len: buildings.filter(b => b.shape === shape).length
    })).sort((a, b) => b.len - a.len)
    const list = shapeLens.map((v) => (
            <li key={v.shape}>
                <h5>
                    Number of <span style={{color: buildingShapesColors[v.shape]}}>{v.shape}</span> buildings: 
                    <span style={{color: buildingShapesColors[v.shape]}} className={'len'}>{v.len}</span>
                </h5>
            </li>
        )
    )

    return <ul>{list}</ul>
}


export default class Analyzer extends React.Component {
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
