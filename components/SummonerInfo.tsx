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
          <Grid item>
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
                <>
                  <CardContent>
                    <div className='flex flex-col items-center'>
                      <Image
                        src={`/rank/${summoner.ranks[0].tier}.png`}
                        alt={summoner.ranks[0].tier}
                        width={100}
                        height={100}></Image>
                      <p>
                        {summoner.ranks[0].tier} {summoner.ranks[0].rank}
                      </p>
                    </div>
                  </CardContent>
                  <CardContent>
                    <div className='flex flex-col items-start'>
                      <p>
                        Wins:{' '}
                        <span className='text-green-600'>
                          {summoner.ranks[0].wins}
                        </span>
                      </p>
                      <p>
                        Losses:{' '}
                        <span className=' text-red-500'>
                          {' '}
                          {summoner.ranks[0].losses}
                        </span>
                      </p>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SummonerInfo;
