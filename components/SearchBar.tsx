import React, { useEffect } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

interface SummonerInfoProps {
  summoner: Summoner | null;
  setSummoner: React.Dispatch<React.SetStateAction<Summoner | null>>;
}

const SearchBar: React.FC<SummonerInfoProps> = ({ summoner, setSummoner }) => {
  const [searchName, setSearchName] = React.useState<string>('');

  const searchSummoner = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .get(`/api/summoner/by-name`, {
        params: { searchName },
      })
      .then((res) => {
        const summonerData = res.data;
        axios
          .get(`api/summoner/rank`, {
            params: { id: summonerData.id },
          })
          .then((res) => {
            setSummoner({ ...summonerData, ranks: res.data });
          });
      })
      .catch((err) => {
        toast.error('User not found');
        setSummoner(null);
        console.log(err);
      });
  };
  useEffect(() => {
    console.log(summoner);
  }, [summoner]);

  return (
    <Grid container className='justify-center items-center'>
      <Grid item sm={6}>
        <form onSubmit={searchSummoner}>
          <Stack spacing={2} direction='row' alignItems='center'>
            <TextField
              label='Summoner'
              variant='outlined'
              value={searchName}
              fullWidth
              onChange={(e) => setSearchName(e.target.value)}
            />
            <Button variant='outlined' type='submit'>
              Search
            </Button>
          </Stack>
        </form>
      </Grid>
      <ToastContainer position='bottom-right' autoClose={3000} />
    </Grid>
  );
};

export default SearchBar;
