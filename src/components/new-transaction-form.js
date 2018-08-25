import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import EntitiesPulldown from './entities-pulldown'
import {formatCurrency, getAPI_endpoint} from './ira-utils';
const apiHost = getAPI_endpoint()


const sampleNewTrans = {
"trans_type":1,
"investment_entity_id":72,
"investor_entity_id":"6",
"passthru_entity_id":"",
"amount":"36.00",
"own_adj":0,
"wired_date":"2018-08-23",
"notes":""
}


class NewTransactionForm extends Component  {


constructor(props) {
    super(props);

    this.state = {
        amount: 0,
        notes: "",
        ttypes_4_picklist: [],
        selectedTType:1,
        deals_4_picklist: [],
        selectedDeal: 1,
        investors_4_picklist: [],
        selectedInvestor: 5,
        passthrus_4_picklist: [],
        selectedPassthru: 24,

    };

    this.onSubmit = this.handleFormSubmit.bind(this);
    this.onChange = this.handleChange.bind(this);
}



  async componentDidMount() {
    //const encoded_deals_part=encodeURIComponent('params={"types":[1,3,4]}')
    //const fetchURL_deals = apiHost+"/api/getentitiesbytypes?"+encoded_deals_part

    const fetchURL_ttypes = apiHost+"/api/gettransactiontypes";
    const fetchURL_deals = apiHost+"/api/getentitiesbytypes?params={%22types%22:[1,4]}"
    const fetchURL_investors = apiHost+"/api/getentitiesbytypes?params={%22types%22:[2,4]}"
    const fetchURL_passthrus = apiHost+"/api/getentitiesbytypes?params={%22types%22:[3]}"
    //console.log("fetch deals URI part is "+fetchURL_deals)

    const tt_results = await fetch(fetchURL_ttypes);
    const ttypes_4_picklist = await tt_results.json()
    await this.setState({ ttypes_4_picklist })

    const deal_results = await fetch(fetchURL_deals);
    const deals_4_picklist = await deal_results.json()
    await this.setState({ deals_4_picklist })

    const investor_results = await fetch(fetchURL_investors);
    const investors_4_picklist = await investor_results.json()
    await this.setState({ investors_4_picklist })


    const passthru_results = await fetch(fetchURL_passthrus);
    const passthrus_4_picklist = await passthru_results.json()
    await this.setState({ passthrus_4_picklist })

    //console.log("got Trans Types:  "+JSON.stringify(this.state.transaction_types, null, 4));
  }


//set state for any number of input field changes
handleChange(event) {
          //const target = event.target;
          //const value = target.type === 'checkbox' ? target.checked : target.value;
          const value = event.target.value;
          const name = event.target.name;

          this.setState({
            [name]: value
          });
          console.log("just set "+name+"  to  "+value)

}



handleFormSubmit(event) {
      event.preventDefault();
      const fetchURL_sendtrans = apiHost + "/process_add_transaction";


      let newTransObject = sampleNewTrans;
      newTransObject.amount = this.state.amount;
      newTransObject.notes = this.state.notes;
      newTransObject.trans_type = this.state.selectedTType;
      newTransObject.investment_entity_id = this.state.selectedDeal;
      newTransObject.investor_entity_id = this.state.selectedInvestor;
      newTransObject.passthru_entity_id = this.state.selectedPassthru;

      console.log("Ready to submit new Transaction: "+JSON.stringify(newTransObject,null,4))

            fetch(fetchURL_sendtrans, {
                        method: "POST",
                        body: JSON.stringify(newTransObject),
                        headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                        }

            })
            .then( () => console.log("Post new Trans  "));

            // .then(response => response.json())
            // .then(message => console.log("Post new Trans got: "+ message));



}  //handle form submit



  render() {
        return (
             <div>
                <form onSubmit={this.onSubmit}>


                      Transaction Type:
                      <EntitiesPulldown
                              itemList = {this.state.ttypes_4_picklist}
                              selectedItem = {this.state.selectedTType}
                              handleChangeCB = {this.onChange}
                              target = {"selectedTType"}
                      />
                      <br/>

                      Deal or Entity:
                      <EntitiesPulldown
                              itemList = {this.state.deals_4_picklist}
                              selectedItem = {this.state.selectedDeal}
                              handleChangeCB = {this.onChange}
                              target = {"selectedDeal"}
                      />
                      <br/>


                      Investor:
                      <EntitiesPulldown
                              itemList = {this.state.investors_4_picklist}
                              selectedItem = {this.state.selectedInvestor}
                              handleChangeCB = {this.onChange}
                              target = {"selectedInvestor"}
                      />
                      <br/>

                      Passthru:
                      <EntitiesPulldown
                              itemList = {this.state.passthrus_4_picklist}
                              selectedItem = {this.state.selectedPassthru}
                              handleChangeCB = {this.onChange}
                              target = {"selectedPassthru"}
                      />
                      <br/>




                        Amount:  &nbsp;
                        <input type="text" name="amount" size="8" value={this.state.amount} onChange={this.onChange} />
                      <br/>  <br/>

                      <label>
                        Notes: &nbsp; &nbsp;
                        <input type="text" name="notes" value={this.state.notes} onChange={this.onChange} />
                      </label>
                      <br/>
                      <input type="submit" value="Submit" />
                    </form>
            </div>



          );
   }



} //class



export default NewTransactionForm;
