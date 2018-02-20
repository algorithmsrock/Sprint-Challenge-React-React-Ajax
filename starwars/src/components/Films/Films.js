import React, { Component } from "react";
import "./Films.css";

class Films extends Component {
	constructor() {
		super(); 
		this.state = {
     film: {}
	};
}

/* componentDidMount() { 
  fetch(this.props.film)
	 .then(res => {
			 return res.json();
	 })
   .then(data => {
			 this.setState({ film: data });
		})
   .catch(err => {
			 throw new Error(err);
		});
 }*/
 
  render() {
		return (
				<div className="Film">
				  <div>
					   <span>Films</span>
					</div>
					<hr />
					<div className="Film__features">
					  <div>Name: {this.props.film.name}</div>
						</div>
					</div>
			);
	}
}

export default Films;
