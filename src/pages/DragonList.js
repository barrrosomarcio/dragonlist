import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import DragonCard from '../components/DragonCard';

class DragonList extends Component {
  constructor(props){
    super(props);
  
    this.getapi = this.getapi.bind(this);
    this.createDragon = this.createDragon.bind(this);

    this.state = {
      dragons:[]
    }
  }

  async createDragon(){
    axios.post(`http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon`)
    .then(response => {
      this.getapi();
    });
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
                const { id } = dragon;
                return(
                  <DragonCard
                    key={ id }
                    dragon={ dragon }
                    getapi={ this.getapi }
                  />
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