import type {Nodes} from '../models'
// const g = window.google

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

export const buildingShapes = ['triangle', 'square', 'rectangle', 'complex']

export type BuildingShape = 'triangle' | 'square' | 'rectangle' | 'complex'

export class Building {
    nodes: Nodes
    shape: BuildingShape

    constructor(nodes: Nodes) {
        this.nodes = nodes
        this.shape = this.getShape()
    }

    getShape(): BuildingShape {
        const nodesLen = this.nodes.length
        if (nodesLen === 3) {
            return 'triangle'
        } else if (nodesLen === 4) {
            return 'square'
        }
        return 'complex'
    }
    // smallestEdge(): number {
    //     return this.nodes.reduce((smallest, node, index, nodes) => {
    //         const nextIndex = (index === nodes.length - 1) ? 0: index + 1
    //         const nextNode = nodes[nextIndex]
    //         const gNode = new g.maps.LatLng(node.lat, node.lon)
    //         const gNextNode = new g.maps.LatLng(nextNode.lat, nextNode.lon)
    //         const dist = g.maps.geometry.spherical.computeDistanceBetween(gNode, gNextNode)
    //         return (dist < smallest) ? dist: smallest
    //     }, Math.max())
    // }
}