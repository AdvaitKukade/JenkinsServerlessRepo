import React from 'react';
import Header from './Common/Header';
import SearchContainer from './Search/SearchContainer';

const Dashboard = () => {
    return (
        <React.Fragment>
            <Header />
            <SearchContainer />
            <div className="pageLoader d-none align-items-center justify-content-center">
                <div className="icon-spinner animate-spin animation-duration-0-7
            animation-iteration-count-infinite animation-timing-function-linear"></div>
            </div>
        </React.Fragment>
    );
}

export default Dashboard;