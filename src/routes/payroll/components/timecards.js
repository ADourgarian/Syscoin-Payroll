import React from 'react';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
import {sys} from '../../../config.js';
import {Table, Column, Cell} from 'fixed-data-table';

const PaymentLine = (name, address, payAmount, readOnly) => {
  if(!name) name = '';
  if(!address) address = '';
  if(!payAmount) payAmount = 0;
  if(!readOnly) readOnly = false;
  return obj = {
    name:name,
    address:address,
    payAmount:payAmount,
    readOnly: readOnly
  }
}

const Aliases = React.createClass({
	displayName: 'Timecards',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {
		};
	},
  // savePayAmount (event){
  //   console.log(event.target.value);
  //   console.log(event.target.index);
  // },
	render () {
    var content = [];
    var totalPayAmount = 0;
    console.log("HI",this.props.aliases);

    if (this.props.aliases.length<0){
      content = [{name:'', address:'', payAmount: 0, readOnly: true}];
    } else {
      content = this.props.aliases.slice(0);

      content.forEach(function(e,i){
        if (!e.payAmount){
          e.PayAmount = 0;
        }
        if (!e.readOnly){
          e.readOnly = false;
        }
        totalPayAmount += e.payAmount;
      })
    }

    content.push({name:"Payment Totals:", address: '', payAmount:totalPayAmount, readOnly: true})

    return (
      <div className="payroll">
        <h4>Results</h4>
        <Table
          rowHeight={50}
          rowsCount={content.length}
          width={1000}
          height={300}
          headerHeight={50}>
          <Column
            header={<Cell>Col 3</Cell>}
              cell={({rowIndex, ...props}) => (
                <Cell {...props}>
                  {content[rowIndex].name}
                </Cell>
              )}
            width={200}
          />
          <Column
            header={<Cell>Address</Cell>}
              cell={({rowIndex, ...props}) => (
                <Cell {...props}>
                  {content[rowIndex].address}
                </Cell>
              )}
            width={500}
          />
          <Column
            header={<Cell>Pay Amount</Cell>}
              cell={({rowIndex, ...props}) => (
                <Cell {...props}>
                  <input
                   //index={rowIndex}
                    type="number"
                    min="0"
                    readOnly={content[rowIndex].readOnly}
                    className="payAmount"
                    value={content[rowIndex].payAmount}
                    onChange={this.savePayAmount}
                    placeholder="Enter Pay Amount in SYS"/>
                </Cell>
              )}
            width={300}
          />
        </Table>
      </div>
    );
	}
});

export default Aliases;
