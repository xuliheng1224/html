import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import moment from 'moment';
import {getQueryString} from '../../common/utrl'
import { connect } from 'react-redux'
import {getToken} from '../../redux/actions/getToken'
import {uploadImg} from '../../redux/actions/upload'
// import "./index.css";
import { Breadcrumb, Select, Table, Form, DatePicker, Input, Upload, Icon, Modal, Radio, Checkbox, Transfer, Button } from 'antd';
import { Flex } from "antd-mobile";
const confirm = Modal.confirm;


// 提交按钮的状态
const TransferLsit = (props) => {
  if (props.value.prize.isTrue) {
    return (
      <div style={{marginTop: 10}}>
        <Transfer 
          showSearch
          dataSource={props.that.state.prize.mockData()} // 数据源
          titles={['选择框', '选中框']}
          targetKeys={props.that.state.prize.targetKeys}
          selectedKeys={props.that.state.prize.selectedKeys}
          onChange={props.that.transferChange}
          onSelectChange={props.that.transferSelectChange}
          render={item => item.title}/>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}
class Active extends React.Component {
  state = {
    active: {
      name: '',
      date: null,
      dateArr:[],
      brief: '',
      rule: '',
      prizeExplain: '',
      noPrizeExplain: '',
      relation: '',
      fileList: [],
      threshold: null,
      payment: null
    },
    prize: {
      name: '',
      fileList: [],
      prizeRV: null,
      prizeCheck: false,
      num: '',
      chance: '',
      isTrue: false,
      mockData: function () { // 穿梭框数据源
        let mockData = [];
        for (let i = 0; i < 20; i++) {
          mockData.push({
            key: i.toString(),
            title: `选项${i + 1}`,
            // description: `description of content${i + 1}`,
            // disabled: i % 3 < 1,
          });
        }
        return mockData
      },
      targetKeys: ['1', '2', '3'],
      selectedKeys: [],
    },
    editPrize: {
      num: '',
      chance: ''
    },
    activeVisible: false,
    activeImage: '',
    visible: false,
    prizeVisible: false,
    prizeImage: '',
    prizeList: [],
    prizeListData: [],
    prizeEditVisible: false,
    editIndex: null
  };

  // 钩子函数
  componentWillMount () {
    this.props.getTokenVal()
    this.setState({
      prizeList: [
        {
          title: "奖品图片",
          key: "img",
          render: (text, record) => (
            <span>
              <img style={{width: 50}} src={text.img} alt="" />
            </span>
          )
        },
        {
          title: "奖品名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "是否有实物商品",
          dataIndex: "isKind",
          key: "isKind"
        },
        {
          title: "已发放",
          dataIndex: "grant",
          key: "grant"
        },
        {
          title: "奖品总数量",
          dataIndex: "num",
          key: "num"
        },
        {
          title: "概率",
          dataIndex: "chance",
          key: "chance"
        },
        {
          title: "操作",
          key: "operation",
          render: (text, record, index) => {
            return(
              <span>
                <a href="javascript:;" onClick={this.editPrize.bind(this, {key: record, index: index})} style={{marginRight: 10}}>
                  编辑
                </a>
                <a href="javascript:;" onClick={this.deletePrize.bind(this, {key: record, index: index})} style={{marginRight: 10}}>
                  删除
                </a>
              </span>
            )      
            // if (this.state.prize.isTrue) { 
            //   return(
            //     <span>
            //       <a href="javascript:;" onClick={this.editPrize.bind(this, {key: record, index: index})} style={{marginRight: 10}}>
            //         编辑
            //       </a>
            //       <a href="javascript:;" onClick={this.deletePrize.bind(this, {key: record, index: index})} style={{marginRight: 10}}>
            //         删除
            //       </a>
            //     </span>
            //   )
            // } else {
            //   return(
            //     <span>
            //       <a href="javascript:;" onClick={this.editPrize.bind(this, {key: record, index: index})} style={{marginRight: 10}}>
            //         编辑
            //       </a>
            //     </span>
            //   )
            // }
          }
        }
      ]
    })

  }

  // 活动名称
  aciveNameChange = (e) => {
    let val = e.target.value
    let data = Object.assign({}, this.state.active, { name: val })
    this.setState({ active: data })
  }

  // 日期监听
  onDateChange = (date, dateString) => {
    console.log(777, date, dateString)
    let val = dateString
    let data = Object.assign({}, this.state.active, { date: val })
    this.setState({ active: data })
  }

  // 活动简介
  aciveBriefChange = (e) => {
    let val = e.target.value
    let data = Object.assign({}, this.state.active, { brief: val })
    this.setState({ active: data })
  }

  // 活动规则
  aciveRuleChange = (e) => {
    let val = e.target.value
    let data = Object.assign({}, this.state.active, { rule: val })
    this.setState({ active: data })
  }

  // 中奖说明
  prizeExplainChange = (e) => {
    let val = e.target.value
    let data = Object.assign({}, this.state.active, { prizeExplain: val })
    this.setState({ active: data })
  }

  // 未中奖说明
  noPrizeExplainChange = (e) => {
    let val = e.target.value
    let data = Object.assign({}, this.state.active, { noPrizeExplain: val })
    this.setState({ active: data })
  }

  // 关联表单
  relationChange = (value) => {
    let data = Object.assign({}, this.state.active, { relation: value })
    this.setState({ active: data })
  }

  // 上传图片
  handleBgCancel = () => { // 预览取消
    console.log(33333)
    this.setState({ activeVisible: false })
  }
  handlePreview = (file) => { // 点击图片预览
    console.log(1111, file)
    this.setState({
      activeImage: file.url || file.thumbUrl,
      activeVisible: true,
    })
  }
  handleChange = ({ fileList }) => { // 上传图片
    console.log(55544477, fileList[0])
    if (fileList[0]) {
      this.props.uploadClick(fileList[0], this.props.tokenVal)
    }
    let data = Object.assign({}, this.state.active, { fileList: fileList })
    this.setState({ active: data })

  }

  // 参与门槛
  onThresholdChange = (e) => {
    let val = e.target.value
    let data = Object.assign({}, this.state.active, { threshold: val })
    this.setState({ active: data })
  }

  // 领取方式
  onPaymentChange = (e) => {
    let val = e.target.value
    let data = Object.assign({}, this.state.active, { payment: val })
    this.setState({ active: data })
  }

  // 添加奖品
  showModal = () => { // 点击奖品按钮
    let data = Object.assign({}, this.state.prize, { name: '', fileList: [], prizeRV: null, prizeCheck: false, num: '', chance: '', isTrue: false, targetKeys: [],selectedKeys: [] })
    this.setState({ prize: data })
    this.setState({

      visible: true,
    });
  }
  handleOk = (e) => { // 弹出框确定
    let obj = {
      img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      name: this.state.prize.name,
      isKind: this.state.prize.prizeRV == 2 ? '是' : '否',
      grant: 0,
      num: this.state.prize.num,
      chance: `${this.state.prize.chance}%`
    }
    let arr = []
    arr.push(obj)
    this.setState({
      prizeListData: [...this.state.prizeListData, ...arr],
      visible: false
    });
  }
  handleCancel = (e) => { // 弹出框取消
    let data = Object.assign({}, this.state.prize, { name: '', fileList: [], prizeRV: null, prizeCheck: false, num: '', chance: '' })
    this.setState({
      visible: false,
    });
    this.setState({
      prize: data,
    });
  }

  // 奖品弹出框-->奖品名称
  noPrizeNameChange  = (e) => {
    let val = e.target.value
    let data = Object.assign({}, this.state.prize, { name: val })
    this.setState({ prize: data })
  }

  // 奖品弹出框-->奖品图片
  handlePrizeCancel = () => { // 预览取消
    console.log(33333)
    this.setState({ prizeVisible: false })
  }
  handlePrizePreview = (file) => { // 点击图片预览
    console.log(1111, file)
    this.setState({
      prizeImage: file.url || file.thumbUrl,
      prizeVisible: true,
    })
  }
  handlePrizeChange = ({ fileList }) => { // 上传图片
    console.log(9966, fileList)
    let data = Object.assign({}, this.state.prize, { fileList: fileList })
    this.setState({ prize: data })
  }

  // 奖品弹出框-->选择奖品-->单选框
  onPrizeRadioChange = (e) => {
    console.log('radio checked', e.target.value)
    let data = Object.assign({}, this.state.prize, { prizeRV: e.target.value })
    this.setState({ prize: data })
  }

  // 奖品弹出框-->选择奖品-->从列表中选择
  listBtn = () => {
    let data = Object.assign({}, this.state.prize, { isTrue: true })
    this.setState({ prize: data })
  }

  // 奖品弹出框-->选择奖品-->复选框
  onCheckboxChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    let data = Object.assign({}, this.state.prize, { prizeCheck: e.target.checked })
    this.setState({ prize: data })
    if (e.target.checked) {
      let data = Object.assign({}, this.state.prize, { targetKeys: [] })
      this.setState({ prize: data })
    }
  }

  // 穿梭框
  transferChange = (nextTargetKeys, direction, moveKeys) => {
    let data = Object.assign({}, this.state.prize, { targetKeys: nextTargetKeys })
    this.setState({ prize: data })
  }

  transferSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    let data = Object.assign({}, this.state.prize, { selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] })
    this.setState({ prize: data })
  }

  // 奖品弹出框-->奖品数量
  noPrizeNumChange = (e) => {
    let val = e.target.value
    let data = Object.assign({}, this.state.prize, { num: val })
    this.setState({ prize: data })
  }

  // 奖品弹出框-->奖品概率
  noPrizeChanceChange = (e) => {
    let val = e.target.value
    let data = Object.assign({}, this.state.prize, { chance: val })
    this.setState({ prize: data })
  }

  // 奖品表格唯一标识key
  rowKeyFun = (record) => {
    return record.id
  }

  // 表格-->删除
  deletePrize = val => {
    let _this = this
    confirm({
      title: '提示:',
      content: '确定删除吗?',
      onOk() {
        _this.state.prizeListData.splice(val.index, 1)
        _this.setState({ prizeListData: _this.state.prizeListData })
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  }

  // 表格-->编辑
  editPrize = (val, key) => {
    // editPrize: { 
    // },
    console.log(666, val)
    let obj = {
      img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      name: val.key.name,
      isKind: val.key.isKind,
      grant: 0,
      num: val.key.num,
      chance: val.key.chance.split('%')[0]
    }
    let data = Object.assign({}, this.state.editPrize, obj)
    // let list = this.state.prizeListData
    // let index = this.state.index
    // this.setState({ prizeListData: data })
    // this.setState({
    //   editPrize: data
    // })
    this.setState({
      editPrize: data,
      editIndex: val.index,
      prizeEditVisible: true,
    })
  }

  // 表格-->编辑-->弹出框
  handlePrizeEditOk = (e) => {
    console.log(e);
    let obj = this.state.editPrize
    obj.chance = `${obj.chance}%`
    let list = this.state.prizeListData
    let index = this.state.editIndex
    list = list.splice(index, 1, obj)
    console.log(666333, list)
    console.log(7777, this.state.prizeListData)
    this.setState({
      // prizeListData: list,
      prizeEditVisible: false,
    });
  }
  handlePrizeCancel = (e) => {
    console.log(e);
    this.setState({
      prizeEditVisible: false
    });
  }

  // 表格-->编辑-->奖品总数量
  noEditPrizeNumChange = (e) => {
    let val = e.target.value
    let data = Object.assign({}, this.state.editPrize, { num: val })
    this.setState({ editPrize: data })
  }

  // 表格-->编辑-->奖品概率
  noEditPrizeChanceChange = (e) => {
    let val = e.target.value
    let data = Object.assign({}, this.state.editPrize, { chance: val })
    this.setState({ editPrize: data })
  }

  // 活动保存
  actionConfirm = () => {
    console.log(333666, this.state.active.fileList.length>0 ? this.props.uploadVal : '')
    console.log(444, this.props.tokenVal, this.props.uploadVal)
  }

  render() {
    const FormItem = Form.Item;
    const { RangePicker } = DatePicker;
    const { TextArea } = Input;
    const { activeVisible, previewImage, fileList } = this.state;
    const RadioGroup = Radio.Group;
    const Option = Select.Option;
    
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>模板管理</Breadcrumb.Item>
          <Breadcrumb.Item>九宫格列表</Breadcrumb.Item>
          <Breadcrumb.Item>新增</Breadcrumb.Item>
        </Breadcrumb>
        <Form>
          <FormItem label="活动名称:" labelCol={{ span: 2 }} wrapperCol={{ span: 13 }}>
            <Input type="text" placeholder="请输入活动名称" value={this.state.active.name} onChange={this.aciveNameChange}/>
          </FormItem>
          <FormItem label="活动时间:" labelCol={{ span: 2 }} wrapperCol={{ span: 13 }}>
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" defaultValue={this.state.active.dateArr} style={{width: '100%'}} onChange={this.onDateChange.bind(this)}/>
          </FormItem>
          <FormItem label="活动简介:" labelCol={{ span: 2 }} wrapperCol={{ span: 13 }}>
            <Input type="text" placeholder="请输入活动简介" value={this.state.active.brief} onChange={this.aciveBriefChange}/>
          </FormItem>
          <FormItem label="活动规则:" labelCol={{ span: 2 }} wrapperCol={{ span: 13 }}>
            <TextArea type="text" placeholder="请输入活动规则" rows={4} value={this.state.active.rule} onChange={this.aciveRuleChange}/>
          </FormItem>
          <FormItem label="中奖说明:" labelCol={{ span: 2 }} wrapperCol={{ span: 13 }}>
            <Input type="text" placeholder="请输入中奖说明" value={this.state.active.prizeExplain} onChange={this.prizeExplainChange}/>
            <div style={{color: '#ccc'}}>默认实物商品,常在提示: 你需要填写地址可领取奖品</div>
          </FormItem>
          <FormItem label="未中奖说明:" labelCol={{ span: 2 }} wrapperCol={{ span: 13 }}>
            <Input type="text" placeholder="请输入未中奖说明" value={this.state.active.noPrizeExplain} onChange={this.noPrizeExplainChange}/>
          </FormItem>
          <FormItem label="关联表单:" labelCol={{ span: 2 }} wrapperCol={{ span: 13 }}>
            <Select defaultValue={this.state.active.relation} onChange={this.relationChange}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </FormItem>
          <FormItem label="活动背景图:" labelCol={{ span: 2 }} wrapperCol={{ span: 13 }}>
            <Upload
              // action="//jsonplaceholder.typicode.com/posts/"
              listType="picture-card"
              fileList={this.state.active.fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {this.state.active.fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal visible={this.state.activeVisible} footer={null} onCancel={this.handleBgCancel}>
              <img alt="example" style={{ width: '100%' }} src={this.state.activeImage} />
            </Modal>
            <span style={{lineHeight: '93px'}}>图片仅支持jpg, png, 尺寸3:5, 不超过1M</span>  
          </FormItem>
          <FormItem label="参与门槛:" labelCol={{ span: 2 }} wrapperCol={{ span: 13 }}>
            <RadioGroup onChange={this.onThresholdChange} value={this.state.active.threshold}>
              <Radio value={1}>无需关注公众号</Radio>
              <Radio value={2}>必须关注才可参与</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="领取方式:" labelCol={{ span: 2 }} wrapperCol={{ span: 13 }}>
            <RadioGroup onChange={this.onPaymentChange} value={this.state.active.payment}>
              <Radio value={1}>一人一次</Radio>
              <Radio value={2}>一天一次</Radio>
              <Radio value={3}>一天两次</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="奖品:" labelCol={{ span: 2 }} wrapperCol={{ span: 13 }}>
            <Button type="primary" size='small' onClick={this.showModal.bind(this)}>添加奖品</Button>
          </FormItem>
          <FormItem label="" labelCol={{ span: 0 }} wrapperCol={{ span: 15 }}>
            <Table columns={this.state.prizeList} dataSource={this.state.prizeListData} rowKey={this.rowKeyFun} />
          </FormItem>
          <FormItem labelCol={{ span: 0 }} wrapperCol={{ span: 15 }} style={{textAlign: 'right'}}>
            <Button type="primary">取消</Button>
            <Button type="primary" style={{marginLeft: 20}}  onClick={this.actionConfirm.bind(this)}>保存</Button>
          </FormItem>
        </Form>

        {/* 添加奖品弹出框 */}
        <Modal title="添加奖品:" visible={this.state.visible} width={600} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Form>
            <FormItem label="奖品名称:" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
              <Input type="text" placeholder="请输入奖品名称" value={this.state.prize.name} onChange={this.noPrizeNameChange}/>
            </FormItem>
            <FormItem label="奖品图片:" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
              <Upload
                action="//jsonplaceholder.typicode.com/posts/"
                listType="picture-card"
                fileList={this.state.prize.fileList}
                onPreview={this.handlePrizePreview}
                onChange={this.handlePrizeChange}
              >
                {this.state.prize.fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal visible={this.state.prizeVisible} footer={null} onCancel={this.handlePrizeCancel}>
                <img alt="example" style={{ width: '100%' }} src={this.state.prizeImage} />
              </Modal>
              <span style={{lineHeight: '93px'}}>仅支持jpg, png, 尺寸50*50不超过1M</span>  
            </FormItem>
            <FormItem label="选择奖品:" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
              <RadioGroup onChange={this.onPrizeRadioChange} value={this.state.prize.prizeRV}>
                <Radio value={1}>虚拟商品</Radio>
                <Radio value={2}>实物商品</Radio>
              </RadioGroup>
              <div>
                <Button type="primary" size='small' onClick={this.listBtn.bind(this)}>从列表中选择</Button>
                <Checkbox style={{marginLeft: 20}} disabled={this.state.prize.prizeRV==1} onChange={this.onCheckboxChange}>第三方提供</Checkbox>
              </div>

              {/* 穿梭框 */}
              <TransferLsit value={this.state} that={this}></TransferLsit>
              
            </FormItem>
            <FormItem label="奖品数量:" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
              <div style={{display: 'flex'}}>
                <Input style={{width: '120px'}} type="text" placeholder="请输入奖品数量" value={this.state.prize.num} onChange={this.noPrizeNumChange}/>
                <span>个</span>
                <span style={{color: '#ccc', marginLeft: 10}}>奖品数量为0时,只显示不参与抽奖</span>
              </div>
            </FormItem>
            <FormItem label="奖品概率:" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
              <div style={{display: 'flex'}}>
                <Input style={{width: '120px'}} type="text" placeholder="请输入奖品概率" value={this.state.prize.chance} onChange={this.noPrizeChanceChange}/>
                <span>‰</span>
                <span style={{color: '#ccc', marginLeft: 10}}>概率为0-1000的整数</span>
              </div>
            </FormItem>
          </Form>
        </Modal>

        {/* 编辑 */}
        <Modal title="编辑" visible={this.state.prizeEditVisible} onOk={this.handlePrizeEditOk} onCancel={this.handlePrizeCancel}>
          <Form>
            <FormItem label="奖品总数量:" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
              <Input type="text" placeholder="请输入奖品总数量" value={this.state.editPrize.num} onChange={this.noEditPrizeNumChange}/>
            </FormItem>
            <FormItem label="概率:" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
              <Input type="text" placeholder="请输入概率" value={this.state.editPrize.chance} onChange={this.noEditPrizeChanceChange}/>
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tokenVal: state.getToken.code,
    uploadVal: state.upload.code.url
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // 获取上传图片token
    getTokenVal: () => {
      dispatch(getToken())
    },
    // 上传图片
    uploadClick: (file, getTokenState) => {
      dispatch(uploadImg(file, getTokenState))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Active)