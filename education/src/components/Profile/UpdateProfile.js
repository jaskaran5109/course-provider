import React, { useState } from 'react';
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/profile';
import { getMyProfile } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';
const UpdateProfile = ({ user }) => {
  const { loading } = useSelector(state => state.profile);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    await dispatch(updateProfile(name, email));
    dispatch(getMyProfile());
    navigate('/profile');
  };
  return (
    <Container py="16" minH="90vh">
      <form onSubmit={handleSubmit}>
        <Heading
          my="16"
          textAlign={['center', 'left']}
          textTransform="uppercase"
        >
          Update Profile
        </Heading>
        <VStack spacing="8">
          <Input
            id="name"
            value={name}
            placeholder="Name"
            onChange={e => setName(e.target.value)}
            type="text"
            focusBorderColor="yellow.500"
          />
          <Input
            id="email"
            value={email}
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            type="email"
            focusBorderColor="yellow.500"
          />
          <Button
            w="full"
            isLoading={loading}
            colorScheme={'yellow'}
            type="submit"
          >
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
