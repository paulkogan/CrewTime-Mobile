import React, {Component} from 'react';
import {formatCurrency} from './ctm-utils';



//component get props
const EntitiesPulldown = (props) => {

      const pullDownList = props.itemList.map(  (item) => {
                  return (
                      <option key={item.id*7} value={item.id}>{item.name}</option>

                  )
            });


return (
        <div >
          <select name = {props.target} value={props.selectedItem} onChange={props.handleChangeCB}>
              {pullDownList}
          </select>
        </div>

      )
}

export default EntitiesPulldown;
