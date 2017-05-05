import type {Nodes} from '../models'

export type OverpassNode = {
    type: string,
    id: number,
    lat: number,
    lon: number,
}

export type OverpassElement = {
    type: string,
    id: number,
}

// type Building = {
//     nodes: Nodes
// }

export type BuildingType = 'square' | 'rectangle'

export class Building {
    constructor(nodes: Nodes = []) {
        this.nodes = nodes
    }

    nodes: Nodes

    getType(): BuildingType {
        return 'square'
    }
}