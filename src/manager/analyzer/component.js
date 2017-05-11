// @flow

import React from 'react'
import {Button, ButtonGroup} from 'reactstrap'
const m = window.google.maps

import {statePropertyChangeListener} from '../../utils/common'
import * as u from '../../utils/map'
import type {BuildingShape, Nodes} from '../../models/common'
import {buildingShapes, buildingShapesColors} from '../../models/common'
import {Building, AnalyzerShape} from '../../models/analysis'
import {BuildingUC} from '../../models/construction'
import './styles.css'

type Props = {
    platform: Nodes,
    buildings: Array<Building>,
    loading: boolean,
    map: any,
    drawingManager: any,
    buildingUC: BuildingUC,

    fetchBuildings: Function,
    setBuildingUC: Function,
}

export type State = {
    selectedShape: BuildingShape | void,
    analyzerShapes: Array<AnalyzerShape>,
}

export default class Analyzer extends React.Component<void, Props, State> {
    // toflow
    state: State = {
        selectedShape: undefined,
        analyzerShapes: [],
    }
    
    zoomed: any

    constructor(props: Props) {
        super(props)
        statePropertyChangeListener('manager.analyzer.buildings', this.updateAnalyzerShapes)
    }


    renderBuildingsWithShape() {
        const list = this.state.analyzerShapes.map((v) => {
            const shape = v.shape
            const size = v.size
            const color = {color: buildingShapesColors[shape]}
            const backgroundColor = {backgroundColor: buildingShapesColors[shape]}
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
        return <ul className={'statistics'}>{list}</ul>
    }

    render() {
        let dataGathered = this.props.buildings.length > 0
        let platformReady = this.props.platform
        return (
            <div>
                <Button onClick={this.fetchBuildings} hidden={dataGathered || !platformReady}>Analyze nearist buildings</Button>
                {this.renderBuildingsWithShape()}
            </div>
        )
    }

    selectShape(shape: BuildingShape) {
        this.setState({selectedShape: shape})
        const analyzerShape = this.state.analyzerShapes.find(v => v.shape === shape)
        if (analyzerShape) {
            const building = analyzerShape.zoomed
            this.zoomToBuilding(building)
        }
    }

    select = () => {
        const shape = this.state.selectedShape
        const analyzerShape = this.state.analyzerShapes.find(v => v.shape === shape)
        if (analyzerShape) {
            const building = analyzerShape.zoomed
            this.selectBuilding(building)
        }
    }

    next = () => {
        const shape = this.state.selectedShape
        const analyzerShape = this.state.analyzerShapes.find(v => v.shape === shape)
        if (analyzerShape) {
            const building = analyzerShape.next
            this.zoomToBuilding(building)
        }
    }

    updateAnalyzerShapes = (buildings: Array<m.Building>) => {
        const analyzerShapes = buildingShapes.reduce((res, shape) => {
            const filtered = buildings.filter(b => b.shape === shape)
            if (filtered.length)
                res.push(new AnalyzerShape(shape, filtered))
            return res
        }, []).sort((a, b) => b.size - a.size)
        this.setState({analyzerShapes})
    }

    fetchBuildings = () => {
        if (!this.props.loading) {
            const center = u.getPolygonCenter(this.props.platform)
            this.props.fetchBuildings(u.urlForGetAllInsideSquare(center, 1))
        }
    }



    // moved from map component
    zoomToBuilding = (building: Building): void => {
        if (this.zoomed) this.zoomed.unzoom()
        this.zoomed = building
        building.zoom()
    }

    // todo:
    // problem with state update on every change
    selectBuilding = (selected: Building): void => {
        const oldPolygon = selected.nodes
        const newCenter = u.getPolygonCenter(this.props.platform)
        const newPolygon = u.polygonWithNewCenter(oldPolygon, newCenter)
        if (this.props.buildingUC)
            this.props.buildingUC.kill()
        const onBuildingChange = (building: BuildingUC) => {
            // this.props.setBuildingUC(u.nodesFromGoogle(building.google))
            if (u.polygonInsideContainer(this.props.platform, u.nodesFromGoogle(building.google))) {
                building.makeGreen()
            } else {
                building.makeRed()
            }
        }
        this.props.setBuildingUC(new BuildingUC(this.props.map, newPolygon, onBuildingChange))
        onBuildingChange(this.props.buildingUC)
        const center = u.getPolygonCenter(this.props.platform)
        this.props.map.setCenter(center.googleLatLng())
    }
}
