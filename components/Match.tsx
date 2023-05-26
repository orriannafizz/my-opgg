import Image from 'next/image';
import Link from 'next/link';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { use, useEffect, useState } from 'react';
import axios from 'axios';

interface MatchProps {
  summoner: Summoner | null;
  matchId: string;
}
const Match: React.FC<MatchProps> = ({ summoner, matchId }) => {
  const [match, setMatch] = useState<Match | null>(null);
  const [place, setPlace] = useState<number | undefined>(0); // place in res.data
  const fetchMatch = () => {
    axios
      .get(`/api/match?matchId=${matchId}`)
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

  const findPlace = (match: Match) => {
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
      setPlace(findPlace(match));
    }
  }, [summoner, match]);

  // for debug
  useEffect(() => {
    console.log(place);
  }, [place]);
  return (
    match && (
      <Grid container spacing={2} justifyContent='center'>
        <Grid item>
          <Card className='mt-10'>
            <CardHeader
              action={<IconButton aria-label='' />}
              title={match.info.gameMode}
              subheader={
                calculateTime(match.info.gameDuration).minutes +
                ':' +
                calculateTime(match.info.gameDuration).seconds
              }
              titleTypographyProps={{ className: 'card-header-content' }}
              subheaderTypographyProps={{
                className: 'card-header-content',
              }}
            />
          </Card>
        </Grid>
      </Grid>
    )
  );
};

export default Match;
