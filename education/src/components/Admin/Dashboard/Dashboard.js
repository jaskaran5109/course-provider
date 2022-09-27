import {
  Box,
  Grid,
  Heading,
  HStack,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';
import Sidebar from '../Sidebar';
import { DoughnutChart, LineChart } from './Chart';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Layout/Loader/Loader';
import { getDashboardStats } from '../../../redux/actions/admin';
const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    loading,
    stats,
    usersCount,
    subscriptionCount,
    viewsCount,
    subscriptionPercentage,
    viewsPercentage,
    usersPercentage,
    subscriptionProfit,
    viewsProfit,
    usersProfit,
  } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  return (
    <Grid minH="100vh" templateColumns={['1fr', '5fr 1fr']}>
      {loading || !stats ? (
        <Loader />
      ) : (
        <Box boxSizing="border-box" py="16" px={['4', '0']}>
          <Text textAlign="center" opacity="0.5">{`Last change was on ${
            String(new Date(stats[11].createdAt && stats[11].createdAt)).split('G')[0]
          }`}</Text>
          <Heading ml={['0', '16']} mb="16" textAlign={['center', 'left']}>
            Dashboard
          </Heading>
          <Stack
            direction={['column', 'row']}
            minH="24"
            justifyContent={'space-evenly'}
          >
            <DataBox
              title="View"
              qty={viewsCount}
              qtypt={viewsPercentage}
              profit={viewsProfit}
            />
            <DataBox
              title="Users"
              qty={usersCount}
              qtypt={usersPercentage}
              profit={usersProfit}
            />
            <DataBox
              title="Subscription"
              qty={subscriptionCount}
              qtypt={subscriptionPercentage}
              profit={subscriptionProfit}
            />
          </Stack>
          <Box
            boxShadow="-2px 0 10px rgba(107,70,193,0.5)"
            m={['0', '16']}
            borderRadius="lg"
            mt={['0', '16']}
            p={['0', '16']}
          >
            <Heading
              textAlign={['center', 'left']}
              size="md"
              pt={['8', '0']}
              ml={['0', '16']}
            >{`Views Graph`}</Heading>

            {/* LINE GRAPH */}
            <LineChart views={stats.map(item=>(item.views))}/>
          </Box>
          <Grid templateColumns={['1fr', '2fr 1fr']}>
            <Box p="4">
              <Heading
                textAlign={['center', 'left']}
                size="md"
                my="8"
                ml={['0', '16']}
              >{`Progress Bar`}</Heading>
              <Box>
                <Bar
                  title="Views"
                  value={viewsPercentage}
                  profit={viewsProfit}
                />
                <Bar
                  title="Users"
                  value={usersPercentage}
                  profit={usersProfit}
                />
                <Bar
                  title="Subscription"
                  value={subscriptionPercentage}
                  profit={subscriptionProfit}
                />
              </Box>
            </Box>
            <Box p={['0', '16']} boxSize="border-box" py="4">
              <Heading textAlign={'center'} size="md" mb="4">{`Users`}</Heading>
              {/* DOUGHT GRAPH */}
              <DoughnutChart
                users={[subscriptionCount, usersCount - subscriptionCount]}
              />
            </Box>
          </Grid>
        </Box>
      )}
      <Sidebar />
    </Grid>
  );
};

export default Dashboard;
const DataBox = ({ title, qty, qtypt, profit }) => (
  <Box
    w={['full', '20%']}
    boxShadow="-2px 0 10px rgba(107,70,193,0.5)"
    borderRadius="lg"
    p="8"
  >
    <Text>{title}</Text>
    <HStack spacing="6">
      <Text fontSize="2xl" fontWeight="bold">
        {qty}
      </Text>
      <HStack>
        <Text>{`${qtypt} %`}</Text>
        {profit ? (
          <RiArrowUpLine color="green" />
        ) : (
          <RiArrowDownLine color="red" />
        )}
      </HStack>
    </HStack>
    <Text opacity={'0.6'}>{`Since Last Month`}</Text>
  </Box>
);

const Bar = ({ title, value, profit }) => (
  <Box py="4" px={['0', '20']}>
    <Heading size={'sm'} mb="2">
      {title}
    </Heading>
    <HStack w="full" alignItems="center">
      <Text>{`${profit ? value : `-${value}`}%`}</Text>
      <Progress w="full" value={profit ? value : 0} colorScheme="purple" />
      <Text>{`${value > 100 ? value : 100}%`}</Text>
    </HStack>
  </Box>
);
