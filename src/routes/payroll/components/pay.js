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
  errors(){
    var aliases = this.props.aliases;
    var hasErrors = false;
    var errors = {
      payAmount: '',
      address: ''
    };
    if(aliases.length<1){
      hasErrors = true;
      alert("Please choose aliases to pay.");
    }
    for (var i in aliases){
      if(aliases[i].payAmount<=0){
        hasErrors = true;
        errors.payAmount += aliases[i].name + ', '
      }
      if(!aliases[i].address){
        hasErrors = true;
        errors.address += aliases[i].name + ', '
      }
    }
    if (errors.payAmount){
      alert("You cannot pay an Alias 0 or less SYS. Please Review: "+ errors.payAmount);
    }
    if (errors.payAmount){
      alert("You cannot pay an Alias 0 or less SYS. Please Review: "+ errors.payAmount);
    }
    return hasErrors;
  },
	payAliases () {
		if (this.errors())return; // if there's something wrong, don't attempt to pay

		// const x = JSON.stringify({
		// 	from: input,
		// 	stat: '5'
		// })
		// const t = fetch('http://localhost:8081/rpc/aliasfilter', {
		// 	headers:{'Accept': 'application/json','Content-Type': 'application/json'},
		// 	method: 'POST',
		// 	username: sys.username,
		// 	password: sys.password,
		// 	mode: 'cors',
		// 	body: x
		// }).then((response) => response.json())
		// 	.then((json) => {
		// 		return { options: json };
		// 	});
		// return t
	},
	render () {
    var content;
    var aliases = this.props.aliases
    var totals = {
      txnCount:0,
      totalPayAmount:0
    }
    if (aliases.length > 0) {
      for (var i in aliases){
        totals.totalPayAmount += aliases[i].payAmount;
        totals.txnCount += 1;
      }
    }
    return (
      <div className="results">
        <h3 className="section-heading">{this.props.label}</h3>
        <ul>
          <li>Number of Transactions: {totals.txnCount}</li>
          <li>Total Pay Amount: {totals.totalPayAmount}</li>
        </ul>
        <button onClick={this.payAliases}>Pay Aliases</button>
      </div>
    );
	}
});

export default Pay;
