import React from 'react';

const Checkbox = (props) => {
    return (
        <div className="custom-control custom-checkbox">
            <input type="checkbox" checked={props.checked} className="custom-control-input" id={props.id || props.name} name={props.type} onChange={props.checkBoxHandler} />
            <label className="custom-control-label" htmlFor={props.id || props.name}>{props.name}</label>
        </div>
    );
}

export default Checkbox;