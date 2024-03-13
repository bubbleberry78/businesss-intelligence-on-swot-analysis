import React from "react";
import './cards.css';



const SWOTcard =({letter,title,description,icon})=>{
    return(
        <div className="swot-card">
            <div className="icons" style={{ backgroundImage: `url(${icon})` }}></div>
            <div className="letter">{letter}</div>
            <div className="title">{title}</div>
            <div className="description">{description}</div>
        </div>
    );
}

export default SWOTcard;