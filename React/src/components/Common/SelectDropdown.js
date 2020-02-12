import React from 'react';
import Select from "react-select";
const SelectDropdown = (props) => {

    const customStyles = {
        dropdownIndicator: () => ({
            display: "none"
        })
    };

    return (
        <React.Fragment>
            <Select
                isMulti = { props.isMultiSelect ? true : false }
                placeholder={`Select ${props.dropdownName}`}
                styles={customStyles}
                name="colors"
                isClearable={false}
                value={props.selectedValues}
                // controlShouldRenderValue={false}
                options={props.options}
                className="basic-multi-select"
                classNamePrefix="select"
                isSearchable= { props.isSearchable ? true : false }
                onChange={props.onOptionSelect}
            />
            {/* <div className="selectedOpt">
                {props.selectedValues.map(obj =>
                    <div>{obj.label} <span id={obj.id} className="removeOpt close-icon"></span></div>
                )}
            </div> */}
        </React.Fragment>
    );
}

export default SelectDropdown;