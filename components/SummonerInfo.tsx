import { Inter } from 'next/font/google';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Summoner {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

const SummonerInfo = () => {
  const str: string = 'Ricky1是gay';
  const encodeStr = encodeURI(str);
  const [summoner, setSummoner] = useState<Summoner>();
  useEffect(() => {
    axios
      .get(
        `https://tw2.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeStr}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      )
      .then((res) => {
        setSummoner(res.data);
        //  console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
