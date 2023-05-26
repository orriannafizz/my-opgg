import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CardContent from '@mui/material/CardContent';
import Image from 'next/image';

import useChampionMap from '../hooks/championMap';
interface MatchProps {
  summoner: Summoner | null;
  matchId: string;
}
const Match: React.FC<MatchProps> = ({ summoner, matchId }) => {
  const [match, setMatch] = useState<Match | null>(null);
  const [place, setPlace] = useState<number | undefined>(0);
  const [team, setTeam] = useState<number | undefined>();
  const [isWin, setIsWin] = useState<boolean | undefined>();
  const [championId, setChampionId] = useState<number | undefined>();
  const [championName, setChampionName] = useState<string | undefined>();
  const [kills, setKills] = useState<number | undefined>();
  const [deaths, setDeaths] = useState<number | undefined>();
  const [assists, setAssists] = useState<number | undefined>();
  // TODO: Change Map to SQL

  const championMap = useChampionMap();
  const fetchMatch = () => {
    axios
      .get(`/api/match`, {
        params: {
          matchId,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMatch(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchMatch();
  }, []);

  const findPlaceAndSetTeam = (match: Match) => {
    for (let i = 0; i < 10; i++) {
      if (match.metadata.participants[i] === summoner?.puuid) {
        setTeam(i < 5 ? 0 : 1);
        setIsWin(match.info.teams[i < 5 ? 0 : 1].win);

        return i;
      }
    }
  };
  const calculateTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return { minutes, seconds };
  };

  useEffect(() => {
    if (summoner && match) {
      setPlace(findPlaceAndSetTeam(match));
      setChampionId(match.info.participants[place!].championId);
      setKills(match.info.participants[place!].kills);
      setDeaths(match.info.participants[place!].deaths);
      setAssists(match.info.participants[place!].assists);
    }
  }, [summoner, match]);

  // for debug
  useEffect(() => {
    console.log(place);
  }, [place]);
  useEffect(() => {
    if (championMap && championId)
      setChampionName(championMap?.get(championId!.toString()));
  }, [championMap, championId]);
  return (
    match && (
      <Grid container spacing={2} justifyContent='center'>
        <Grid item>
          <Card className='mt-2 w-[800px] h-[120px] '>
            <div className='w-[130px]'>
              <CardHeader
                action={<IconButton aria-label='' />}
                title={match.info.gameMode}
                subheader={
                  calculateTime(match.info.gameDuration).minutes +
                  ':' +
                  (calculateTime(match.info.gameDuration).seconds < 10
                    ? '0'
                    : '') +
                  calculateTime(match.info.gameDuration).seconds
                }
                titleTypographyProps={{ className: 'card-header-content' }}
                subheaderTypographyProps={{
                  className: 'card-header-content',
                }}
              />
            </div>
            <CardContent>
              <div className='flex flex-row items-center space-x-2'>
                <div className='w-[40px]'>
                  {isWin ? (
                    <p className='text-green-600'>WIN</p>
                  ) : (
                    <p className='text-red-600'>LOSE</p>
                  )}
                </div>

                <Image
                  src={`http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${championName}.png`}
                  width={50}
                  height={50}
                  alt={championName as string}
                  className=' rounded-full'></Image>
                <div className='w-[100px] text-center'>
                  <p className=' font-semibold'>
                    {kills} / {deaths} / {assists}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  );
};

export default Match;
