import React, { Component } from 'react'
import './App.css'
import Node from '../Node/Node'

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            searchTerm: "",
            foundNodeKey: "",
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
        nodes = this.set(newNode.key, newNode, nodes)
        this.setState({ nodes })
    }

    deleteNode = (key) => {
        console.log(key)
    }

    updateNode = (key, value) => {
        let nodes = this.state.nodes
        nodes = this.set(key + ".value", value, nodes)
        this.setState({ nodes })
    }

    getSearchTerm = (e) => {
        let searchTerm = e.target.value
        this.setState({ searchTerm })
    }

    searchDepth = () => {
        if (this.state.searchTerm.length < 1) {
            this.setState({ error: "Please Insert a Search Term" })
            return
        }
    }

    searchBreath = () => {
        if (this.state.searchTerm.length < 1) {
            this.setState({ error: "Please Insert a Search Term" })
            return
        }
        let queue = []
        let breathFirstSearch = (needle, rootNode, queue) => {
            console.log("On node " + rootNode.key)
            if (rootNode.key === needle) {
                console.log("Result Found!")
                return rootNode
            }

            if (rootNode.left) {
                queue.push(rootNode.left);
            }
            if (rootNode.right) {
                queue.push(rootNode.right);
            }
            if (queue.length > 0) {
                nextNode = queue.pop();
                breathFirstSearch(needle, nextNode, queue);
                return;
            }
            console.log("Breath First Search Completed. End of Tree")

        }
        let result = breathFirstSearch(this.state.searchTerm, this.state.nodes[0], queue)
        let foundNodeKey = result ? result.key : ""
        this.setState({ foundNodeKey })
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <input type="text" class="form-control" id="search" onChange={this.getSearchTerm} placeholder="Search Value"></input>
                            <button className="btn btn-primary" onClick={this.searchDepth} >Search Depth First</button>
                            <button className="btn btn-primary" onClick={this.searchBreath} >Search Breath First</button>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <Node add={this.addNode} delete={this.deleteNode} update={this.updateNode} node={this.state.nodes[0]} />
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}
