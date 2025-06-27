const dayjs = require('dayjs');
const geoip = require('geoip-lite');
const Url = require('../models/Url');
const Click = require('../models/click');
const { genCode, validateCustom } = require('../utils/shortcode');
const { APP_HOST } = require('../config');

async function createShortUrl({ url, validity = 30, shortcode }) {
  let code = (shortcode && validateCustom(shortcode)) ? shortcode : genCode();
  while (await Url.exists({ shortcode: code })) {
    code = genCode();
  }
  const expiry = dayjs().add(validity, 'minute').toDate();
  const doc = await Url.create({ originalUrl: url, shortcode: code, expiry });
  return {
    shortLink: `${APP_HOST}/${code}`,
    expiry: doc.expiry.toISOString()
  };
}

async function redirectAndTrack(code, req, res) {
  const urlDoc = await Url.findOne({ shortcode: code });
  if (!urlDoc || urlDoc.expiry < new Date()) {
    const err = new Error('Link not found or expired');
    err.status = 404;
    throw err;
  }
  const ip = req.ip;
  const geo = geoip.lookup(ip) || {};
  const click = await Click.create({
    url: urlDoc._id,
    referrer: req.get('Referrer') || 'direct',
    country: geo.country || 'unknown'
  });
  urlDoc.clicks.push(click._id);
  await urlDoc.save();
  res.redirect(urlDoc.originalUrl);
}

async function getStats(code) {
  const urlDoc = await Url.findOne({ shortcode: code }).populate('clicks');
  if (!urlDoc) {
    const err = new Error('Stats not found');
    err.status = 404;
    throw err;
  }
  return {
    originalUrl:   urlDoc.originalUrl,
    createdAt:     urlDoc.createdAt,
    expiry:        urlDoc.expiry,
    clicks:        urlDoc.clicks.length,
    clickDetails:  urlDoc.clicks.map(c => ({
      timestamp: c.timestamp,
      referrer:  c.referrer,
      location:  c.country
    }))
  };
}

module.exports = { createShortUrl, redirectAndTrack, getStats };
