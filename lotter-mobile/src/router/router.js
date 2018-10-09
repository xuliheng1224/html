/*
 * @Author: antbrother 
 * @Date: 2018-09-30 10:01:50 
 * @Last Modified by: antbrother
 * @Last Modified time: 2018-09-30 10:41:28
 */

 import React from "react"
 import { Route, Switch, Redirect } from "react-router-dom";
 import Bundle from "./bundle";
 import Test from "bundle-loader?lazy&name=test!pages/test/index";
 import Luck from "bundle-loader?lazy&name=test!pages/luck/luck";
 import Loading from '../component/loading/index'

 const createComponent = (component) => (props) => (
   <Bundle load={component}>
      {
        (Component) => Component ? <Component {...props}/> : <Loading />
      }
   </Bundle>
 )
 export default () => (
   <Switch>
     <Route path="/test" component={createComponent(Test)} />
     <Route path="/luck" component={createComponent(Luck)} />
   </Switch>
 )
