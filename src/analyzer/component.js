// @flow

import React from 'react'
import {Button, ButtonGroup} from 'reactstrap'

import {buildingShapes, buildingShapesColors, Building} from './models'
import type {BuildingShape} from './models'
import './styles.css'

export default class Analyzer extends React.Component {
    state = {
        selectedShape: []
    }

    renderShapeLens() {
        const shapeLens = buildingShapes.map(shape => ({
                shape,
                len: this.props.buildings.filter(b => b.shape === shape).length
            }))
            .filter(sl => sl.len > 0)
            .sort((a, b) => b.len - a.len)

        const list = shapeLens.map((v) => (
                <li key={v.shape} className={'row'}>
                    <h5 className={'statistic'} onClick={() => this.selectShapeLen(v.shape)}>
                        Number of <span style={{color: buildingShapesColors[v.shape]}}>{v.shape}</span> buildings: 
                        <span style={{color: buildingShapesColors[v.shape]}} className={'len'}>{v.len}</span>
                    </h5>
                    <ButtonGroup hidden={this.state.selectedShape !== v.shape}>
                        <Button color='info'>Select</Button>
                        <Button color='info'>Next</Button>
                    </ButtonGroup>
                </li>
            )
        )
        return <ul>{list}</ul>
    }

    render() {
        let dataGathered = this.props.buildings.length > 0
        let polygonReady = this.props.polygon.length > 0
        return (
            <div>
                <Button onClick={() => this.props.fetch()} /*hidden={dataGathered || !polygonReady}*/>Analyze nearist buildings</Button>
                <h5 hidden={!dataGathered}>Data gathered</h5>
                {this.renderShapeLens()}
            </div>
        )
    }

    selectShapeLen = (shape: Building): void => {
        this.setState({selectedShape: shape})
    }
}
