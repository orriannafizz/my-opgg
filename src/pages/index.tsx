import { Inter } from 'next/font/google';
import SummonerInfo from '../../components/SummonerInfo';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return <SummonerInfo />;
}
