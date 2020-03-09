
import * as serviceWorker from './serviceWorker';

import React             from 'react';
import ReactDOM          from 'react-dom';

import { BrowserRouter, Route } from 'react-router-dom';

import App from './App';

function AuthSuccess(props){
  window.token = props.match.params.token;
  props.history.push('/');
  return null;
}

// <input onChange={isidle}/>
let timer = null;
const isidle = ()=>{
  clearTimeout(timer);
  timer = setTimeout( ()=>{
    console.log('idle!');
  },500)
}


ReactDOM.render(
  <BrowserRouter>
    <Route path="/success/:token" component={AuthSuccess}/>
    <input onChange={isidle}/>
    <App/>
  </BrowserRouter>
  , document.getElementById('root'));

serviceWorker.register();
