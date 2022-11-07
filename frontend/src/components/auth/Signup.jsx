import React from "react";
import Container from "../Container";
import FormInput from "../form/FormInput";
import Title from "../form/Title";
import Submit from "../form/Submit";
import { Link } from "react-router-dom";
import CustomLink from "../CustomLink";

export default function Signup() {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-72 space-y-6">
          <Title>Sign up</Title>
          <FormInput
            label="Name"
            placeholder="John Doe"
            name="name"
          ></FormInput>
          <FormInput
            label="Email"
            placeholder="someone@example.com"
            name="email"
          ></FormInput>
          <FormInput
            label="Password"
            placeholder="*******"
            name="password"
          ></FormInput>
          <Submit value="Sign up" />

          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget password </CustomLink>
            <CustomLink to="/auth/signin">Sign in</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
}
