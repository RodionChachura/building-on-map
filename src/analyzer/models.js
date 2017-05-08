// @flow
import type {BuildingShape} from '../models/common'
import {Building, AnalyzerShape} from '../models/analysis'
import {Construction} from '../models/construction'

export type Props = {
    construction: Construction,
    buildings: Array<Building>,
    selected: Building,
    zoomed: Building,

    setSelected: Function,
    setZoomed: Function,
    fetch: Function,
}

export type ReducerState = {
    buildings: Array<Building>,
    loading: boolean,
    error: any,
    zoomed: Building | void,
    selected: Building | void,
}

export type ComponentState = {
    selectedShape: BuildingShape,
    analyzerShapes: Array<AnalyzerShape>,
}