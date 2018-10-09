import React, { Component } from 'react'
import { connect } from 'react-redux'
import {increment, decrement, reset} from '../../redux/actions/test'
class Index extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }
  render() {
    return <div>
             index
             <button onClick={this.showName.bind(this)}>查看</button>
      </div>
  }
}

const mapStateToProps = state => {
  return {
    counter: state.test    
  }
}
const mapDispatchToProps = dispatch => {
  return {
    increment: () => {
      dispatch(increment())
    },
    decrement: () => {
      dispatch(decrement())
    },
    reset: () => {
      dispatch(reset())
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
