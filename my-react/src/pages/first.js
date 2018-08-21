import React, {Component} from 'react'
import {getQueryString} from '../common/util'
export default class First extends  Component {
  constructor (props) {
    super(props)
    this.state = {
      books : [
        { bookname: '1', time: '一号',},
        { bookname: '2', time: '二号'},
        { bookname: '3', time: '三号'},
        {bookname: '4', time: '四号'}
      ]
    }
  }
  render () {
    console.log(getQueryString('a'))
    console.log(getQueryString('b'))
    console.log(getQueryString('c'))
    const books = this.state.books
    return (
      <div>
        <h2>
          第一个页面
        </h2>
        <ul>
        {books.map((book, i) => {
          return (
            <li key={i}>
              <div>书名：{book.bookname}</div>
              <div>出版时间：{book.time}</div>
              <hr />
            </li>
          )
        })}
        </ul>
      </div>
    )
  }
}