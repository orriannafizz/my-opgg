import SummonerInfo from '../../components/SummonerInfo';
import { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import Link from 'next/link';
export default function Home() {
  const [summoner, setSummoner] = useState<Summoner | null>(null);

  return (
    <div className='mt-10 flex flex-col justify-center items-center'>
      <SearchBar summoner={summoner} setSummoner={setSummoner} />

      {summoner && (
        <Link href={`summoner/${summoner.puuid}`}>
          <SummonerInfo summoner={summoner} />
        </Link>
      )}
    </div>
  );
}
