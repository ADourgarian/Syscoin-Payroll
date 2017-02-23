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
	switchToMulti () {
		this.setState({
			multi: true,
			value: [this.state.value],
		});
	},
	switchToSingle () {
		this.setState({
			multi: false,
			value: this.state.value ? this.state.value[0] : null
		});
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
		console.log('aliases',t);
		return t
	},
	gotoUser (value, event) {
		window.open(value.html_url);
	},
	toggleBackspaceRemoves () {
		this.setState({
			backspaceRemoves: !this.state.backspaceRemoves
		});
	},
	toggleCreatable () {
		this.setState({
			creatable: !this.state.creatable
		});
	},
	render () {
		const AsyncComponent = this.state.creatable
			? Select.AsyncCreatable
			: Select.Async;

		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<AsyncComponent multi={this.state.multi} value={this.state.value} onChange={this.onChange} onValueClick={this.gotoUser} valueKey="address" labelKey="name" loadOptions={this.getUsers} backspaceRemoves={this.state.backspaceRemoves} />
				<div className="checkbox-list">
					<label className="checkbox">
						<input type="radio" className="checkbox-control" checked={this.state.multi} onChange={this.switchToMulti}/>
						<span className="checkbox-label">Multiselect</span>
					</label>
					<label className="checkbox">
						<input type="radio" className="checkbox-control" checked={!this.state.multi} onChange={this.switchToSingle}/>
						<span className="checkbox-label">Single Value</span>
					</label>
				</div>
				<div className="checkbox-list">
					<label className="checkbox">
					   <input type="checkbox" className="checkbox-control" checked={this.state.creatable} onChange={this.toggleCreatable} />
					   <span className="checkbox-label">Creatable?</span>
					</label>
					<label className="checkbox">
					   <input type="checkbox" className="checkbox-control" checked={this.state.backspaceRemoves} onChange={this.toggleBackspaceRemoves} />
					   <span className="checkbox-label">Backspace Removes?</span>
					</label>
				</div>
				<div className="hint">This example uses fetch.js for showing Async options with Promises</div>
			</div>
		);
	}
});

export default Aliases;
