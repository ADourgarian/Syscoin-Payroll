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
	render () {
    var content;
    console.log("HI",this.props.aliases);
    // if (this.props.aliases.length > 0) {
    //   var aliases = this.props.aliases.map(function(alias,i) {
    //     return <li className="timecardListItem" key={i}>{alias.name} {alias.address}</li>;
    //   });
    //   console.log(aliases);
    //   content = <ul className="timecardList">{aliases}</ul>
    // } else {
    //   content = <p>No items matching this filter</p>;
    // }

    // Table data as a list of array.
    const rows = [
      ['a1', 'b1', 'c1'],
      ['a2', 'b2', 'c2'],
      ['a3', 'b3', 'c3'],
      // .... and more
    ];


    return (
      <div className="payroll">
        <h4>Results</h4>
        <Table
          rowHeight={50}
          rowsCount={rows.length}
          width={600}
          height={300}
          headerHeight={50}>
          <Column
            header={<Cell>Col 3</Cell>}
              cell={({rowIndex, ...props}) => (
                <Cell {...props}>
                  Data for column 3: {rows[rowIndex][2]}
                </Cell>
              )}
            width={200}
          />
        </Table>
      </div>
    );
	}
});

export default Aliases;
