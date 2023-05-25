import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import SummonerPageInfo from '../../../../components/SummonerPageInfo';
export default function Page() {
  const router = useRouter();
  const { puuid } = router.query;
  const [summoner, setSummoner] = useState<Summoner | null>(null);

  const searchSummonerByPuuid = () => {
    axios
      .get(
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      )
      .then((res) => {
        const summonerData = res.data;
        return axios
          .get(
            `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
          )
          .then((res) => {
            setSummoner({ ...summonerData, ranks: res.data });
          });
      })
      .catch((err) => {
        toast.error('User not found');
        setSummoner(null);
        console.log(err);
      });
  };
  useEffect(() => {
    searchSummonerByPuuid();
  }, []);
  useEffect(() => {
    console.log(summoner);
  }, [summoner]);
  return <SummonerPageInfo />;
}
