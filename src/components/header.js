import React, {} from "react";
import {BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import {getVersion} from './ctm-utils';


const Header = () => (
  <header className="header">
        <div className="center_container">
        <img width="75" src={"../../static/GP_Prop_logo_1.png"}/> &nbsp;Crew Time Mobile {getVersion()}
        </div>
  </header>

)

export default Header;
