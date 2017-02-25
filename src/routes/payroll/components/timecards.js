import React from 'react';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
import {sys} from '../../../config.js';


const Aliases = React.createClass({
	displayName: 'Timecards',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {
		};
	},
	render () {
    var content;
    console.log("HI",this.props.aliases);
    if (this.props.aliases.length > 0) {
      var aliases = this.props.aliases.map(function(alias) {
        return <li className="timecardListItem">{alias.name}: {alias.address}</li>;
      });
      content = <ul className="timecardList">{items}</ul>
    } else {
      content = <p>No items matching this filter</p>;
    }
    return (
      <div className="payroll">
        <h4>Results</h4>
        {content}
      </div>
    );
	}
});

export default Aliases;
