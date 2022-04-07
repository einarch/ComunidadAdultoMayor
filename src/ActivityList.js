import React from 'react';

import axios from 'axios';

export default class ActivityList extends React.Component {
  state = {
    activities: []
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/activities`)
      .then(res => {
        const activities = res.data;
        this.setState({ activities });
      })
  }

  render() {
    return (
      <ul>
        { this.state.activities.map(activity => <li>{activity.name}</li>)}
      </ul>
    )
  }
}