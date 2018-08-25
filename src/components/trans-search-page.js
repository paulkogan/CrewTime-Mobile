import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TransList from './t-list';
import TransSearchBar from './t-search-bar';
import {formatCurrency, getAPI_endpoint} from './ira-utils';
const apiHost = getAPI_endpoint()


class TransSearchPage extends Component {

    constructor (props) {
        super(props)


        this.state = {
            target_entity_id: 0,
            transResults: [],
            showEntityPicklist: true,
         }
    } // constructor

// async componentDidMount() {
//           const fetchURL = apiHost + "/api/transforentity/"+this.state.target_entity_id;
//           console.log("transactions FETCH URL is  "+fetchURL)
//           try {
//                   const response = await fetch(fetchURL);
//                   const json = await response.json();
//                   this.setState({transResults:json});
//                   console.log("TSP got back: "+JSON.stringify(json[0])+"\n\n")
//
//           } catch (error) {
//                   console.log("TSP Error fetching Transaction Results" + error);
//           }
//
//
//   }  //cDM





// //use arrow functions to bind, call CDM as a CB funcion after SetState
//this is what you click on
// REQ: : when I click on an entity, hide entity pick list
//when I click in search bar, show entity pick list.

setEntityForTransSearchCB = (entityResult) => {
            const entity_id = entityResult.id;
            //switch display modes - you picked one, so hide the pick list
            this.setState ({showEntityPicklist:false});
            this.setState ({target_entity_id:entity_id}, () => {
                    console.log("TS Setting state CB: target_entity_id is "+this.state.target_entity_id)
                    this.componentDidMount()


            })
      }

//this is ugly - just to let this component know to switch display modes
startNewEntitySearchCB = () => {
            this.setState ({showEntityPicklist:true});

}



//promises version
  componentDidMount ()  {
            const fetchURL = apiHost + "/api/transforentity/"+this.state.target_entity_id;
            console.log("transactions FETCH URL is  "+fetchURL)
            fetch(fetchURL)
             .then(results => results.json())
             .then(data =>  {
                    this.setState({transResults:data})
              })


    }





    render() {
       console.log("in TS - Target_Entity_ID is  "+this.state.target_entity_id)
        return (
          <div>

            <TransSearchBar
                  selectedEntity = {this.state.target_entity_id}
                  showEntityPicklist = {this.state.showEntityPicklist}
                  startNewEntitySearchCB = {this.startNewEntitySearchCB}
                  onEntitySelectCB = {this.setEntityForTransSearchCB}
            />

            <br/>

            <br/>
            <div>
                   { (this.state.transResults.length >0) && <TransList transResults = {this.state.transResults}/> }
            </div>
          </div>

        ) //return
    } //render
} //class

export default TransSearchPage;
// { ((!this.state.showEntityPicklist) &&
                // { ((!this.state.showEntityPicklist) && this.state.transResults) && <TransList transResults = {this.state.transResults}/> }
                //   Transactions Payload is   {JSON.stringify(this.state.transResults)}

                            //Transactions STATE is   {JSON.stringify(this.state.transResults)}
