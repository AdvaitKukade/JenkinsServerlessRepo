import React from "react";

import moment from "moment";

const ResultRow = (props) => {
    return (
        <div className="resultSetItem d-flex" onClick={props.showDetailView}>
            <div className="flex-none d-flex flex-column dateTimeColumn text-right text-uppercase">
                <div className="textLabel">{moment(props.data.firstcreated).format("DD/MM/YYYY hh:mm a")}</div>
                <div className="font-size-xs light-grey">Edit No: {props.data.version}</div>
            </div>
            <div className="flex-auto d-flex flex-column item-title">
                <div className="textLabel text-uppercase">{props.data.slug ? props.data.slug : 'Tech-ces/screens'}</div>
                <h3>{props.data.headline}</h3>
            </div>
            <div className="flex-none d-flex">
                <div className="catItems textLabel text-uppercase">egf038</div>
                <div className="catItems textLabel text-uppercase">{props.data.language}</div>
                <div className="catItems textLabel text-uppercase">{props.data.channel.join(", ") || '-'}</div>
                <div className="catItems textLabel text-uppercase">{props.data.destination.join(", ")}</div>
            </div>
        </div>
    );
}


export default ResultRow;