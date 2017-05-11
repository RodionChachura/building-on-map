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
import {map, drawingManager, init} from './global'



type Props = {
    enters: Array<Nodes>,
    exits: Array<Nodes>,
    platform: Nodes,

    setPlatform: Function,
    setEnters: Function,
    setExits: Function,
}


export default class Map extends React.Component<void, Props, void> {
    zoomed: any
    platform: any
    buildingUC: BuildingUC
    enters = []
    exits = []

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
                        {/*<p>click twice to finish enter or exit</p>*/}
                    </div>
                </div>
                
            </div>
        )
    }

    renderAllBuildings = (buildings: Array<Building>): void => {
        buildings.forEach(b => b.render())
    }

    startPlatform = () => {
        drawingManager.setMap(map)
        drawingManager.setDrawingMode(m.drawing.OverlayType.POLYGON)
    }

    startPolyline = (options: any, addPolylineCallback: Function) => {
        drawingManager.setMap(map)
        drawingManager.setDrawingMode(m.drawing.OverlayType.POLYLINE)
        drawingManager.setOptions({polylineOptions: options})
        m.event.addListenerOnce(drawingManager, 'polylinecomplete', (polyline) => {
            const coordinates = polyline.getPath().getArray().slice(0, 2)
            polyline.setPath(coordinates)
            addPolylineCallback(polyline)
            drawingManager.setMap(null)
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
        init(this.refs.map)

        m.event.addListener(drawingManager, 'polygoncomplete', (polygon) => {
            const path = polygon.getPath()
            const updatePolygon = () => {
                const platform = u.nodesFromGoogle(polygon)
                this.props.setPlatform(platform)
            }
            updatePolygon()
            this.platform = polygon
            drawingManager.setMap(null)
            m.event.addListener(path, 'insert_at', updatePolygon)
            m.event.addListener(path, 'set_at', updatePolygon)
            m.event.addListener(path, 'remove_at', updatePolygon)
        })
    }
}