import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Person from './components/Person/person';

class App extends Component {
  state = {
    starwarsChars: [],
  };

  componentDidMount() {
    axios
      .get('https://swapi.co/api/people')
      .then(response => {
        const chars = response.data.results.map(char => {
          const pattern = /https:\/\/swapi.co\/api\/people\/(.*?)\//;
          const id = char.url.match(pattern)[1];
          return {
            id: id,
            ...char,
          };
        });
        this.setState({ starwarsChars: chars });
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  render() {
    return (
      <div className="App">
        <h1 className="Header">React Wars</h1>
        <div className="People__container">
          {this.state.starwarsChars.map(person => {
            return <Person person={person} key={person.id} />;
          })}
        </div>
      </div>
    );
  }
}

export default App;
