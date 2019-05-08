import express from 'express';
import { applyMiddlewares } from './middleware';
import { FormSubmission } from './models/FormSubmittion';

const app = express();
applyMiddlewares(app);

app.get('/', async (req, res) => {
  const payload = req.query;
  const domain = req.hostname;

  try {
    const formSubmission = new FormSubmission({
      ...payload,
      domain,
      browser: req.userAgent.browser,
    });

    const result = await formSubmission.save();
    res.json(result);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.get('/find', async (req, res) => {
  const { domain, from, until, skip, limit } = req.query;

  const record = {
    domain,
    created_at: { $lte: from, $gte: until },
  };

  try {
    const submissions = await FormSubmission.find(record)
      .skip(+skip)
      .limit(+limit);

    res.json({ [domain]: submissions });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export { app };
