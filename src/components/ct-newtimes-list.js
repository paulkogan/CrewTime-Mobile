import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";

// property_id : 1,
// unit_id : 1,
// work_hours : 0,
// property_name: "hello",
// unit_name: "5555"



const TimeRow = (props) => {
      const {property_name, unit_name, work_hours} = props.timeEntry;
      return (

               <tr>
                      <td className="col-4"> {property_name} </td>
                      <td className="col-3"> {unit_name} </td>
                      <td className="col-3"> {work_hours} hrs </td>
                      <td className="col-2">
                      <button
                              className = "small-button-remove"
                              onClick={() => props.deleteTE(props.index)}
                       > X </button>

                      </td>
                </tr>



      )

}


//component get props
const NewTimesList = (props) => {
  //create list of displayable dealactions
  //let totalHours = 0
  const displayList= props.time_entries.map(  (timeEntry,index) => {
        //totalHours += parseFloat(timeEntry.work_hours)
        //console.log("sending "+timeEntry+" for a total of"+totalHours)


        return (

           <table className="g-table" key={index} width = "100%">
              <tbody>

                      <TimeRow
                          timeEntry = {timeEntry}
                          key = {index*parseInt((Math.random()*100000))}
                          index = {index}
                          deleteTE = {props.deleteTE}
                      />


                  </tbody>
            </table>



        )
  });



return (
        <div>

              {displayList}


        </div>

      )
}

export default NewTimesList ;
