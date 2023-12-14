'use strict';

const debug = require('debug')('anastasia:report');
const api = require('./api');
const payloads = require('./payloads');

/*
 *  Send report creation confirmation via
 *  chat.postMessage to #tsar_committee
 */
const sendConfirmation = async(report) => {

  let message = payloads.confirmation({
    channel_id: process.env.ANASTASIA_SLACK_CHANNEL,
    report: report.report,
    user: report.user_id,
  });

  let result = await api.callAPIMethod('chat.postMessage', message);
  debug('sendConfirmation: %o', result);
};

// Create report. Call users.info to get the username
// from their user ID
const create = async(userId, view) => {

  let user_report = view.state.values.notes_block.report_text.value;

  await sendConfirmation({user_id: userId, report: user_report});

};

module.exports = {create, sendConfirmation};
