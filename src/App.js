import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // eslint-disable-next-line no-unused-vars
  Link
} from "react-router-dom";
import Inventory from './components/Inventory/Inventory';
import Notfound from './components/Notfound/Notfound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Login from './components/Login/Login';
import { createContext } from 'react';
import { AuthContextProvider, PrivateRoute } from './components/Login/UseAuth';
import Ship from './components/Ship/Ship';

export const UserContext = createContext();
const user = {name:'Akash', email:'akash@gmali.com'}

function App() {
  return (
    <div>
      <AuthContextProvider>
       <Header></Header>
        <Router>
          <Switch>
            <Route path='/shop'>
              <Shop></Shop>
            </Route>
            <Route path='/review'>
                <Review></Review>
            </Route>
            <Route path='/inventory'>
                  <Inventory></Inventory>
            </Route>
            <Route exact path='/'>
            <Shop></Shop>
            </Route>
            <Route path='/product/:productKey'>
                    <ProductDetails></ProductDetails>
            </Route>
            <Route path='/login'>
              <Login></Login>
            </Route>
            <PrivateRoute path='/ship'>
              <Ship></Ship>
            </PrivateRoute>
            <Route path='*'>
              <Notfound></Notfound>
            </Route>
          </Switch>
        </Router>
        </AuthContextProvider>
    </div>
  );
}

export default App;
