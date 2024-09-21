import { useAuth } from '../../hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { z } from 'zod';

// Keyframes for a smoother fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
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
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease;
  width: 100%;
  width: 600px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: bold;
`;

const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  padding: 0.875rem;
  margin-bottom: ${(props) => (props.error ? '0.5rem' : '1.5rem')};
  border: 2px solid ${(props) => (props.error ? '#ff4d4f' : '#ddd')};
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  &:focus {
    outline: none;
    border-color: ${(props) => (props.error ? '#ff4d4f' : '#007BFF')};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.875rem;
  background-color: #007BFF;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1.5rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4d4f;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const RegisterLink = styled.p`
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
const loginSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters').nonempty('Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { signin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await signin(data.email, data.password);
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Login</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            placeholder="Enter your email"
            error={!!errors.email}
            {...register('email')}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

          <Input
            type="password"
            placeholder="Enter your password"
            error={!!errors.password}
            {...register('password')}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

          <Button type="submit">Login</Button>
        </form>
        <RegisterLink>
          Don't have an account? <Link to="/signup">Register</Link>
        </RegisterLink>
      </FormWrapper>
    </Container>
  );
};

export default Login;
