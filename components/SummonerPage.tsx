import SummonerInfo from './SummonerInfo';

import Matches from './Matches';
interface SummonerPageProps {
  summoner: Summoner | null;
  region: string;
}
const SummonerPage: React.FC<SummonerPageProps> = ({ summoner, region }) => {
  return (
    <>
      <SummonerInfo summoner={summoner} />
      <Matches summoner={summoner} />
    </>
  );
};

export default SummonerPage;
