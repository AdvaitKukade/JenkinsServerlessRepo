import React, { Component } from "react";
import SearchBar from "./SearchBar";
import FilterContainer from "./FilterContainer";
import { connect } from "react-redux";
import { numberWithCommas } from "../../Utility";
import SelectDropdown from "../Common/SelectDropdown";


class SearchHeader extends Component {
    constructor(props) {
        super(props);
        this.state ={
                        isModalOpened: false,
                        link: '',
                        data: null,
                        fetchedCount: (props.result && props.result.docs ? props.result.docs.length : 0),
                    }
    }
    static getDerivedStateFromProps(props, state) {
        console.log('props:', props);
        console.log('state:', state);
            if(props && props.downloadLink && props.downloadLink.length && (state.link !== props.downloadLink )){
                var link = document.createElement('a');
                link.href = props.downloadLink;
                document.body.appendChild(link);
                link.click();
            }
            return {
                ...state,
                link:props.downloadLink,
            };
      }
    showModalView = () => {
        new Promise(() => {
            this.props.clickOnDownloadLink();
          }).then(() => {
            window.location.replace(this.props.downloadLink.link);
            
          });
    }
    closeModal = () => {
        this.setState({
                isModalOpened: false
            })
    }



    render() {
    console.log('fetchedCount:', this.props);
    const options = [{
        label: '20 Results',
        value: 20
    }, 
    {
        label: '40 Results',
        value: 40
    },
    {
        label: '60 Results',
        value: 60
    },
    {
        label: '80 Results',
        value: 80
    },
    {
        label: '100 Results',
        value: 100
    }];
    
    return (
        <div className={`container-fluid stickyHeader`}>
            <div className="row">
                <div className="col-sm-9 position-relative">
                    <div className="row">
                        <div className="col">
                            <SearchBar
                                searchClickHandler={this.props.searchClickHandler}
                                onSearchKey={this.props.onSearchKey}
                                keyword={this.props.keyword}
                            />
                        </div>
                        <div className="col-2 singleSelect">
                            
                            <SelectDropdown 
                                options={options}
                                selectedValues={this.props.selectedSampleCount}
                                onOptionSelect={this.props.onSampleCountSelect}
                                dropdownName="Count"
                                isMultiSelect={false}
                                isSearchable={false}
                            />
                        </div>
                        <div className="col-auto">
                            <button onClick={this.props.showHideFilter} className={`btn secondary-btn text-uppercase downArrow ${this.props.showFilters ? "openFilterBtn": ""}`}>More Filters</button>
                        </div>
                        <div className="col-sm-12">
                            <p className="resultCount">{numberWithCommas(this.props.fetchedCount)} of {numberWithCommas(this.props.totalCount)} items</p>
                        </div>
                    </div>
                    <div className="row filterMainWrap">
                        {this.props.showFilters ?
                        <FilterContainer
                            searchClickHandler={this.props.searchClickHandler}
                            isOpenedFromFilterOption={true}
                            onSearchKey={this.props.onSearchKey}
                            keyword={this.props.keyword}
                        /> : null}
                    </div>
                </div>
                <div className="col text-right">
                    <button onClick={this.showModalView} className="btn primary-btn text-uppercase">Download Sample</button>
                    {/* <button onClick={this.showModalView} disabled={this.state.fetchedCount ? false : true} className="btn primary-btn text-uppercase">Download Sample</button> */}

                </div>
            </div>



            <div className={`modal fade ${this.state.isModalOpened ? 'd-flex' : 'd-none' } align-items-center show`} id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-body">
                        <p className="font-size-lg text-center mb-4">Please confirm the Download</p>
                        <div className="d-flex align-items-center justify-content-end">
                            <button className="link mr-4" onClick={(e) => this.closeModal(e)} >Cancel</button>
                            <a id='link_click' href={this.state.link || '#'} onClick={this.closeModal} className="btn primary-btn">Confirm</a>
                            
                        </div>
                    </div>
                    
                    </div>
                </div>
            </div>




        </div>
    )
    }
}

const mapStateToprops = state => {
    return {
        downloadLink: state.downloadLink.link
    };
};

export default connect(mapStateToprops, null )(SearchHeader);