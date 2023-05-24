import { Inter } from 'next/font/google';
import SummonerInfo from '../../components/SummonerInfo';
import { Summoner } from '../../interfaces/Summoner';
import { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
export default function Home() {
  const [summoner, setSummoner] = useState<Summoner | null>(null);

  return (
    <div className='mt-10 flex flex-col justify-center items-center'>
      <SearchBar summoner={summoner} setSummoner={setSummoner} />
      <SummonerInfo summoner={summoner} setSummoner={setSummoner} />
    </div>
  );
}
