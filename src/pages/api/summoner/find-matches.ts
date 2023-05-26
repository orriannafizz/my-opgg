import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(
      `https://sea.api.riotgames.com/lol/match/v5/matches/by-puuid/${req.query.puuid}/ids?start=0&count=10&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while fetching data from the Riot API',
    });
  }
}
