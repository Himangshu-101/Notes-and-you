import React from "react";

function Alert(props) {

    const Capitalize = (word) => {
        if ( word == "danger"){
            word = "Error";
        }
        return word.charAt(0).toUpperCase() + word.slice(1);       // word.slice(1) will cut off the first indexed char in the string and return the remaining string
    }

    return (
        props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <strong style={{ WebkitUserSelect: 'none' }}>{Capitalize(props.alert.type)}</strong>: {props.alert.msg}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}

export default Alert;