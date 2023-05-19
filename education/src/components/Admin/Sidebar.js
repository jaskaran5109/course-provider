import { Button, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  RiAddCircleFill,
  RiDashboardFill,
  RiEyeFill,
  RiUser3Fill,
} from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
const Sidebar = () => {
  const location = useLocation();
  return (
    <VStack spacing={'8'} p="16" boxShadow="0px 2px 5px 0px #8185EA">
      <LinkButtom
        url="dashboard"
        text="Dashboard"
        Icon={RiDashboardFill}
        active={location.pathname === '/admin/dashboard'}
      />
      <LinkButtom
        url="createcourse"
        text="Create Course"
        Icon={RiAddCircleFill}
        active={location.pathname === '/admin/createcourse'}
      />
      <LinkButtom
        url="courses"
        text="Courses"
        Icon={RiEyeFill}
        active={location.pathname === '/admin/courses'}
      />
      <LinkButtom
        url="createnote"
        text="Create Note"
        Icon={RiAddCircleFill}
        active={location.pathname === '/admin/createnote'}
      />
      <LinkButtom
        url="notes"
        text="Notes"
        Icon={RiEyeFill}
        active={location.pathname === '/admin/notes'}
      />
      <LinkButtom
        url="users"
        text="Users"
        Icon={RiUser3Fill}
        active={location.pathname === '/admin/users'}
      />
    </VStack>
  );
};

export default Sidebar;

const LinkButtom = ({ url, text, Icon, active }) => {
  return (
    <Link to={`/admin/${url}`}>
      <Button
        colorScheme={active && 'purple'}
        fontSize="larger"
        variant="ghost"
      >
        <Icon style={{ margin: '4px' }} />
        {text}
      </Button>
    </Link>
  );
};
