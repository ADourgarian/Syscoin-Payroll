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
import tableStyles from 'fixed-data-table/dist/fixed-data-table.css';
import api from './api.js'

//componenets
import Aliases from './components/search-aliases';
import Timecards from './components/timecards';
import Pay from './components/pay';

const cx = classNames.bind(selectStyles).bind(tableStyles);

class Payroll extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      searchAlias: '',
      selectedAliases: [],
      nextAliasId: 1,
    };

    this.handleAddAlias = this.handleAddAlias.bind(this);
    this.handleSavePayAmounts = this.handleSavePayAmounts.bind(this);
  }

  handleAddAlias (nextAlias) {
    const aliases = this.state.selectedAliases;
    const nextAliasId = this.state.nextAliasId;
    nextAlias.id = nextAliasId;
    nextAlias.payAmount = 0;
    nextAlias.readOnly = false;
    aliases.push(nextAlias);
    this.setState({
      selectedAliases: aliases,
      nextAliasId: nextAliasId + 1,
    });
    console.log("XXX",this.state.selectedAliases);
  }
  handleSavePayAmounts (aliases){
    this.setState ( {
        selectedAliases: aliases,
      }
    )
  }

  render() {

    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className="section">
            <Aliases addAlias={this.handleAddAlias} label="Fetch Aliases" />
          </div>
          <div className="section">
            <Timecards aliases={this.state.selectedAliases} savePayAmounts={this.handleSavePayAmounts} label="Chosse Alias Pay Amounts" />
          </div>
          <div className="section">
            <Pay aliases={this.state.selectedAliases} label="Pay Employees" />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(tableStyles)(withStyles(selectStyles)(withStyles(s)(Payroll)));
