// @flow

import React from 'react'
import {Button, ButtonGroup} from 'reactstrap'

import {statePropertyChangeListener} from './../utils'
import * as m from './models'
import type {Nodes} from './../models'
import {Node} from './../models'
import type {BuildingShape} from './models'
import './styles.css'

type State = {
    selectedShape: BuildingShape,
    analyzerShapes: Array<m.AnalyzerShape>
}

type Props = {
    polygon: Nodes,
    center: Node,
    buildings: Array<m.Building>,

    fetch: Function,
    setZoomed: Function,
    setSelected: Function,
}


export default class Analyzer extends React.Component<void, Props, State> {
    // toflow
    state: State = {
        selectedShape: null,
        analyzerShapes: [],
    }
    

    constructor(props: Props) {
        super(props)
        statePropertyChangeListener('analyzer.buildings', this.updateAnalyzerShapes)
    }


    renderBuildingsWithShape() {
        const list = this.state.analyzerShapes.map((v) => {
            const shape = v.shape
            const size = v.size()
            const color = {color: m.buildingShapesColors[shape]}
            const backgroundColor = {backgroundColor: m.buildingShapesColors[shape]}
            return (
                <li key={shape} className={'row'} onClick={() => this.selectShape(shape)}>
                    <h5 className={'align-middle'}>
                        Number of <span style={color}>{shape}</span> buildings: 
                        <span style={color} className={'len'}>{size}</span>
                    </h5>
                    <ButtonGroup className={'buttons'} hidden={this.state.selectedShape !== shape}>
                        <Button style={backgroundColor} onClick={this.select}>Select</Button>
                        <Button style={backgroundColor} onClick={this.next}>Next</Button>
                    </ButtonGroup>
                </li>
            )}
        )
        return <ul>{list}</ul>
    }

    render() {
        // let dataGathered = this.props.buildings.length > 0
        // let polygonReady = this.props.polygon.length > 0
        return (
            <div>
                <Button onClick={() => this.props.fetch()} /*hidden={dataGathered || !polygonReady}*/>Analyze nearist buildings</Button>
                {this.renderBuildingsWithShape()}
            </div>
        )
    }

    selectShape(shape: BuildingShape) {
        this.setState({selectedShape: shape})
        const analyzerShape = this.state.analyzerShapes.find(v => v.shape === shape)
        // toflow
        const building = analyzerShape.zoomed()
        this.props.setZoomed(building)
    }

    select = () => {
        const shape = this.state.selectedShape
        const analyzerShape = this.state.analyzerShapes.find(v => v.shape === shape)
        // toflow
        const building = analyzerShape.zoomed()
        this.props.setSelected(building)
    }

    next = () => {
        const shape = this.state.selectedShape
        const analyzerShape = this.state.analyzerShapes.find(v => v.shape === shape)
        // toflow
        const building = analyzerShape.next()
        this.props.setZoomed(building)
    }

    updateAnalyzerShapes = (buildings: Array<m.Building>) => {
        const analyzerShapes = m.buildingShapes.reduce((res, shape) => {
            const filtered = buildings.filter(b => b.shape === shape)
            if (filtered.length)
                res.push(new m.AnalyzerShape(shape, filtered))
            return res
        }, []).sort((a, b) => b.size() - a.size())
        this.setState({analyzerShapes})
    }
}
