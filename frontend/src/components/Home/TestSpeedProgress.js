import React from 'react';
import GaugeChart from 'react-gauge-chart'

const TestSpeedProgress = (props) => {
    let value = 0;
    if(props.upload === 0)
        value = props.download/25;
    else
        value = props.upload/25;

    return(
        <div className="test-speed-progress">
            <GaugeChart id="gauge-chart" 
                nrOfLevels={15}
                hideText={true}
                animate={false}
                percent={value}
                colors={["#FF5F6D", "#00FF00"]} 
            />
        </div>
    )
}

export default TestSpeedProgress;