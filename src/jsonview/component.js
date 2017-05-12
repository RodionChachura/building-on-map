import React from 'react'
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

export default class JsonView extends React.Component<void, Props, void> {
    constructor(props: Props) {
        super(props)
        statePropertyChangeListener('map.completed', this.computeCoordinates)
    }

    render() {
        return (
            <div hidden={!this.props.completed} className={'jsonview'}>
                <h2>JSON output</h2>
                <div><pre>{true}</pre></div>
            </div>
        )
    }

    computeCoordinates = () => {
        const p = this.props.platform
        const db = m.geometry.spherical.computeDistanceBetween
        const origin = p[0]
        p.slice(1).forEach(n => {
            const yDiff = db(origin.googleLatLng(), new Node(origin.lat, n.lon).googleLatLng())
            const xDiff = db(origin.googleLatLng(), new Node(n.lat, origin.lon).googleLatLng())
            console.info(xDiff, yDiff)
        })
    }
}