import React, { Component } from 'react'
import './App.css'
import Node from '../Node/Node'

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            searchTerm: "",
            searchPath: [],
            foundNodeKey: "",
            nodes: [
                {
                    value: "root",
                    key: "0",
                    children: [
                        {
                            value: "left",
                            key: "0.children.0",
                            children: []
                        },
                        {
                            value: "right",
                            key: "0.children.1",
                            children: []
                        }
                    ],

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

    get = (path, obj) => {
        var schema = obj;  // a moving reference to internal objects within obj
        console.log(path)
        var pList = path.split('.');
        var len = pList.length;
        for (var i = 0; i < len - 1; i++) {
            var elem = pList[i];
            if (!schema[elem]) schema[elem] = {}
            schema = schema[elem];
        }
        console.log(schema)
        return schema;
    }

    addNode = (to, value) => {
        let nodes = this.state.nodes
        console.log(to)
        let newNode = {
            value: value,
            key: to + ".children." + (this.get(to, nodes).length++),
            children: []
        }

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
    
    isFoundNode = (nodeKey) => nodeKey === this.state.foundNodeKey

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
        this.setState({ searchPath: [] })
        let queue = []
        let breathFirstSearch = (needle, rootNode, queue) => {
            let searchPath = this.state.searchPath
            searchPath.push(rootNode.value)
            console.log(queue)
            this.setState({ searchPath })
            if (rootNode.value == needle) {
                console.log("Result Found!")
                return rootNode
            }

            rootNode.children.forEach(node => {
                queue.push(node)
            });
            
            if (queue.length > 0) {
                let nextNode = queue.shift();
                return breathFirstSearch(needle, nextNode, queue);
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
                            <input type="text" className="form-control" id="search" onChange={this.getSearchTerm} placeholder="Search Value"></input>
                            <button className="btn btn-primary" onClick={this.searchDepth} >Search Depth First</button>
                            <button className="btn btn-primary" onClick={this.searchBreath} >Search Breath First</button>
                        </div>
                        <p>{this.state.searchPath.join("->")}</p>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <Node
                                add={this.addNode}
                                delete={this.deleteNode}
                                update={this.updateNode}
                                isFound={this.isFoundNode}
                                node={this.state.nodes[0]}
                            />
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}
