import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route} from "react-router-dom";

import Title from './components/Title';
import Side from './components/Side';
import Foot from './components/Foot';

import Teacher from './pages/Teacher';
import Student from './pages/Student';
import Login from './pages/Login';
import Follow from './pages/Follow';
import Revise from './pages/Revise';
import ModifyPwd from './pages/ModifyPwd';
import Recruit from './pages/Recruit';
import PublicRecruit from './pages/PublicRecruit';

import "bootstrap/dist/css/bootstrap.css";

import './App.css';

class App extends Component{

    render() {
        return (
            <div className="app">
                <BrowserRouter>    
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route path='/main' component={Main} />
                    </Switch>
                </BrowserRouter>
            </div>  
        );
    }
}

class Main extends Component {

  render() {
    return (
        <div className="page clearfix" >
            <div className="side f-left">
                <Side /> 
            </div>
            <div className="main f-right ">
                <div className="main-title">
                    <Title />
                </div>
                <div className="main-content">
                    <Switch>
                        <Route path='/main/student' component={Student} />
                        <Route path='/main/revise' component={Revise} />

                        <Route path='/main/teacher' component={Teacher} />
                        <Route path='/main/follow' component={Follow} />
                        <Route path='/main/publicRecruit' component={PublicRecruit} />
                        
                        <Route path='/main/recruit' component={Recruit} />        
                        <Route path='/main/modifyPwd' component={ModifyPwd} />
                        
                    </Switch>
                </div>
            </div>
            <div className="foot">
                <Foot /> 
            </div>
            
        </div>  
    );
  }
}

export default App;
