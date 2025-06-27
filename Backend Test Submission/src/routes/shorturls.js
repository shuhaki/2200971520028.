const express = require('express');
const Joi = require('joi');
const { createShortUrl, redirectAndTrack, getStats } = require('../services/urlservice');
const logger = require('../middleware/logger');
const router = express.Router();
module.exports = router;


const createSchema = Joi.object({
  url: Joi.string().uri().required(),
  validity: Joi.number().integer().min(1),
  shortcode: Joi.string().alphanum().min(4).max(10)
});

router.post(
  '/shorturls',
  logger('backend','info','route','POST /shorturls'),
  async (req, res, next) => {
    try {
      const { error, value } = createSchema.validate(req.body);
      if (error) throw Object.assign(new Error(error.message), { status: 400 });
      const result = await createShortUrl(value);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/:code',
  logger('backend','info','route','GET /:code'),
  async (req, res, next) => {
    try {
      await redirectAndTrack(req.params.code, req, res);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  '/shorturls/:code',
  logger('backend','info','route','GET /shorturls/:code'),
  async (req, res, next) => {
    try {
      const stats = await getStats(req.params.code);
      res.json(stats);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
