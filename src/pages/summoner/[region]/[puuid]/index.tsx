import axios from 'axios';
import { GetServerSideProps } from 'next';
import { toast } from 'react-toastify';
import SummonerPage from '@/../components/SummonerPage';

interface PageProps {
  summoner: Summoner | null;
  region: string;
}

const Page: React.FC<PageProps> = ({ summoner, region }) => {
  if (!summoner) {
    toast.error('User not found');
    return null;
  }

  return <SummonerPage summoner={summoner} region={region} />;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const { puuid } = context.query;
  const region = context.query.region as string;
  try {
    const res1 = await axios.get<Summoner>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/summoner/by-puuid`,
      {
        params: { puuid, region },
      },
    );
    const summonerData = res1.data;

    const res2 = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/summoner/rank`, {
      params: { id: summonerData.id },
    });

    const summoner = { ...summonerData, ranks: res2.data };

    return { props: { summoner, region } };
  } catch (err) {
    console.log(err);

    return { props: { summoner: null, region } };
  }
};

export default Page;
