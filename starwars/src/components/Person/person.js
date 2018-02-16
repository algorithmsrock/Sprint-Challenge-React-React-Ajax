import React, { Component } from 'react';
import "./people.css";
import Homeworld from "../Homeworld/Homeworld";
import Species from "../Species/Species";
import { Link } from 'react-router-dom';

class Person extends Component {
  constructor() {
    super();
    this.state = {
      person: []
    };
  }

  componentDidMount() {
    let person;
		if (!this.props.person) {
       person = this.props.person;
		} else {
      fetch('https://swapi.co/api/people')
        .then(res => {
          return res.json();
       })
        .then(data => {
        person = data.results[this.props.match.params.key];
				}) 
				.catch(err => {
          throw new Error(err);
        });
    }

		if (person) {
		this.setState({
      person: person,
      homeworld: person.homeworld,
      species: person.species[0]
    });
  }
}  
	render() {
//    if {this.state.person} {
		return (
      <div className="Person">
        <div>
          <strong>{this.state.person.name}</strong>
        </div>
        <div className="Features">
          <div>Birth Of Year: {this.state.person.birth_year}</div>
          <div>Eye Color: {this.state.person.eye_color}</div>
          <div>Gender: {this.state.person.gender}</div>
          <div>Hair Color: {this.state.person.hair_color}</div>
          <div>Height: {this.state.person.height}</div>
          <div>Mass: {this.state.person.mass}</div>
          <div>Skin Color: {this.state.person.skin_color}</div>
        </div>
        <Homeworld home={this.state.person.homeworld} />
        <Species race={this.state.person.species} />
				<br />
				<Link to="/">Home</Link>
      </div>
    );
  }
//		return ("");
}


export default Person;

