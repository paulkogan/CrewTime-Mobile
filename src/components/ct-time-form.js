import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import EntitiesPulldown from './entities-pulldown'
import NewTimesList from './ct-newtimes-list'
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
          hours_4picklist: [],
          selected_hour_id: 0,
          time_entries: []

    };

    this.onSubmit = this.handleFormSubmit.bind(this);
    this.onChange = this.handleChange.bind(this);
}



  async componentDidMount() {

    let hoursBy30 = lodash.range(.5, 9, .5);
    console.log("The hours are  "+JSON.stringify(hoursBy30)  )
    let hours_4picklist = hoursBy30.map((time) =>{
                    return {
                          id: time,
                          name: time + " hours"
                      }

    })


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
    hours_4picklist.splice(0, 0, {id:0, name: " -- Please Select -- "})

    await this.setState({ props_4picklist, hours_4picklist })


  }


//set state for any number of input field changes
async handleChange(event) {
          //const target = event.target;
          //const value = target.type === 'checkbox' ? target.checked : target.value;
          const value = event.target.value;
          const name = event.target.name;

          await this.setState({
            [name]: value
          });
          console.log("just set "+name+"  to  "+value)


          if (name === "selected_prop_id") {
              let propsWorkingCopy = this.state.all_properties
              const selcted_property = propsWorkingCopy.find ((property) => {
                             //console.log("property.id is "+property.id+"  and is of type "+typeof property.id)
                            if (property.id === parseInt(this.state.selected_prop_id)) return property

              })
              //console.log("Selected property is "+JSON.stringify(selcted_property,null,4) )

              //do do units

              //assignement by Value
              let unitsFromProp = selcted_property.units.slice()
              unitsFromProp.splice(0, 0, {id:0, name: " -- Please Select A -- ", property_id:0})
              this.setState({
                units_4picklist: unitsFromProp,
                selected_prop_name: selcted_property.name.slice(0,12),
              });

          //        console.log("unitsFromProp after slice is "+JSON.stringify(unitsFromProp))


          } //SET PROP



          if (name === "selected_unit_id") {
              let unitsWorkingCopy = this.state.units_4picklist
              let selcted_unit = unitsWorkingCopy.find ((unit) => {
                             //console.log("property.id is "+property.id+"  and is of type "+typeof property.id)
                            if (unit.id === parseInt(this.state.selected_unit_id)) return unit

              })
              console.log("Selected unit is "+selcted_unit.name)

              this.setState({
                selected_unit_name: selcted_unit.name
              });

          } //SET PROP





} //handle Change



handleFormSubmit(event) {
      event.preventDefault();

      let newLocalTimeEntry = {
                property_id : this.state.selected_prop_id,
                unit_id : this.state.selected_unit_id,
                work_hours : this.state.selected_hour_id,
                property_name: this.state.selected_prop_name,
                unit_name: this.state.selected_unit_name
        }

      console.log("Ready to submit new Transaction: "+JSON.stringify(newLocalTimeEntry,null,4))

       let timesArr = this.state.time_entries
       timesArr.push(newLocalTimeEntry)





       //add the time entrie and clear setting on the form
       this.setState({
          time_entries: timesArr,
          selected_prop: null,
          selected_prop_id: 0,
          selected_prop_name: "",
          units_4picklist: [],
          selected_unit: null,
          selected_unit_id: 0,
          selected_unit_name: "",
          selected_hour_id: 0,
        });


}  //handle form submit



  render() {


    if (this.state.selected_prop_id === 0)   {

                      return (
                        <div>
                           <div className = "items-list">
                                  <b>Add a New Work Time</b><br/>
                                    Building:
                                    <EntitiesPulldown
                                            itemList = {this.state.props_4picklist}
                                            selectedItem = {this.state.selected_prop_id}
                                            handleChangeCB = {this.onChange}
                                            target = {"selected_prop_id"}
                                    />
                                     <br/><br/><br/>
                           </div>

                           <div>
                              {(this.state.time_entries.length>0) &&
                                <NewTimesList  time_entries={this.state.time_entries}
                               />}
                            </div>
                        </div>

                        );





      } else if (this.state.selected_unit_id === 0)   {

                          return (
                            <div>
                               <div className = "items-list">
                                 <b>Add a New Work Time</b><br/>
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
                                          <br/><br/>
                                       </div>

                                       <div>
                                          {(this.state.time_entries.length>0) &&
                                            <NewTimesList  time_entries={this.state.time_entries}
                                           />}
                                        </div>
                                    </div>

                            );

      } else if (this.state.selected_hour_id === 0) {

                    return (
                      <div>
                         <div className = "items-list">
                              <b>Add a New Work Time</b><br/>
                                  Building:
                                       {this.state.selected_prop_name}
                                  <br/>
                                  Unit:
                                       {this.state.selected_unit_name}
                                  <br/>


                                  Hours Worked:
                                  <EntitiesPulldown
                                          itemList = {this.state.hours_4picklist}
                                          selectedItem = {this.state.selected_hour_id}
                                          handleChangeCB = {this.onChange}
                                          target = {"selected_hour_id"}
                                  />
                                  <br/>
                        </div>

                        <div>
                           {(this.state.time_entries.length>0) &&
                             <NewTimesList  time_entries={this.state.time_entries}
                            />}
                         </div>
                     </div>

             );
    }  else {
                      return (
                        <div>
                           <div className = "items-list">
                              <b>Add a New Work Time</b><br/>
                              <form onSubmit={this.onSubmit}>
                                    Building:
                                         {this.state.selected_prop_name}
                                    <br/>
                                    Unit:
                                         {this.state.selected_unit_name}
                                    <br/>


                                    Hours Worked:
                                          {this.state.selected_hour_id} hours
                                    <br/>


                                    <br/>
                                    <input type="submit" value="Add Work Time" />
                                  </form>

                          </div>

                        <div>
                           {(this.state.time_entries.length>0) &&
                             <NewTimesList  time_entries={this.state.time_entries}
                            />}
                         </div>
                     </div>

             );


      } //if-ese

   } //render



} //class



export default TimeEntryForm;
