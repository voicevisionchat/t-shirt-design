import { proxy } from 'valtio';

const state = proxy({
  intro: false,
  color: 'white',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
  logoColor : 'green',
  text : 'VoiceVision',
  textColor : 'black',
});

export default state;
