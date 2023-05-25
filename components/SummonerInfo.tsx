import Image from 'next/image';
import Link from 'next/link';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

interface SummonerInfoProps {
  summoner: Summoner | null;
}

const SummonerInfo: React.FC<SummonerInfoProps> = ({ summoner }) => {
  return (
    <>
      {summoner && (
        <Grid container spacing={2} justifyContent='center'>
          <Grid item xs={8} sm={9} md={10}>
            <Link href={`summoner/${summoner.puuid}`}>
              <Card className='mt-10'>
                <CardHeader
                  avatar={
                    <Image
                      src={`http://ddragon.leagueoflegends.com/cdn/13.10.1/img/profileicon/${summoner.profileIconId}.png`}
                      alt={summoner.name}
                      width={100}
                      height={100}
                      priority
                    />
                  }
                  action={<IconButton aria-label='' />}
                  title={summoner.name}
                  subheader={`Lv. ${summoner.summonerLevel}`}
                  titleTypographyProps={{ className: 'card-header-content' }}
                  subheaderTypographyProps={{
                    className: 'card-header-content',
                  }}
                />
                {summoner.ranks[0] && (
                  <CardContent>
                    <div className='flex flex-col items-start'>
                      <Image
                        src='/master.png'
                        alt={summoner.ranks[0].tier}
                        width={300}
                        height={300}></Image>
                    </div>
                  </CardContent>
                )}
              </Card>
            </Link>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SummonerInfo;
