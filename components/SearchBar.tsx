import React, { useEffect } from 'react';
import { Summoner } from '../interfaces/Summoner';
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

  const searchSummoner = () => {
    const encodeStr = encodeURI(searchName);
    axios
      .get(
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeStr}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      )
      .then((res) => {
        const summonerData = res.data;
        return axios
          .get(
            `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
          )
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

  const handleClick = () => {
    searchSummoner();
  };

  return (
    <Grid container className='justify-center items-center'>
      <Grid item xs={6} sm={6} md={6} lg={8} xl={8}>
        <Stack spacing={2} direction='row' alignItems='center'>
          <TextField
            label='Summoner'
            variant='outlined'
            value={searchName}
            fullWidth
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Button variant='outlined' onClick={handleClick}>
            Search
          </Button>
        </Stack>
      </Grid>
      <ToastContainer position='bottom-right' autoClose={3000} />
    </Grid>
  );
};

export default SearchBar;
