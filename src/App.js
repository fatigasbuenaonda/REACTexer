import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import {Nav, Navbar, NavDropdown, MenuItem, Tabs, ButtonToolbar, Button, Table, ButtonGroup, Row, Col, Grid, Panel, FormGroup, FormControl, Form} from 'react-bootstrap';
import Title from './components/Title';
import PlayersSearch  from './components/PlayersSearch';
import { setPlayers } from '../src/actions/index';


class App extends Component {

  constructor(props) {
      super(props);
      
      this.state = {

      };
    }


render() {   
        return (
        <div className="App">
            <Title></Title>
            <br />
            <PlayersSearch/>
            <br /><br />
        </div>
        
    );
}}

export default App;

/*
App.propTypes = {
    setCity: PropTypes.func.isRequired,
}
const mapDispatchToProps = dispatch => ({
        setPlayers: value => dispatch(setPlayers(value))
});

export default connect(null, mapDispatchToProps)(App);
*/

