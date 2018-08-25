import React, {Component} from 'react';
import ReactDOM from 'react-dom';



import {formatCurrency, getAPI_endpoint} from './ct-utils';
const apiHost = getAPI_endpoint()


class TimeEntryPage extends Component {

      constructor (props) {
          super(props)
          //let entity = (props.match) ? props.match.params.id : props.id

          this.state = {
                worker_link: null,
                selected_worker: {},
                all_properties: []

         }
     }


async componentDidMount ()  {


        console.log("URL deets:" + JSON.stringify(this.props.match))
        //get entity id from route props (nid) if TESTING or from URL param if user
        await this.setState({
          worker_link: this.props.match ? this.props.match.params.link : (this.props.nlink ? this.props.nlink : null)
        });

        const fetchURL_allprops = apiHost + "/api/getallproperties"
        const fetchURL_worker = apiHost + "/api/getworkerbylink/"+this.state.worker_link;


        //see the new-transactions for for async-await version of multi-fetch

          fetch(fetchURL_worker)
           .then(results => results.json())
           .then(data =>  {
                  this.setState({ selected_worker: data})
            })
           .then( () => fetch(fetchURL_allprops))
           .then(results => results.json())
           .then(data => this.setState({
                  all_properties: data
           }))

  } //CDM



  render() {
        return (
                          <div>
                              {JSON.stringify(this.state.worker_link)}
                                <br />
                              {JSON.stringify(this.state.selected_worker)}
                              <br />
                              {JSON.stringify(this.state.all_properties)}


                          </div>



        ) //return
    } //render
} //class


                                //
                                // {(this.state.deal_ownership.length >0) && <OwnershipComponent
                                //         entityID = {this.state.target_entity_id}
                                //         ownRows = {this.state.deal_ownership}
                                //         ownTotals = {this.state.deal_own_totals}
                                //
                                // />}
                                //   <br />
                                //
                                // {(this.state.deal_cap_calls.length >0) && <CapCallsComponent
                                //         dealCapCalls = {this.state.deal_cap_calls}
                                //
                                // />}
                                // <br />



export default TimeEntryPage;

//import DealFinancialsComponent from './d-financials-component'


// <DealFinancialsComponent
//       entityID = {this.state.target_entity_id}
//       dealFinancials = {this.state.deal_financials}
// />
