import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CardContent from '@mui/material/CardContent';
import Image from 'next/image';
import useChampionMap from '../hooks/championMap';
import Items from './MatchInfo/Items';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Participants from './MatchInfo/Participants';
interface MatchProps {
  summoner: Summoner | null;
  matchId: string;
  region: string;
}
const Match: React.FC<MatchProps> = ({ summoner, matchId, region }) => {
  const [match, setMatch] = useState<Match | null>(null);
  const [place, setPlace] = useState<number | undefined>(0);
  const [team, setTeam] = useState<number | undefined>();
  const [isWin, setIsWin] = useState<boolean | undefined>();
  const [items, setItems] = useState<number[] | undefined>();

  const fetchMatch = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/match`, {
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
      setTeam(place! < 5 ? 0 : 1);
      setIsWin(match.info.teams[place! < 5 ? 0 : 1].win);
      setItems([
        match.info.participants[place!].item0,
        match.info.participants[place!].item1,
        match.info.participants[place!].item2,
        match.info.participants[place!].item3,
        match.info.participants[place!].item4,
        match.info.participants[place!].item5,
        match.info.participants[place!].item6,
      ]);
    }
  }, [summoner, match]);

  // for debug
  useEffect(() => {
    console.log(items);
  }, [items]);
  if (!summoner || !match || place === undefined) {
    return (
      <Grid container spacing={2} justifyContent='center'>
        <Grid item>
          <Card className='flex justify-center mt-2 lg:w-[800px] md:w-[600px] sm:w-[400px] h-[120px] '>
            <CircularProgress />
          </Card>
        </Grid>
      </Grid>
    );
  }
  return (
    match && (
      <Grid container spacing={2} justifyContent='center'>
        <Grid item>
          <Card className='mt-2 lg:w-[800px] md:w-[600px] sm:w-[400px] h-[120px] '>
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
                  src={`http://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${
                    match.info.participants[place!].championName ===
                    'FiddleSticks'
                      ? 'Fiddlesticks'
                      : match.info.participants[place!].championName
                  }.png`}
                  width={50}
                  height={50}
                  alt={match.info.participants[place!].championName as string}
                  className='rounded-full'></Image>

                <div className='w-[150px] text-center mb-0 hidden sm:block'>
                  <p className=' font-semibold'>
                    {match.info.participants[place!].kills} /{' '}
                    {match.info.participants[place!].deaths} /{' '}
                    {match.info.participants[place!].assists}
                  </p>
                </div>
                <div>{items && <Items items={items}></Items>}</div>
                <Participants info={match.info} offset={0} region={region} />
                <Participants info={match.info} offset={5} region={region} />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  );
};

export default Match;
