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
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/summoner/find-matches`, {
        params: {
          puuid: summoner?.puuid,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMatches(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (summoner) {
      fetchMatches();
    }
  }, [summoner]);
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
