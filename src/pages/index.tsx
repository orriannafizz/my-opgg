import SummonerInfo from '../../components/SummonerInfo';
import { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import Link from 'next/link';
export default function Home() {
  const [summoner, setSummoner] = useState<Summoner | null>(null);
  const [region, setRegion] = useState<string>('TW2');
  return (
    <div className='mt-10 flex flex-col justify-center items-center'>
      <SearchBar
        summoner={summoner}
        setSummoner={setSummoner}
        region={region}
        setRegion={setRegion}
      />

      {summoner && (
        <Link href={`/summoner/${region}/${summoner.puuid}`}>
          <SummonerInfo summoner={summoner} />
        </Link>
      )}
    </div>
  );
}
