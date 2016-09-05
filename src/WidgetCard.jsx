import React, { Component, PropTypes } from 'react';

export default class WidgetCard extends Component {
  render() {

    return (
      <div style={{
        backgroundColor: green,
        color: white,
        width: '200px%',
        height: '50px%'
      }}>
        {this.props.children}
      </div>
    );
  }
}
