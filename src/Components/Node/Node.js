import React from 'react'
import './Node.css'

export default function Node(props) {
    return (
        <div className={ "Node " + (props.position ?? "") }>
            <div className="value">
                {props.node.value}  
            </div>
            <div className="row">
                <div className="col-6">
                    {props.node.left ? <Node node={props.node.left} position="left" /> : ""}
                </div>
                <div className="col-6">
                    {props.node.right ? <Node node={props.node.right} position="right" /> : ""}
                </div>
            </div>
        </div>
    )
}
