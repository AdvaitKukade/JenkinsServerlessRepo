import React, { Component } from "react";
import SelectDropdown from "../Common/SelectDropdown";



class AdvanceFilter extends Component {

  mapToGenericKeyValuePair = () => {
    const languageOptions = this.props.common.languages.map(lang => {
      return { 
        id: lang.id,
        value: lang.language_code,
        label: lang.language
      }
    });

    const destinationOptions = this.props.common.destinations.map(obj => {
      return { 
        id: obj.id,
        value: obj.destination,
        label: obj.destination
      }
    });

    const channelOptions = this.props.common.channel.map(obj => {
      return { 
        id: obj.id,
        value: obj.channel,
        label: obj.channel
      }
    });

    const topicCodesOptions = this.props.common.topicCodes.map(obj => {
      return { 
        id: obj.id,
        value: obj.primary_N2000_code,
        label: obj.primary_eikon_news_mnemonic
      }
    });

    return { languageOptions, destinationOptions, topicCodesOptions, channelOptions };
  }


  render() {
    const { languageOptions, destinationOptions, topicCodesOptions, channelOptions } = this.mapToGenericKeyValuePair();
    
    return (
      <div className={`filterWrap flex-column d-flex`}>
        <div className="row">
          <div className="col">
            <div className="catList">
              <label className="text-uppercase formLabel d-block">Language</label>
              <SelectDropdown 
                options={languageOptions}
                selectedValues={this.props.selectedLanguages}
                onOptionSelect={this.props.onLanguageSelect}
                dropdownName="language"
                isMultiSelect={true}
                isSearchable={true}
              />
            </div>
          </div>
          <div className="col">
            <div className="catList">
              <label className="text-uppercase formLabel d-block">Channel</label>
              <SelectDropdown
              options={channelOptions}
              selectedValues={this.props.selectedChannels}
              onOptionSelect={this.props.onChannelSelect}
              dropdownName="channel"
              isMultiSelect={true}
              isSearchable={true}
               />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="catList">
              <label className="text-uppercase formLabel d-block">Topic code</label>
              <SelectDropdown 
                options={topicCodesOptions}
                selectedValues={this.props.selectedTopicCodes}
                onOptionSelect={this.props.onTopiCodeSelect}
                dropdownName="topic code"
                isMultiSelect={true}
                isSearchable={true}
              />
            </div>
          </div>
          <div className="col">
            <div className="catList">
              <label className="text-uppercase formLabel d-block">Destination</label>
              <SelectDropdown 
                options={destinationOptions}
                selectedValues={this.props.selectedDestinations}
                onOptionSelect={this.props.onDestinationSelect}
                dropdownName="destination"
                isMultiSelect={true}
                isSearchable={true}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="catList">
              <label className="text-uppercase formLabel d-block">Source</label>
              <SelectDropdown 
                // options={topicCodesOptions}
                selectedValues={this.props.selectedTopicCodes}
                onOptionSelect={this.props.onTopiCodeSelect}
                dropdownName="Source"
                isMultiSelect={true}
                isSearchable={true}
              />
            </div>
          </div>
          </div>
         {!this.props.isOpenedFromFilterOption ? <div className="close-icon" onClick={this.props.showHideAdvanceFilter} /> : null}
          
      </div>
    );
  }
}


export default AdvanceFilter;
