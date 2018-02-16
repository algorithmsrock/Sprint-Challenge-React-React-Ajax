import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Person from './components/Person/person';

  const Routes = () => {
     return (
      <Router>
        <div>
          <Route path="/" component={App} exact />
          <Route path="/people/:key" component={Person} />
        </div>
      </Router>
    );
  };


ReactDOM.render(<Routes />, document.getElementById('root'));
