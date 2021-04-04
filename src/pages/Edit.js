import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Edit extends Component {
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.updateDragon = this.updateDragon.bind(this);

    this.state = {
      newname: '',
      newtype: '',
      dragon: {},
    }
  }

  componentDidMount(){
    const { id } = this.props.match.params;
    axios.get(`http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${id}`)
    .then(res => {
      this.setState({newname: res.data.name});
      this.setState({newtype: res.data.type});
      this.setState({dragon: res.data});
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({[name]: value});
  }

  updateDragon(){
    const { history } = this.props;
    const { id } = this.props.match.params;
    const { dragon, newname, newtype } = this.state;
    dragon.name = newname;
    dragon.type = newtype;
    axios.put(`http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${id}`, dragon)
    history.push('/dragons');
  }
  
  render(){
    const { islogged, history } = this.props;
    if(!islogged) {
      history.push('/');
    }
    return(
      <div className="login-page">
        <label htmlFor="newname">
          Nome:
          <input
            name="newname"
            value={ this.state.newname }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="newtype">
          Tipo:
          <input
            name="newtype"
            value={ this.state.newtype }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          onClick={ this.updateDragon }
        >
          Editar
        </button>
      </div>);
  }
}

const mapStateToProps = state => ({
  islogged: state.loggedin
});

export default connect(mapStateToProps, null)(Edit);