import React from 'react';

const Loader = (props) => {
    return (
<div class={`pageLoader ${props.loader ? 'd-flex' : 'd-none'} align-items-center justify-content-center`}>
    <div class="icon-spinner animate-spin animation-duration-0-7 animation-iteration-count-infinite animation-timing-function-linear">
    </div>
</div>
    );
}

export default Loader;
