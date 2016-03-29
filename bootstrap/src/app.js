import React from 'react'; //eslint-disable-line
import DatePicker from 'react-bootstrap-date-picker';

// Styling
import 'bootstrap-loader';
import './app.scss';

class App extends React.Component {
  constructor() {
    super();
    this.changeDate = this.changeDate.bind(this);
    this.state = {myDate: new Date().toISOString()};
  }

  changeDate(date) {
    console.log('app.js changeDate: date =', date);
    this.setState({myDate: date});
  }

  render() {
    return (
      <div>
        <DatePicker className="date-picker"
          value={this.state.myDate}
          onChange={this.changeDate}/>
      </div>
    );
  }
}

export default App;
