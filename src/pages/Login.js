import React, {Component} from 'react';
import { connect } from 'react-redux';
import { islogged } from '../redux/actions';
import DragonEye from '../img/dragoneye.jpeg';


class Login extends Component {
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.validateFields = this.validateFields.bind(this);

    this.state = {
      email:'',
      password:'',
      validated:false,
      logedin: false
    }
  }

  validateFields(){
    const { email, password } = this.state;
    const validate = /\S+@\S+\.\S+/;
    if (password.length > 6 && validate.test(email)){
      return false;
    }
    return true;
  }

  handleChange(event){
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render(){
    const { history, islogged } = this.props;
    return(
      <div className="login-page">
        <img src={ DragonEye } alt="Olho do Dragão"/>
        <label
          htmlFor="email"
        >
          Email:
          <input
            value={ this.state.email }
            name="email"
            onChange={ this.handleChange }
          />
        </label>
        <label
          htmlFor="password"
        >
          Password:
          <input
            value={ this.state.password }
            name="password"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ this.validateFields() }
          onClick={()=>{
            history.push('/dragons');
            islogged(true);
          }}
        >
          Login
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  islogged: state => dispatch(islogged(state))});

export default connect(null, mapDispatchToProps)(Login);