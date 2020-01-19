import React, { Component } from 'react'
import './App.css'
import Node from '../Node/Node'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      nodes: [
        {
          value: "root",
          key: "0",
          left: {
            value: "left",
            key: "0.left",
            left: null,
            right: null
          },
          right: {
            value: "right",
            key: "0.right",
            left: null,
            right: null
          }
        }
      ]
    }
  }

  set = (path, value, obj) => {
    var schema = obj;  // a moving reference to internal objects within obj
    var pList = path.split('.');
    var len = pList.length;
    for (var i = 0; i < len - 1; i++) {
      var elem = pList[i];
      if (!schema[elem]) schema[elem] = {}
      schema = schema[elem];
    }

    schema[pList[len - 1]] = value;
    return obj;
  }

  addNode = (to, value, position) => {
    let newNode = {
      value: value,
      key: to + "." + position,
      left: null,
      right: null
    }

    let nodes = this.state.nodes
    nodes = this.set(to, newNode, nodes)
    this.setState({ nodes })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Node add={this.addNode} node={this.state.nodes[0]} />
          </div>
        </div>
      </div>
    )
  }
}
