import { Inter } from 'next/font/google';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Summoner } from '../interfaces/Summoner';
interface SummonerInfoProps {
  summoner: Summoner | null;
  setSummoner: React.Dispatch<React.SetStateAction<Summoner | null>>;
}
const SummonerInfo: React.FC<SummonerInfoProps> = ({
  summoner,
  setSummoner,
}) => {
  return (
    <>
      {summoner && (
        <>
          <h1>{summoner.name}</h1>

          <Image
            src={`http://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/${summoner.profileIconId}.png`}
            alt='123'
            width={100}
            height={100}
            priority></Image>
        </>
      )}
    </>
  );
};

export default SummonerInfo;
