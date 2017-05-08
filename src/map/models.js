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



// building under construction
export class BuildingUC {

}

export class Enter {
    nodes: Array<Node>
    google: any
    map: any
}

export class Exit {
    nodes: Array<Node>
    google: any
    map: any
}

export class Construction {
    building: Building
    polygon: Polygon
    enters: Array<Enter>
    exits: Array<Exit>
}