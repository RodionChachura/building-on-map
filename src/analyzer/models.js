
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

export const buildingShapes = ['square', 'rectangle', 'complex', 'circlelike', 'angular', 'simpleshape']

export type BuildingShape = 'square' | 'rectangle' | 'complex' | 'circlelike' | 'angular' | 'simpleshape'

export const buildingShapesColors = {
    square: '#6f39d6',
    rectangle: '#19bcb1',
    complex: '#d97e43',
    circlelike: '#d4ec14',
    angular: '#357ebd',
    simpleshape: '#ee2269',
}

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
        const numberOfRightAngles = angles.filter((a) => ((a > 80 && a < 100) || (a > 260 && a < 280))).length
        const rectangular = numberOfRightAngles === this.nodes.length || numberOfRightAngles === this.nodes.length - 1
        if (nodesLen === 4) {
            if (rectangular) {
                const ratio = edgesLen[0] / edgesLen[1]
                return (ratio > 3/4.5 && ratio < 4.5/3)? 'square': 'rectangle'
            }
            return 'simpleshape'
        } else if (nodesLen === 5) {
            console.log(this.smallestEdge())
            return (this.smallestEdge() < 10 && rectangular)? 'rectangle': 'simpleshape'
        } else {
            // check if looks like circle
            const area = g.maps.geometry.spherical.computeArea(this.nodes.map((v) => new g.maps.LatLng(v.lat, v.lon)))
            const perimetr = edgesLen.reduce((sum, v) => sum + v)
            const t = 4 * Math.PI * (area / (perimetr * perimetr))
            if (t > 0.8 && t < 1.2) {
                return 'circlelike'
            } else if (rectangular) {
                return 'angular'
            } else if (angles.length < 10) {
                return 'simpleshape'
            }
        }
        return 'complex'
    }

    smallestEdge(): number { 
        return  Math.min(...this.getEdgesLen())
    }
}