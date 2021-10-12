import { useRef } from "react";
import "./Start.css";

const Start = ({ setUsername }) => {

    const inputRef = useRef();

    const handleClick = () => {
        inputRef.current.value && setUsername(inputRef.current.value);
    };

    return (
        <div className="start">
            <input
                placeholder="Enter your name ..."
                className="startInput"
                ref={inputRef}
            />
            <button
                className="startButton"
                onClick={handleClick}
            >START</button>
            <div className="startRules">
                <h1 className="startRulesTitle">You should know:</h1>
                <p className="startRulesElement"><i className="fa fa-check"></i>1.000€ to gain</p>
                <p className="startRulesElement"><i className="fa fa-check"></i>10 questions to win</p>
                <p className="startRulesElement"><i className="fa fa-check"></i>30 seconds to answer</p>
            </div>
        </div >
    );
};

export default Start;
