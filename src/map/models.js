// @flow
import * as o from '../utils/gMapsOptions'
import {Building} from '../models/analysis'
import {Construction} from '../models/construction'


export type Props = {
    buildings: Array<Building>,
    construction: Construction,
    selected: Building,
    zoomed: Building,

    setConstruction: Function,
}

export type ComponentState = {
    zoomed: Building,
}

export type ReducerState = {
    construction: Construction | void,
}
