import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TimeEntryForm from './ct-time-form'


import {formatCurrency, getAPI_endpoint} from './ct-utils';
const apiHost = getAPI_endpoint()
const lodash = require('lodash');

function getTodaysDate() {

          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth()+1; //January is 0!
          var yyyy = today.getFullYear();
          if (dd<10){  dd='0'+dd }
          if(mm<10){   mm='0'+mm }
          today = yyyy+'-'+mm+'-'+dd;
          return today
}



class TimeEntryPage extends Component {

      constructor (props) {
          super(props)
          //let entity = (props.match) ? props.match.params.id : props.id

          this.state = {
                worker_link: null,
                selected_worker: {},
                all_properties: [],
                work_date: null

         }
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



  render() {
        return (
                          <div className = "outer-div">
                              <div className = "indent-div">
                              {this.state.work_date}
                              <p className = "prom-name">
                              {this.state.selected_worker.first+" "+ this.state.selected_worker.last}
                              </p>
                              <TimeEntryForm work_date={this.state.work_date} worker={this.state.selected_worker}/>
                              </div>
                          </div>



        ) //return
    } //render
} //class









export default TimeEntryPage;




// <DealFinancialsComponent
//       entityID = {this.state.target_entity_id}
//       dealFinancials = {this.state.deal_financials}
// />
