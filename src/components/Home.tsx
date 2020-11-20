import { RouteComponentProps } from '@reach/router';
import React, { FC } from 'react';

interface HomeProps extends RouteComponentProps {}

const Home: FC<HomeProps> = () => {
  return <h1>Home</h1>;
};

export default Home;
