import React, { FunctionComponent } from 'react';
import { Group, Rect } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';
import { switchSelectedPlayer } from '../../../features/players';
import { getPlayers, getSelectedPlayerId } from '../../../features/selectors';
import { Point, translate } from '../../geometry';
import { BoundingBox, Dimensions } from '../../layout';
import { useWindowDimensions } from '../../windowDimensions';
import DOMPortal from '../portal/DOMPortal';
import FlexContainer, { FlexDirection } from '../sidebar/flex/FlexContainer';
import {
  SIDEBAR_MARGIN,
  SIDEBAR_PADDING,
  SIDEBAR_WIDTH,
} from '../sidebar/Sidebar';

const INVENTORY_BAR_HEIGHT = SIDEBAR_WIDTH;
const INVENTORY_BAR_MARGIN = SIDEBAR_MARGIN;
const INVENTORY_BAR_PADDING = SIDEBAR_PADDING;

interface PlayerSelectProps {
  topLeft: Point;
}

const PlayerSelect: FunctionComponent<PlayerSelectProps> = ({
  topLeft: { x, y },
}) => {
  const dispatch = useDispatch();
  const players = useSelector(getPlayers);
  const selectedPlayerId = useSelector(getSelectedPlayerId);

  return (
    <select
      onChange={(e) => dispatch(switchSelectedPlayer(parseInt(e.target.value)))}
      style={{ position: 'absolute', top: y, left: x }}
    >
      {players?.map((player) => (
        <option value={player.id} selected={player.id === selectedPlayerId}>
          {player.characterName}
        </option>
      ))}
    </select>
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
      <DOMPortal name="playerInventoryControl">
        <PlayerSelect
          topLeft={translate(
            topLeft,
            INVENTORY_BAR_PADDING,
            INVENTORY_BAR_PADDING
          )}
        />
      </DOMPortal>
    </Group>
  );
};

export default PlayerInventoryBar;
