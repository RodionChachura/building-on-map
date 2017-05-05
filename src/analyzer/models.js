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

export type BuildingShape = 'square' | 'rectangle'

export class Building {
    nodes: Nodes
    shape: BuildingShape

    constructor(nodes: Nodes) {
        this.nodes = nodes
    }

    getShape(): BuildingShape {
        return 'square'
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