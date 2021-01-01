import React, { FunctionComponent } from 'react';
import { Group, Rect } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';
import { switchSelectedPlayer } from '../../../features/players';
import {
  getPlayers,
  getSelectedPlayer,
  getSelectedPlayerId,
} from '../../../features/selectors';
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
    <select
      onChange={(e) => dispatch(switchSelectedPlayer(parseInt(e.target.value)))}
      defaultValue={selectedPlayerId}
      style={{ display: 'block' }}
    >
      {players?.map((player) => (
        <option key={player.id} value={player.id}>
          {player.characterName}
        </option>
      ))}
    </select>
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
        <div className="inventoryCard" key={card.id}>
          {card.card.name}
        </div>
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
    topLeft: { x, y },
    dimensions: { width, height },
  } = getBox(useWindowDimensions());

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
          className="playerInventoryWrapper"
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
