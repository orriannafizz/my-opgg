import SummonerInfo from '@/../components/SummonerInfo';
import Matches from '@/../components/Matches';
interface SummonerPageProps {
  summoner: Summoner | null;
  region: string;
}
const SummonerPage: React.FC<SummonerPageProps> = ({ summoner, region }) => {
  return (
    <>
      <SummonerInfo summoner={summoner} />
      <Matches summoner={summoner} region={region} />
    </>
  );
};

export default SummonerPage;
