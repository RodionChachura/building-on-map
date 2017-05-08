// @flow
import React from 'react'
import {Button, ButtonGroup} from 'reactstrap'
const m = window.google.maps

import type {Props, ComponentState} from './models'
import {Building} from '../models/analysis'
import {Enter, Exit, Platform} from '../models/construction'
import {statePropertyChangeListener} from '../utils/common'
import * as o from '../utils/gMapsOptions'
import './styles.css'

export default class Map extends React.Component<void, Props, ComponentState> {
    // toflow
    state: ComponentState = {
        zoomed: null,
    }

    map: any
    drawingManager: any

    constructor(props: Props) {
        super(props)
        statePropertyChangeListener('analyzer.buildings', this.renderAllBuildings)
        statePropertyChangeListener('analyzer.zoomed', this.zoomToBuilding)
        statePropertyChangeListener('analyzer.selected', this.selectBuilding)
    }
    
    render() {
        const construction = this.props.construction
        const building = (construction)? construction.building: false
        return (
            <div>
                <div ref='map' className={'map'}></div>
                <div className={'row justify-content-center manage'}>
                    <Button color='info' hidden={construction} onClick={this.startPolygon}>Start Polygon</Button>
                    <div hidden={!construction}>
                        <ButtonGroup>
                            <Button color='warning' onClick={this.deletePolygon}>Remove polygon</Button>
                            <Button color='info'  onClick={this.startEnter}>Enter</Button>
                            <Button color='info' onClick={this.startExit}>Exit</Button>
                        </ButtonGroup>
                        {building &&
                            <ButtonGroup >
                                <Button color='info'  onClick={building.increase}>+</Button>
                                <Button color='info' onClick={building.decrease}>-</Button>
                                <Button color='info'  onClick={building.rotatateLeft}>left</Button>
                                <Button color='info' onClick={building.rotatateRight}>right</Button>
                            </ButtonGroup>
                        }
                        <p>click twice to finish enter or exit</p>
                    </div>
                </div>
                
            </div>
        )
    }

    renderAllBuildings = (buildings: Array<Building>): void => {
        buildings.forEach(b => b.render(this.map))
    }

    zoomToBuilding = (zoomed: Building): void => {
        this.state.zoomed.unzoom()
        this.setState({zoomed})
        zoomed.zoom()
    }

    selectBuilding = (selected: Building): void => {
        this.props.construction.setBuildingUCfromNodes(selected.nodes)
    }

    startPolygon = (): void => {
        const platform = new Platform(this.map, this.drawingManager)
        platform.start() 
        this.props.construction.platform = new Platform(platform)     
    }

    startEnter = () => {
        const enter = new Enter(this.map, this.drawingManager)
        enter.start()
        this.props.construction.enters.push(enter)
    }

    startExit = () => {
        const exit = new Exit(this.map, this.drawingManager)
        exit.start()
        this.props.construction.exits.push(exit)
    }

    deletePolygon = (): void => {
        this.props.construction.platform.remove()
    }

    componentDidMount() {
        this.map = new m.Map(this.refs.map, o.mapOptions)
        this.drawingManager = new m.drawing.DrawingManager(o.drawingManagerOptions)
        this.drawingManager.setMap(this.map)
        this.props.construction.initOnMap(this.map)  
    }
}