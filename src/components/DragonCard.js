import React from 'react';
import axios from 'axios';
import Dragao from '../img/dragon.jpeg';
import { useHistory } from 'react-router-dom';



const DragonCard = (props) =>{
  const { dragon, getapi } = props;
  const history = useHistory();

  const deleteDragon = (e) => {
    const { name } = e.target;
    axios.delete(`http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${name}`)
    .then(response => {
      console.log(response);
      getapi();
    });
    
  };

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
        history.push(`/details/${dragon.id}`);
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
      onClick={ deleteDragon }
    >
        X
      </button>
    </div>
  );
}

export default DragonCard;