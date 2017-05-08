// @flow

import type {Nodes} from '../models'
import {Node} from '../models'
import {Building} from '../analyzer/models.js'
import * as o from '../utils/gMapsOptions'

const m = window.google.maps

// components staff
export type State = {
    polygon: Nodes,
    enters: Array<Nodes>,
    exits: Array<Nodes>,
    center: Node,
    building: Building,
}


// construction
