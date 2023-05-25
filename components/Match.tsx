import Image from 'next/image';
import Link from 'next/link';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

const Match = () => {
  const marchId: string = 'KR_6508434441';
  return (
    <Grid container spacing={2} justifyContent='center'>
      <Grid item>
        <Card className='mt-10'>
          <CardHeader
            action={<IconButton aria-label='' />}
            title={'a'}
            subheader={`Lv. `}
            titleTypographyProps={{ className: 'card-header-content' }}
            subheaderTypographyProps={{
              className: 'card-header-content',
            }}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Match;
