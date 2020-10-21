'use strict';

module.exports = {
  confirmation: context => {
    return {
      channel: context.channel_id,
      text: 'Report sent!',
      blocks: JSON.stringify([
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*Report from Last Shift*',
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: context.report,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `User: ${context.user}`,
          },
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: '*See all tsarina reports here*: http://foo.bar',
            },
          ],
        },
      ]),
    };
  },
  modal: context => {
    return {
      trigger_id: context.trigger_id,
      view: JSON.stringify({
        type: 'modal',
        title: {
          type: 'plain_text',
          text: 'Tsarina Shift Sign-Off',
        },
        callback_id: 'submit-ticket',
        submit: {
          type: 'plain_text',
          text: 'Submit',
        },
        blocks: [
          // Number of active nodes
          {
            block_id: 'num_nodes_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Number of active nodes',
            },
            element: {
              action_id: 'num_nodes',
              type: 'plain_text_input',
              placeholder: {
                type: 'plain_text',
                text: 'Enter a number',
              },
            },
            hint: {
              type: 'plain_text',
              text: 'How many active nodes are there right now?',
            },
          },
          {
            block_id: 'num_nodes_note_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Note:',
            },
            element: {
              action_id: 'num_nodes_note',
              type: 'plain_text_input',
              placeholder: {
                type: 'plain_text',
                text: 'Add details here',
              },
              multiline: true,
            },
            hint: {
              type: 'plain_text',
              text: 'Details about bad nodes.',
            },
            optional: true,
          },
          {
            type: 'divider',
          },

          // Median RFI
          {
            block_id: 'median_rfi_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Median RFI',
            },
            element: {
              action_id: 'rfi',
              type: 'plain_text_input',
              placeholder: {
                type: 'plain_text',
                text: 'Enter a number, I guess. What is Median RFI, Mandana?',
              },
            },
          },
          {
            block_id: 'median_rfi_note_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Note:',
            },
            element: {
              action_id: 'median_rfi_note',
              type: 'plain_text_input',
              multiline: true,
              placeholder: {
                type: 'plain_text',
                text: 'Add details here',
              },
            },
            optional: true,
          },
          {
            type: 'divider',
          },

          // System Health
          {
            type: 'input',
            block_id: 'system_health_block',
            element: {
              type: 'checkboxes',
              action_id: 'system_health_ok',
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: 'Are all services running?',
                  },
                  value: 'ok',
                  description: {
                    type: 'mrkdwn',
                    text: 'Have a look at <https://grafana.chimenet.ca/' +
                      'd/K1vQ0fPmk/system-health-quicklook>.',
                  },
                },
              ],
            },
            optional: true,
            label: {
              type: 'plain_text',
              text: 'System Health Quicklook',
            },
          },
          {
            block_id: 'system_health_note_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Note:',
            },
            element: {
              action_id: 'system_health_note',
              type: 'plain_text_input',
              multiline: true,
              placeholder: {
                type: 'plain_text',
                text: 'Add details here',
              },
            },
            optional: true,
          },

          // Alerts
          {
            type: 'divider',
          },
          {
            type: 'input',
            block_id: 'alerts_block',
            element: {
              type: 'checkboxes',
              action_id: 'alerts_ok',
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: 'Are all current alerts understood and the ' +
                      'underlying problems solved?',
                  },
                  value: 'ok',
                },
              ],
            },
            optional: true,
            label: {
              type: 'plain_text',
              text: 'Outstanding Alerts',
            },
          },
          {
            block_id: 'alerts_note_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Note:',
            },
            element: {
              action_id: 'alerts_note',
              type: 'plain_text_input',
              multiline: true,
              placeholder: {
                type: 'plain_text',
                text: 'Add details here',
              },
            },
            optional: true,
          },
          {
            type: 'divider',
          },

          // Calibration
          {
            block_id: 'calibration_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Fraction of good frequencies',
            },
            element: {
              action_id: 'calibration',
              type: 'plain_text_input',
              placeholder: {
                type: 'plain_text',
                text: 'Enter a decimal',
              },
            },
          },
          {
            block_id: 'calibration_note_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Note:',
            },
            element: {
              action_id: 'calibration_note',
              type: 'plain_text_input',
              multiline: true,
              placeholder: {
                type: 'plain_text',
                text: 'Add details here',
              },
            },
            optional: true,
          },
          {
            type: 'divider',
          },

          // Sensitivity
          {
            block_id: 'sensitivity_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Average Sensitivity',
            },
            element: {
              action_id: 'sensitivity',
              type: 'plain_text_input',
              placeholder: {
                type: 'plain_text',
                text: 'Enter a number',
              },
            },
          },
          {
            block_id: 'sensitivity_note_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Note:',
            },
            element: {
              action_id: 'sensitivity_note',
              type: 'plain_text_input',
              multiline: true,
              placeholder: {
                type: 'plain_text',
                text: 'Add details here',
              },
            },
            optional: true,
          },
          {
            type: 'divider',
          },

          // Gains
          {
            block_id: 'gains_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Number of gain jumps',
            },
            element: {
              action_id: 'gains',
              type: 'plain_text_input',
              placeholder: {
                type: 'plain_text',
                text: 'Enter a number',
              },
            },
          },
          {
            block_id: 'gains_note_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Note:',
            },
            element: {
              action_id: 'gains_note',
              type: 'plain_text_input',
              multiline: true,
              placeholder: {
                type: 'plain_text',
                text: 'Add details here',
              },
            },
            optional: true,
          },
          {
            type: 'divider',
          },

          // Transits
          {
            block_id: 'transit_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Latest source flux',
            },
            element: {
              action_id: 'transit_flux',
              type: 'plain_text_input',
              placeholder: {
                type: 'plain_text',
                text: 'Enter a number',
              },
            },
            hint: {
              type: 'plain_text',
              text: 'If there was a transit during the shift',
            },
            optional: true,
          },
          {
            block_id: 'transit_note_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Note:',
            },
            element: {
              action_id: 'transit_note',
              type: 'plain_text_input',
              multiline: true,
              placeholder: {
                type: 'plain_text',
                text: 'Add details here',
              },
            },
            optional: true,
          },
          {
            type: 'divider',
          },

          // Ringmap
          {
            type: 'input',
            block_id: 'ringmap_block',
            element: {
              type: 'checkboxes',
              action_id: 'alerts_ok',
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: 'Does the ringmap look alright?',
                  },
                  description: {
                    type: 'plain_text',
                    text: 'https://theremin.chimenet.ca/graphs/ringmap',
                  },
                  value: 'ok',
                },
              ],
            },
            optional: true,
            label: {
              type: 'plain_text',
              text: 'Ringmap',
            },
          },
          {
            block_id: 'ringmap_note_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Note:',
            },
            element: {
              action_id: 'ringmap_note',
              type: 'plain_text_input',
              multiline: true,
              placeholder: {
                type: 'plain_text',
                text: 'Add details here',
              },
            },
            optional: true,
          },
        ],
      }),
    };
  },
};
