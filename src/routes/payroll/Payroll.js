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

    const client = new syscoin.Client({
      host: 'localhost',
      port: 8332,
      user: this.state.value,
      pass: '',
      timeout: 30000,
    });

    client.cmd('getbalance', '*', 6, (err, balance, resHeaders) => {
      if (err) return console.log('err: ', err);
      console.log('Balance:', balance);
    });
  }

  render() {
    // all config options are optional
    // const client = new syscoin.Client({
    //   host: 'localhost',
    //   port: 8332,
    //   user: 'username',
    //   pass: 'password',
    //   timeout: 30000,
    // });

    // console.log(client);

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
