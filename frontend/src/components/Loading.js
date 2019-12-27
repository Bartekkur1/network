import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Home.css";

const mapStateToProps = (state) => {
    return {
        loading: state.Loading
    };
};

class Loading extends Component {
    render() {
        if (this.props.loading) {
            return (
                <div className="loading-container">
                    <div className="gif-container">
                        <img alt="logo" className="loading-gif" src={process.env.PUBLIC_URL + '/loading.svg'}></img>
                    </div>
                </div>
            )
        } else {
            return (<span />)
        }
    }
}

export default connect(mapStateToProps)(Loading);