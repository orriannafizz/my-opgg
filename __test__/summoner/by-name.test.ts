require('dotenv').config({ path: '.env.local' });
import handler from '@/pages/api/summoner/by-name';

describe('/api/summoner/by-name handler', () => {
  it('should return correct JSON', async () => {
    const req: any = { query: { searchName: 'Ricky1' } };

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
    const req: any = { query: { searchName: 'Rasdadsdaf@@@@qaw1' } };

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
