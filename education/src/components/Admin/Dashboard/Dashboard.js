import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  Heading,
  HStack,
  Progress,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import './Dashboard.css';
import React, { useEffect } from 'react';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';
import Sidebar from '../Sidebar';
import { DoughnutChart, LineChart } from './Chart';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Layout/Loader/Loader';
import { getDashboardStats } from '../../../redux/actions/admin';
import { FaBars } from 'react-icons/fa';

const Databox = ({ title, qty, qtyPercentage, profit }) => (
  <Box
    w={['full', '20%']}
    boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
    p="8"
    borderRadius={'lg'}
  >
    <Text children={title} />

    <HStack spacing={'6'}>
      <Text fontSize={'2xl'} fontWeight="bold" children={qty} />

      <HStack>
        <Text children={`${qtyPercentage}%`} />
        {profit ? (
          <RiArrowUpLine color="green" />
        ) : (
          <RiArrowDownLine color="red" />
        )}
      </HStack>
    </HStack>
    <Text opacity={0.6} children={'Since Last Month'} />
  </Box>
);

const Bar = ({ title, value, profit }) => (
  <Box py="4" px={['0', '20']}>
    <Heading size="sm" children={title} mb="2" />

    <HStack w="full" alignItems={'center'}>
      <Text children={profit ? '0%' : `-${value}%`} />

      <Progress w="full" value={profit ? value : 0} colorScheme="purple" />
      <Text children={`${value > 100 ? value : 100}%`} />
    </HStack>
  </Box>
);

const Dashboard = ({ width }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const {
    loading,
    stats,
    viewsCount,
    subscriptionCount,
    usersCount,
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
    <div>
      {width < 900 ? (
        <Stack minH="100vh" boxSizing="border-box" mt="20" ml="5">
          {loading || !stats ? (
            <Loader />
          ) : (
            <>
              <Text
                mb="5"
                textAlign="center"
                opacity="0.5"
              >{`Last change was on ${
                String(
                  new Date(stats[11].createdAt && stats[11].createdAt)
                ).split('G')[0]
              }`}</Text>
              <HStack>
                <Button onClick={onOpen}>
                  <FaBars />
                </Button>
                <Heading
                  ml={['0', '16']}
                  mb="16"
                  textAlign={['center', 'left']}
                >
                  Dashboard
                </Heading>
              </HStack>
              <Stack
                display={'flex'}
                flexWrap="wrap"
                minH="24"
                justifyContent={'space-evenly'}
                alignContent="center"
                spacing={8}
              >
                <Databox
                  title="View"
                  qty={viewsCount}
                  qtypt={viewsPercentage}
                  profit={viewsProfit}
                  width={width}
                />
                <Databox
                  title="Users"
                  qty={usersCount}
                  qtypt={usersPercentage}
                  profit={usersProfit}
                  width={width}
                />
                <Databox
                  title="Subscription"
                  qty={subscriptionCount}
                  qtypt={subscriptionPercentage}
                  profit={subscriptionProfit}
                  width={width}
                />
              </Stack>
              <Box
                boxShadow="-2px 0 10px rgba(107,70,193,0.5)"
                borderRadius="lg"
                width={'90%'}
                spacing={8}
              >
                <Heading
                  textAlign={['center', 'left']}
                  size="md"
                  p="8"
                >{`Views Graph`}</Heading>

                {/* LINE GRAPH */}
                <LineChart views={stats.map(item => item.views)} />
              </Box>
              <Box p="4">
                <Heading
                  textAlign="left"
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
              <Box boxSize="border-box" py="4">
                <Heading
                  textAlign={'center'}
                  size="md"
                  mb="4"
                >{`Users`}</Heading>
                {/* DOUGHT GRAPH */}
                <DoughnutChart
                  users={[subscriptionCount, usersCount - subscriptionCount]}
                />
              </Box>
            </>
          )}
        </Stack>
      ) : (
        <Grid
          minH={'100vh'}
          templateColumns={['1fr', '5fr 1fr']}
        >
          {loading || !stats ? (
            <Loader color="purple.500" />
          ) : (
            <Box boxSizing="border-box" py="16" px={['4', '0']}>
              <Text
                textAlign={'center'}
                opacity={0.5}
                children={`Last change was on ${
                  String(new Date(stats[11].createdAt)).split('G')[0]
                }`}
              />

              <Heading
                children="Dashboard"
                ml={['0', '16']}
                mb="16"
                textAlign={['center', 'left']}
              />

              <Stack
                direction={['column', 'row']}
                minH="24"
                justifyContent={'space-evenly'}
              >
                <Databox
                  title="Views"
                  qty={viewsCount}
                  qtyPercentage={viewsPercentage}
                  profit={viewsProfit}
                />
                <Databox
                  title="Users"
                  qty={usersCount}
                  qtyPercentage={usersPercentage}
                  profit={usersProfit}
                />
                <Databox
                  title="Subscription"
                  qty={subscriptionCount}
                  qtyPercentage={subscriptionPercentage}
                  profit={subscriptionProfit}
                />
              </Stack>

              <Box
                m={['0', '16']}
                borderRadius="lg"
                p={['0', '16']}
                mt={['4', '16']}
                boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
              >
                <Heading
                  textAlign={['center', 'left']}
                  size="md"
                  children="Views Graph"
                  pt={['8', '0']}
                  ml={['0', '16']}
                />

                <LineChart views={stats.map(item => item.views)} />
              </Box>

              <Grid templateColumns={['1fr', '2fr 1fr']}>
                <Box p="4">
                  <Heading
                    textAlign={['center', 'left']}
                    size="md"
                    children="Progress Bar"
                    my="8"
                    ml={['0', '16']}
                  />

                  <Box>
                    <Bar
                      profit={viewsProfit}
                      title="Views"
                      value={viewsPercentage}
                    />
                    <Bar
                      profit={usersProfit}
                      title="Users"
                      value={usersPercentage}
                    />
                    <Bar
                      profit={subscriptionProfit}
                      title="Subscription"
                      value={subscriptionPercentage}
                    />
                  </Box>
                </Box>

                <Box p={['0', '16']} boxSizing="border-box" py="4">
                  <Heading
                    textAlign={'center'}
                    size="md"
                    mb="4"
                    children="Users"
                  />

                  <DoughnutChart
                    users={[subscriptionCount, usersCount - subscriptionCount]}
                  />
                </Box>
              </Grid>
            </Box>
          )}

          <Sidebar />
        </Grid>
      )}
      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">SmartUpJr</DrawerHeader>
          <DrawerBody>
            <Sidebar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Dashboard;
