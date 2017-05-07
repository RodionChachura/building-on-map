// @flow

import type {Nodes} from '../models'
import {Node} from '../models'
import {Building} from '../analyzer/models.js'


export type State = {
    polygon: Nodes,
    enters: Array<Nodes>,
    exits: Array<Nodes>,
    center: Node,
    building: Building,
}