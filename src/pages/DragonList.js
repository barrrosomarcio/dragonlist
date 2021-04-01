import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Dragao from '../img/dragon.jpeg';

class DragonList extends Component {
  constructor(props){
    super(props);
  
    this.getapi = this.getapi.bind(this);
    this.createDragon = this.createDragon.bind(this);
    this.deleteDragon = this.deleteDragon.bind(this);

    this.state = {
      dragons:[]
    }
  }

  deleteDragon(event){
    const { name } = event.target;
    axios.delete(`http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${name}`)
    .then(response => {
      console.log(response);
      this.getapi();
    });
    
  }

  async createDragon(){
    const { history } = this.props;
    axios.post(`http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon`)
    .then(response => {
      console.log(response);
    });
    await this.getapi();
  }

  getapi(){
    axios.get('http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon')
      .then(response =>{
        const filtered = response.data.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        this.setState({ dragons: filtered });
      });
  }

  async componentDidMount(){
    await this.getapi();
  }

  render(){
      const { history, islogged } = this.props;
      const { dragons } = this.state;

      if(!islogged) {
        history.push('/');
      }
      return(
        <div className="App">
          <div className="header">
            <h1>The Ultimate Dragon List</h1>
            <button
              onClick={ this.createDragon }
            >
              Criar Dragão
            </button>
          </div>
          <div className="dragon-list">
            {
              dragons.map((dragon) => {
                const path = `/details/${dragon.id}`;
                return(
                  <div
                    className="dragon-info"
                    key={ dragon.id }
                  >
                    <img src={ Dragao } alt="dragão"/>
                    <h3>{ dragon.name }</h3>
                    <button
                      alt="Ver Detalhes"
                      onClick={() =>{
                        history.push(path);
                      }}
                      >
                      +
                    </button>
                    <button
                      alt="Editar"
                      name={ dragon.id }
                      onClick={ () => {
                        history.push(`/Edit/${dragon.id}`)
                      } }
                      >
                      E
                    </button>
                    <button
                      alt="Deletar Dragao"
                      name={ dragon.id }
                      onClick={ this.deleteDragon }
                      >
                      X
                    </button>
                  </div>
                );
              })
            }
          </div>
        </div>
      );
    }
}

const mapStateToProps = state => ({
  islogged: state.loggedin
});

export default connect(mapStateToProps, null)(DragonList);