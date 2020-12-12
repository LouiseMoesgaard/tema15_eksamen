import React from "react";
import Dashboard from './pages/dashboard/Dashboard';
import Statistics from './pages/dashboard/Statistics';
import Problems from './pages/dashboard/Problems';
import OrderForm from './pages/orderform/Orderform';
import Payment from './pages/Payment';
import {Route, Switch} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';
import BarData from './services/BarData';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}; 
  }

  interval = null;

    componentDidMount () {
      this.interval = setInterval(() => {
        BarData.getData().then(data => {
          this.setState(data);
        })
      }, 10000);
    }

    componentWillUnmount () {
      clearInterval(this.interval);
    }

  
  render() { 
    return (
      
      <Router>
        <div className="App">
          <Switch>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/stats" component={Statistics}/>
            <Route path="/problems" component={Problems}/>
            <Route path="/order" render={()=> (
              <div className="OrderWrapper">
                {
                  this.state.storage?
                  <OrderForm storage={this.state.storage}/> :
                  null
                }
              </div>
              )}/>
              <Route path="/payment" render={()=>(
                <Payment/>
                )}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
 