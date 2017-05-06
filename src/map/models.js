// @flow

import type {Nodes} from '../models'
import {Node} from '../models'


export type State = {
    polygon: Nodes | [],
    enters: Array<Nodes> | [],
    exits: Array<Nodes> | [],
    center: Node | [],
}