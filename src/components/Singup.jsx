import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

    const host = "http://127.0.0.1:5000";
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confPassword: "" });

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        // this type of destructuring can also be used
        const { name, email, password } = credentials;

        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            // this type of direct destructuring can also be used
            body: JSON.stringify({ name, email, password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success == true) {
            localStorage.setItem('token', json.authToken);
            navigate("/");
            props.showAlert("Account created succesfully", "success");
        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>

                {/* Don't know why value is not given here ? but values are given in login form */}

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} name="password" minLength={6} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="ConfPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confPassword" onChange={onChange} name="confPassword" minLength={6} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup;