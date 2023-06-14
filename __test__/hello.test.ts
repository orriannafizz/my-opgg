import handler from '@/pages/api/hello';
describe('/api/hello handler', () => {
  it('should return correct JSON', () => {
    const req: any = {};

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

    handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ name: 'John Doe' });
  });
});
