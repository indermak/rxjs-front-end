import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/styles.css';

//import Components
import Dashboard from '../pages/Dashboard';
import Search from "../pages/SearchData";
import NoPageFound from '../pages/NoPageFound';

export default class Routes extends React.Component{
    render(){
        return(
            <AppProvider>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/search" component={Search} />
                        <Route path="*" component={NoPageFound} />
                    </Switch>
                </Router>
            </AppProvider>
        )
    }
}