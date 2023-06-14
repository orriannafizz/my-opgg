require('dotenv').config({ path: '.env.local' });
import handler from '@/pages/api/summoner/rank';

describe('/api/summoner/rank handler', () => {
  it('should return correct JSON', async () => {
    const req: any = {
      query: {
        id: '80AqW-kW5QRfFccdh5hldpoj3Jh0A8XmgHhik6AAL1k2uEEsBJdcgYjFEw',
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
    expect(res.body[0]).toHaveProperty('queueType');
    expect(res.body[0]).toHaveProperty('summonerName');
    expect(res.body[0]).toHaveProperty('hotStreak');
    expect(res.body[0]).toHaveProperty('wins');
    expect(res.body[0]).toHaveProperty('veteran');
    expect(res.body[0]).toHaveProperty('losses');
    expect(res.body[0]).toHaveProperty('rank');
    expect(res.body[0]).toHaveProperty('tier');
  });
  it('should return 500', async () => {
    const req: any = {
      query: {
        id: '80AqW-kW5QRfFccdh5######@@@@@@@@hik6AAL1k2uEEsBJdcgYjFEw',
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
