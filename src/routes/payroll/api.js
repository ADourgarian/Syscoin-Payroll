import React, { PropTypes } from 'react';
import {sys} from '../../config.js';

const api = {
  getAliasList: function(searchAlias) {
    const x = JSON.stringify({
      from: searchAlias,
      stat: '5'
    })
    return fetch('http://localhost:8081/rpc/aliasfilter', {
      headers:{'Accept': 'application/json','Content-Type': 'application/json'},
      method: 'POST',
      username: sys.username,
      password: sys.password,
      mode: 'cors',
      body: x
    }).then((response, err) => {
      return response.json().then((x) => {
        console.log('xxxx',x);
        const final = [];
        x.forEach((e,i,a) => {
          final.push({value:{address:e.address, name: e.name},label:e.name, selected:true})
        });
        return {options:final}
      });
    })
  }
}
export default api
