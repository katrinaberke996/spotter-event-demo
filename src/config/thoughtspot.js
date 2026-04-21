import { init, AuthType, AuthStatus } from '@thoughtspot/visual-embed-sdk';

const authStatus = init({
  thoughtSpotHost: 'https://se-thoughtspot-cloud.thoughtspot.cloud',
  authType: AuthType.None,
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

const config = {};
export default config;