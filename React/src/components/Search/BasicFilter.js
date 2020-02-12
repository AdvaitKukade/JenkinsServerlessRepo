import React, { Component } from "react";
import DatePicker from "react-datepicker";
import Checkbox from "./../Common/Checkbox";
// import SelectDropdown from "../Common/SelectDropdown";
import RadioButton from "../Common/RadioButton";

class BasicFilter extends Component {
  
  checkBoxHandler = (e,res) => {
    e.preventDefault();
    console.log("e", e);
  };

  render() {

    return (
      <div className={`filterWrap flex-column`}>
        <div className="row">
          <div className={!this.props.isOpenedFromFilterOption ? `col-7` : `col-8` }>
            <div className="row m-0">
              <div className="col-5 p-0">
                <div className="catList">
                <label className="text-uppercase formLabel d-block">Index</label>
                
                  <RadioButton
                    //key={index}
                    value= "rcon"
                    type="index"
                    label="Rcon"
                    // disabled={true}
                    //radioButtonHandler={(e, res) => this.props.onSampleCountChangeHandler(e, res)}
                    //checked= {this.props.selectedSampleCount === obj.value}
                  />
                  <RadioButton
                    //key={index}
                    value= "archiveText"
                    type="index"
                    label="Archive Text"
                    // disabled={true}
                    //radioButtonHandler={(e, res) => this.props.onSampleCountChangeHandler(e, res)}
                    //checked= {this.props.selectedSampleCount === obj.value}
                  />

                  <label className="text-uppercase formLabel d-block pt-5">Sort By</label>
                         
                  <RadioButton
                    //key={index}
                    value= "random"
                    type="sortBy"
                    label="Random"
                    // disabled={true}
                    radioButtonHandler={(e, res) => this.props.onSortByChangeHandler(e, res)}
                    checked= {this.props.selectedSortBy === "random" || !this.props.selectedSortBy}
                  />
                  <RadioButton
                    //key={index}
                    value= "firstcreated"
                    type="sortBy"
                    label="Date Created"
                    // disabled={true}
                    radioButtonHandler={(e, res) => this.props.onSortByChangeHandler(e, res)}
                    checked= {this.props.selectedSortBy === "firstcreated"}
                  />
              </div>
              </div>
              <div className="col-7 p-0">
                <div className="catList">
                <label className="text-uppercase formLabel d-block">Timeline</label>
                <div className="customDatePicker">
                <DatePicker showTimeSelect timeFormat="HH:mm" dateFormat="MM/dd/yyyy   h:mm aa" showMonthDropdown showYearDropdown dropdownMode= "select" placeholderText="From date & time" selected={this.props.startDate.date}  minDate={this.props.startDate.minDate} maxDate={this.props.startDate.maxDate}  onChange={this.props.onStartDateChangeHandler} />
                </div>
                <div className="customDatePicker">
                <DatePicker showTimeSelect timeFormat="HH:mm" dateFormat="MM/dd/yyyy   h:mm aa" showMonthDropdown showYearDropdown dropdownMode= "select" placeholderText="To date & time" selected={this.props.endDate.date} minDate={this.props.endDate.minDate} maxDate={this.props.endDate.maxDate} onChange={this.props.onEndDateChangeHandler} />
                </div>
              </div>
              </div>
            </div>
            
            
          </div>
          {!this.props.isOpenedFromFilterOption ? 
          <div className="col-auto pr-4">
            <div className="catList">
              <label className="text-uppercase formLabel d-block">Sample Count</label>
              {this.props.common.sampleCount.map((obj, index) => (
                  <RadioButton
                    key={index}
                    value={obj.value}
                    label={obj.value}
                    type="sampleCount"
                    // disabled={true}
                    radioButtonHandler={(e, res) => this.props.onSampleCountChangeHandler(e, res)}
                    checked= {this.props.selectedSampleCount === obj.value}
                  />
                ))}
            </div>
          </div> : null }
          <div className="col-auto pl-4">
            <div className="catList">
              <label className="text-uppercase formLabel d-block">Media Type</label>
              {this.props.common.mediaTypes.map((obj, index) => (
                  <Checkbox
                    key={index}
                    name={obj.label}
                    type="mediaType"
                    // disabled={true}
                    checkBoxHandler={(e) => this.props.onMediaTypeChangeHandler(e, obj.value)}
                    // checked= {this.props.selectedMediaType === obj.value}
                    checked={this.props.selectedMediaType.includes(obj.value)}
                  />
                ))}
            </div>
          </div>
        </div>
        {!this.props.isOpenedFromFilterOption ? <div className="buttonWrap d-flex justify-content-end align-items-center">
           <label role="button" onClick={this.props.showHideAdvanceFilter} className="link mr-4">Advanced Filters</label>
          <button className="btn primary-btn" onClick={this.props.searchClickHandler}>Search</button>
          
        </div> : null }
      </div>
    );
  }
}

export default BasicFilter;
