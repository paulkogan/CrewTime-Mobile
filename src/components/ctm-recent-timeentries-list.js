import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";




const TimeRow = (props) => {
      const {work_date, property_name, unit_name, work_hours} = props.timeEntry;
      return (

               <tr>
                      <td className="col-2"> {work_date.toString().slice(0,7)} </td>
                      <td className="col-4"> {property_name} </td>
                      <td className="col-3"> {unit_name} </td>
                      <td className="col-2"> {work_hours} hrs </td>
                </tr>



      )

}

//component get props
const RecentTimeEntriesList = (props) => {

  const displayList= props.recent_time_entries.map(  (timeEntry,index) => {


        return (

           <table className="g-table" key={index} width = "100%">
           <colgroup>
               <col width="20%" />
               <col width="25%" />
               <col width="25%" />
               <col width="20%" />
               <col width="1%" />
           </colgroup>

              <tbody>

                      <TimeRow
                          timeEntry = {timeEntry}
                          key = {index*parseInt((Math.random()*100000))}
                          index = {index}
                      />


                  </tbody>
            </table>



        )
  });



return (
  <div className = "grid-border">



              <table className="g-table"  width = "100%">
                 <tbody>
                 <tr className = "head-tr">
                        <td className="col-1"> </td>
                        <td className="col-4" colSpan="4"> Your Time Entries</td>
                        <td className="col-1"> </td>
                  </tr>
                 </tbody>
               </table>

              {displayList}


        </div>

      )
}

export default RecentTimeEntriesList;
