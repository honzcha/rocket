import React, { useRef, useCallback, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Container, Content, Background } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import { AuthContext } from '../../context/AuthContext';

import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn, user } = useContext(AuthContext);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email is required')
            .email('Enter a valid email'),
          password: Yup.string().required('Password is required'),
        });

        await schema.validate(data, { abortEarly: false });
        signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    },
    [signIn],
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="logo" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Login</h1>

          <Input name="email" icon={FiMail} placeholder="Email" />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Password"
          />

          <Button type="submit">Sign In</Button>

          <a href="forgot">Forgot my password</a>
        </Form>

        <a href="account">
          <FiLogIn />
          Create Account
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
