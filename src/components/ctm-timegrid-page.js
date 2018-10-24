import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TimeEntryGrid from './ctm-time-grid'
import RecentTimeEntriesList from './ctm-recent-timeentries-list'

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
                work_date: getTodaysDate(),
                time_entries: [],
                grid_mounted: false,
                show_entry_form: true,
                status_message: "Please add your work hours."

         }
          this.handleDayChange = this.handleDayChange.bind(this);
          this.handleViewChange = this.handleViewChange.bind(this);
          this.getTimeEntriesForWorker = this.getTimeEntriesForWorker.bind(this);
          this.confirmGridHasMountedCB = this.confirmGridHasMountedCB.bind(this);
          this.setNewMessage = this.setNewMessage.bind(this);

     }



async componentDidMount ()  {
        //console.log("URL deets:" + JSON.stringify(this.props.match))
        await this.setState({
          worker_link: this.props.match ? this.props.match.params.link : (this.props.nlink ? this.props.nlink : null),
          work_date: getTodaysDate()
        });

        const fetchURL_worker = apiHost + "/api/getworkerbylink/"+this.state.worker_link;
        this.getTimeEntriesForWorker();

        //see the new-transactions for for async-await version of multi-fetch

          fetch(fetchURL_worker)
           .then(results => results.json())
           .then(data =>  {
                          this.setState({
                                selected_worker: data,
                                status_message: "Hello "+data.first+"! Please enter your hours."
                          })
            })

            console.log('Grid-Page did mount.');

  } //CDM


  getTimeEntriesForWorker() {

            const fetchURL_timeentries = apiHost + "/api/gettimeentriesforworker/"+this.state.selected_worker.id;
            fetch(fetchURL_timeentries)
             .then(results => results.json())
             .then(data =>  {
                            this.setState({ time_entries: data})
              })

  }



  handleDayChange(selectedDay) {
     console.log ("raw date is "+JSON.stringify(selectedDay));
     this.setState({
          work_date : convertSimpleDate(selectedDay),
          //selected_day: selectedDay
     });

   }

   async handleViewChange(selectedDay) {
      console.log ("changing view state to: "+!this.state.show_entry_form) //npt reeliable
      await this.getTimeEntriesForWorker();
      await this.setState({
           show_entry_form : !this.state.show_entry_form,
           status_message: " "
      });
    //console.log ("actual view-form state after change is: "+this.state.show_entry_form)


      //if actually going back to form, clear mounted flag
      if (this.state.show_entry_form === true) {

        await this.setState({
             grid_mounted: false
        });
        //console.log ("Handle View Change, going to TEs, switch mounted flag to FALSE but because its async its still shows: "+!this.state.grid_mounted)

      }


    }


    confirmGridHasMountedCB() {
       this.setState({
            grid_mounted: true
       });

     }


setNewMessage(message) {
        this.setState({
             status_message: message
        });

      }



  render() {

        return (
                          <div className = "outer-div">
                              <div className = "indent-div">
                              <div className = "same-line-div">
                                    <DayPickerInput
                                          onDayChange={this.handleDayChange}
                                          value = {this.state.work_date}
                                          inputProps={{ className: "hidden-date-input" }}
                                          />
                                          <div className = "message-div">
                                          {this.state.status_message}
                                          </div>
                              </div>
                              <p className = "prom-name">
                              {this.state.selected_worker.first+" "+ this.state.selected_worker.last}
                              </p>

                                <div align="right">
                                {(this.state.grid_mounted) ?
                                    <button className="view-button"
                                         onClick={this.handleViewChange}>{this.state.show_entry_form ? "Show My Time Entries": "Back to New Time Form" }
                                   </button>
                                   :  <br/>
                                }
                                </div>
                              {(this.state.selected_worker.id !=0 && this.state.time_entries) &&
                                      (this.state.show_entry_form ?
                                <TimeEntryGrid
                                        work_date={this.state.work_date}
                                        worker={this.state.selected_worker}
                                        confirmGridHasMountedCB={this.confirmGridHasMountedCB}
                                        setNewMessage = {this.setNewMessage}
                                />
                                : <RecentTimeEntriesList recent_time_entries = {this.state.time_entries} />
                                      )
                              }
                              </div>

                          </div>



        ) //return
    } //render
} //class






export default TimeGridPage;

//this.state.time_entries.length >0  &&


// <DealFinancialsComponent
//       entityID = {this.state.target_entity_id}
//       dealFinancials = {this.state.deal_financials}
// />


// {this.state.time_entries.length}
// <br/>
// {"has mounted?"+JSON.stringify(this.state.grid_mounted)}
// <br/>
// {"show form?"+JSON.stringify(this.state.show_entry_form)}
// <br/>
