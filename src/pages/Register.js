import React, { useState, useContext } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import { useForm } from "../utilities/hooks";

const RegisterUser = gql`
  mutation User(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String!
    $password: String!
    $subscribed: Boolean!
    $role: UserRoleType!
  ) {
    userRegister(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
      password: $password
      subscribed: $subscribed
      role: $role
    ) {
      _id
      email
      username
    }
  }
`;

const Register = () => {
  const context = useContext(AuthContext);

  let navigate = useNavigate();
  const registerUserCallback = () => {
    registerUser();
  };
  const [errors, setErrors] = useState([]);
  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    subscribed: false,
    role: "USER",
  });

  const [registerUser, { loading }] = useMutation(RegisterUser, {
    update(proxy, { data: { userRegister: userData } }) {
      context.login(userData);
      alert("Registered Successfully");
      navigate("login");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      password: values.password,
      subscribed: values.subscribed,
      role: values.role,
    },
  });

  return (
    <>
      {loading ? (
        <h3>Please wait loading.....</h3>
      ) : (
        <div className="formInput">
          <form onSubmit={onSubmit}>
            {errors.map((error) => (
              <h5>{error.message}</h5>
            ))}

            <h1>Register</h1>
            <label htmlFor="firstName">FirstName: </label>
            <input
              type="text"
              placeholder="FirstName...."
              id="firstName"
              name="firstName"
              value={values.firstName}
              onChange={onChange}
            />
            <label htmlFor="lastName">LastName: </label>
            <input
              type="text"
              id="lastName"
              placeholder="LastName...."
              name="lastName"
              value={values.lastName}
              onChange={onChange}
            />
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              placeholder="Email...."
              name="email"
              value={values.email}
              onChange={onChange}
            />
            <label htmlFor="phone">Phone: </label>
            <input
              type="text"
              id="phone"
              placeholder="Phone...."
              name="phone"
              value={values.phone}
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
              SignUp
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
