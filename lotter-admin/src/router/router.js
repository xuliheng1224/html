import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Bundle from './bundle';
import Loading from '../component/loading/index';
import LabelList from 'bundle-loader?lazy&name=test!pages/labelList/index'
import Active from 'bundle-loader?lazy&name=test!pages/labelList/active'
import Test from 'bundle-loader?lazy&name=test!pages/test/index'
import LayoutAdmin from '../component/layout/index'
// 按需加载 组件
const createComponent = (component, props) => () => (
  <Bundle load={component}>
    {
      (Component) => Component ? <Component {...props}/> : <Loading/>
    }
  </Bundle>
);
export default () => (
  <div>
    <Switch>    
      <Route path="/" render={(props)=>
        <LayoutAdmin>
          <Switch>
            <Route path="/test" component={createComponent(Test, props)}/>          
            <Route path="/labelList" component={createComponent(LabelList, props)}/>          
            <Route path="/active" component={createComponent(Active, props)}/>           
          </Switch>
        </LayoutAdmin>
      }>
      </Route>     
    </Switch>
  </div>
);
