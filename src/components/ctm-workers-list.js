import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
//<li className="list-group-item">
//{<a href = '/dealdetails/'+dealResult.id>{dealResult.name}+</a>}

const WorkerItem = (props) => {
      const {first, last, link} = props.workerObj;
      const timeLink = "/timeentry/"+ link
      return (

               <tr>
                    <td  width="30%">  {first + " " +last} </td>
                    <td  width="10%"> &nbsp; </td>
                    <td width="20%"> <Link to={"/timegrid/"+ link}>  Time Entry Grid </Link> </td>
                </tr>

      )

}


//component get props
const WorkersList = (props) => {
  //create list of displayable dealactions
  const displayList= props.listOfWorkers.map(  (worker) => {
        return (
          <table id="simple_table" border = "0" width = "80%" key = {worker.id}>
              <tbody>

                      <WorkerItem
                          workerObj = {worker}
                          key = {worker.id}
                      />

            </tbody>
           </table>

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



// <colgroup>
// <col width="30%"/>
// <col width="10%"/>
// <col width="30%"/>
// <col width="10%"/>
// <col width="30%"/>
// </colgroup>
