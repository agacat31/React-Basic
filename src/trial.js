import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MyComponent from './components/MyComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Initial title',
      name: 'Initial Name',
      checked: true,
      renderTitle: true
    }

    this.cobaClick = this.cobaClick.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateChecked = this.updateChecked.bind(this);
  }

  renderTitle() {
    if (!this.state.renderTitle) {return null}
    return this.state.title;
  }

  updateName(event) {
    this.setState({
      name:event.target.value
    })
    console.log(this.state.name)
  }

  updateChecked(event) {
    this.setState({
      checked: !this.state.checked
    })
    console.log(this.state.checked)
  }

  cobaClick() {
    this.setState({
      title: 'New App Title',
      name: 'New App Name'
    })
  }
  
  onChange(e) {
    console.log(e.target.value);
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.input.value);
  }
  
  render() {
    const title = 'aJobThing';
    const list = [
      'satu','dua','tiga'
    ]

    return (
      <div>
        <h1>{this.renderTitle()}</h1>
        <div onClick={this.cobaClick}>Click here</div>
        <input 
          type="checkbox"
          onChange={this.updateChecked}
          checked={this.state.checked}
        />
        <input 
          onChange={this.updateName}
          value={this.state.name}
        />

        <br/><br/>
        {/* <MyComponent 
          title={this.state.title} 
          name={this.state.name}
          onClick={this.cobaClick} />

        <br/><br/><br/><br/>
        <h1>
          {
            list.map(item => {
              return (
                <div key={item}>{item}</div>
              )
            })
          }
        </h1>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} ref={input => this.input = input} />
        </form> */}
      </div>
    )
  }
}

export default App;
