import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SummonerPage from '../../../../components/SummonerPage';
export default function Page() {
  const router = useRouter();
  const { puuid } = router.query;
  const [summoner, setSummoner] = useState<Summoner | null>(null);

  const searchSummonerByPuuid = () => {
    axios
      .get(`/api/summoner/by-puuid`, {
        params: { puuid },
      })
      .then((res) => {
        const summonerData = res.data;
        axios
          .get(`/api/summoner/rank`, { params: { id: summonerData.id } })
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
    if (puuid) {
      searchSummonerByPuuid();
    }
  }, [puuid]);

  useEffect(() => {
    console.log(summoner);
  }, [summoner]);
  return <SummonerPage summoner={summoner} />;
}
