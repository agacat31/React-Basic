import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { getJobDetail } from '../../api';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobDetail: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeContact = this.handleChangeContact.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  componentWillMount() {
    // Find an object in an array by one of its properties
    const id = parseInt(this.props.match.params.jobId, 10);
    function isData(data) { 
      return data.id === id;
    }
    const jobDetail = JSON.parse(localStorage.getItem("jobList")).find(isData);

    // Set State
    // Check if router params has id
    if (this.props.match.params.jobId !== undefined) {
      this.setState({ 
        jobDetail: jobDetail
      })
    } else {
      this.setState({ 
        jobDetail: {
            "title": "Title",
            "company": "Company",
            "location": "Address",
            "type": "Fulltime",
            "description": "",
            "employer_contact": {
                "phone": "",
                "whatsapp": "",
                "email": ""
            },
            "requirements": {
                "language": [],
                "items": []
            },
            "responsibilites": [],
            "benefit": [],
            "nationality": "Malaysia"
        }
      })
    }
    
    // getJobDetail(id).then((response) => {
    //     console.log(response.data)
    // })
  }

  handleChange(e) {
    var data = this.state.jobDetail;
    data[e.target.name] = e.target.value;
    this.setState({ jobDetail: data });
  }

  handleChangeContact(e) {
    var data = this.state.jobDetail;
    data.employer_contact[e.target.name] = e.target.value;
    this.setState({ jobDetail: data });
  }

  submitData(e) {
    e.preventDefault();
    // Check if router params has id, no id then save by new id
    // Save data to local storage
    if (this.props.match.params.jobId !== undefined) {
      var a = JSON.parse(localStorage.getItem('jobList'));
      const id = parseInt(this.props.match.params.jobId, 10);
      const index = a.findIndex(idx => idx.id === id);
      a[index] = this.state.jobDetail;
      localStorage.setItem('jobList', JSON.stringify(a));
    } else {
      var temp = this.state.jobDetail;
      temp["id"] = Date.now();
      var a = JSON.parse(localStorage.getItem('jobList'));
      a.push(temp);
      localStorage.setItem('jobList', JSON.stringify(a));
    }
    console.log(this.state.jobDetail);
    this.props.history.push('/admin/jobs')
  }

  render() {
    return (
      <div className="body" id="jobs">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-center">
              <Link to="/admin/jobs" className="btn btn-lg btn-search">Back</Link>
            </div>
            <div className="col-sm-12 text-center">
              <h2 className="subtitle">Manage Job</h2><br/>
            </div>
          </div>
    
          <div className="row">
            <div className="col-sm-6 offset-sm-3">
                <div className="card">
                    <div className="panel-body">
                      <form onSubmit={this.submitData}>
                        <div className="form-group">
                            <label>Job Title</label>
                            <input type="text" className="form-control" name="title" placeholder="Job title" 
                              defaultValue={this.state.jobDetail.title} 
                              onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Company</label>
                            <input type="text" className="form-control" name="company" placeholder="Company name" 
                              defaultValue={this.state.jobDetail.company} 
                              onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input type="text" className="form-control" name="location" placeholder="Location" 
                              defaultValue={this.state.jobDetail.location} 
                              onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Type</label>
                            <input type="text" className="form-control" name="type" placeholder="Type" 
                              defaultValue={this.state.jobDetail.type} 
                              onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Nationality</label>
                            <input type="text" className="form-control" name="nationality" placeholder="Nationality" 
                              defaultValue={this.state.jobDetail.nationality} 
                              onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Contact</label>
                            <div className="input-group mb-3">
                              <div className="input-group-prepend">
                                <span className="input-group-text">Phone</span>
                              </div>
                              <input type="text" className="form-control" name="phone" placeholder="Phone" 
                                defaultValue={this.state.jobDetail.employer_contact.phone} 
                                onChange={this.handleChangeContact} />
                            </div>
                            <div className="input-group mb-3">
                              <div className="input-group-prepend">
                                <span className="input-group-text">Whatsapp</span>
                              </div>
                              <input type="text" className="form-control" name="whatsapp" placeholder="Whatsapp" 
                                defaultValue={this.state.jobDetail.employer_contact.whatsapp} 
                                onChange={this.handleChangeContact} />
                            </div>
                            <div className="input-group mb-3">
                              <div className="input-group-prepend">
                                <span className="input-group-text">Email</span>
                              </div>
                              <input type="text" className="form-control" name="email" placeholder="Email" 
                                defaultValue={this.state.jobDetail.employer_contact.email} 
                                onChange={this.handleChangeContact} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea type="textarea" className="form-control" name="description" rows="4"
                             onChange={this.handleChange} 
                             defaultValue={this.state.jobDetail.description}>
                            </textarea>
                        </div>
                        <hr/>
                        <div className="form-group">
                            <button type="submit" className="btn btn-info">Save</button>
                        </div>
                      </form>
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
