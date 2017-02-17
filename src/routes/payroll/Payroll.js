/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import syscoin from 'syscoin';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payroll.css';

class Payroll extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    // fetch('http://localhost:8081/api/hello').then(function(response) {
    //   response.json().then(function(x){
    //     console.log(x.message);
    //   })
    // });

    fetch('http://localhost:8081/rpc/getinfo',{
      method: 'POST',
      username: 'supersecret',
      pass: 'supersecret'
    }).then(function(response,err) {
      response.json().then(function(x){
        console.log(x);
      })
    });

  }

  render() {


    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default withStyles(s)(Payroll);
