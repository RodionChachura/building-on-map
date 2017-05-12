import React from 'react'
import {Row, Col, Container} from 'reactstrap'
const m = window.google.maps

import {BuildingUC} from '../models/construction'
import type {Nodes} from '../models/common'
import {Node} from '../models/common'
import {statePropertyChangeListener} from '../utils/common'
import {map} from '../map/global'
import * as u from '../utils/map'
import './styles.css'


const prettyJson = (obj) => JSON.stringify(obj, null, 2)

type Props = {
    buildingUC: BuildingUC,
    enters: Array<Nodes>,
    exits: Array<Nodes>,
    platform: Nodes,
    completed: boolean,
}

type State = {
    latLons: any,
    xys: any,
}

export default class JsonView extends React.Component<void, Props, State> {
    state: State = {
        latLons: undefined,
        xys: undefined,
    }
    constructor(props: Props) {
        super(props)
        statePropertyChangeListener('map.completed', this.computeCoordinates)
    }

    render() {
        return (
            <Container hidden={!this.props.completed}>
                <Row className={'justify-content-center'}>
                    <h2>JSON output</h2>
                </Row>
                <Row className={'justify-content-center'}>
                    <Col>
                        <h3>In lat lon:</h3>
                        <pre>{prettyJson(this.state.latLons)}</pre>
                    </Col>
                    <Col>
                        <h3>In x y:</h3>
                        <pre>{prettyJson(this.state.xys)}</pre>
                    </Col>
                </Row>
            </Container>
        )
    }

    computeCoordinates = () => {
        const p = this.props.platform
        const origin = new Node(0, 0)
        origin.lat = p.sort((a, b) => a.lat - b.lat)[0].lat - u.inLat(0.05) 
        origin.lon = p.sort((a, b) => a.lon - b.lon)[0].lon - u.inLon(origin.lat, 0.05)
        const systemPath = [
            {lat: origin.lat + u.inLat(0.5), lng: origin.lon},
            {lat: origin.lat, lng: origin.lon},
            {lat: origin.lat, lng: origin.lon + u.inLon(origin.lat, 0.5)},
        ]
        const system = new m.Polyline({
            path: systemPath,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        })
        system.setMap(map)

        const latLons = {
            buildingUC: this.props.buildingUC? this.props.buildingUC.google.nodes: {},
            enters: this.props.enters? this.props.enters: [],
            exits: this.props.exits? this.props.exits: [],
            platform: this.props.platform,
        }
        const xys = {
            originPoint: origin,
            buildingUC: this.props.buildingUC? this.props.buildingUC.google.nodes.map(n => n.inXYRelatively(origin)): {},
            enters: this.props.enters? this.props.enters.map(e => e.map(n => n.inXYRelatively(origin))): [],
            exits: this.props.exits? this.props.exits.map(e => e.map(n => n.inXYRelatively(origin))): [],
            platform: this.props.platform.map(n => n.inXYRelatively(origin)),
        }
        this.setState({latLons})
        this.setState({xys})

        p.forEach(n => {
            console.info(n.inXYRelatively(origin))
        })
        map.setZoom(16)
    }
}