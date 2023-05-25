import Image from 'next/image';
import React from 'react';
import SummonerInfo from './SummonerInfo';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Match from './Match';
interface SummonerPageProps {
  summoner: Summoner | null;
}

const SummonerPage: React.FC<SummonerPageProps> = ({ summoner }) => {
  return (
    <>
      <SummonerInfo summoner={summoner} />
      <Match />
    </>
  );
};

export default SummonerPage;
