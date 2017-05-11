import React from 'react'

import {BuildingUC} from '../../models/construction'

type State = {
    buildingUC: BuildingUC,

    setBuildingUC: Function,
}

export default class Shaper extends React.Component<void, State, void> {
    render = () => (
        <h1>Shaper</h1>
    )
}