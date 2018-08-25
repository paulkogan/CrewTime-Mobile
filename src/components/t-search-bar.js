import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import EntityPicklist from './entity_picklist'
import {formatCurrency, getAPI_endpoint} from './ira-utils';
const apiHost = getAPI_endpoint()



class SearchBar extends Component{


constructor(props) {
    super(props);
    this.state = {
          searchText: "",
          entityResults:[],
          selectedEntity: props.selectedEntity
    };

}


//gets list of entities results from API, assigns to State
componentDidMount() {
          const fetchURL = apiHost+"/api/searchentities/"+this.state.searchText;
          console.log("searchbar FETCH URL is  "+fetchURL)
          fetch(fetchURL)
           .then(results => results.json())
           .then(entities => this.setState({ entityResults: entities}))
  }


onInputChange = (text) => {
    this.props.startNewEntitySearchCB()
    this.setState({searchText:text}, () => {
          console.log("SB - calling API for: "+this.state.searchText);
          this.componentDidMount()
    });
} //onInputchange





                //show entityPickList only if you dont have a selected Entity
                //the click happens on TransList, which then passes it up the chain to TS

  render () {
         return (
          <div >
                <div className="search-bar">
                    {"Filter Transactions:    "}
                    <input size="40" value = {this.state.searchText}
                           onChange = {
                               (eventObj) => {this.onInputChange(eventObj.target.value)}

                            }
                    />
                </div>

                <div className="pick-list">
                    { (this.props.showEntityPicklist) && <EntityPicklist entityResults = {this.state.entityResults}
                                    onEntitySelectCB = {this.props.onEntitySelectCB}
                    />}
                </div>
            </div>

        );

  }


} //class



export default SearchBar;
