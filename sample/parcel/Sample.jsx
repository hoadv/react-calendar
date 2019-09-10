import React, { Component } from 'react';
import Calendar from 'short-react-calendar/dist/entry';

import './Sample.less';

export default class Sample extends Component {
  state = {
    value: new Date(),
  }

  onChange = value => this.setState({ value })

  render() {
    const { value } = this.state;

    return (
      <div className="Sample">
        <header>
          <h1>react-calendar sample page</h1>
        </header>
        <div className="Sample__container">
          <main className="Sample__container__content">
            <Calendar
              calendarType="US"
              oneWeekCalendar={true}
            />
          </main>
        </div>
      </div>
    );
  }
}
