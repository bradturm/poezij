import React from 'react';
import { Knob } from 'primereact/knob';
import 'primereact/resources/primereact.css';
//import '../../css/vol-knob.css';

import { accountService } from '../../services/account-service';

export default function Dashboard(

    progress

) {

    const user = accountService.userValue;

    return (
        <>
            <div>
                <div className="container">
                    <h1>Your Journey</h1>
                    <p>You're doing well!</p>
                </div>
                <Knob className="progress-knob"
                    value={40}
                    min={0}
                    max={100}
                    strokeWidth={2}
                    size={150}
                    valueColor={"#5b0eeb"}
                    rangeColor={"#c9d3e5"}
                    showValue={true}
                />
            </div>
        </>
    )
}