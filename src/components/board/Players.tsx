import React, { FunctionComponent, useState } from 'react';
import { Circle, Group } from 'react-konva';
import { partition } from '../../utils';
import { add, Point, translate } from '../geometry';
import { GridLoc, useGridSize, useGridTopLeft, windowToGridLoc } from './grid';
import { Player as PlayerModel } from '../../features/models';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../rootReducer';
import { playerDropped } from '../../features/board';

const usePlayerRadius: () => number = () => {
  return useGridSize() / 15;
};

interface PlayersDimensions {
  width: number;
  height: number;
  topLeft: Point;
  playerSpacing: number;
}

const usePlayersDimensions: () => PlayersDimensions = () => {
  const gridSize = useGridSize();
  const playerRadius = usePlayerRadius();

  return {
    width: gridSize,
    height: gridSize / 3,
    topLeft: { x: 0, y: gridSize / 3 },
    playerSpacing: playerRadius,
  };
};

export interface PlayerProps extends PlayerModel {
  center: Point;
}

const Player: FunctionComponent<PlayerProps> = ({ center, color }) => {
  const [{ x, y }, setCenter] = useState(center);
  const dispatch = useDispatch();
  const gridSize = useGridSize();
  const boardTopLeft = useSelector((state: RootState) => state.board.topLeft);

  return (
    <Circle
      x={x}
      y={y}
      radius={usePlayerRadius()}
      fill={color}
      stroke="white"
      draggable
      onDragEnd={(e) => {
        e.cancelBubble = true; // avoid dragging the board
        const gridDroppedOn = windowToGridLoc(
          e.target.position(),
          gridSize,
          boardTopLeft
        );
        dispatch(playerDropped(color, gridDroppedOn));
        setCenter({ x: e.target.x(), y: e.target.y() });
        setCenter(center);
      }}
    />
  );
};

interface PlayersRowProps {
  players: PlayerModel[];
  topLeft: Point;
  width: number;
  height: number;
}

const PlayersRow: FunctionComponent<PlayersRowProps> = ({
  players,
  topLeft,
  width,
  height,
}) => {
  const playerRadius = usePlayerRadius();
  const { playerSpacing } = usePlayersDimensions();
  const totalPlayersWidth = players.length * playerRadius * 2;
  const totalInterPlayerDistance = (players.length - 1) * playerSpacing;
  const firstMiddleLeft = translate(
    topLeft,
    (width - (totalPlayersWidth + totalInterPlayerDistance)) / 2,
    height / 2
  );

  return (
    <Group>
      {players.map((player, i) => (
        <Player
          key={player.color}
          center={translate(
            firstMiddleLeft,
            playerRadius + i * (playerRadius * 2 + playerSpacing),
            0
          )}
          {...player}
        />
      ))}
    </Group>
  );
};

export interface PlayersProps {
  players: PlayerModel[];
  roomLoc: GridLoc;
}

const Players: FunctionComponent<PlayersProps> = ({ players, roomLoc }) => {
  const { width, height, topLeft } = usePlayersDimensions();

  const byRow = partition(players, 3);
  const rowHeight = height / byRow.length;
  const roomTopLeft = useGridTopLeft(roomLoc);

  return (
    <Group>
      {byRow.map((row, i) => (
        <PlayersRow
          key={i}
          players={row}
          topLeft={translate(add(roomTopLeft, topLeft), 0, i * rowHeight)}
          width={width}
          height={rowHeight}
        />
      ))}
    </Group>
  );
};

export default Players;
