import React, {Component} from 'react'

export default class Add extends Component {
	state = {
    isTrue: false,
  }
  render () {
  	var _this = this
    function type(){
    	_this.setState({
    		isTrue: !_this.state.isTrue
    	})
    }~
    let isTrue;
    if (_this.state.isTrue) {
    	isTrue = 'block'
    } else {
    	isTrue = 'none'
    }
    return (
      <div>    		
         	<p onClick={type}>新增的页面({_this.props.haha})</p>
         	<div className='box' style={{display: isTrue}}>
         		<img src='../assets/login.png' />
         	</div>
      </div>
    )
  }
}