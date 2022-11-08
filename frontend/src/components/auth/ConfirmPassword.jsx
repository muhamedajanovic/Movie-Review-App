import React from "react";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

export default function ConfirmPassword() {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-96 space-y-6">
          <Title>Please Enter New Password</Title>
          <FormInput
            type="password"
            label="New Password"
            placeholder="********"
            name="password"
          ></FormInput>
          <FormInput
            type="password"
            label="Confirm Password"
            placeholder="********"
            name="confirmPassword"
          ></FormInput>
          <Submit value="Confirm Password" />
        </form>
      </Container>
    </div>
  );
}
