import component from './component'
import { connect } from 'react-redux';

import { setPolygon, setEnters, setExits, setCenter } from './actions'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPolygon: (coordinates) => dispatch(setPolygon(coordinates)),
    setEnters: (enters) => dispatch(setEnters(enters)),
    setExits: (exits) => dispatch(setExits(exits)), 
    setCenter: (center) => dispatch(setCenter(center)),  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)