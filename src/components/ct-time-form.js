import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import EntitiesPulldown from './entities-pulldown'
import NewTimesList from './ct-newtimes-list'
import {formatCurrency, getAPI_endpoint} from './ct-utils';


const apiHost = getAPI_endpoint()
const lodash = require('lodash');
const menuPrompt = " -- Pick -- "


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
    this.deleteTE = this.deleteTE.bind(this);
}



  async componentDidMount() {

    let hoursBy30 = lodash.range(.5, 9, .5);
    //console.log("The hours are  "+JSON.stringify(hoursBy30)  )
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
    props_4picklist.splice(0, 0, {id:0, name: menuPrompt })
    hours_4picklist.splice(0, 0, {id:0, name: menuPrompt })

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

              //assignement by Value!!!
              let unitsFromProp = selcted_property.units.slice()
              unitsFromProp.splice(0, 0, {id:0, name: menuPrompt, property_id:0})
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



async handleFormSubmit(event) {
      event.preventDefault();

      let newLocalTimeEntry = {
                property_id : this.state.selected_prop_id,
                unit_id : this.state.selected_unit_id,
                work_hours : this.state.selected_hour_id,
                property_name: this.state.selected_prop_name,
                unit_name: this.state.selected_unit_name
        }



       let timesArr = this.state.time_entries
       timesArr.push(newLocalTimeEntry)


// Send TE to the DB

//  let insertTEResults = await ctSQL.insertTimeEntry(newTimeEntry);


      const fetchURL_sendTE = apiHost + "/process-web-newtime";
      let newTimeEntry = {
              worker_id : this.props.worker.id,
              property_id : this.state.selected_prop_id,
              unit_id : this.state.selected_unit_id,
              work_date : this.props.work_date,
              work_hours : this.state.selected_hour_id,
              notes:  "from CT Mobile"
      }




      console.log("Ready to POST new Time Entry "+JSON.stringify(newTimeEntry,null,4))

      await fetch(fetchURL_sendTE, {
                   method: "POST",
                   body: JSON.stringify(newTimeEntry),
                   headers: {
                               'Accept': 'application/json',
                               'Content-Type': 'application/json'
                   }

       })
       .then( () => console.log("Posted new TimeEntry  "));



       //add the time entrie and CLEAR setting on the form
       await this.setState({
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



deleteTE(teIndex) {
      event.preventDefault();


      let timesArr = this.state.time_entries
      let removed = timesArr.splice(teIndex,1)
      console.log("Deleted   "+removed[0].property_name+ "  "+removed[0].unit_name +"\n")
      this.setState({
         time_entries: timesArr
       });


} //deleteTE


  render() {


    if (this.state.selected_prop_id === 0)   {

                      return (
                        <div className = "outer-div">
                           <div className = "items-list">
                                  <b>Add a New Work Time</b><br/>
                                    Building:&nbsp;&nbsp;
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
                                <NewTimesList
                                       time_entries={this.state.time_entries}
                                       deleteTE={this.deleteTE}
                               />}
                            </div>
                        </div>

                        );





      } else if (this.state.selected_unit_id === 0)   {

                          return (
                            <div>
                               <div className = "items-list">
                                 <b>Add a New Work Time</b><br/>
                                         Building:&nbsp;&nbsp;
                                              {this.state.selected_prop_name}
                                         <br/>
                                         Unit:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                                            <NewTimesList
                                                   time_entries={this.state.time_entries}
                                                   deleteTE={this.deleteTE}
                                           />}
                                        </div>
                                    </div>

                            );

      } else if (this.state.selected_hour_id === 0) {

                    return (
                      <div>
                         <div className = "items-list">
                              <b>Add a New Work Time</b><br/>
                                  Building:&nbsp;&nbsp;
                                       {this.state.selected_prop_name}
                                  <br/>
                                  Unit:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                             <NewTimesList
                                    time_entries={this.state.time_entries}
                                    deleteTE={this.deleteTE}
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
                                    Building:&nbsp;&nbsp;
                                         {this.state.selected_prop_name}
                                    <br/>
                                    Unit:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                         {this.state.selected_unit_name}
                                    <br/>


                                    Hours Worked:&nbsp;
                                          {this.state.selected_hour_id} hours
                                    <br/>


                                    <br/>

                                    <button type="submit" className="time-button" >Add Work Time</button>



                                  </form>

                          </div>

                        <div>
                           {(this.state.time_entries.length>0) &&
                             <NewTimesList
                                    time_entries={this.state.time_entries}
                                    deleteTE={this.deleteTE}
                            />}
                         </div>
                     </div>

             );


      } //if-ese

   } //render



} //class



export default TimeEntryForm;
