import React, {useState} from 'react'
import "./signup.css"
import { NavLink } from 'react-router-dom';

const SignIn = () => {

    const [logdata,setData] = useState({
        email: "",
        password: ""
    });
    console.log(logdata);

    const adddata = (e) => {
        const {name,value} = e.target;

        setData(()=>{
            return {
                ...logdata,
                [name]: value
            }
        })
    }
    return (
        <section>
            <div className="sign_container">
                <div className="sign_header">
                    <img src="./blacklogoamazon.png" alt="signupimg" />
                </div>
                <div className="sign_form">
                    <form>
                        <h1>Sign-In</h1>
                        <div className="form_data">
                            <label htmlFor="email">Email</label>
                            <input type="text"
                            onChangge={adddata}
                            value={logdata.email}
                            name="email" id="email"/>
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                            onChange={adddata}
                            value={logdata.password}
                            name="password" placeholder='at least 6 char' id="password"/>
                        </div>
                        <button className='signin_btn'>Continue</button>
                    </form>
                </div>
                <div className="create_accountinfo">
                    <p>New to Amazon</p>
                    <button>  <NavLink to="/register">Create your Amazon Account</NavLink></button>
                </div>
            </div>
        </section>
    )
}

export default SignIn