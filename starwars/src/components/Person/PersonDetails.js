import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Homeworld from '../Homeworld/Homeworld';
import Species from '../Species/Species';

class PersonDetails extends React.Component {
  state = {
    person: null,
  };

  render() {
    const person = this.state.person;
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
        </div>
      );
    }
  }

  componentDidMount() {
    const { key } = this.props.match.params;
    axios
      .get(`https://swapi.co/api/people/${key}`)
      .then(({ data }) => {
        this.setState({ person: data });
      })
      .catch(error => {
        console.error('Bad Panda!');
      });
  }
}

export default PersonDetails;
