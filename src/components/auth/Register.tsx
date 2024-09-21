import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { z } from "zod";
import { useAuth } from "../../hooks/useAuth";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  height: 100%;
  margin-top: 200px;
`;

const FormWrapper = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease;
  width: 600px;
`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #333;
`;

const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: ${(props) => (props.error ? "0.5rem" : "1rem")};
  border: 1px solid ${(props) => (props.error ? "red" : "#ddd")};
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: ${(props) => (props.error ? "red" : "#007BFF")};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;


const LoginLink = styled.p`
  margin-top: 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: #333;

  a {
    color: #007BFF;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
// Define the zod schema for validation
const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .nonempty("Name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await signup(data.name, data.email, data.password);
      navigate("/");
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Register</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Enter your name"
            error={!!errors.name}
            {...register("name")}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

          <Input
            type="email"
            placeholder="Enter your email"
            error={!!errors.email}
            {...register("email")}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

          <Input
            type="password"
            placeholder="Enter your password"
            error={!!errors.password}
            {...register("password")}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}

          <Button type="submit">Register</Button>
        </form>
        <LoginLink>
          Already have an account? <Link to="/signin">Login</Link>
        </LoginLink>
      </FormWrapper>
    </Container>
  );
};

export default Register;
