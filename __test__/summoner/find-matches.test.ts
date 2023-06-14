require('dotenv').config({ path: '.env.local' });
import handler from '@/pages/api/summoner/find-matches';

describe('/api/summoner/find-matches handler', () => {
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
    expect(res.body).not.toBeNull();
  });
  it('should return 500', async () => {
    const req: any = {
      query: {
        puuid: 'hEn8vjIZnyTEkIXnbMob2kUEr5wFj014_HHQzZEb@@@@@@@@%%%%I1OYJkOA',
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
