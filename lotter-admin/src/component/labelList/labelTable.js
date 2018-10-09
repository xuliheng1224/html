import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Modal, Button, Table, Divider } from "antd";

export default class LabelTable extends React.Component {
  state = {
    visible: false,
    columns: [
      {
        title: "活动id",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "活动名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "活动时间",
        dataIndex: "time",
        key: "time"
      },
      {
        title: "状态",
        dataIndex: "state",
        key: "state"
      },
      {
        title: "操作",
        key: "operation",
        render: (text, record) => (
          <span>
            <a href="javascript:;" style={{marginRight: 10}} onClick={this.showModal.bind(this, {key: record, name: '启用'})}>
              启用
            </a>
            {/* <Divider>Text</Divider> */}
            <a href="javascript:;" style={{marginRight: 10}} onClick={this.showModal.bind(this, {key: record, name: '停用'})}>停用</a>
            {/* <Divider type="vertical" /> */}
            <a href="javascript:;" style={{marginRight: 10}} onClick={this.showModal.bind(this, {key: record})}>编辑</a>
            {/* <Divider type="vertical" /> */}
            <a href="javascript:;" style={{marginRight: 10}} onClick={this.showModal.bind(this, {key: record})}>详情</a>
          </span>
        )
      }
    ],
    data: function () {
      var arrData = []
      for (let i = 0; i < 46; i++) {
        arrData.push({
          id: i,
          name: `活动名称${i}`,
          time: 32,
          state: `状态${i}`
        });
      }
      return arrData
    }
  };

  // 启用 停用弹出框
  showModal = value => {
    const confirm = Modal.confirm
    confirm({
      title: '提示:',
      content: '是否' + value.name + '?',
      onOk() {
        if (value.name === '启用') {

        } else {

        }
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  };

  // 表格分页
  changePage = (page) => {
    console.log(1111, page)
    this.setState({
      current: page,
    }, () => {
      
    })
  }
  onShowSizeChange = (current, pageSize) => {
    console.log(3333, current, pageSize)
  }

  render() {
    return (
      <div>
        <Table className="label-table" columns={this.state.columns} dataSource={this.state.data()} rowKey="id" pagination={{
            simple: false,
            current: this.state.current,
            // total: this.state.total2,
            defaultPageSize: 10,
            showQuickJumper: true,
            showSizeChanger: true,
            onShowSizeChange: this.onShowSizeChange,
            onChange: this.changePage,
          }}
        />
      </div>
    );
  }
}
