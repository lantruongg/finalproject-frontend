import React, {useState} from 'react'
import { NavLink } from 'react-router-dom';

const SignUp = () => {

    const [udata,seetUdata ] = useState({
        fname:"",
        email:"",
        mobile:"",
        password:"",
        cpassword:"",
    });
    console.log(udata);

   const adddata = (e) =>{
        const {name,value} = e.target;

        seetUdata((e)=>{
            return {
                ...udata,
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
                            <label htmlFor="fname">Your name</label>
                            <input type="text"
                            onChange={adddata}
                            name="fname" id="fname"/>
                        </div>
                        <div className="form_data">
                            <label htmlFor="email">Email</label>
                            <input type="text" 
                            onChange={adddata} value={udata.email}
                            name="email" id="email"/>
                        </div>
                        <div className="form_data">
                            <label htmlFor="number">Mobile</label>
                            <input type="text"
                            onChange={adddata} value={udata.number}
                            name="mobile" id="mobile"/>
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                            onChange={adddata} value={udata.password}
                            name="password" placeholder='at least 6 char' id="password"/>
                        </div>
                        <div className="form_data">
                            <label htmlFor="cpassword">Password Again</label>
                            <input type="password"
                            onChange={adddata} value={udata.cpassword}
                            name="cpassword" placeholder='at least 6 char' id="cpassword"/>
                        </div>
                        <button className='signin_btn'>Continue</button>
                        <div className="signin_info">
                            <p>Already have an accout?</p>
                            <NavLink to="/login">Sign in</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SignUp