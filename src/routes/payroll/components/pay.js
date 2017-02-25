import React from 'react';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
import {sys} from '../../../config.js';


const Pay = React.createClass({
	displayName: 'Review and Pay',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {
		};
	},
	AddAlias (e) {
		e.preventDefault();
    this.props.addAlias(this.state.value);
	},
	getUsers (input) {
		if (!input) {
			return Promise.resolve({ options: [] });
		}

		const x = JSON.stringify({
			from: input,
			stat: '5'
		})
		const t = fetch('http://localhost:8081/rpc/aliasfilter', {
			headers:{'Accept': 'application/json','Content-Type': 'application/json'},
			method: 'POST',
			username: sys.username,
			password: sys.password,
			mode: 'cors',
			body: x
		}).then((response) => response.json())
			.then((json) => {
				return { options: json };
			});
		return t
	},
	render () {

		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<button onClick={this.payAliases}>Pay Aliases</button>
			</div>
		);
	}
});

export default Pay;
