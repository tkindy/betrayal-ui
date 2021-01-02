import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface GiveToPlayerControlProps {
  onChange: (playerId: number) => void;
}

const GiveToPlayerControl: FunctionComponent<GiveToPlayerControlProps> = ({
  onChange,
}) => {
  const players = useSelector((state: RootState) => state.players.players);

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
