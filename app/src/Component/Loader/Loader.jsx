import React from 'react';
import loader from '../../Asset/Loader/loader.svg'

function Loader(props) {
    return (
        <>
            <div>
                <img className="loadingAnimation" src={loader}/>
            </div>
        </>
    );
}

export default Loader;