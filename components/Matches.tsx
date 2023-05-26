import { useEffect, useState } from 'react';
import axios from 'axios';
import Match from './Match';

interface MatchesProps {
  summoner: Summoner | null;
}

const Matches: React.FC<MatchesProps> = ({ summoner }) => {
  const [matches, setMatches] = useState<string[] | null>(null);
  const fetchMatches = () => {
    axios
      .get(
        `https://sea.api.riotgames.com/lol/match/v5/matches/by-puuid/hEn8vjIZnyTEkIXnbMob2kUEr5wFj014_HHQzZEbOggQjm08gNyrcnWWA_2PYOL9AVyj5MI1OYJkOA/ids?start=0&count=20&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      )
      .then((res) => {
        console.log(res.data);
        setMatches(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchMatches();
  }, []);
  useEffect(() => {
    console.log(matches);
  }, [matches]);
  return (
    <>
      {matches &&
        matches.map((matchId: string) => (
          <Match key={matchId} summoner={summoner} matchId={matchId} />
        ))}
    </>
  );
};

export default Matches;
