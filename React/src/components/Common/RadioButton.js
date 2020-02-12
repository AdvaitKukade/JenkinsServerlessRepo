import React from 'react';

const RadioButton = (props) => {
    return (
        <div className="custom-control custom-radio">
            <input type="radio" checked={props.checked} className="custom-control-input" id={props.value} disabled={props.disabled} name={props.type} value={props.value} onChange={props.radioButtonHandler} />
            <label className="custom-control-label" htmlFor={props.value}>{props.label}</label>
        </div>
    );
}

export default RadioButton;