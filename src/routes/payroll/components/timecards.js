import React from 'react';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
import {sys} from '../../../config.js';
import {Table, Column, Cell} from 'fixed-data-table';


const Aliases = React.createClass({
	displayName: 'Timecards',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		return {
		};
	},
  savePayAmount (event){
    var targetID = parseInt(event.target.id);
    var targetValue = parseFloat(event.target.value);
    console.log('FIRST', targetID, targetValue);
    var aliases = this.props.aliases.slice(0);
    for (var i in aliases){
      console.log("alias", aliases[i].id)

      if (aliases[i].id == targetID){
        aliases[i].payAmount = targetValue;
        console.log(targetID, targetValue);
      }
    }
    console.log(aliases);
    this.props.savePayAmounts(aliases);

  },
	render () {
    var content = [];
    var totalPayAmount = 0;
    console.log("HI",this.props.aliases);

    if (this.props.aliases.length>0){
      content = this.props.aliases.slice(0);
      content.forEach(function(e,i){
        console.log(e.payAmount);
        if (!e.payAmount){
          e.payAmount = 0;
        }
        if (!e.readOnly){
          e.readOnly = false;
        }
        console.log("item",i,'   ',e.id);
        totalPayAmount += e.payAmount;
      })
    }

    return (
      <div className="payroll">
        <h3 className="section-heading">{this.props.label}</h3>
        <Table
          rowHeight={50}
          rowsCount={content.length}
          width={1000}
          height={300}
          headerHeight={50}>
          <Column
            header={<Cell>Alias</Cell>}
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
                    type="number"
                    id={content[rowIndex].id}
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
