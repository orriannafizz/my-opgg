import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get(
      `https://tw2.api.riotgames.com/lol/league/v4/entries/by-summoner/${req.query.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    );

    const sortedData = response.data.sort((a: any, b: any) => {
      const order = ['RANKED_SOLO_5x5', 'RANKED_FLEX_SR', 'RANKED_TFT_DOUBLE_UP'];

      return order.indexOf(a.queueType) - order.indexOf(b.queueType);
    });

    res.status(200).json(sortedData);
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while fetching data from the Riot API',
    });
  }
}
