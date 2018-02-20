import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Homeworld from '../Homeworld/Homeworld';
import Species from '../Species/Species';
import Films from '../Films/Films';

class PersonDetails extends React.Component {
//  state = {
//    person: null,
//  };

  render() {
    const person = this.state ? this.state.person : null;
    if (!person) {
      return <h2>Loading person info...</h2>;
    } else {
      return (
        <div className="Person">
          <Link to="/">Home</Link>
          <br />
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
				   <div>
             { person.films.map((film, i) => {
                 return <Films film={film} key={i} />
             })}
           </div>					
					//<Films film={person.films} />
        </div>
      );
    }
  }

  componentDidMount() { 
		if (this.props.person) {
			this.setState( {
         person: this.props.person
			});
		} else {
		 axios
       .get(`https://swapi.co/api/people/${this.props.match.params.key}`)
       .then(({ data }) => {	 
        this.setState({ person: data });
       })
       .catch(error => {
        console.error('Bad Panda!');
       });
    } 

	  const promises = this.props.person.films.map((url) => {
        return axios.get(url).then((response) => {
          const film = response.data;
          return film;
        });
      });
      Promise.all(promises).then((responses) => {
          let person = this.state.person;
          person.films = responses.map(response => response.data)
          this.setState(
          {
             person: person
          });
          }).catch((err) => {
             throw new Error(err);
          });
    }

} 

export default PersonDetails;
