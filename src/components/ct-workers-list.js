import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
//<li className="list-group-item">
//{<a href = '/dealdetails/'+dealResult.id>{dealResult.name}+</a>}

const WorkerItem = (props) => {
      const {first, last, link} = props.workerObj;
      const timeLink = "/timeentry/"+ link
      return (

                <div>
                    <td  width="40%">  {first + " " +last} </td>
                    <td  width="10%"> &nbsp; </td>
                    <td width="20%"> <Link to={"/timeentry/"+ link}> {"Single Form"} </Link> </td>
                    <td  width="10%"> &nbsp; </td>
                    <td width="20%"> <Link to={"/timegrid/"+ link}> {"Grid"} </Link> </td>
                </div>

      )

}


//component get props
const WorkersList = (props) => {
  //create list of displayable dealactions
  const displayList= props.listOfWorkers.map(  (worker) => {
        return (
          <table id="simple_table" border = "0" width = "80%">
              <tbody>
               <tr>
                      <WorkerItem
                          workerObj = {worker}
                          key = {worker.id}
                      />
                </tr>
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
