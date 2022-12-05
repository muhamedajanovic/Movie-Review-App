import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import Submit from "../form/Submit";
import Title from "../form/Title";

const OTP_LENGHT = 6;
let currentOTPIndex;

export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGHT).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const inputRef = useRef();

  const { state } = useLocation();
  const user = state?.user;

  const navigate = useNavigate();

  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1);
  };
  const focusPrevInputField = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;
    setActiveOtpIndex(nextIndex);
  };

  const handleOtpChange = ({ target }, index) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[currentOTPIndex] = value.substring(value.length - 1, value.length);

    if (!value) focusPrevInputField(currentOTPIndex);
    else focusNextInputField(currentOTPIndex);
    setOtp([...newOtp]);
  };

  const handleKeyDown = ({ key }, index) => {
    currentOTPIndex = index;
    if (key === "Backspace") {
      focusPrevInputField(currentOTPIndex);
    }
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    if (!user) navigate("/not-foud");
  }, [user]);

  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses}>
          <div>
            <Title>Plese enter the OTP to verify your account</Title>
            <p className="text-center dark:text-dark-subtle text-light-subtle">
              OTP has been sent to your email
            </p>
          </div>
          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                  ref={activeOtpIndex === index ? inputRef : null}
                  key={index}
                  type="number"
                  value={otp[index] || ""}
                  onChange={handleOtpChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 border-2 rounded dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary bg-transparent outline-none transition text-center dark:text-white text-primary font-semibold text-xl spin-button-none"
                />
              );
            })}
          </div>
          <Submit value="Sign in" />
        </form>
      </Container>
    </FormContainer>
  );
}
