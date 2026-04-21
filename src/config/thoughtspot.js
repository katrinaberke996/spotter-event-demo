import { init, AuthType, AuthStatus } from '@thoughtspot/visual-embed-sdk';

const authStatus = init({
  thoughtSpotHost: 'https://se-thoughtspot-cloud.thoughtspot.cloud',
  authType: AuthType.Basic,
  username: 'katrina.berke@thoughtspot.com',
  password: 'Rosslyn12345@',
  customizations: {
    content: {
      strings: {
        'Meet Spotter, your AI analyst': 'Hi, I\'m Spotter! How can I help?',
        'Spotter is your AI analyst. It can answer questions you have about your data source and help you find insights quickly.': ' ',
        'To start analysing, ask a business question about your data.': ' ',
        'To start analyzing, ask a business question about your data.': ' ',
        'Meet Spotter': 'Hi, I\'m Spotter! How can I help?',
      },
    },
    style: {
      customCSS: {
        variables: {
          '--ts-var-root-background': '#ffffff',
          '--ts-var-root-color': '#000000',
          '--ts-var-button--primary-background': 'linear-gradient(135deg, #6e3cbf 0%, #3b82f6 100%)',
          '--ts-var-button--primary-color': '#ffffff',
          '--ts-var-button--primary-border-radius': '10px',
        },
        rules_UNSTABLE: {
          '.avatar-module__bgOrangeBase': {
            'background': 'linear-gradient(135deg, #6e3cbf 0%, #3b82f6 100%) !important',
          },
          // Hide the MCP connectors module in the Spotter prompt panel
          '.button-module__buttonWrapper.chat-connector-resources-module__addConnectorResourceButton': {
            'display': 'none !important',
          },
          // Hide the add resources (+) icon in the Spotter prompt panel
          'button.button-module__button.button-module__buttonWithIcon.button-module__tertiary.button-module__sizeM.button-module__backgroundLight.button-module__both': {
            'display': 'none !important',
          },
        },
      },
    },
  },
});

authStatus.on(AuthStatus.SUCCESS, () => {
  console.log('ThoughtSpot auth successful');
});

authStatus.on(AuthStatus.FAILURE, (reason) => {
  console.error('ThoughtSpot auth failed:', reason);
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {};