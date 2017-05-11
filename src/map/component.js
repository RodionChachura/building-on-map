// @flow
import React from 'react'
import {Button, ButtonGroup} from 'reactstrap'
const m = window.google.maps

import {Building} from '../models/analysis'
import type {Nodes} from '../models/common'
import {BuildingUC} from '../models/construction'
import {statePropertyChangeListener} from '../utils/common'
import * as u from '../utils/map'
import * as o from '../utils/gMapsOptions'
import './styles.css'


type Props = {
    enters: Array<Nodes>,
    exits: Array<Nodes>,
    platform: Nodes,

    setPlatform: Function,
    setEnters: Function,
    setExits: Function,
    setMap: Function,
    setDrawingManager: Function,
}


export default class Map extends React.Component<void, Props, void> {
    zoomed: any
    platform: any
    buildingUC: BuildingUC
    enters = []
    exits = []

    map: any
    drawingManager: any

    constructor(props: Props) {
        super(props)
        statePropertyChangeListener('manager.analyzer.buildings', this.renderAllBuildings)
    }
    
    render() {
        return (
            <div>
                <div ref='map' className={'map'}></div>
                <div className={'row justify-content-center manage'}>
                    <Button color='info' hidden={this.props.platform} onClick={this.startPlatform}>Start Platform</Button>
                    <div hidden={!this.props.platform}>
                        <ButtonGroup>
                            <Button color='warning' onClick={this.deletePlatform}>Remove Platform</Button>
                            <Button color='info'  onClick={this.startEnter}>Enter</Button>
                            <Button color='info' onClick={this.startExit}>Exit</Button>
                        </ButtonGroup>
                        {this.props.buildingUC &&
                            <ButtonGroup >
                                <Button color='info' onClick={() => this.buildingUC.increase()}>+</Button>
                                <Button color='info' onClick={() => this.buildingUC.decrease()}>-</Button>
                                <Button color='info' onClick={() => this.buildingUC.rotatateLeft()}>left</Button>
                                <Button color='info' onClick={() => this.buildingUC.rotatateRight()}>right</Button>
                            </ButtonGroup>
                        }
                        {/*<p>click twice to finish enter or exit</p>*/}
                    </div>
                </div>
                
            </div>
        )
    }

    renderAllBuildings = (buildings: Array<Building>): void => {
        buildings.forEach(b => b.render(this.map))
    }

    startPlatform = () => {
        this.drawingManager.setMap(this.map)
        this.drawingManager.setDrawingMode(m.drawing.OverlayType.POLYGON)
    }

    startPolyline = (options: any, addPolylineCallback: Function) => {
        this.drawingManager.setMap(this.map)
        this.drawingManager.setDrawingMode(m.drawing.OverlayType.POLYLINE)
        this.drawingManager.setOptions({polylineOptions: options})
        m.event.addListenerOnce(this.drawingManager, 'polylinecomplete', (polyline) => {
            const coordinates = polyline.getPath().getArray().slice(0, 2)
            polyline.setPath(coordinates)
            addPolylineCallback(polyline)
            this.drawingManager.setMap(null)
        })
    }

    startEnter = () => {
        this.startPolyline(o.enterPolylineOptions, (enter) => {
            const enters = [...this.enters, enter]
            this.props.setEnters(enters.map(e => u.nodesFromGoogle(e)))
        })
    }

    startExit = () => {
        this.startPolyline(o.exitPolylineOptions, (exit) => {
            const exits = [...this.exits, exit]
            this.props.setExits(exits.map(e => u.nodesFromGoogle(e)))
        })
    }

    deletePlatform = (): void => {
        this.platform.setMap(null)
        this.props.setPlatform(null)
    }

    componentDidMount() {
        this.map = new m.Map(this.refs.map, o.mapOptions)
        this.drawingManager = new m.drawing.DrawingManager(o.drawingManagerOptions)
        this.drawingManager.setMap(this.map)
        this.props.setMap({map: this.map})
        this.props.setDrawingManager({drawingManager: this.drawingManager})

        m.event.addListener(this.drawingManager, 'polygoncomplete', (polygon) => {
            const path = polygon.getPath()
            const updatePolygon = () => {
                const platform = u.nodesFromGoogle(polygon)
                this.props.setPlatform(platform)
            }
            updatePolygon()
            this.platform = polygon
            this.drawingManager.setMap(null)
            m.event.addListener(path, 'insert_at', updatePolygon)
            m.event.addListener(path, 'set_at', updatePolygon)
            m.event.addListener(path, 'remove_at', updatePolygon)
        })
    }
}