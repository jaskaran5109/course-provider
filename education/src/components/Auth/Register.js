import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/user';
const fileIploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',
  color: '#ECC94B',
  backgroundColor: 'white',
};
const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [imagePrev, setimagePrev] = useState();
  const [image, setImage] = useState();
  const fileIploadStyle = {
    '&::file-selector-button': fileIploadCss,
  };
  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setimagePrev(reader.result);
      setImage(file);
    };
  };
  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('file', image);

    dispatch(register(myForm))
  };
  return (
    <Container>
      <VStack height={'full'} justifyContent="center" spacing="6" my={'70'}>
        <Heading textTransform={'uppercase'}>Registration</Heading>
        <form style={{ width: '100%' }} onSubmit={submitHandler}>
          <Box my="0" display="flex" justifyContent="center">
            <Avatar size={'2xl'} src={imagePrev} />
          </Box>
          <Box my={'2'}>
            <FormLabel htmlFor="name" children={'UserName'} />
            <Input
              required
              type={'text'}
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="email" children={'Email Address'} />
            <Input
              type="email"
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="password" children={'Password'} />
            <Input
              type="password"
              required
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              focusBorderColor="yellow.500"
            />
          </Box>

          <Box my={'4'}>
            <FormLabel htmlFor="chooseAvatar" children={'Choose avatar'} />
            <Input
              type="file"
              accept="image/*"
              required
              id="password"
              focusBorderColor="yellow.500"
              css={fileIploadStyle}
              onChange={changeImageHandler}
            />
          </Box>

          <Button my={'4'} colorScheme={'yellow'} type="submit">
            Sign Up
          </Button>
          <Box my={'4'}>
            Already a User?{' '}
            <Link to="/login">
              <Button colorScheme={'yellow'} variant="link">
                Login
              </Button>
            </Link>{' '}
            here
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Register;
