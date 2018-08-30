import React, {} from "react";
//import ReactDOM, {} from "react-dom";
import {BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import Header, {} from "./header"
import HomePage, {} from "./home-page.js"
import WorkersListPage, {} from "./ct-workers-list-page"
import TimeEntryPage, {} from "./ct-timeentry-page"
import TimeGridPage, {} from "./ct-timegrid-page"



const notFoundPage = () => {
      return (
        <div>
                 404 -- Sorry, no such page!
                 <br />
        </div>

      );
}


const AppRouter = () => (
  <BrowserRouter>
    <div>
          <Header />
          <div className="center_container">
          <br/>
          <Switch>
              <Route path = "/" component = {HomePage} exact={true}/>
              <Route path = "/workers" component = {WorkersListPage} />
              <Route path = "/timeentry/:link" component = {TimeEntryPage} />
              <Route path = "/timegrid/:link" component = {TimeGridPage} />
              <Route component = {notFoundPage} />
          </Switch>
          </div>
    </div>
  </BrowserRouter>
);

export default AppRouter;


    //              <Route path = "/dealdetails/:id" component = {DealDetailsPage} />
