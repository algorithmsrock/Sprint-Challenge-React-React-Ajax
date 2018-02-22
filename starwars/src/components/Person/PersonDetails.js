import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './people.css';
import Homeworld from '../Homeworld/Homeworld';
import Species from '../Species/Species';
import Films from '../Films/Films';

class PersonDetails extends React.Component {
  render() {
    const person = this.state ? this.state.person : null;
    if (!person) {
      return <h2>Loading person info...</h2>;
    } else {
      console.log(person.films);
      return (
        <div>
          <Link to="/">Home</Link>
          <br />
          <Link to={`/people/${person.id}`}>
            <div className="Person">
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
              <div className="Film">
                <div>
                  <span>Films</span>
                </div>
                <br />
                {person.films.map((film, i) => {
                  return <Films film={film} key={i} />
                })}
              </div>					
            </div>
          </Link>
        </div>
      );
    }
  }
  
  componentDidMount() {
    if (this.props.person) {
      let person = this.props.person;
			const promises = person.films.map((url) => {
        return axios.get(url).then(response => response.data);
      });
      Promise.all(promises).then((responses) => person.films = responses).then(() =>{
        this.setState({
          person: person
        });
      }).catch((err) => {
        throw new Error(err);
      });
		} else {
      let person;
      axios.get(`https://swapi.co/api/people/${this.props.match.params.key}`).then(({ data }) => {	 
        this.setState({ person: data });
        person = data;
      }).then(() => {
        const promises = this.state.person.films.map((url) => {
          return axios.get(url).then(response => response.data);
        });
        Promise.all(promises).then((responses) => person.films = responses).then(() =>{
          this.setState({
            person: person
          });
        }).catch((err) => {
          throw new Error(err);
        });
      });
    }
  }
}

export default PersonDetails;

