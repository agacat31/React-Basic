import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getJobDetail } from '../api';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobDetail: {},
    }
  }

  componentWillMount() {
    const id = parseInt(this.props.match.params.jobId, 10);
    function isData(data) { 
      return data.id === id;
    }
    const jobDetail = JSON.parse(localStorage.getItem("jobList")).find(isData);

    this.setState({ 
        jobDetail: jobDetail
    })
    
    getJobDetail(id).then((response) => {
        console.log(response.data)
    })
  }

  componentDidMount() {
    // console.log(this.state.jobDetail)
  }

  render() {
    return (
      <div className="body" id="jobs">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-center">
              <Link to="/jobs" className="btn btn-lg btn-search">Back</Link>
            </div>
            <div className="col-sm-12 text-center">
              <h2 className="subtitle">Job Detail</h2><br/>
            </div>
          </div>
    
          <div className="row">
            <div className="col-sm-12">
                <div className="card">
                    <div className="panel-body">
                        <div className="jobDesc">
                            <label className="jobLabel">Title</label>
                            <p><span className="jobTitle">{this.state.jobDetail.title}</span></p>

                            <label className="jobLabel">Company</label>
                            <p><span className="jobTitle">{this.state.jobDetail.company}</span></p>

                            <label className="jobLabel">Location</label>
                            <p><span className="jobTitle">{this.state.jobDetail.location}</span></p>

                            <label className="jobLabel">Type</label>
                            <p><span className="jobTitle">{this.state.jobDetail.type}</span></p>

                            <label className="jobLabel">Description</label>
                            <p><span className="jobTitle">{this.state.jobDetail.description}</span></p>

                            <label className="jobLabel">Nationality</label>
                            <p><span className="jobTitle">{this.state.jobDetail.nationality}</span></p>

                            <label className="jobLabel">Language</label>
                            <ul className="jobTitle">
                            {
                                this.state.jobDetail.requirements.language.map(req => {
                                    return(
                                        <li key={req}>{req}</li>
                                    )
                                })
                            }
                            </ul>

                            <label className="jobLabel">Requirements</label>
                            <ul className="jobTitle">
                            {
                                this.state.jobDetail.requirements.items.map(req => {
                                    return(
                                        <li key={req}>{req}</li>
                                    )
                                })
                            }
                            </ul>

                            <label className="jobLabel">Responsibilites</label>
                            <ul className="jobTitle">
                            {
                                this.state.jobDetail.responsibilites.map(res => {
                                    return(
                                        <li key={res}>{res}</li>
                                    )
                                })
                            }
                            </ul>

                            <label className="jobLabel">Benefit</label>
                            <ul className="jobTitle">
                            {
                                this.state.jobDetail.benefit.map(ben => {
                                    return(
                                        <li key={ben}>{ben}</li>
                                    )
                                })
                            }
                            </ul>
                            <label className="jobLabel">Contact</label>
                            <ul className="jobTitle">
                                <li>Phone: {this.state.jobDetail.employer_contact.phone}</li>
                                <li>Whatsapp: {this.state.jobDetail.employer_contact.whatsapp}</li>
                                <li>Email: {this.state.jobDetail.employer_contact.email}</li>
                            </ul>
                            
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
