import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(
      `https://tw2.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${req.query.puuid}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while fetching data from the Riot API',
    });
  }
}
