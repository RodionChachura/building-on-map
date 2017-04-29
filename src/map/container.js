import component from './component'
import { connect } from 'react-redux';

import { setPolygon, setEnters, setExits } from './actions'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPolygon: (coordinates) => {dispatch(setPolygon(coordinates))},
    setEnters: (enters) => {dispatch(setEnters(enters))},
    setExits: (exits) => {dispatch(setExits(exits))},    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)