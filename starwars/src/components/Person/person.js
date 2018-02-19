import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './people.css';
import Homeworld from '../Homeworld/Homeworld';
import Species from '../Species/Species';
import Films from '../Films/Films';

class Person extends Component {
  state = {
    movies: []
  }

  render() {
    const person = this.props.person;
    return (
      <div className="Person">
        <Link to="/">Home</Link>
        <br />
        <Link to={`/people/${person.id}`}>
          <div>
            <strong>{person.name}</strong>
          </div>
          <div className="Features">
            <div>Birth Of Year: {person.birth_year}</div>
            <div>Eye Color: {person.eye_color}</div>
            <div>Gender: {person.gender}</div>
            <div>Hair Color: {person.hair_color}</div>
            <div>Height: {person.height}</div>
            <div>Mass: {person.mass}</div>
            <div>Skin Color: {person.skin_color}</div>
          </div>
          <Homeworld home={person.homeworld} />
          <Species race={person.species} />
					<Films films={person.films} />
        </Link>
      </div>
    );
  }
  
  componentDidMount() {
    const promises = this.props.person.films.map((url) => {
      return axios.get(url).then((response) => {
        const film = response.data;
        return film;
      });
    });
    Promise.all(promises).then((responses) => {
				return responses.reduce((array, url) => [...array, url], []);
			  }).then((urls) => { 
				 return urls.map(url => fetch(url));
			  }).catch((err) => {
					 throw new Error(err);
				}); 
    // use Promise.all(promises).then((responses) => { // use response.reduce() }).catch(() => {});
  }
}

export default Person;
