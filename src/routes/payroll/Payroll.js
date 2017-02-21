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
    this.state = { aliases: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const self = this;
    self.setState({ aliases: event.target.value });
    setTimeout(function(){
      if (self.state.aliases.length >= 3) {
        const x = JSON.stringify({
          from: self.state.aliases,
          stat: '5'
        })
        fetch('http://localhost:8081/rpc/aliasfilter', {
          headers:{'Accept': 'application/json','Content-Type': 'application/json'},
          method: 'POST',
          username: 'rpcuser',
          pass: 'askh3hjfhchasefhk3f8',
          mode: 'cors',
          body: x
        }).then((response, err) => {
          response.json().then((x) => {
            console.log(x);
          });
        });
      }; // end if
    }, 1);
  } // end handleChange

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.aliases);
    var self = this;
    const x = JSON.stringify({
      aliasInfo: self.state.aliases
    })
    fetch('http://localhost:8081/rpc/aliasinfo', {
      headers:{'Accept': 'application/json','Content-Type': 'application/json'},
      method: 'POST',
      username: 'rpcuser',
      pass: 'askh3hjfhchasefhk3f8',
      mode: 'cors',
      body: JSON.stringify({
        aliasInfo: self.state.aliases
      })
    }).then((response, err) => {
      response.json().then((x) => {
        console.log(x);
      });
    });

    // fetch('http://localhost:8081/api/hello').then(function(response) {
    //   response.json().then(function(x){
    //     console.log(x.message);
    //   })
    // });

    // fetch('http://localhost:8081/rpc/getinfo', {
    //   method: 'POST',
    //   username: 'rpcuser',
    //   pass: 'askh3hjfhchasefhk3f8',
    // }).then((response, err) => {
    //   response.json().then((x) => {
    //     console.log(x);
    //   });
    // });
  }

  render() {
    return (
      //<button onclick(this.handl)>
      <form onSubmit={this.handleSubmit}>
        <label>
          Search Aliases:
          <input type="text" value={this.state.aliases} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default withStyles(s)(Payroll);
