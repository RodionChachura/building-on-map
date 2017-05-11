import React from 'react'
import {TabContent, TabPane, Nav, NavItem, NavLink, Button, ButtonGroup} from 'reactstrap'

import classnames from 'classnames'

import {BuildingUC} from '../models/construction'
import type {Nodes} from '../models/common'
import Analyzer from './analyzer/container'
import Shaper from './shaper/container'

type Mode = 'analyzer' | 'shaper'

type Props = {
    buildingUC: BuildingUC,
    platform: Nodes,
    mode: Mode,
    completed: boolean,

    setBuildingUC: Function,
}

type State = {
    mode: Mode,
}

export default class Manager extends React.Component<void, Props, State> {

    state: State = {
        mode: 'analyzer',
    }

    toggle = (mode: Mode) => {
        if (this.state.mode !== mode && this.props.platform) {
            this.setState({mode})
        }
    }

    render() {
            return (
                <div hidden={!this.props.platform || this.props.completed}>
                    <Nav tabs>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.mode === 'analyzer' })}
                        onClick={() => this.toggle('analyzer')}
                        >
                        Take from analyzed buildings
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.mode === 'shaper' })}
                        onClick={() => this.toggle('shaper')}
                        >
                        Construct by yourself
                        </NavLink>
                    </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.mode}>
                    <TabPane tabId='analyzer'>
                        <Analyzer />
                    </TabPane>
                    <TabPane tabId='shaper'>
                        <Shaper />
                    </TabPane>
                    </TabContent>
                    <ButtonGroup hidden={!this.props.buildingUC}>
                        <Button color='info' onClick={() => this.props.buildingUC.increase()}>+</Button>
                        <Button color='info' onClick={() => this.props.buildingUC.decrease()}>-</Button>
                        <Button color='info' onClick={() => this.props.buildingUC.rotatateLeft()}>left</Button>
                        <Button color='info' onClick={() => this.props.buildingUC.rotatateRight()}>right</Button>
                        <Button color='warning' onClick={this.deleteBuildingUC}>Remove building</Button>
                    </ButtonGroup>
                </div>
            )
    }


    deleteBuildingUC = () => {
        this.props.buildingUC.kill()
        this.props.setBuildingUC(null)
    }
}

