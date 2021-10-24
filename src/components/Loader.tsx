import React, {Component} from 'react';

class Loader extends Component {
    render() {
        return (
            <div
                className="bg-gray-400 bg-opacity-50 w-full h-full fixed top-1/2 left-1/2 transform translate-x-half translate-y-half flex justify-center items-center w-full">
                        <span className="flex items-center h-3 w-3 relative mr-3">
                            <span
                                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-600 opacity-75"/>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-700"/>
                        </span>
                <span>Loading</span>
            </div>
        );
    }
}

export default Loader;
