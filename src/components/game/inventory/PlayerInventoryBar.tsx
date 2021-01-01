import React, { FunctionComponent } from 'react';
import { Group, Rect } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';
import { switchSelectedPlayer } from '../../../features/players';
import {
  getPlayers,
  getSelectedPlayer,
  getSelectedPlayerId,
} from '../../../features/selectors';
import { Point, translate } from '../../geometry';
import { BoundingBox, Dimensions } from '../../layout';
import { useWindowDimensions } from '../../windowDimensions';
import DOMPortal from '../portal/DOMPortal';
import {
  SIDEBAR_MARGIN,
  SIDEBAR_PADDING,
  SIDEBAR_WIDTH,
} from '../sidebar/Sidebar';

const INVENTORY_BAR_HEIGHT = SIDEBAR_WIDTH;
const INVENTORY_BAR_MARGIN = SIDEBAR_MARGIN;
const INVENTORY_BAR_PADDING = SIDEBAR_PADDING;

const PlayerSelect: FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const players = useSelector(getPlayers);
  const selectedPlayerId = useSelector(getSelectedPlayerId);

  return (
    <div>
      <select
        onChange={(e) =>
          dispatch(switchSelectedPlayer(parseInt(e.target.value)))
        }
      >
        {players?.map((player) => (
          <option value={player.id} selected={player.id === selectedPlayerId}>
            {player.characterName}
          </option>
        ))}
      </select>
    </div>
  );
};

const PlayerInventory: FunctionComponent<{}> = () => {
  const cards = useSelector(getSelectedPlayer)?.cards;

  if (!cards || cards.length === 0) {
    return <i>Inventory empty</i>;
  }

  return (
    <div>
      {cards.map((card) => (
        <p>{card.card.name}</p>
      ))}
    </div>
  );
};

const getBox: (windowDimensions: Dimensions) => BoundingBox = ({
  width: windowWidth,
  height: windowHeight,
}) => {
  return {
    topLeft: {
      x: INVENTORY_BAR_MARGIN,
      y: windowHeight - INVENTORY_BAR_MARGIN - INVENTORY_BAR_HEIGHT,
    },
    dimensions: {
      width:
        windowWidth - 2 * INVENTORY_BAR_MARGIN - SIDEBAR_WIDTH - SIDEBAR_MARGIN,
      height: INVENTORY_BAR_HEIGHT,
    },
  };
};

interface PlayerInventoryBarProps {}

const PlayerInventoryBar: FunctionComponent<PlayerInventoryBarProps> = () => {
  const {
    topLeft,
    dimensions: { width, height },
  } = getBox(useWindowDimensions());
  const { x, y } = topLeft;

  return (
    <Group>
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="grey"
        stroke="black"
        cornerRadius={10}
      />
      <DOMPortal name="playerInventory">
        <div
          className="playerInventory"
          style={{
            position: 'absolute',
            top: y + INVENTORY_BAR_PADDING,
            left: x + INVENTORY_BAR_PADDING,
          }}
        >
          <PlayerSelect />
          <PlayerInventory />
        </div>
      </DOMPortal>
    </Group>
  );
};

export default PlayerInventoryBar;
