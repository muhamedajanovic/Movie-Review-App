import React from "react";
import { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { useSearchParams } from "react-router-dom";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

export default function ConfirmPassword() {
  const [isVerifying, setIsVerifying] = useState(true);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  if (isVerifying)
    return (
      <FormContainer>
        <Container>
          <div className="flex flex-col gap-6 space-x-2 items-center ">
            <h1 className="text-4xl font-semibold dark:text-white text-primary">
              Please wait, we are verifying your token
            </h1>
            <ImSpinner3 className="animate-spin text-4xl dark:text-white text-primary" />
          </div>
        </Container>
      </FormContainer>
    );

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
