import React, { useState, useContext } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../utilities/hooks";

const LoginUser = gql`
  mutation UserLogged($email: String!, $password: String!) {
    login(
      email: $email

      password: $password
    ) {
      userId
      token
    }
  }
`;

const Login = () => {
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  const loginUserCallback = () => {
    loginUser();
  };

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LoginUser, {
    update(proxy, { data: { login: userData } }) {
      context.login(userData);
      alert("logged in successfully");
      navigate("/campaign");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: {
      email: values.email,
      password: values.password,
    },
  });

  return (
    <>
      {loading ? (
        <h3>Please wait loading....</h3>
      ) : (
        <div className="formInput">
          <form onSubmit={onSubmit}>
            {errors.map((error) => (
              <h5>{error.message}</h5>
            ))}
            <h1>LogIn</h1>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              placeholder="Email...."
              name="email"
              value={values.email}
              onChange={onChange}
            />

            <label htmlFor="pwd">Password: </label>
            <input
              type="password"
              id="pwd"
              placeholder="Password...."
              name="password"
              value={values.password}
              onChange={onChange}
            />
            <button className="btn1" type="submit">
              Login
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
