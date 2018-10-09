import React, {Component} from 'react'
import {Breadcrumb, Form, Input, Button, Select} from 'antd'
import LabelTable from '../../component/labelList/labelTable'
const FormItem = Form.Item
const Option = Select.Option;
export default class Index extends Component {
  constructor(props) {
    super(props);
    const value = props.value || {}
    this.state = {
      number: '',
      currency: ''
    }
  }

  // 活动名称
  handleNumberChange = (e) => {
    const number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ number });
    }
    // this.triggerChange({ number });
  }
  
  // 状态change事件
  handleCurrencyChange = (currency) => {
    if (!('value' in this.props)) {
      this.setState({ currency });
    }
    // this.triggerChange({ currency });
  }

  // triggerChange = (changedValue) => {
  //   // Should provide an event to pass value to Form.
  //   const onChange = this.props.onChange;
  //   if (onChange) {
  //     onChange(Object.assign({}, this.state, changedValue));
  //   }
  // }

  // 搜索
  search = () => {
    console.log(666, this.state.currency, this.state.number)
  }

  // 清除
  cleanUp = () => {
    this.setState({
      number: '',
      currency: ''
    })
  }

  // 新增
  addActive = () => {
    // location.pathname = '/active/11111'
    this.props.history.push('/active?id=1111&name=4556&sex=45454')
  }

  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>模板管理</Breadcrumb.Item>
          <Breadcrumb.Item>九宫格列表</Breadcrumb.Item>
        </Breadcrumb>

        {/* 头部搜索 */}
        <Form layout='inline'>
          <FormItem label="活动名称:">
            <Input type="text" placeholder="请输入活动名称" value={this.state.number} onChange={this.handleNumberChange}/>
          </FormItem>
          <FormItem label="状态:">
            <Select placeholder="请选择状态" value={this.state.currency} style={{ width: 150 }} onChange={this.handleCurrencyChange}>
                <Option value="未启用">未启用</Option>
                <Option value="启用">启用</Option>
                <Option value="停用">停用</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={this.search.bind(this)}>搜索</Button>
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={this.cleanUp.bind(this)}>清除</Button>
          </FormItem>
        </Form>
        <div style={{marginTop: 10, marginBottom: 10, textAlign: 'right'}}>
          <Button type="primary" onClick={this.addActive.bind(this)}>新增</Button>
        </div>
        {/* 表格 */}
        <LabelTable />
      </div>
    )
  }
}