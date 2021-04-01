import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dragao from '../img/dragon.jpeg';

class Details extends Component {
  constructor(){
    super();
    this.state = {
      dragon:{},
    }
  }

  componentDidMount(){
    const { id } = this.props.match.params;
    axios.get(`http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${id}`)
    .then(response => {
      this.setState({ dragon: response.data });
    })
  }

  render(){
    const { islogged, history } = this.props;
    if(!islogged) {
      history.push('/');
    }
    return(
      <div className="dragon-detail">
        <img src={Dragao} alt="Dragão"/>
        <h1>{this.state.dragon.name}</h1>
        <h3>{this.state.dragon.type}</h3>
        <p>{this.state.dragon.createdAt}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  islogged: state.loggedin
});

export default connect(mapStateToProps, null)(Details);