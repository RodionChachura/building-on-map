// @flow

import {getShape} from './utils'
import type {Nodes} from '../models'

export type OverpassNode = {
    type: string,
    id: number,
    lat: number,
    lon: number,
}

export type OverpassBuilding = {
    type: string,
    id: number,
    nodes: Array<number>
}

export type OverpassElement = OverpassNode | OverpassBuilding

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
        this.shape = getShape(nodes)
    }
}