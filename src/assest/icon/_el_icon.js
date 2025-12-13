import Icon from './nav.svg';
import Home from './home.svg';
import Pause from './pause.svg';
import DocFrom from './doc.svg';
import Heart from './heartinhand.svg';
import BlueSvg from './bluesvg.svg'
import White from './whiteline.svg'
import ADD from './fi-rs-add.svg'

const ICONS = {
  icon: Icon,
  home: Home,
  pause: Pause,
  docfrom: DocFrom,
  heart: Heart,
  bluesvg: BlueSvg,
  white: White,
  add: ADD
};

import React from 'react';

export function SvgIcon({ name = 'icon', width = 24, height = 24, ...rest }) {
  const IconComp = ICONS[name];
  if (!IconComp) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  return <IconComp width={width} height={height} {...rest} />;
}

export { Icon, Home, Pause, DocFrom, Heart , BlueSvg, White, ADD };
