import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Nav, Navbar, NavDropdown, MenuItem, Tabs, ButtonToolbar, Button, Table, ButtonGroup, Row, Col, Grid, Panel, FormGroup, FormControl, Form} from 'react-bootstrap';
import { Text, FlatList, View} from 'react-native';
import {Alert} from 'reactstrap';
import ReactTable from 'react-table';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { setPlayers, SET_PLAYERS } from '../actions/index';



let cumpleanos;

class PlayersSearch extends Component { 

    constructor(props) {
        super(props);
        
        this.state = {
            search: '',
            search1: '',
            search2: '',
            loading: false,
            age_error: false,
            name_error: false,
            players: '',
            url: 'https://football-players-b31f2.firebaseio.com/players.json?print=pretty',  
          };
    }

    handleUpdateClick = () => {

            this.setState({ loading:true })
            fetch(this.state.url)
            .then(response => response.json())
            .then(data => {
    
            this.setState({
                loading: false,
                age_error: false,
                name_error: false
            })  
      
      let filteredPlayers = data.filter(
            (player)=>{ 

                if(this.state.search2=='')
                {
                    this.setState({age_error: false })
                }
                else if(this.state.search2 >=41 || this.state.search2<=17){
                    this.setState({ age_error: true })
                    console.log('Ages between 18 and 40 years!!');                    
                }

                if (this.state.search.search(/[^a-zA-Z]+/) >= 0) {
                    console.log('Only letters!!'); 
                    this.setState({ name_error: true })
                }
                else {
                    this.setState({ name_error: false }) 
                     }
               
                let result = player.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1 &&
                player.position.indexOf(this.state.search1) !==-1 && 
                calcularEdad(player.dateOfBirth).indexOf(this.state.search2) !==-1;

                return result
            }

      );


      filteredPlayers.map((player)=>{
          console.log(player);
          player.dateOfBirth=calcularEdad(player.dateOfBirth);
        })
        console.log(filteredPlayers);
        this.setState({ players: filteredPlayers })
    })
     .catch(error => console.error(error));   
     

    };
    

    updateSearch(event) {
            this.setState({search: event.target.value});
    }

    updateSearch1(event) {
            this.setState({search1: event.target.value});
    }

    updateSearch2(event) {
            this.setState({search2: event.target.value});
    }

    
    toggle_age() {
        this.setState({
            age_error: !this.state.age_error
           
        });
    }

    toggle_name() {
        this.setState({
            name_error: !this.state.name_error
        });
    }




    render(){

        const headerStyle = { 
            fontSize: 'large',
            textAlign: 'center',
            backgroundColor: '#eeefff'
          };

        return(
            <div>      

            <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Player Name</Form.Label>
                    <Form.Control input type="text"   
                            placeholder='Player Name'
                            value={this.state.search}
                            onChange={this.updateSearch.bind(this)}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Position</Form.Label>
                        <Form.Control as="select" placeholder='Player Position' value={this.state.search1} onChange={this.updateSearch1.bind(this)}>
                            <option></option>
                            <option>Attacking Midfield</option>
                            <option>Central Midfield</option>
                            <option>Centre-Back</option>
                            <option>Centre-Forward</option>
                            <option>Defensive Midfield</option>
                            <option>Keeper</option>
                            <option>Left Midfield</option>
                            <option>Left Wing</option>
                            <option>Left-Back</option>
                            <option>Right-Back</option>
                        </Form.Control>
                    </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Age</Form.Label>
                    <Form.Control input type="number" 
                            placeholder='Player Age'
                            value={this.state.search2}
                            onChange={this.updateSearch2.bind(this)}/>
                </Form.Group>
            </Form.Row>
            
            <Button onClick={this.handleUpdateClick} variant="outline-success">SEARCH</Button>
            
            <br /><br />

            <Alert color="primary" isOpen={this.state.loading}>
            Descargando players data!!!
            </Alert>

            <Alert color="danger" isOpen={this.state.age_error} toggle={this.toggle_age.bind(this)}>
             Age goes from 18 to 40 years...
            </Alert>

            <Alert color="warning" isOpen={this.state.name_error} toggle={this.toggle_name.bind(this)}>
             Only letters...
            </Alert>

            <div style={ headerStyle }>
            <BootstrapTable data={ this.state.players } striped hover condensed options={ { noDataText: 'Without results' } }>
                <TableHeaderColumn width='100' dataField='name' isKey>Player</TableHeaderColumn>
                <TableHeaderColumn width='100' dataField='position'>Positon</TableHeaderColumn>
                <TableHeaderColumn width='100' dataField='dateOfBirth'>Age</TableHeaderColumn>
            </BootstrapTable>
            </div>
                   
            </div>
        )
} 
};

export default PlayersSearch;

/*
PlayersSearch.propTypes = {
    setCity: PropTypes.func.isRequired,
}
const mapDispatchToProps = dispatch => ({
        setPlayers: value => dispatch(setPlayers(value))
});

export default connect(null, mapDispatchToProps)(PlayersSearch);
*/

export function calcularEdad (fecha) {
    let hoy= new Date();
    let cumpleanos = new Date(fecha);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    let m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return String(edad);
}
