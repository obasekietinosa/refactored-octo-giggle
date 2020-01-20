import React from 'react'
import './Node.css'

export default function Node(props) {
    return (
        <div className={"Node " + (props.position ?? "")}>
            <div className={"value" + (props.isFound(props.node.key) ? " found" : "")}>
                {/* <input onChange={ (e) => props.update(e.target.value) } /> */}
                {props.node.value}
            </div>
            <div className="text-center buttons">
                <button onClick={() => props.delete(props.node.key)} className="btn btn-danger">Delete Node</button>
                &nbsp;
                <button onClick={() => props.add(props.node.key, (Math.floor(Math.random() * 100)))} className="btn btn-primary">Add Node</button>
            </div>
            <div className="row">
                    {
                        props.node.children.map((node, key) => {
                            return (
                                <div className="col">
                                    <Node
                                        key={key}
                                        add={props.add}
                                        delete={props.delete}
                                        update={props.update}
                                        isFound={props.isFound}
                                        node={node}
                                        position="left"
                                    />
                                </div>
                            );
                        })
                    }
            </div>
        </div>
    )
}
