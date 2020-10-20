const debug = require('debug')('anastasia:report');
const api = require('./api');
const payloads = require('./payloads');

/*
 *  Send report creation confirmation via
 *  chat.postMessage to #tsar_committee
 */
const sendConfirmation = async (report) => {

  let message = payloads.confirmation({
    channel_id: 'CFV01K274',
    report: `Number of active nodes: ${report.num_nodes} (${report.num_nodes_note})\nMedian RFI: ${report.median_rfi} (${report.median_rfi_note})`,
    user: report.user_name,
  });
  console.log(message)

  let result = await api.callAPIMethod('chat.postMessage', message)
  console.log(result)
  debug('sendConfirmation: %o', result);
};

// Create helpdesk ticket. Call users.find to get the user's email address
// from their user ID
const create = async (userId, view) => {
  let values = view.state.values;

  let result = await api.callAPIMethod('users.info', {
    user: userId
  });

  console.log(userId)
  await sendConfirmation({
    userId,
    user_name: result.user.name,
    num_nodes: values.num_nodes_block.num_nodes.value,
    num_nodes_note: values.num_nodes_note_block.num_nodes_note.value || 'no note',
    median_rfi: values.median_rfi_block.rfi.value,
    median_rfi_note: values.median_rfi_note_block.median_rfi_note.value || 'no note',
  });
};

module.exports = { create, sendConfirmation };
