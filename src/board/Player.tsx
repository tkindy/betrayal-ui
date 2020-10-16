import React, { FunctionComponent } from 'react';

enum PlayerColor {
  WHITE,
  BLUE,
  GREEN,
  YELLOW,
  RED,
  PURPLE,
}

export interface PlayerProps {
  color: PlayerColor;
}

const Player: FunctionComponent<PlayerProps> = () => {
  return <div></div>;
};

export default Player;
