import React from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        test: state.Test
    };
};

const TestGraph = (props) => {
    return (
        <Line
            data={{
                labels: props.test.results.map(e => new Date(e.date).toLocaleTimeString()),
                datasets: [
                    {
                        label: 'download',
                        fill: false,
                        borderColor: 'red',
                        lineTension: 0.1,
                        data: props.test.results.map(e => (e.download / 8).toFixed(2))
                    },
                    {
                        label: 'upload',
                        fill: false,
                        borderColor: 'blue',
                        lineTension: 0.1,
                        data: props.test.results.map(e => (e.upload / 8).toFixed(2))
                    }
                ]
            }}
        />
    )
}

export default connect(mapStateToProps)(TestGraph);