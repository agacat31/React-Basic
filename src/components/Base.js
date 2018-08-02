import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import JobList from './List';
import Detail from './Detail';
import ManageJob from './Manage/Job';
import ManageJobList from './Manage/JobList';

class Base extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'aJobThing'
    }
  }

  render() {
    return (
      <Router>
        <div>
          <div className="head">
            <div className="container">
              <div className="row">
                <div className="col-sm-12 text-center">
                  <center className="header">
                    <Link to="/" className="title">{this.state.title}</Link>
                  </center>
                </div>
              </div>
            </div>
          </div>
          <Route exact path="/" component={JobList} />
          <Route path="/jobs" component={JobList} />
          <Route path="/job/:jobId" component={Detail} />

          <Route path="/admin/jobs" component={ManageJobList} />
          <Route exact path="/admin/job" component={ManageJob} />
          <Route path="/admin/job/:jobId" component={ManageJob} />
        </div>
      </Router>
    );
  }
}

export default Base;
