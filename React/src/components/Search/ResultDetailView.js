import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { getSingleRecord } from '../../actions/searchAction';
import { Scrollbars } from 'react-custom-scrollbars';

class ResultDetailView extends Component {

    constructor(props){
        super(props);
        this.state = {
            jsonPrettyFormat: false,
        }
        this.props.getSingleRecord(this.props.recordId);
    }
    switchJsonFormat = (e, pretty) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            jsonPrettyFormat: pretty,
        })
    }
    
    render() {
        const resultData = this.props.result;
        const jsonData = resultData && resultData.singleResult && resultData.singleResult.docs &&
        resultData.singleResult.docs[0] &&
        resultData.singleResult.docs[0]._source ?
        resultData.singleResult.docs[0]._source : 'Loading the data...';
        const fileData = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonData));
        const fileName = jsonData && jsonData.headline ? (jsonData.headline).split(' ').join('_').toLowerCase() + '.json' : 'data.json';
        return (
            <div className="col h-100 pr-0 overFlowScroll itemDetailWrap arrow-right">
                <Scrollbars>
                <div className="itemResult mr-3">
                    <div className="resultSetHeader">
                        <div className="d-flex flex-column dateTimeColumn position-relative">
                            <div className="textLabel font500 text-uppercase">
                                {jsonData && jsonData.firstcreated ? moment(jsonData.firstcreated).format("DD/MM/YYYY hh:mm a") : '01/10/2020 4:33 PM'}
                            </div>
        <div className="textLabel">Edit No:{jsonData && jsonData.version ? jsonData.version : 'Not Available'}</div>
                            <div className="close-icon" onClick={this.props.closeDetailView}></div>
                        </div>
                        <div className="flex-auto d-flex flex-column item-title">

                            <div className="textLabel font500 text-uppercase">{jsonData && jsonData.slug ? jsonData.slug : 'Tech-ces/screens'}</div>
                            <div className="d-flex flex-row row">
                                <div className="col">
                                    <h3>{jsonData && jsonData.headline ? jsonData.headline : 'Loading The Data...'}</h3>
                                </div>
                                <div className="col-auto">
                                    <a className="link d-block" href={'data:'+ fileData} download={fileName} >Download File </a>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="resultText">
                        <div className="d-flex dataTabs">
                            <button onClick={(e, pretty) => this.switchJsonFormat(e, false)} className={this.state.jsonPrettyFormat ? 'text-uppercase btn' : 'text-uppercase btn active'}>Raw</button>
                            <button onClick={(e, pretty) => this.switchJsonFormat(e, true)} className={this.state.jsonPrettyFormat ? 'text-uppercase btn active' : 'text-uppercase btn'}>Prettify</button>
                        </div>
                        <div className="infoData">
                            {
                                this.state.jsonPrettyFormat ?
                                    <div className="prettifyData">
                                        <pre> {this.props ? JSON.stringify(jsonData, undefined, 2) : 'Loading The Data...'} </pre>
                                    </div> :

                                    <div className="rawData">
                                       {this.props ? JSON.stringify(jsonData) : 'Loading The Data...'}
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                </Scrollbars>
            </div>
        );
    }

}


const mapStateToProps = state => {
    return {
        result: state.singleRecord,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        getSingleRecord: (id) => dispatch(getSingleRecord(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultDetailView);