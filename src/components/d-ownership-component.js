import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import {formatCurrency} from './ira-utils'



const OwnershipRow  = (props) => {

            const ownRow = props.ownRow;
            return (

                      <div>
                      <li>
                             {"  "+ownRow.id}
                             {"  "+ownRow.investor_name}
                             {"  "+ownRow.investment_name}
                             {"  "+ownRow.passthru_name? ownRow.passthru_name : "No Passthru"}
                             {"  "+ownRow.wired_date}
                             {"  "+formatCurrency(ownRow.amount)}
                             {"  "+ownRow.capital_pct+"%"}
                      </li>
                      </div>

            )

  }

const OwnershipComponent = (props) => {
    const ownRowsList = props.ownRows.map((ownRow) => {
           return (
              <OwnershipRow
                  ownRow = {ownRow}
                  key = {ownRow.id}
              />
          )
     });




  return (
            <div className = "items-list">
                    <u> Ownership Information </u><br />
                        {ownRowsList}
                    <br />
                    Total Capital: {formatCurrency(props.ownTotals.totalCapital)}<br/>
                    Total Capital Pct: {props.ownTotals.totalCapitalPct} %<br/>
            </div>

     )



}
export default OwnershipComponent;


                //    {(ownRowsList.length >1) && {ownRowsList} }
