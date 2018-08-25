import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import WorkersList from './ct-workers-list'
import {formatCurrency, getAPI_endpoint} from './ct-utils';
const apiHost = getAPI_endpoint()



class WorkersListPage extends Component {

    constructor (props) {
        super(props)


        this.state = {

            workers: []

         }
    } // constructor


    // // api call - transcations for entity
  componentDidMount() {
            const fetchURL = apiHost + "/api/getallworkers";
            fetch(fetchURL)
            .then(results => results.json())
            .then(dataSet => this.setState({workers:dataSet})
            ) //ts
    }




    render() {

        return (
          <div>
                <WorkersList listOfWorkers={this.state.workers} />
          </div>

        ) //return
    } //render
} //class

export default WorkersListPage;

                // <DealsList dealsResults = {this.state.dealsResults}/>
