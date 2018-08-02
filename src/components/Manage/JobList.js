import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { getJobList } from '../../api';

class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobList: (localStorage.getItem("jobList") == null) ? [] : JSON.parse(localStorage.getItem("jobList")),
      total: (localStorage.getItem("jobList") == null) ? 0 : JSON.parse(localStorage.getItem("jobList")).length,
      activePage: 1
    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentWillMount() {
    if (this.state.jobList.length === 0) {
      getJobList().then((response) => {
        localStorage.setItem('jobList', JSON.stringify(response.data));
        const jobList = JSON.parse(localStorage.getItem('jobList'));
        this.setState({ jobList });
        this.setState({ total: jobList.length });
        this.handlePageChange(1);
        console.log(this.state.jobList);
      })
    }
    this.handlePageChange(1);
  }

  handlePageChange(pageNumber) {
    var array = (localStorage.getItem("jobList") == null) ? [] : JSON.parse(localStorage.getItem("jobList"));
    this.setState({activePage: pageNumber});
    this.setState({ jobList: this.paginate(array, 3, pageNumber) });
  }

  paginate (array, page_size, page_number) {
    --page_number; // because pages logically start with 1, but technically with 0
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
  }

  onSearch(e) {
    var jobs = JSON.parse(localStorage.getItem("jobList")),
        filtered = [];
    for(var i=0; i<jobs.length;i++) {
      if(jobs[i].title.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0) {
        filtered.push(jobs[i]);
      }
    }
    this.setState({ jobList: filtered });
  }

  removeData(id) {
    var a = JSON.parse(localStorage.getItem('jobList'));
    const idx = a.findIndex(idx => idx.id === id);
    a.splice(idx, 1);
    this.setState({ jobList: a });
    this.setState({ total: a.length });
    localStorage.setItem('jobList', JSON.stringify(a));
    this.handlePageChange(1);
  }

  render() {
    return (
      <div className="body" id="jobs">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-center">
              <Link to="/admin/job" className="btn btn-lg btn-search">Add</Link>
            </div>
            <div className="col-sm-12 text-center">
              <input 
                type="text" 
                className="searchBox" 
                placeholder="Search here" 
                onChange={this.onSearch}
                defaultValue=''
              />
              
            </div>
          </div>
    
          <div className="row">
            {
              this.state.jobList.map((job, i) => {
                return(
                  <div className="col-lg-4 col-md-6 card-parent" key={i}>
                    <div className="card">
                      <div className="action">
                        <Link to={`job/${job.id}`}>Edit</Link>
                        &nbsp;&nbsp;
                        <Link to="#" onClick={this.removeData.bind(this, job.id)}>Delete</Link>
                      </div>
                      <div className="jobDesc">
                        <p className="jobTitle">{job.title}</p>
                        <p>
                          <span className="jobCompany">{job.company}</span><br/>
                          <span className="jobLocation">{job.location}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>

          <div className="row">
            <div className="col-md-12">
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={3}
                totalItemsCount={this.state.total}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
                innerClass="pagination justify-content-center mt-3"
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JobList;
