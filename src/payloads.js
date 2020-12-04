'use strict';

module.exports = {
  signin: context => {
    return {
      channel: context.channel_id,
      blocks: JSON.stringify([
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*<@${context.user}> signed in.*`,
          },
        },
      ]),
    };
  },
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
            text: `*<@${context.user}> signed off.*`,
          },
        },
        // {
        //   type: 'context',
        //   elements: [
        //     {
        //       type: 'mrkdwn',
        //       text: '*See all tsarina reports here*: http://foo.bar',
        //     },
        //   ],
        // },
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
              text: 'Number of nodes running kotekan',
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
              text: 'How many GPU nodes are up running kotekan right now?',
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

          // Number of flagged feeds
          {
            block_id: 'num_flagged_feeds_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Number of flagged feeds',
            },
            element: {
              action_id: 'num_flagged_feeds',
              type: 'plain_text_input',
              placeholder: {
                type: 'plain_text',
                text: 'Enter a number',
              },
            },
            hint: {
              type: 'plain_text',
              text: 'How many feeds are flagged right now?',
            },
          },
          {
            block_id: 'num_flagged_feeds_note_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Note:',
            },
            element: {
              action_id: 'num_flagged_feeds_note',
              type: 'plain_text_input',
              placeholder: {
                type: 'plain_text',
                text: 'Add details here: Has the number changed during your ' +
                  'shift? Possible causes for jumps in the number?',
              },
              multiline: true,
            },
            hint: {
              type: 'plain_text',
              text: 'Details about flagged feeds.',
            },
            optional: true,
          },
          {
            type: 'divider',
          },

          // Median RFI
          {
            block_id: 'median_rfi1_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Median RFI (Stage 1)',
            },
            hint: {
              type: 'plain_text',
              text: 'Eyeball the median for the duration of your shift using ' +
                'the System Health Quicklook: <https://grafana.chimenet.ca/' +
                'd/K1vQ0fPmk/system-health-quicklook>',
            },
            element: {
              action_id: 'rfi',
              type: 'plain_text_input',
              placeholder: {
                type: 'plain_text',
                text: 'Enter a percentage',
              },
            },
          },
          {
            block_id: 'median_rfi2_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Median RFI (Stage 2)',
            },
            hint: {
              type: 'plain_text',
              text: 'Eyeball the median for the duration of your shift using ' +
                'the System Health Quicklook: <https://grafana.chimenet.ca/' +
                'd/K1vQ0fPmk/system-health-quicklook>',
            },
            element: {
              action_id: 'rfi',
              type: 'plain_text_input',
              placeholder: {
                type: 'plain_text',
                text: 'Enter a percentage',
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
                    text: 'All services are running',
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
                    text: 'All current alerts are understood and the ' +
                      'underlying problems are solved',
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
              text: 'Percentage of good frequencies',
            },
            element: {
              action_id: 'calibration',
              type: 'plain_text_input',
              placeholder: {
                type: 'plain_text',
                text: 'Enter a percentage',
              },
            },
            hint: {
              type: 'plain_text',
              text: 'See <https://grafana.chimenet.ca/d/EjvkNI2mz/' +
                'calibration-broker> for the percentage of good frequencies ' +
                'for the last calibration transit.',
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
            block_id: 'sensitivity_ew_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Average Sensitivity for EW',
            },
            hint: {
              type: 'plain_text',
              text: '<https://grafana.chimenet.ca/d/d_OJtTBmk/data-integrity>',
            },
            element: {
              action_id: 'sensitivity',
              type: 'plain_text_input',
              placeholder: {
                type: 'plain_text',
                text: 'Enter a value in uJy',
              },
            },
          },
          {
            block_id: 'sensitivity_ns_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Average Sensitivity for NS',
            },
            hint: {
              type: 'plain_text',
              text: '<https://grafana.chimenet.ca/d/d_OJtTBmk/data-integrity>',
            },
            element: {
              action_id: 'sensitivity',
              type: 'plain_text_input',
              placeholder: {
                type: 'plain_text',
                text: 'Enter a value in uJy',
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
            type: 'input',
            block_id: 'gains_block',
            element: {
              type: 'checkboxes',
              action_id: 'gains_ok',
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: 'There ihave been no gain jumps during my shift',
                  },
                  description: {
                    type: 'mrkdwn',
                    text: '<https://grafana.chimenet.ca/d/d_OJtTBmk/' +
                      'data-integrity>',
                  },
                  value: 'ok',
                },
              ],
            },
            optional: true,
            label: {
              type: 'plain_text',
              text: 'Gain jumps',
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
          // TODO: activate once theremin plot is available
          // {
          //   block_id: 'transit_block',
          //   type: 'input',
          //   label: {
          //     type: 'plain_text',
          //     text: 'Latest source flux',
          //   },
          //   element: {
          //     action_id: 'transit_flux',
          //     type: 'plain_text_input',
          //     placeholder: {
          //       type: 'plain_text',
          //       text: 'Enter a number',
          //     },
          //   },
          //   hint: {
          //     type: 'plain_text',
          //     text: 'If there was a transit during the shift',
          //   },
          //   optional: true,
          // },
          // {
          //   block_id: 'transit_note_block',
          //   type: 'input',
          //   label: {
          //     type: 'plain_text',
          //     text: 'Note:',
          //   },
          //   element: {
          //     action_id: 'transit_note',
          //     type: 'plain_text_input',
          //     multiline: true,
          //     placeholder: {
          //       type: 'plain_text',
          //       text: 'Add details here',
          //     },
          //   },
          //   optional: true,
          // },
          // {
          //   type: 'divider',
          // },

          // Ringmap
          {
            type: 'input',
            block_id: 'ringmap_block',
            element: {
              type: 'checkboxes',
              action_id: 'ringmap_ok',
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: 'The ringmap looks good',
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
                text: 'Note any anomalous features here. e.g. sudden level ' +
                  'changes, apparent RFI, garbled or missing data, ...',
              },
            },
            optional: true,
          },
        ],
      }),
    };
  },
};
