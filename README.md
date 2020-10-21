# Anastasia

Slack bot for CHIME tsarina shift hand-offs.

Based on https://github.com/slackapi/template-slash-command-and-dialogs

## Setup

### Create a Slack app

1. Create an app at [https://api.slack.com/apps](https://api.slack.com/apps)
2. Add a Slash command (See *Add a Slash Command* section below)
3. Enable Interactive components (See *Enable Interactive Components* below)
4. Navigate to the **OAuth & Permissions** page and select the following bot token scopes:
    * `commands`
    * `chat:write`
    * `users:read`
    * `users:read.email`
    * `im:write`
5. Click 'Save Changes' and install the app (You should get an OAuth access token after the installation)

#### Add a Slash Command
1. Go back to the app settings and click on Slash Commands.
1. Click the 'Create New Command' button and fill in the following:
    * Command: `/signoff`
    * Request URL: Your server URL + `/signoff`
    * Short description: `Sign off from a tsar shift`
1. Click the 'Create New Command' button and fill in the following:
    * Command: `/signin`
    * Request URL: Your server URL + `/signin`
    * Short description: `Sign in for a tsar shift`

#### Enable Interactive Components
1. Go back to the app settings and click on Interactive Components.
1. Set the Request URL to your server or Glitch URL + `/report`.
1. Save the change.


#### Run the app

1. Get the code
    * Clone this repo and run `npm install`
2. Set the following environment variables to `.env` (see `.env.sample`):
    * `ANASTASIA_SLACK_ACCESS_TOKEN`: Your bot token, `xoxb-` (available on the **OAuth & Permissions** once you install the app)
    * `ANASTASIA_SLACK_SIGNING_SECRET`: Your app's Signing Secret (available on the **Basic Information** page)
    * `ANASTASIA_SLACK_CHANNEL`: The ID of the channel anastasia should post to (you find it in the URL when visiting the channel with a browser)
3. Run the app (`npm start`).
