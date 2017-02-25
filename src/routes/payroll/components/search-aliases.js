import React from 'react';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
import {sys} from '../../../config.js';


const Aliases = React.createClass({
	displayName: 'Aliases',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {
			backspaceRemoves: true,
			multi: true
		};
	},
	onChange (value) {
		this.setState({
			value: value,
		});
	},
	AddAlias (e) {
		e.preventDefault();
    this.props.addAlias(JSON.parse(JSON.stringify(this.state.value)));
	},
	getAliases (input) {
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
				<Select.Async value={this.state.value} onChange={this.onChange} onValueClick={this.gotoUser} valueKey="address" labelKey="name" loadOptions={this.getAliases} backspaceRemoves={this.state.backspaceRemoves} />
				<div className="hint">This example uses fetch.js for showing Async options with Promises</div>
				<button onClick={this.AddAlias}>Add Alias</button>
			</div>
		);
	}
});

export default Aliases;
