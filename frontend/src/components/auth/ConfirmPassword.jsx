import React from "react";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

export default function ConfirmPassword() {
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-96"}>
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
    </FormContainer>
  );
}
