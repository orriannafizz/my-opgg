import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import SummonerPage from '../../../../components/SummonerPage';

interface PageProps {
  summoner: Summoner | null;
}

const Page: React.FC<PageProps> = ({ summoner }) => {
  if (!summoner) {
    toast.error('User not found');
    return null;
  }

  return <SummonerPage summoner={summoner} />;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const { puuid } = context.query;
  try {
    const res1 = await axios.get<Summoner>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/summoner/by-puuid`,
      {
        params: { puuid },
      }
    );

    const summonerData = res1.data;

    const res2 = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/summoner/rank`,
      {
        params: { id: summonerData.id },
      }
    );

    const summoner = { ...summonerData, ranks: res2.data };

    return { props: { summoner } };
  } catch (err) {
    console.log(err);

    return { props: { summoner: null } };
  }
};

export default Page;
