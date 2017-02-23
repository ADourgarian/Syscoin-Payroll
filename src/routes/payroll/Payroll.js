/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import {sys} from '../../config.js';
import classNames from 'classnames/bind';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payroll.css';
import Select from 'react-select';
import selectStyles from 'react-select/dist/react-select.css';
import api from './api.js'

//componenets
import Aliases from './components/search-aliases';

const cx = classNames.bind(selectStyles);


class Payroll extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      searchAlias: '',
      returnedAliases: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const self = this;
    self.setState({ searchAlias: event.target.value });
    console.log(api);

    setTimeout(function(){
      if (self.state.searchAlias.length >= 3) {
        api.getAliasList(self.state.searchAlias).then((x) => {
          self.state.returnedAliases = [];
          x.forEach((e,i,a) => {
            self.state.returnedAliases.push({
              name: e.name,
              address: e.address
            });
          });
        });
      }
    });
  } // end handleChange

  handleSubmit(event) {
    event.preventDefault();
    var self = this;
    const x = JSON.stringify({
      aliasInfo: self.state.searchAlias
    })
    console.log(self.state.returnedAliases)

    // fetch('http://localhost:8081/rpc/aliasinfo', {
    //   headers:{'Accept': 'application/json','Content-Type': 'application/json'},
    //   method: 'POST',
    // username: sys.username,
    // password: sys.password,
    //   mode: 'cors',
    //   body: JSON.stringify({
    //     aliasInfo: self.state.aliases
    //   })
    // }).then((response, err) => {
    //   response.json().then((x) => {
    //   });
    // });

    // fetch('http://localhost:8081/api/hello').then(function(response) {
    //   response.json().then(function(x){
    //   })
    // });

    // fetch('http://localhost:8081/rpc/getinfo', {
    //   method: 'POST',
      // username: sys.username,
      // password: sys.password,
    // }).then((response, err) => {
    //   response.json().then((x) => {
    //   });
    // });
  }

  render() {
    // const getOptions = (input) => {
    //   // in order to keep load times down for needlessly short inputs
    //   if (input.length <= 2){
    //       return new Promise((resolve) => { resolve(val); });
    //   } else {
    //     return api.getAliasList(input);
    //   }
    // }
    return (
      <div className={s.root}>
        <div className={s.container}>
          <form onSubmit={this.handleSubmit}>
            <div className="section">
              <Aliases label="Aliases (Async with fetch.js)" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(selectStyles)(withStyles(s)(Payroll));
