import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TimeEntryGrid from './ctm-time-grid'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import {convertSimpleDate, getTodaysDate, formatCurrency, getAPI_endpoint} from './ctm-utils';
const apiHost = getAPI_endpoint()
const lodash = require('lodash');




class TimeGridPage extends Component {

      constructor (props) {
          super(props)
          //let entity = (props.match) ? props.match.params.id : props.id

          this.state = {
                worker_link: null,
                selected_worker: {
                    id: 0,
                    first: "Could not Find",
                    last: "Matching Person"
                },
                all_properties: [],
                work_date: getTodaysDate()

         }
         this.handleDayChange = this.handleDayChange.bind(this);


     }


async componentDidMount ()  {


        //console.log("URL deets:" + JSON.stringify(this.props.match))
        await this.setState({
          worker_link: this.props.match ? this.props.match.params.link : (this.props.nlink ? this.props.nlink : null),
          work_date: getTodaysDate()
        });

        const fetchURL_worker = apiHost + "/api/getworkerbylink/"+this.state.worker_link;


        //see the new-transactions for for async-await version of multi-fetch

          fetch(fetchURL_worker)
           .then(results => results.json())
           .then(data =>  {
                          this.setState({ selected_worker: data})
            })


  } //CDM


  handleDayChange(selectedDay) {
     console.log ("raw date is "+JSON.stringify(selectedDay));
     this.setState({
          work_date : convertSimpleDate(selectedDay),
          //selected_day: selectedDay
     });
   }






  render() {

        return (
                          <div className = "outer-div">
                              <div className = "indent-div">
                              <DayPickerInput
                                      onDayChange={this.handleDayChange}
                                      value = {this.state.work_date}
                                      inputProps={{ className: "hidden-date-input" }}
                                      />
                              <p className = "prom-name">
                              {this.state.selected_worker.first+" "+ this.state.selected_worker.last}
                              </p>
                              {(this.state.selected_worker.id !=0) && <TimeEntryGrid work_date={this.state.work_date} worker={this.state.selected_worker}/>}
                              </div>
                          </div>



        ) //return
    } //render
} //class






export default TimeGridPage;




// <DealFinancialsComponent
//       entityID = {this.state.target_entity_id}
//       dealFinancials = {this.state.deal_financials}
// />