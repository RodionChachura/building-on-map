import React from 'react'

import {BuildingUC} from '../../models/construction'

type State = {
    buildingUC: BuildingUC,

    setBuildingUC: Function,
}

export default class Shaper extends React.Component<void, void, State> {
    render = () => (
        <h1>Shaper</h1>
    )
}