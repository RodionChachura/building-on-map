
import {findAngle} from './utils'
import type {Nodes} from '../models'
const g = window.google

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

export const buildingShapes = ['triangle', 'square', 'rectangle', 'complex', 'circlelike', 'angular']

export type BuildingShape = 'triangle' | 'square' | 'rectangle' | 'complex' | 'circlelike' | 'angular'

export class Building {
    nodes: Nodes
    shape: BuildingShape

    constructor(nodes: Nodes) {
        this.nodes = nodes
        this.shape = this.getShape()
    }
    
    getEdgesLen(): Array<number> {
        return this.nodes.map((node, index) => {
            const nextIndex = (index === this.nodes.length - 1) ? 0: index + 1
            const nextNode = this.nodes[nextIndex]
            const gNode = new g.maps.LatLng(node.lat, node.lon)
            const gNextNode = new g.maps.LatLng(nextNode.lat, nextNode.lon)

            return g.maps.geometry.spherical.computeDistanceBetween(gNode, gNextNode)
        })
    }

    getAngles(): Array<number> {
        return this.nodes.map((node, index) => {
            const a = node
            let b, c
            if (index === this.nodes.length - 2) {
                b = this.nodes[index + 1]
                c = this.nodes[0]
            } else if (index === this.nodes.length - 1) {
                b = this.nodes[0]
                c = this.nodes[1]
            } else {
                b = this.nodes[index + 1]
                c = this.nodes[index + 2]
            }
            return findAngle(a, b, c)
        })
    }

    getShape(): BuildingShape {
        const nodesLen = this.nodes.length
        const edgesLen = this.getEdgesLen()
        const angles = this.getAngles()
        if (nodesLen === 3) {
            return 'triangle'
        } else if (nodesLen === 4) {
            const ratio = edgesLen[0] / edgesLen[1]
            if (ratio > 3/4.5 && ratio < 4.5/3) {
                return 'square'
            } else {
                return 'rectangle'
            }
        } else {
            const area = g.maps.geometry.spherical.computeArea(this.nodes.map((v) => new g.maps.LatLng(v.lat, v.lon)))
            const perimetr = edgesLen.reduce((sum, v) => sum + v)
            const t = 4 * Math.PI * (area / (perimetr * perimetr))
            if (t > 0.8 && t < 1.2) {
                return 'circlelike'
            } else {
                if (angles.filter((a) => ((a > 89.5 && a < 90.5) || (a > 269.5 && a < 270.5))).length === this.nodes.length) {
                    return 'angular'
                }
            }
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