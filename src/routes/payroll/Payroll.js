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
import Timecards from './components/timecards';

const cx = classNames.bind(selectStyles);


class Payroll extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      searchAlias: '',
      selectedAliases: []
    };

    this.handleAddAlias = this.handleAddAlias.bind(this);
  }

  handleAddAlias (alias) {
    this.setState({
      selectedAliases: this.state.selectedAliases.push(alias),
    });
    console.log(this.state.selectedAliases);
  }
  render() {

    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className="section">
            <Aliases addAlias={this.handleAddAlias} label="Aliases (Async with fetch.js)" />
          </div>
          <div className="section">
            <Timecards aliases={this.state.selectedAliases} label="Aliases (Async with fetch.js)" />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(selectStyles)(withStyles(s)(Payroll));
