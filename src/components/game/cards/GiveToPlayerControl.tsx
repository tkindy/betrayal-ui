import React, { FunctionComponent } from 'react';
import { Player } from '../../../features/models';

interface GiveToPlayerControlProps {
  players?: Player[];
  onChange: (playerId: number) => void;
}

const GiveToPlayerControl: FunctionComponent<GiveToPlayerControlProps> = ({
  players,
  onChange,
}) => {
  if (!players) {
    return null;
  }

  return (
    <select onChange={(e) => onChange(parseInt(e.target.value))}>
      <option value="">Give card to...</option>
      {players.map((player) => (
        <option value={player.id}>{player.characterName}</option>
      ))}
    </select>
  );
};

export default GiveToPlayerControl;
