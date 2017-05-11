import component from './component'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    value: state.map,
    completed: state.map.completed,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(component)