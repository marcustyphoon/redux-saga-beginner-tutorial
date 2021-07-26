/*eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react'

const Counter = ({ value, start }) =>
  <div>
    <button onClick={start}>
      Start
    </button>
    <hr />
    <div>
      store value: {value}
    </div>
  </div>

export default Counter
