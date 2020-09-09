import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="logo" />
      <form>
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
      </form>

      <a href="account">
        <FiLogIn />
        Create Account
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
