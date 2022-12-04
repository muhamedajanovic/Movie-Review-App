import React, { useState } from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Title from "../form/Title";
import Submit from "../form/Submit";
import { Link } from "react-router-dom";
import CustomLink from "../CustomLink";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "../form/FormContainer";

export default function Signup() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo);
  };

  const { name, email, password } = userInfo;

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title>Sign up</Title>
          <FormInput
            value={name}
            onChange={handleChange}
            label="Name"
            placeholder="John Doe"
            name="name"
          ></FormInput>
          <FormInput
            value={email}
            onChange={handleChange}
            label="Email"
            placeholder="someone@example.com"
            name="email"
          ></FormInput>
          <FormInput
            value={password}
            onChange={handleChange}
            label="Password"
            placeholder="*******"
            name="password"
            type="password"
          ></FormInput>
          <Submit value="Sign up" />

          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget password </CustomLink>
            <CustomLink to="/auth/signin">Sign in</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
