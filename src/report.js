'use strict';

const debug = require('debug')('anastasia:report');
const api = require('./api');
const payloads = require('./payloads');

/*
 *  Send report creation confirmation via
 *  chat.postMessage to #tsar_committee
 */
const sendConfirmation = async(report) => {
  let text = `Number of active nodes: ${report.num_nodes}\n`;
  text += report.num_nodes_note ? `Note: ${report.num_nodes_note}\n\n` : '\n';

  text += `Median RFI: ${report.median_rfi}\n`;
  text += report.median_rfi_note ? `Note: ${report.median_rfi_note}\n\n` : '\n';

  text += report.system_health_ok ? report.system_health_note ?
    'System Health ' : '' :
    'There are issues on the System Health Quicklook panel.\n';
  text += report.system_health_note ? `Note: ${report.system_health_note}\n\n` :
    report.system_health_ok ? '' : '\n';

  text += report.alerts_ok ? report.alerts_note ? 'Alerts ' : '' :
    'There are outstanding alerts.\n';
  text += report.alerts_note ? `Note: ${report.alerts_note}\n\n` :
    report.alerts_ok ? '' : '\n';

  text += `Good frequencies: ${report.calibration}\n`;
  text += report.calibration_note ?
    `Note: ${report.calibration_note}\n\n` : '\n';

  text += `Average sensitivity: ${report.sensitivity}\n`;
  text += report.sensitivity_note ?
    `Note: ${report.sensitivity_note}\n\n` : '\n';

  text += `Number of gain jumps: ${report.gains}\n`;
  text += report.gains_note ? `Note: ${report.gains_note}\n\n` : '\n';

  text += report.transit_flux ? `Latest source flux: ${report.transit_flux}\n` :
    report.transit_flux_note ? 'Transits ' : '';
  text += report.transit_flux_note ? `Note: ${report.transit_flux_note}\n\n` :
    report.transit_flux ? '\n' : '';

  text += report.ringmap_ok ? report.ringmap_note ? 'Ringmap ' : '' :
    'There are issues with the ringmap.\n';
  text += report.ringmap_note ? `Note: ${report.ringmap_note}\n\n` :
    report.ringmap_ok ? '' : '\n';

  let message = payloads.confirmation({
    channel_id: process.env.ANASTASIA_SLACK_CHANNEL,
    report: text,
    user: report.user_id,
  });

  let result = await api.callAPIMethod('chat.postMessage', message);
  debug('sendConfirmation: %o', result);
};

// Create report. Call users.info to get the username
// from their user ID
const create = async(userId, view) => {
  let values = view.state.values;

  let system_health_selection =
    values.system_health_block.system_health_ok.selected_options;
  let alerts_selection = values.alerts_block.alerts_ok.selected_options;
  let ringmap_selection = values.ringmap_block.ringmap_ok.selected_options;

  await sendConfirmation({
    user_id: userId,
    num_nodes: values.num_nodes_block.num_nodes.value,
    num_nodes_note: values.num_nodes_note_block.num_nodes_note.value,
    median_rfi: values.median_rfi_block.rfi.value,
    median_rfi_note: values.median_rfi_note_block.median_rfi_note.value,
    system_health_ok: (system_health_selection !== undefined
      && system_health_selection.length === 1),
    system_health_note:
      values.system_health_note_block.system_health_note.value,
    alerts_ok: (alerts_selection !== undefined
      && alerts_selection.length === 1),
    alerts_note: values.alerts_note_block.alerts_note.value,
    calibration: values.calibration_block.calibration.value,
    calibration_note: values.calibration_note_block.calibration_note.value,
    sensitivity: values.sensitivity_block.sensitivity.value,
    sensitivity_note: values.sensitivity_note_block.sensitivity_note.value,
    gains: values.gains_block.gains.value,
    gains_note: values.gains_note_block.gains_note.value,
    transit_flux: values.transit_block.transit_flux.value,
    transit_flux_note: values.transit_note_block.transit_note.value,
    ringmap_ok: (ringmap_selection !== undefined
      && ringmap_selection.length === 1),
    ringmap_note: values.ringmap_note_block.ringmap_note.value,
  });
};

module.exports = {create, sendConfirmation};
