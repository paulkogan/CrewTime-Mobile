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

                <div>
                      {property_name} {unit_name} {"  . . .  "}{work_hours} hours
                </div>

      )

}


//component get props
const NewTimesList = (props) => {
  //create list of displayable dealactions
  let totalHours = 0
  const displayList= props.time_entries.map(  (timeEntry) => {
        totalHours += parseFloat(timeEntry.work_hours)
        console.log("Adding "+timeEntry.work_hours+" for a total of"+totalHours)
        return (
            <TimeRow
                timeEntry = {timeEntry}
                key = {timeEntry.unit_id+parseInt((Math.random()*100000))}
            />
        )
  });



return (
        <div>
          <b>Added Work Times</b>............ Total Hrs: {totalHours}
          <ul>
              {displayList}
          </ul>
        </div>

      )
}

export default NewTimesList ;
