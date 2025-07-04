'use strict';

const debug = require('debug')('anastasia:report');
const api = require('./api');
const payloads = require('./payloads');

/*
 *  Send sign-off and report via chat.postMessage to #tsar_committee
 */
const sendReport = async(report) => {

  let message = payloads.report({
    channel_id: process.env.ANASTASIA_SLACK_CHANNEL,
    report: report.report,
    user: report.user_id,
  });

  let result = await api.callAPIMethod('chat.postMessage', message);
  debug('sendReport: %o', result);
};

// Create report. Call users.info to get the username
// from their user ID
const create = async(userId, view) => {

  let user_info = await api.callAPIMethod('users.info', { user: userId });
  let user_real_name = user_info.user.real_name;

  let user_report = view.state.values.notes_block.report_text.value;

  let lightwood_post = `<@${process.env.ANASTASIA_LIGHTWOOD_SLACK_ID}> post`;
  let run_notes_preamble = `'''(${user_real_name} - shift report)''':`;
  let report_msg = `${lightwood_post} ${run_notes_preamble} ${user_report}`;

  await sendReport({user_id: userId, report: report_msg});

};

module.exports = {create, sendReport};
