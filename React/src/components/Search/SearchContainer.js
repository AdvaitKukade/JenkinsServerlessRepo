import React, { Component } from 'react';
import SearchResult from './SearchResult';
import FilterContainer from './FilterContainer';
import SearchHeader from './SearchHeader';
import { connect } from "react-redux";
// import Loader from "../Common/Loader";
import { getSearchResult, getDownloadLink, exportData } from '../../actions/searchAction';
import * as filterActions from "../../actions/filterAction";

class SearchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showFilters: true,
            isSearchClicked: false,
            loaderState: false,
            fromfilter: false,
        }
    }

    getFilterPayload = (size) => {
        
        if(this.props.filter) {
            console.log('this.props.filter: ', this.props.filter);
            const sortArray = this.props.filter.selectedSortBy === "firstcreated" ?
            [{"key": "firstcreated", "value": "desc"}] : [];
            return {
                filters: {
                    sort: sortArray,
                    keyword: this.props.filter.keyword ? this.props.filter.keyword : "",
                    destination: this.props.filter.selectedDestinations ? this.props.filter.selectedDestinations.map(obj => obj.value) : [],
                    language: this.props.filter.selectedLanguages ? this.props.filter.selectedLanguages.map(obj => obj.value) : [],
                    channel: this.props.filter.selectedChannels ? this.props.filter.selectedChannels.map(obj => obj.value) : [],
                    date: {
                        from: this.props.filter.startDate ? this.props.filter.startDate.date : "",
                        to: this.props.filter.endDate ? this.props.filter.endDate.date : ""
                    },
                    type: this.props.filter.selectedMediaType ?  this.props.filter.selectedMediaType : [],
                    size: size ? size : (this.props.filter.selectedSampleCount ?  this.props.filter.selectedSampleCount : 20)
                }
            };
        }
        
    }

    searchClickHandler = () => {
        this.setState({
            ...this.state,
            showFilters: false,
            isSearchClicked: true,

        })

        this.props.getSearchResult(this.getFilterPayload());
    }

    clickOnDownloadLink = () => {
            this.props.getDownloadLink(this.getFilterPayload());
            // window.location.replace(this.props.downloadLink.link);
    }

    clickedOnExport = (email) => {
        this.props.exportData(this.getFilterPayload(), email);
    }

    showHideFilter = () => {
        this.setState({
            ...this.state,
            showFilters: !this.state.showFilters,
            fromfilter: !this.state.fromfilter,
        })
    }

    onSampleCountSelect = (selectedValue) => {
        
        this.props.setFilters({ ...this.props.filter,  selectedSampleCount: selectedValue.value})
        this.props.getSearchResult({...this.getFilterPayload(selectedValue.value)});

    }

    onSearchKey = (keyword) => {
        this.props.setFilters({ ...this.props.filter,  keyword: keyword});
    }

    renderWelcomeScreen = () => {
        if (!this.state.isSearchClicked) {
            return (
                <div className="container-fluid">
                    <div className="row position-relative  filterMainWrap">
                        <FilterContainer
                            searchClickHandler={this.searchClickHandler}
                            onSearchKey={this.onSearchKey}
                            keyword={this.props.filter.keyword}
                        />
                        <div className="col-sm-5 d-flex flex-column justify-content-center welcomeText">
                            <h1 className="primary-title">Welcome to the Reuters <br />Data Extraction Tool</h1>
                            <h3 className="secondary-title mb-0">Giving you the power and agility <br />to harness the world’s content</h3>
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        const selectedSampleArr = this.props.filter && this.props.filter.selectedSampleCount ? [{ label : `${this.props.filter.selectedSampleCount} Results`, value: this.props.filter.selectedSampleCount }] : null;
        return (
            // <div> <Loader loader={this.props.searchResult.length ? false : true} />
            <div className={`mainWrapper ${this.state.isSearchClicked ? "dataListWrapper" : ''}`}>
                {this.renderWelcomeScreen()}
                {this.state.isSearchClicked ? <SearchHeader
                    showFilters={this.state.showFilters}
                    showHideFilter={this.showHideFilter}
                    searchClickHandler={this.searchClickHandler}
                    fetchedCount={this.props.searchResult.docs ? this.props.searchResult.docs.length : 0}
                    totalCount={this.props.searchResult.totalCount ? this.props.searchResult.totalCount : 0}
                    selectedSampleCount={selectedSampleArr}
                    onSampleCountSelect={this.onSampleCountSelect}
                    clickOnDownloadLink={this.clickOnDownloadLink}
                    result= {this.props.searchResult}
                    onSearchKey={this.onSearchKey}
                    keyword={this.props.filter.keyword}
                /> : null}
                <div className={`container-fluid detailWrap ${this.state.isSearchClicked ? "" : "d-none"}`}>
                    <SearchResult
                    fromFilter={this.state.fromfilter}
                    result= {this.props.searchResult}
                    clickedOnExport= {this.clickedOnExport}
                    />
                </div>
            </div>
            // </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        searchResult: state.result.searchResult,
        filter: state.filter
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSearchResult: (payload) => dispatch(getSearchResult(payload)),
        setFilters: (payload) => dispatch(filterActions.setFilters(payload)),
        getDownloadLink: (payload) => dispatch(getDownloadLink(payload)),
        exportData: (payload, email) => dispatch(exportData(payload, email)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);