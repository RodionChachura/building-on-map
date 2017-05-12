import component from './component'
import {connect} from 'react-redux'
import {State} from '../rootReducer'


const mapStateToProps = (state: State) => {
  return {
    buildingUC: state.manager.buildingUC,
    enters: state.map.enters,
    exits: state.map.exits,
    platform: state.map.platform,
    completed: state.map.completed,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(component)