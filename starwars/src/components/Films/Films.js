import React, { Component } from "react";
import "./Films.css";

class Films extends Component {	
  render() {
		return (
		
					<div className="Film__features">
					  <div>Name: {this.props.film.title}</div>
						</div>
			);
	}
}

export default Films;
