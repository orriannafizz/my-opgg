require('dotenv').config({ path: '.env.local' });
import handler from '@/pages/api/summoner/by-puuid';

describe('/api/summoner/by-puuid handler', () => {
  it('should return correct JSON', async () => {
    const req: any = {
      query: {
        puuid: 'hEn8vjIZnyTEkIXnbMob2kUEr5wFj014_HHQzZEbOggQjm08gNyrcnWWA_2PYOL9AVyj5MI1OYJkOA',
      },
    };

    const res: any = {
      statusCode: null,
      body: null,
      status: function (status: number) {
        this.statusCode = status;
        return this;
      },
      json: function (msg: any) {
        this.body = msg;
        return this;
      },
    };

    await handler(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('accountId');
    expect(res.body).toHaveProperty('puuid');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('profileIconId');
    expect(res.body).toHaveProperty('revisionDate');
    expect(res.body).toHaveProperty('summonerLevel');
  });
  it('should return 500', async () => {
    const req: any = {
      query: {
        puuid: 'hEn8vjIZnyTEkI@@@@@@@j014_HHQzZEbOggQjm08gNyrcnWWA_2PYOL9AVyj5MI1OYJkOA',
      },
    };

    const res: any = {
      statusCode: null,
      body: null,
      status: function (status: number) {
        this.statusCode = status;
        return this;
      },
      json: function (msg: any) {
        this.body = msg;
        return this;
      },
    };

    await handler(req, res);
    expect(res.statusCode).toBe(500);
  });
});
