componentWillMount() {
  console.log('在渲染前调用,在客户端也在服务端。')
};
componentDidMount() {
  console.log('在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。')
}
componentWillReceiveProps(newProps) {
  console.log('在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。')
}
shouldComponentUpdate(newProps, newState) {
  console.log('返回一个布尔值。在组件接收到新的props或者state时被调用')
  return true;
}
componentWillUpdate(nextProps, nextState) {
  console.log('在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。');
}
componentDidUpdate(prevProps, prevState) {
  console.log('在组件完成更新后立即调用。在初始化时不会被调用')
}
componentWillUnmount() {
  console.log('在组件从 DOM 中移除的时候立刻被调用')
}
