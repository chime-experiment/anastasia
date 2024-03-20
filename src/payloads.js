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
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'Write a brief report about anything from your shift you think is worth mentioning.\n' +
                    'Some potential things to check:',
            },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '- Look at the number of healthy nodes\n' +
                    '- Check that all systems are running normally (X-Engine, F-Engine, Coco, Gossec, etc...)\n' +
                    '- Check that the number of flagged feeds is not too high\n' +
                    '- Check for abover-average RFI excision and/or large spikes in excision. ' +
                    'Reference Theremin to try to understand any events.\n' +
                    '- Check for any weather which could affect the intstrument (snow, rain, heat)\n' +
                    '- Check any alerts in `chime_ops`, `rx_hut_alerts`, `gpu_hut_alerts`\n' +
                    '- Check `gpu_hut_ops` to see if Coco is reporting any issues\n' +
                    '- Check the calibration broker page in Grafana and make note of anything odd\n' +
                    '- Check the table under the ' +
                    '[Counter header in theremin](https://theremin.chimenet.ca/graphs/jumps) for feeds with a ' +
                    'large number of jumps (> 3-5). Sort the table by decreasing Number of Jumps and get the ' +
                    'associated Correlator Input IDs. Check those feeds ' +
                    '[in Grafana](https://grafana.chimenet.ca/d/v_R89dSiz/correlator-input-info) ' +
                    'to make sure they are being consistently flagged',
            },
          },
          {
            type: 'divider',
          },
          {
            block_id: 'notes_block',
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Write your report here:',
            },
            element: {
              action_id: 'report_text',
              type: 'plain_text_input',
              multiline: true,
              placeholder: {
                type: 'plain_text',
                text: 'Discuss anything relevant from your shift.',
              },
            },
          },
        ],
      }),
    };
  },
};
