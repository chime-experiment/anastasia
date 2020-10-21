'use strict';

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const report = require('./report');
const signature = require('./verifySignature');
const api = require('./api');
const payloads = require('./payloads');
const debug = require('debug')('anastasia:index');

const app = express();

/*
 * Parse application/x-www-form-urlencoded && application/json
 * Use body-parser's `verify` callback to export a parsed raw body
 * that you need to use to verify the signature
 */

const rawBodyBuffer = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};

app.use(bodyParser.urlencoded({verify: rawBodyBuffer, extended: true}));
app.use(bodyParser.json({verify: rawBodyBuffer}));

app.get('/',
  (req, res) => {
    res.send('<h2>Anastasia is running</h2> <p>Follow the' +
      ' instructions in the README to configure the Slack App and your ' +
      'environment variables.</p>');
  });

/*
 * Endpoint to receive /signoff slash command from Slack.
 * Checks verification token and opens a dialog to capture more info.
 */
app.post('/signoff', async(
  req, res) => {
  debug('signoff');
  console.log('signoff');
  console.log(req.body);
  // Verify the signing secret
  if (!signature.isVerified(req)) {
    debug('Verification token mismatch');
    return res.status(404).send();
  }

  // extract the slash command text, and trigger ID from payload
  const {trigger_id} = req.body;

  // create the modal payload - includes the dialog structure, Slack API token,
  // and trigger ID
  let view = payloads.modal({
    trigger_id,
  });

  let result = await api.callAPIMethod('views.open', view);

  debug('views.open: %o', result);
  return res.send('');
});

/*
 * Endpoint to receive the dialog submission. Checks the verification token
 * and creates a report entry
 */
app.post('/report', (req,
  res) => {
  // Verify the signing secret
  if (!signature.isVerified(req)) {
    debug('Verification token mismatch');
    return res.status(404).send();
  }

  const body = JSON.parse(req.body.payload);
  res.send('');
  report.create(body.user.id, body.view);
});

const server = app.listen(process.env.PORT || 8010, () => {
  console.log('Express server listening on port %d in %s mode',
    server.address().port, app.settings.env);
});
