import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { getJobList } from '../api';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Check local storage to get data, if null will be just empty array
      jobList: (localStorage.getItem("jobList") == null) ? [] : JSON.parse(localStorage.getItem("jobList")),
      total: (localStorage.getItem("jobList") == null) ? 0 : JSON.parse(localStorage.getItem("jobList")).length,
      activePage: 1
    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentWillMount() {
    if (this.state.jobList.length === 0) {
      // Get Data from API if Job list data is empty then save it to local storage
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

  // Handle Pagination
  handlePageChange(pageNumber) {
    var array = (localStorage.getItem("jobList") == null) ? [] : JSON.parse(localStorage.getItem("jobList"));
    this.setState({activePage: pageNumber});
    this.setState({ jobList: this.paginate(array, 3, pageNumber) });
  }

  // Handle Page size each page from local storage
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
    this.setState({ jobList: filtered })
  }

  render() {
    return (
      <div className="body" id="jobs">
        <div className="container">
          <div className="row">
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
              this.state.jobList.map(job => {
                return(
                  <Link to={`job/${job.id}`} className="col-lg-4 col-md-6 card-parent" key={job.id}>
                    <div className="card">
                      <div className="jobDesc">
                        <p className="jobTitle">{job.title}</p>
                        <p>
                          <span className="jobCompany">{job.company}</span><br/>
                          <span className="jobLocation">{job.location}</span>
                        </p>
                      </div>
                    </div>
                  </Link>
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

export default List;
