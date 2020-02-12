import React, { Component } from 'react';
import SearchBar from './SearchBar';

import AdvanceFilter from './AdvanceFilter';
import * as commonActions from "../../actions/commonAction";
import * as filterActions from "../../actions/filterAction";
import { connect } from "react-redux";
import BasicFilter from './BasicFilter';

class FilterContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checkedItems: new Map(),
            showBasicFilter: true,
            showAdvanceFilter: false
        }

        this.props.getLanguages();
        this.props.getTopicCodes();
        this.props.getDestinations();
        this.props.getChannel();
        this.onMediaTypeChangeHandler = this.onMediaTypeChangeHandler.bind(this);
    }

    onStartDateChangeHandler = (date) => {

        this.props.setFilters({ ...this.props.filter, startDate: { ...this.props.filter.startDate, date: date }, endDate: { ...this.props.filter.endDate, minDate: date } })

    }

    onEndDateChangeHandler = (date) => {

        this.props.setFilters({ ...this.props.filter, endDate: { ...this.props.filter.endDate, date: date }, startDate: { ...this.props.filter.startDate, maxDate: date } });
    }

    onSampleCountChangeHandler = (e, SampleCount) => {
        this.props.setFilters({ ...this.props.filter, selectedSampleCount: e.target.value });
    }

    onMediaTypeChangeHandler = (e, MediaType) => {
        const item = MediaType;
        const isChecked = e.target.checked;
        this.state.checkedItems.set(item, isChecked);
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
        let selectedMediaTypes = [];
        [...this.state.checkedItems].map(i => {
            return (i[1] ? selectedMediaTypes.push(i[0]) : '')
        });
        this.props.setFilters({ ...this.props.filter, selectedMediaType: selectedMediaTypes });
    }


    showHideAdvanceFilter = () => {
        this.setState({
            ...this.state,
            showAdvanceFilter: !this.state.showAdvanceFilter
        })
    }

    onLanguageSelect = (selectedOptions) => {
        this.props.setFilters({ ...this.props.filter, selectedLanguages: selectedOptions });
    }

    onChannelSelect = (selectedOptions) => {
        this.props.setFilters({ ...this.props.filter, selectedChannels: selectedOptions });

    }

    onTopiCodeSelect = (selectedOptions) => {
        this.props.setFilters({ ...this.props.filter, selectedTopicCodes: selectedOptions });

    }

    onDestinationSelect = (selectedOptions) => {
        this.props.setFilters({ ...this.props.filter, selectedDestinations: selectedOptions });
    }

    onSampleCountSelect = (selectedValue) => {
        this.props.setFilters({ ...this.props.filter, selectedMediaTypes: selectedValue });
    }
    onSortBySelect = (selectedValue) => {
        this.props.setFilters({ ...this.props.filter, selectedSortBy: selectedValue });
    }
    onSortByChangeHandler = (e, res) => {
        this.props.setFilters({ ...this.props.filter, selectedSortBy: e.target.value });
    }

    renderFilterForHomepage = () => {
        return (
            <React.Fragment>
                <div className="innerFilterWrap">
                    <div className="row">
                        <div className="col pr-0">
                            <SearchBar
                                showHideFilterOption={this.showHideFilterOption}
                                onSearchKey={this.props.onSearchKey}
                                keyword={this.props.keyword}
                            />
                            <BasicFilter
                                common={this.props.common}
                                onEndDateChangeHandler={this.onEndDateChangeHandler}
                                onStartDateChangeHandler={this.onStartDateChangeHandler}
                                startDate={this.props.filter.startDate}
                                endDate={this.props.filter.endDate}
                                selectedSampleCount ={this.props.filter.selectedSampleCount}
                                selectedMediaType ={this.props.filter.selectedMediaType}
                                onSampleCountChangeHandler={this.onSampleCountChangeHandler}
                                onMediaTypeChangeHandler={this.onMediaTypeChangeHandler}
                                showHideAdvanceFilter={this.showHideAdvanceFilter}
                                searchClickHandler={this.props.searchClickHandler}
                                isOpenedFromFilterOption={false}
                                onSortBySelect={this.onSortBySelect}
                                onSortByChangeHandler={this.onSortByChangeHandler}
                                selectedSortBy={this.props.filter.selectedSortBy}
                            />
                        </div>
                    </div>
                </div>
                {/* {this.state.showAdvanceFilter ? ( */}
                    <div className="innerFilterWrap advanceFilterWrap">
                        <div className="row">
                            <div className="col">
                                <AdvanceFilter
                                    showHideFilterOption={this.showHideFilterOption}
                                    showFilters={this.state.showFilters}
                                    showHideAdvanceFilter={this.showHideAdvanceFilter}
                                    common={this.props.common}
                                    onLanguageSelect={this.onLanguageSelect}
                                    onChannelSelect={this.onChannelSelect}
                                    onTopiCodeSelect={this.onTopiCodeSelect}
                                    onDestinationSelect={this.onDestinationSelect}
                                    selectedLanguages={this.props.filter.selectedLanguages}
                                    selectedDestinations={this.props.filter.selectedDestinations}
                                    selectedTopicCodes={this.props.filter.selectedTopicCodes}
                                    selectedChannels={this.props.filter.selectedChannels}
                                    isOpenedFromFilterOption={false}
                                />
                            </div>
                        </div>
                    </div>
            </React.Fragment>
        )
    }

    renderFilterForFilterOption = () => {
        return (<div className="innerFilterWrap">
            <div className="row">
                <div className="col-7">
                    <BasicFilter
                        common={this.props.common}
                        onEndDateChangeHandler={this.onEndDateChangeHandler}
                        onStartDateChangeHandler={this.onStartDateChangeHandler}
                        startDate={this.props.filter.startDate}
                        endDate={this.props.filter.endDate}
                        selectedSampleCount ={this.props.filter.selectedSampleCount}
                        selectedMediaType ={this.props.filter.selectedMediaType}
                        onSampleCountChangeHandler={this.onSampleCountChangeHandler}
                        onMediaTypeChangeHandler={this.onMediaTypeChangeHandler}
                        showHideAdvanceFilter={this.showHideAdvanceFilter}
                        searchClickHandler={this.props.searchClickHandler}
                        isOpenedFromFilterOption={true}
                        onSortBySelect={this.onSortBySelect}
                        onSortByChangeHandler={this.onSortByChangeHandler}
                        selectedSortBy={this.props.filter.selectedSortBy}
                    />
                </div>
                <div className="col-5">
                    <AdvanceFilter
                        showHideFilterOption={this.showHideFilterOption}
                        showFilters={this.state.showFilters}
                        showHideAdvanceFilter={this.showHideAdvanceFilter}
                        common={this.props.common}
                        onLanguageSelect={this.onLanguageSelect}
                        onChannelSelect={this.onChannelSelect}
                        onTopiCodeSelect={this.onTopiCodeSelect}
                        onDestinationSelect={this.onDestinationSelect}
                        selectedLanguages={this.props.filter.selectedLanguages}
                        selectedDestinations={this.props.filter.selectedDestinations}
                        selectedTopicCodes={this.props.filter.selectedTopicCodes}
                        selectedChannels={this.props.filter.selectedChannels}
                        isOpenedFromFilterOption={true}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="buttonWrap d-flex justify-content-end align-items-center">
                        <button className="btn primary-btn" onClick={this.props.searchClickHandler}>Search</button>
                    </div>
                </div>
            </div>
        </div>)
    }

    render() {
    
        return (
            <div className={`${!this.props.isOpenedFromFilterOption ? "col-sm-7" : "col" } ${this.state.showAdvanceFilter ? "showAdFilter" : null}`}>
                {this.props.isOpenedFromFilterOption ? this.renderFilterForFilterOption() : this.renderFilterForHomepage()}
            </div>
        )
    }


}

const mapStateToProps = state => {
    return {
        common: state.common,
        filter: state.filter
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getLanguages: () => dispatch(commonActions.getLanguagesAction()),
        getChannel: () => dispatch(commonActions.getChannel()),
        getTopicCodes: () => dispatch(commonActions.getTopicCodes()),
        getDestinations: () => dispatch(commonActions.getDestinations()),
        setFilters: (payload) => dispatch(filterActions.setFilters(payload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer);
