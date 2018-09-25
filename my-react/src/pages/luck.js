import React, {Component} from 'react'
import './luck.css'
export default class Luck extends Component {
  constructor (props) {
    super(props)
    this.state = {
      click: false,
      index:0,	//当前转动到哪个位置，起点位置
      count:0,	//总共有多少个位置
      timer:0,	//setTimeout的ID，用clearTimeout清除
      speed:20,	//初始转动速度
      times:0,	//转动次数
      cycle:50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
      prize:-1,	//中奖位置
    }
  }
  componentDidMount () {
    this.init()
    // console.log(this)
    // document.getElementsByClassName("luck-unit")[0].className = 'luck-unit active'
  }
  init () {
    var units = document.getElementsByClassName("luck-unit")
    this.setState({
      count: units.length
    })
    document.getElementsByClassName("luck-unit")[this.state.index].classList.add("active")
  }
  rolls () {
    var index = this.state.index
    var count = this.state.count
    document.getElementsByClassName("luck-unit-" + index)[0].classList.remove("active")
    index += 1
    if (index > count-1) {
      index = 0
    }
    document.getElementsByClassName("luck-unit-" + index)[0].classList.add("active")
    this.setState({
      index: index
    })
    return false
  }
  // stop (index) {
  //   this.setState({
  //     prize: index
  //   })
  //   return false
  // }
  start () {
    if(this.state.click) {
      return false
    }	else {
      this.setState({
        speed: 40
      }, () => {
          this.roll()
          this.setState({
          click: true
        })
      })
      
      return false
    }
  }
  roll(){
    this.setState({
      times: this.state.times + 1
    })
		this.rolls()
		if (this.state.times > this.state.cycle+10 && this.state.prize===this.state.index) {
      console.log(3434)
      clearTimeout(this.state.timer)
      this.setState({
        prize: -1
      })
      this.setState({
        times: 0
      })
      this.setState({
        click: false
      })
		}else{
			if (this.state.times<this.state.cycle) {
        this.setState({
          speed: this.state.speed - 10
        })
			}else if(this.state.times === this.state.cycle) {
				var index = Math.floor(Math.random()*7)
				// if(index>5){
				// 	index = 7
				// }else {
				// 	index = 5
        // }
				this.setState({
          prize: index
        })//最终中奖位置
			} else {
				if (this.state.times > this.state.cycle+10 && ((this.state.prize===0 && this.state.index===7) || this.state.prize===this.state.index+1)) {
					this.setState({
            speed: this.state.speed + 110
          })
				}else{
					this.setState({
            speed: this.state.speed + 20
          })
				}
			}
			if (this.state.speed<40) {
				this.setState({
          speed: 40
        })
      }
      this.setState({
        timer: setTimeout(this.roll.bind(this), this.state.speed)
      })
		}
		return false
	}
  render() {
    return (
      <div className="shanDeng" id="deng">
        <div id="luck">
          <table style={{borderSpacing: '.3rem .3rem'}}>
            <tbody>
              <tr>
                <td className="luck-unit luck-unit-0">一等奖</td>
                <td className="luck-unit luck-unit-1">二等奖</td>
                <td className="luck-unit luck-unit-2">三等奖</td>
              </tr>
              <tr>
                <td className="luck-unit luck-unit-7">四等奖</td>
                <td className="cjBtn" id="btn" onClick={this.start.bind(this)}/>
                <td className="luck-unit luck-unit-3">五等奖</td>
              </tr>
              <tr>
                <td className="luck-unit luck-unit-6">六等奖</td>
                <td className="luck-unit luck-unit-5">七等奖</td>
                <td className="luck-unit luck-unit-4">八等奖</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
    )
  }
}