import React, {} from "react";
//import {BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import TimeEntryPage, {} from "../components/ct-timeentry-page"
import renderer from 'react-test-renderer';


// use: npm test -- -u`
it('renders Time EntryPage correctly', () => {
  const tree = renderer
    .create(<TimeEntryPage nlink={'kim99'}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});




const add = (a,b) => a+b;
test("should add two numbers", () => {

          const result = add(3,4);
          expect(result).toBe(7);


});
