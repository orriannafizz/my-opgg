require('dotenv').config({ path: '.env.local' });
import handler from '@/pages/api/match';

describe('/api/match handler', () => {
  it('should return correct JSON', async () => {
    const req: any = { query: { matchId: 'TW2_82114032' } };

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
    expect(res.body.info).toHaveProperty('gameId');
    expect(res.body).toHaveProperty('metadata');
  });
  it('should return 500', async () => {
    const req: any = { query: { matchId: 'TW2_8@@@@@@' } };

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
