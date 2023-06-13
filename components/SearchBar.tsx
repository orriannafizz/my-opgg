import React, { useEffect } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';

interface SummonerInfoProps {
  summoner: Summoner | null;
  setSummoner: React.Dispatch<React.SetStateAction<Summoner | null>>;
  region: string;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SummonerInfoProps> = ({ summoner, setSummoner, region, setRegion }) => {
  const [searchName, setSearchName] = React.useState<string>('');

  const searchSummoner = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/summoner/by-name`, {
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
  const handleChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value as string);
  };
  useEffect(() => {
    console.log(region);
  }, [region]);

  return (
    <Grid container className="justify-center items-center">
      <Grid item sm={6}>
        <form onSubmit={searchSummoner}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Select value={region} onChange={handleChange}>
              <MenuItem value={'TW2'}>Taiwan</MenuItem>
              <MenuItem value={'KR'}>Korea</MenuItem>
              <MenuItem value={'BR1'}>Brazil</MenuItem>
              <MenuItem value={'EUN1'}>Europe Nordic & East</MenuItem>
              <MenuItem value={'EUW1'}>Europe West</MenuItem>
              <MenuItem value={'JP1'}>Japan</MenuItem>
              <MenuItem value={'LA1'}>Latin America 1</MenuItem>
              <MenuItem value={'LA2'}>Latin America 2</MenuItem>
              <MenuItem value={'NA1'}>North America</MenuItem>
              <MenuItem value={'OC1'}>Oceania</MenuItem>
              <MenuItem value={'PH2'}>Phillippines</MenuItem>
              <MenuItem value={'RU'}>Russia</MenuItem>
              <MenuItem value={'SG2'}>Singapore</MenuItem>
              <MenuItem value={'TH2'}>Thailand</MenuItem>
              <MenuItem value={'TR1'}>Turkey</MenuItem>
            </Select>
            <TextField
              label="Summoner"
              variant="outlined"
              value={searchName}
              fullWidth
              onChange={(e) => setSearchName(e.target.value)}
            />
            <Button variant="outlined" type="submit">
              Search
            </Button>
          </Stack>
        </form>
      </Grid>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Grid>
  );
};

export default SearchBar;
