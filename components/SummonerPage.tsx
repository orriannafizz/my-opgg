import SummonerInfo from './SummonerInfo';

import Matches from './Matches';
interface SummonerPageProps {
  summoner: Summoner | null;
}
const SummonerPage: React.FC<SummonerPageProps> = ({ summoner }) => {
  return (
    <>
      <SummonerInfo summoner={summoner} />
      <Matches summoner={summoner} />
    </>
  );
};

export default SummonerPage;
