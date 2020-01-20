import React from 'react'
import './Node.css'

export default function Node(props) {
    return (
        <div className={ "Node " + (props.position ?? "") }>
            <div className="value">
                {/* <input onChange={ (e) => props.update(e.target.value) } /> */}
                {props.node.value}  
            </div>
            <div className="text-center">
                <p>
                    <button onClick={ () => props.delete(props.node.key) } className="btn btn-danger">Delete Node</button>
                </p>
                <p>
                    <button onClick={ () => props.add(props.node.key, (Math.floor(Math.random() * 100)), "left") } className="btn btn-primary">Add Left Node</button>
                    &nbsp;
                    <button onClick={ () => props.add(props.node.key, (Math.floor(Math.random() * 99)), "right") } className="btn btn-primary">Add Right Node</button>
                </p>
            </div>
            <div className="row">
                <div className="col-6">
                    { ! props.node.left ? "" : <Node add={props.add} delete={props.delete} node={props.node.left} position="left" /> }
                </div>
                <div className="col-6">
                    {! props.node.right ? "" : <Node add={props.add} delete={props.delete} update={props.update} node={props.node.right} position="right" /> }
                </div>
            </div>
        </div>
    )
}
