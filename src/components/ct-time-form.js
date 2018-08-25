import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import EntitiesPulldown from './entities-pulldown'
import {formatCurrency, getAPI_endpoint} from './ct-utils';
const apiHost = getAPI_endpoint()
const lodash = require('lodash');



class TimeEntryForm extends Component  {


constructor(props) {
    super(props);

    this.state = {
          all_properties: [],
          props_4picklist: [],
          selected_prop: null,
          selected_prop_id: 0,
          selected_prop_name: "",
          units_4picklist: [],
          selected_unit: null,
          selected_unit_id: 0,
          selected_unit_name: "",
          time_entries: []

    };

    this.onSubmit = this.handleFormSubmit.bind(this);
    this.onChange = this.handleChange.bind(this);
}



  async componentDidMount() {

    let hoursBy30 = lodash.range(.5, 9, .5);

    const fetchURL_allprops = apiHost + "/api/getallproperties"
    const prop_results = await fetch(fetchURL_allprops);
    const all_properties = await prop_results.json()
    await this.setState({ all_properties })

    let props_4picklist = all_properties.map(property => {
            return {
              id: property.id,
              name:property.name
            }

    }) //map
    props_4picklist.splice(0, 0, {id:0, name: " -- Please Select -- "})

    await this.setState({ props_4picklist })


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


          if (name === "selected_prop_id") {
              let propsWorkingCopy = this.state.all_properties
              let selcted_property = propsWorkingCopy.find ((property) => {
                            return property.id = parseInt(value)

              })

              console.log("Selected property is "+selcted_property.name)

              this.setState({
                units_4picklist: selcted_property.units,
                selected_prop_name: selcted_property.name
              });

          }




}



handleFormSubmit(event) {
      event.preventDefault();

      let newLocalTimeEntry = {

                property_id : 1,
                unit_id : 1,
                work_hours : 0,
                property_name: "hello",
                unit_name: "5555"

        }

      console.log("Ready to submit new Transaction: "+JSON.stringify(newTransObject,null,4))



}  //handle form submit



  render() {


    if (this.state.selected_prop_id === 0)   {

                      return (
                           <div>
                                    Building:
                                    <EntitiesPulldown
                                            itemList = {this.state.props_4picklist}
                                            selectedItem = {this.state.selected_prop_id}
                                            handleChangeCB = {this.onChange}
                                            target = {"selected_prop_id"}
                                    />
                                    <br/>

                          </div>
                        );




      } else {

                    return (
                         <div>


                            <form onSubmit={this.onSubmit}>
                                  Building:
                                       {this.state.selected_prop_name}
                                  <br/>
                                  Unit:
                                  <EntitiesPulldown
                                          itemList = {this.state.units_4picklist}
                                          selectedItem = {this.state.selected_unit_id}
                                          handleChangeCB = {this.onChange}
                                          target = {"selected_unit_id"}
                                  />
                                  <br/>


                                  <br/>
                                  <input type="submit" value="Submit" />
                                </form>
                        </div>



                      );

      } //if-ese

   } //render



} //class



export default TimeEntryForm;
