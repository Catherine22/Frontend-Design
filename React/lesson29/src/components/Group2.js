import React, {Component} from 'react';
import PropTypes from "prop-types";

class Group2 extends Component {
    static contextTypes = {
        data: PropTypes.any
    };

    render() {
        return (
            <div>{this.context.data.name}</div>
        );
    }
}

export {Group2};
