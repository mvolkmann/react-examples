// Is there a tool that can parse a CSS file and create this?
import {css} from 'glamor';

export const app = css({
  textAlign: 'center',
  '& p': {
    color: 'blue'
  }
});

export const appHeader = css({
  backgroundColor: '#222',
  height: 150,
  padding: 20,
  color: 'white'
});

export const appIntro = css({
  fontSize: 'large'
});

const appLogoSpin = css.keyframes({
  from: {transform: 'rotate(0deg)'},
  to: {transform: 'rotate(360deg)'}
});

export const appLogo = css({
  animation: `${appLogoSpin} infinite 20s linear`,
  height: 80
});
