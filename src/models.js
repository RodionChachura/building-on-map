// @flow

export type Node = {
    lat: number,
    lon: number
}

export type Nodes = Array<Node>

export type Action = {
    +type: string,
    payload: any,
} | {
    type: string,
}