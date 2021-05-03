import React from "react";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";

export const UserMessages = ({ message: { user, text }, name }) => {
    let boolUser = false;
    const formatName = name.trim().toLowerCase()
    if (user === formatName) {
        boolUser = true
    }

    return (
        boolUser ? (<div style={{ background: "greenyellow", textAlign: "left" }}>
            <div>
                <p><Chip label={text} color="primary"/></p>
                
            </div>
            <p style={{ fontSize: "16px", color: "grey" }}>Sent by: <Chip label={formatName} /></p>
        </div>
        ) : (<div style={{ background: "yellow", textAlign: "right" }}>
            <div>
            <p><Chip label={text} color="primary"/></p>
            </div>
            <p style={{ fontSize: "16px", color: "grey" }}>Sent by: <Chip label={formatName} /></p>
        </div>
            )
    )

};
