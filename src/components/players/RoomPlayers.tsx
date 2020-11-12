import React, { FunctionComponent, useState } from 'react';
import { Circle, Group, Text } from 'react-konva';
import { partition } from '../../utils';
import { translate } from '../geometry';
import {
  GridLoc,
  pointToGridLoc,
  useGridBox,
  useGridSize,
} from '../board/grid';
import { Player as PlayerModel, PlayerColor } from '../../features/models';
import { useDispatch } from 'react-redux';
import { playerDropped } from '../../features/players';
import { BoundingBox, getCenter, getPlayersBox } from '../layout';
import { useRender } from '../hooks';
import Hovercard from '../Hovercard';

interface PlayerProps {
  color: PlayerColor;
  box: BoundingBox;
}

const Player: FunctionComponent<PlayerProps> = ({ box, color }) => {
  const { x, y } = getCenter(box);
  const { width, height } = box.dimensions;
  const radius = Math.min(width, height) / 2;

  const render = useRender();
  const dispatch = useDispatch();
  const gridSize = useGridSize();

  const [hovered, setHovered] = useState(false);

  return (
    <Group>
      <Circle
        x={x}
        y={y}
        radius={radius}
        fill={color}
        stroke="white"
        draggable
        onDragStart={() => setHovered(false)}
        onDragEnd={(e) => {
          e.cancelBubble = true; // avoid dragging the board

          dispatch(
            playerDropped(color, pointToGridLoc(e.target.position(), gridSize))
          );

          render(); // to snap back if dropped in an invalid spot
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      <Hovercard
        enabled={hovered}
        targetBox={box}
        contentDimensions={{ width: 100, height: 200 }}
        renderContent={({
          topLeft: { x, y },
          dimensions: { width, height },
        }) => (
          <Text
            x={x}
            y={y}
            width={width}
            height={height}
            text="Hello, world!"
            fontSize={24}
          />
        )}
      />
    </Group>
  );
};

interface PlayersRowProps {
  box: BoundingBox;
  players: PlayerModel[];
}

const PlayersRow: FunctionComponent<PlayersRowProps> = ({
  players,
  box: {
    topLeft,
    dimensions: { width, height },
  },
}) => {
  const playerWidth = width / 6;
  const playerHeight = playerWidth;
  const playerSpacing = playerWidth / 2;
  const totalPlayersWidth = players.length * playerWidth;
  const totalInterPlayerDistance = (players.length - 1) * playerSpacing;
  const firstTopLeft = translate(
    topLeft,
    (width - (totalPlayersWidth + totalInterPlayerDistance)) / 2,
    (height - playerHeight) / 2
  );
  return (
    <Group>
      {players.map((player, i) => (
        <Player
          key={player.color}
          box={{
            topLeft: translate(
              firstTopLeft,
              i * (playerWidth + playerSpacing),
              0
            ),
            dimensions: { width: playerWidth, height: playerHeight },
          }}
          {...player}
        />
      ))}
    </Group>
  );
};

export interface RoomPlayersProps {
  players: PlayerModel[];
  roomLoc: GridLoc;
}

const RoomPlayers: FunctionComponent<RoomPlayersProps> = ({
  players,
  roomLoc,
}) => {
  const roomBox = useGridBox(roomLoc);
  const {
    topLeft,
    dimensions: { width, height },
  } = getPlayersBox(roomBox);

  const byRow = partition(players, 3);
  const rowHeight = height / byRow.length;

  return (
    <Group>
      {byRow.map((row, i) => (
        <PlayersRow
          key={i}
          box={{
            topLeft: translate(topLeft, 0, i * rowHeight),
            dimensions: { width, height: rowHeight },
          }}
          players={row}
        />
      ))}
    </Group>
  );
};

export default RoomPlayers;
