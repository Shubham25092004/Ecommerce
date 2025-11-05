
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const RegisterPage = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password,setPassword] = useState()

  const navigate = useNavigate()


  function handleRegister(event){
    event.preventDefault()
    let flag = 0
    const formData = {
      name:name,
      email:email,
      password:password
    }
    localStorage.setItem('b63User', JSON.stringify(formData))
    flag=1
    if(flag == 1){
      toast("successfully Register ...")
    navigate('/login')
    }else{
      toast("Error while register")
      navigate('/register')
    }


  }
  return (
    
    <section>
      <div className="container py-5 mt-5">
        <div className="row mx-auto">
          <div className="col-12  col-md-6">
            <div className="w-50 mx-auto bg-secondary h-100 rounded-circle"></div>
          </div>
          <div className="col-12 col-md-6 ">
            <form className="w-75 border rounded p-5 bg-warning" onSubmit={handleRegister}>
              <h3 className="mb-4">Register here</h3>

              <div className="mb-3">
                <label for="exampleInputName1" class="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName1"
                  onChange={(e)=>setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>

              <button type="submit" class="btn btn-primary">
                Register
              </button>
              <Link to="/login" className="ms-3">
                already registered
              </Link>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default RegisterPage
