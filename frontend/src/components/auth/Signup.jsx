import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../Container";
import FormInput from "../form/FormInput";
import Title from "../form/Title";
import Submit from "../form/Submit";
import { Link } from "react-router-dom";
import CustomLink from "../CustomLink";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "../form/FormContainer";
import { createUser } from "../../api/auth";

const validateUserInfo = ({ name, email, password }) => {
  if (!name.trim()) return { ok: false, error: "Name is missing!" };
  if (!/^[a-z A-Z]+$/.test(name)) return { ok: false, error: "Invalid name!" };

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password should be longer than 8 characters!" };

  return { ok: true };
};

export default function Signup() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return console.log(error);

    const response = await createUser(userInfo);
    if (response.error) return console.log(response.error);
    navigate("/auth/verification", {
      state: { user: response.user },
      replace: true,
    });
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
