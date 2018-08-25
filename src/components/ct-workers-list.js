import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
//<li className="list-group-item">
//{<a href = '/dealdetails/'+dealResult.id>{dealResult.name}+</a>}

const WorkerItem = (props) => {
      const {first, last, link} = props.workerObj;
      const timeLink = "/timeentry/"+ link
      return (

                <div>
                      <Link to={timeLink}> {first + " " +last} </Link>
                      <br/>
                </div>

      )

}


//component get props
const WorkersList = (props) => {
  //create list of displayable dealactions
  const displayList= props.listOfWorkers.map(  (worker) => {
        return (
            <WorkerItem
                workerObj = {worker}
                key = {worker.id}
            />
        )
  });



return (
        <div>
          <ul>
              {displayList}
          </ul>
        </div>

      )
}

export default WorkersList;
