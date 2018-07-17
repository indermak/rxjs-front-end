import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import '../../App.css';

class NoPageFound extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Sorry the page you are looking for doesn't exist.</h1>
        </header>
      </div>
    );
  }
}

export default NoPageFound;
