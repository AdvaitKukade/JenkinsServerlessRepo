import React, { Component } from 'react';
import ResultRow from './ResultRow';
import { connect } from "react-redux";
import ResultDetailView from './ResultDetailView';
import { getSingleRecord } from '../../actions/searchAction';
import { numberWithCommas } from "../../Utility";
import { get, orderBy } from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';

class SearchResult extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            isItemOpened: this.props.fromFilter,
            recordId:null,
            isModalOpened: false,
            isSaveChanges: false,
            titleOrderBy: true, // true: asc, false: desc
            dateOrderBy: true,
            langOrderBy: true,
        }
    }

    calculatePercentage = (fetchedCount, totalCount) => {
        if(totalCount > 0) {
            return ((fetchedCount/totalCount) * 100).toFixed(2);
        }
        return 0;
    }

    showDetailView = (id, index) => {
        this.props.result.docs = this.shiftToTop(this.props.result.docs, index, 0);
        document.body.scrolltop = -1;
        document.documentElement.scrollTop = -1;
        this.props.getSingleRecord(id);
        this.setState({
            ...this.state,
            isItemOpened: true,
            recordId: id
        })
    }
    showModalView = () => {
        document.getElementById("email").value = '';
        this.setState({
            ...this.state,
            isModalOpened: !this.state.isModalOpened
        })
    }
    toggle = () => {
        this.setState({ isSaveChanges: !this.state.isSaveChanges })
    }
    showSaveChangesNote = () => {
        const email = document.getElementById("email").value;
        if(email.length){
        this.props.clickedOnExport(email);
            this.setState({
                ...this.state,
                isSaveChanges: !this.state.isSaveChanges,
                isModalOpened: false
            })
            setTimeout(this.toggle, 5000);
        }
    }
    closeDetailView = () => {
        this.setState({
            ...this.state,
            isItemOpened: false
        })
    }

    shiftToTop(dataSet, position, topPosition = 0) {
        while (position < 0) {
            position += dataSet.length;
        }
        while (topPosition < 0) {
            topPosition += dataSet.length;
        }
        if (topPosition >= dataSet.length) {
            var k = topPosition - dataSet.length;
            while ((k--) + 1) {
                dataSet.push(undefined);
            }
        }
        dataSet.splice(topPosition, 0, dataSet.splice(position, 1)[0]);  
       return dataSet;
    }
    sort(key){
        if(key === 'title'){
        this.setState({
            ...this.state,
            titleOrderBy: !this.state.titleOrderBy,
        });
        this.props.result.docs = orderBy(this.props.result.docs, ['_source.headline'],[this.state.titleOrderBy ? 'asc' : 'desc']);
        }else if(key === 'date'){
            this.setState({
                ...this.state,
                dateOrderBy: !this.state.dateOrderBy,
            });
            this.props.result.docs = orderBy(this.props.result.docs, ['_source.firstcreated'],[this.state.dateOrderBy ? 'asc' : 'desc']);
        } else if(key === 'language'){
            this.setState({
                ...this.state,
                langOrderBy: !this.state.langOrderBy,
            });
            this.props.result.docs = orderBy(this.props.result.docs, ['_source.language'],[this.state.langOrderBy ? 'asc' : 'desc']);
        }
    }

    render() {
        const fetchedCount = this.props.result && this.props.result.docs ? this.props.result.docs.length : 0;
        let con = get(this.props.result, 'docs[0]._source') || null;
        console.log('con:-----', con);
        console.log('this.state: ', this.state);
        const totalCount = this.props.result && this.props.result.totalCount ? this.props.result.totalCount : 0;
        return (
            <div className={`resultSet h-100 ${this.state.isItemOpened ? "openItemDetails" : ""}`}>
                <div className="row h-100">
                    <div className="col pr-0 h-100 overFlowScroll">
                    <Scrollbars>
                        <div className="resultSetList mr-3">
                            <div className="resultSetItem tableHead d-flex">
                                <div onClick={(key) => this.sort('date')} className="flex-none d-flex flex-row dateTimeColumn align-items-center">
                                    <div className="textLabel ">Date</div>
                                    <div className="sort">
                                        <span className="arrow-up"></span>
                                        <span className="arrow-down"></span>
                                    </div>

                                </div>
                                <div onClick={(key) => this.sort('title')} className="flex-auto d-flex flex-row item-title align-items-center">
                                    <div className="textLabel ">Title</div>
                                    <div className="sort">
                                        <span className="arrow-up"></span>
                                        <span className="arrow-down"></span>
                                    </div>
                                </div>
                                <div className="flex-none d-flex align-items-center">
                                    <div className="catItems textLabel text-uppercase d-flex align-items-center">
                                        <div>Topic Code</div>
                                        {/* <div className="sort">
                                            <span className="arrow-up"></span>
                                            <span className="arrow-down"></span>
                                        </div> */}
                                    </div>
                                    <div onClick={(key) => this.sort('language')} className="catItems textLabel text-uppercase d-flex align-items-center">
                                        <div>Language</div>
                                        <div className="sort">
                                            <span className="arrow-up"></span>
                                            <span className="arrow-down"></span>
                                        </div>
                                    </div>
                                    <div className="catItems textLabel text-uppercase d-flex align-items-center">
                                        <div>Channels</div>
                                        {/* <div className="sort">
                                            <span className="arrow-up"></span>
                                            <span className="arrow-down"></span>
                                        </div> */}
                                    </div>
                                    <div className="catItems textLabel text-uppercase d-flex align-items-center">
                                        <div>Destination</div>
                                        {/* <div className="sort">
                                            <span className="arrow-up"></span>
                                            <span className="arrow-down"></span>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            {this.props.result && this.props.result.docs ? this.props.result.docs.map((obj, index) =>
                                <ResultRow
                                    data={obj._source}
                                    key={obj._id}
                                    showDetailView={(id) => this.showDetailView(obj._id, index)}
                                />
                            ) :
                            <h3 className="secondary-title center mb-0">Loading Data...</h3>
                            }
                        </div>
                        </Scrollbars>
                    </div>
                    {this.state.isItemOpened ? <ResultDetailView recordId={this.state.recordId} closeDetailView={this.closeDetailView} /> : null}
                </div>
                
                <div className="exportFullDataWrap">
                    <div className={`alert alert-info fade-slow ${this.state.isSaveChanges ? 'd-flex' : 'd-none' }`} role="alert">
                        Your file is being exported, you should receive an email shortly with a link to the file
                    </div>
                    <div className="d-flex justify-content-end align-items-center">
                        <p className="m-0">Showing {this.calculatePercentage(fetchedCount, totalCount)}% of {numberWithCommas(totalCount)}</p> <button className="btn primary-btn" data-toggle="modal" data-target="#exampleModal" onClick={this.showModalView}>Export Full Data</button>
                    </div>
                </div>
                
                <div className={`modal fade ${this.state.isModalOpened ? 'd-flex' : 'd-none' } align-items-center show`} id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-body">
                            <p className="font-size-lg text-center mb-4">You will receive a link to the export via email, enter your email to receive a link to the exported file</p>
                            <label className="formLabel text-uppercase">Email</label>
                            <input className="form-control" name="email" id="email" type="email" placeholder="Enter your email" />
                            <div className="d-flex align-items-center justify-content-end">
                                <div className="link mr-4" onClick={this.showModalView} >Cancel Export</div>
                                <button type="button" className="btn primary-btn" onClick={this.showSaveChangesNote}>Save changes</button>
                            </div>
                        </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapDispatchToProps = dispatch => {
    return {
        getSingleRecord: (id) => dispatch(getSingleRecord(id)),
    };
};

export default  connect(null, mapDispatchToProps)(SearchResult);