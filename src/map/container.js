import component from './component'
import { connect } from 'react-redux';

import { setPolygon } from './actions'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPolygon: (coordinates) => {dispatch(setPolygon(coordinates))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)