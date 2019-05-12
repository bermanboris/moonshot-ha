import supertest from 'supertest';
import { FormSubmissionModel } from '../../models/form-submission';
import { server } from '../../server';

const request = supertest(server);

jest.mock('express-rate-limit');
jest.mock('../../redis', () => ({
  redis: {
    sismember: () => Promise.resolve(1),
    multi: () => ({ incr: () => ({}) }),
  },
}));

afterEach(async () => {
  await FormSubmissionModel.deleteMany({});
});

describe('adding submission', () => {
  test('adds submission successfully', async () => {
    const payload = { title: 'Hello' };
    const response = await request
      .post('/')
      .send(payload)
      .set('Host', 'example.com')
      .set(
        'User-Agent',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1'
      );

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(payload);
    expect(response.body).toContainKeys(['_id', 'createdAt', 'updatedAt']);
    expect(response.body.browser).toEqual({
      name: 'Chrome',
      version: '56.0.2924.75',
      major: '56',
    });
  });
});

describe('find submissions', () => {
  test('returns submissions matching the criteria', async () => {
    const domain = 'example.com';
    await request
      .post('/')
      .send({ title: 'Hello' })
      .set('Host', domain)
      .set(
        'User-Agent',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1'
      );

    const response = await request.get('/').query({ domain });
    expect(response.status).toBe(200);
    expect(response.body).toContainAllKeys([domain]);
    const submissions = response.body[domain];
    expect(submissions).toHaveLength(1);
    const [submission] = submissions;
    expect(submission).toContainKeys(['_id', 'createdAt', 'updatedAt']);
    expect(submission.browser).toEqual({
      name: 'Chrome',
      version: '56.0.2924.75',
      major: '56',
    });
  });

  test('returns an error when no submissions is found', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: 'No submissions found. Try changing your filters..',
    });
  });
});
