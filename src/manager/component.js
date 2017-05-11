import React from 'react'
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap'
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
            return (this.props.platform)? (
                <div>
                    <Nav tabs>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.mode === 'analyzer' })}
                        onClick={() => this.toggle('analyzer')}
                        >
                        From analyzed buildings
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.mode === 'shaper' })}
                        onClick={() => this.toggle('shaper')}
                        >
                        By yourself
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
                </div>
            ): null
  }
}

