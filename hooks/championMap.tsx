import { useState, useEffect } from 'react';
import championData from '../data/champions.json';

interface Champion {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: Object;
  image: Object;
  tags: Array<string>;
  partype: string;
  stats: Object;
}

const useChampionMap = () => {
  const [championMap, setChampionMap] = useState<Map<string, string>>();

  useEffect(() => {
    const tempMap = new Map<string, string>();
    const champions = championData.data as { [key: string]: Champion };
    for (const champ of Object.values(champions)) {
      tempMap.set(champ.key, champ.id);
    }
    setChampionMap(tempMap);
  }, []);

  return championMap;
};

export default useChampionMap;
