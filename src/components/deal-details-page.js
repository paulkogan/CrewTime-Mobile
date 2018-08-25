import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DealFinancialsComponent from './d-financials-component'
import OwnershipComponent from './d-ownership-component'
import CapCallsComponent from './d-capcalls-component'

import {formatCurrency, getAPI_endpoint} from './ira-utils';
const apiHost = getAPI_endpoint()


class DealDetailsPage extends Component {

      constructor (props) {
          super(props)
          //let entity = (props.match) ? props.match.params.id : props.id

          this.state = {
                target_entity_id: null,
                deal_financials: {id:1001},
                deal_ownership: [],
                deal_own_totals: {},
                deal_cap_calls:[]
         }
     }


async componentDidMount ()  {

        //get entity id from route props (nid) if TESTING or from URL param if user
        await this.setState({
          target_entity_id: this.props.match ? this.props.match.params.id : (this.props.nid ? this.props.nid : null)
        });

        const fetchURL_deal = apiHost + "/api/getdealfinancials/"+this.state.target_entity_id;
        const fetchURL_ownership = apiHost + "/api/getownership/"+this.state.target_entity_id;
        const fetchURL_capcalls = apiHost + "/api/getcapcallswithdetails/"+this.state.target_entity_id;
        //console.log("Fetch Deal URL is " + fetchURL_deal);


        //see the new-transactions for for async-await version of multi-fetch

          fetch(fetchURL_deal)
           .then(results => results.json())
           .then(data =>  {
                  this.setState({ deal_financials: data})
            })
           .then( () => fetch(fetchURL_ownership))
           .then(results => results.json())
           .then(data => this.setState({
                  deal_ownership: data[0],
                  deal_own_totals: data[1]
           }))
           .then( () => fetch(fetchURL_capcalls)  )
           .then(results => results.json())
           .then(data => this.setState({deal_cap_calls: data}))


  } //CDM



  render() {
        return (
                          <div>
                                <DealFinancialsComponent
                                      entityID = {this.state.target_entity_id}
                                      dealFinancials = {this.state.deal_financials}
                                />
                                <br />

                                {(this.state.deal_ownership.length >0) && <OwnershipComponent
                                        entityID = {this.state.target_entity_id}
                                        ownRows = {this.state.deal_ownership}
                                        ownTotals = {this.state.deal_own_totals}

                                />}
                                  <br />

                                {(this.state.deal_cap_calls.length >0) && <CapCallsComponent
                                        dealCapCalls = {this.state.deal_cap_calls}

                                />}
                                <br />



                          </div>



        ) //return
    } //render
} //class


export default DealDetailsPage;
