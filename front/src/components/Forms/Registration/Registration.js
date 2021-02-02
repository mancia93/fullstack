import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import {
  StyledFormSection,
  StyledForm,
  StyledDiv,
  StyledInput,
  StyledLabel,
  StyledError,
  StyledButton,
} from "../Styled";


const Registration = () => {
  const { redirectLogin, submitRegistrationForm, isAuthenticated } = useContext(
    AuthContext
  );
  const { register, errors, watch, handleSubmit } = useForm();

  const redirectToLogin = () => <Redirect to="/login" />;

  return redirectLogin || isAuthenticated ? (
    redirectToLogin()
  ) : (
    <StyledFormSection>
      <h2>Register New Account!</h2>
      <p>
        Please fill in your information to create your account
      </p>
      <StyledForm
        onSubmit={handleSubmit(submitRegistrationForm)}
      >
        <StyledDiv>
          <StyledLabel htmlFor="firstname">
            First Name
          </StyledLabel>
          <StyledInput
            type="text"
            name="firstname"
            placeholder="Enter your first name"
            ref={register({ required: true })}
          />
          {errors.firstname && (
            <StyledError>First Name is required!</StyledError>
          )}
        </StyledDiv>
        <StyledDiv>
          <StyledLabel htmlFor="lastname">
            Last Name
          </StyledLabel>
          <StyledInput
            type="text"
            name="lastname"
            placeholder="Enter your last name"
            ref={register({ required: true })}
          />
          {errors.lastname && <StyledError>Last Name is required!</StyledError>}
        </StyledDiv>

        <StyledDiv>
          <StyledLabel htmlFor="email">
            Email
          </StyledLabel>
          <StyledInput
            type="email"
            name="email"
            placeholder="Enter your email"
            ref={register({
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <StyledError>Email is required!</StyledError>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <StyledError>Email format is wrong!</StyledError>
          )}
        </StyledDiv>
        <StyledDiv>
          <StyledLabel htmlFor="password">
            Password
          </StyledLabel>
          <StyledInput
            type="password"
            name="password"
            placeholder="Enter your password"
            ref={register({ required: true, minLength: 6 })}
          />
          {errors.password && (
            <StyledError>
              Password needs to be at least 6 characters long!
            </StyledError>
          )}
        </StyledDiv>
        <StyledDiv>
          <StyledLabel htmlFor="verifyPassword">
            Verify Password
          </StyledLabel>
          <StyledInput
            type="password"
            name="verifyPassword"
            placeholder="Verify your password"
            ref={register({
              required: true,
              validate: (value) => value === watch("password"),
            })}
          />
          {errors.verifyPassword && (
            <StyledError>Passwords don't match!</StyledError>
          )}
        </StyledDiv>

        <StyledDiv>
          <StyledButton type="submit">
            Register
          </StyledButton>
        </StyledDiv>
      </StyledForm>
    </StyledFormSection>
  );
};

export default Registration;