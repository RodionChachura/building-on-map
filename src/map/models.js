// @flow

import type {Node, Nodes} from '../models'

export type State = {
    polygon: Nodes | [],
    enters: Array<Nodes> | [],
    exits: Array<Nodes> | [],
    center: Node | [],
}