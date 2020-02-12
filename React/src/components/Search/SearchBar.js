import React, { Component } from 'react';

class SearchBar extends Component {
    getKeyword = () => {
        // e.persist()
        // console.log('getKeyword:', e);
        // console.log('getKeyword:', res);
        const keyword = document.getElementById("searchInput").value
        if (keyword.length){
            console.log('getKeyword:', keyword);
            this.props.onSearchKey(keyword);
        }
    }
    render() {
        console.log(this.props);
        return (
            <div className="searchBar position-relative">
                <input
                    id="searchInput"
                    className="form-control"
                    placeholder="Search Keyword"
                    onChange={() => this.getKeyword()}
                    value={this.props.keyword}
                />
                <div className="icon-search position-absolute"></div>
                {/* <div>
                    <button className="btn btn-filter position-relative text-uppercase" onClick={this.props.showHideFilterOption}>Filter <div className="icon-ctrl"></div></button>
                </div> */}
            </div>
        );
    }

}

export default SearchBar;