import React, { FunctionComponent, useEffect, useState } from 'react';
import { Group, Rect } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';
import { HeldCard } from '../../../features/models';
import {
  discardHeldCard,
  giveHeldCardToPlayer,
  switchSelectedPlayer,
} from '../../../features/players';
import {
  getPlayerMap,
  getPlayers,
  getSelectedPlayer,
  getSelectedPlayerId,
} from '../../../features/selectors';
import { BoundingBox, Dimensions } from '../../layout';
import { useWindowDimensions } from '../../windowDimensions';
import CardDetails from '../cards/CardDetails';
import DiscardControl from '../cards/DiscardControl';
import GiveToPlayerControl from '../cards/GiveToPlayerControl';
import DOMPortal from '../portal/DOMPortal';
import {
  SIDEBAR_MARGIN,
  SIDEBAR_PADDING,
  SIDEBAR_WIDTH,
} from '../sidebar/Sidebar';
import './PlayerInventoryBar.css';

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
      value={selectedPlayerId}
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

interface CardHovercardProps {
  card?: HeldCard;
  close: () => void;
}

const CardHovercard: FunctionComponent<CardHovercardProps> = ({
  card,
  close,
}) => {
  const dispatch = useDispatch();
  const selectedPlayerId = useSelector(getSelectedPlayerId);
  const possiblePlayersToGiveTo = useSelector(getPlayers)?.filter(
    (player) => player.id !== selectedPlayerId
  );

  if (!card) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 200,
        left: 0,
        width: '100%',
        display: 'grid',
      }}
    >
      <CardDetails
        card={card.card}
        renderControls={() => [
          <button onClick={close}>Close</button>,
          <DiscardControl
            onClick={() => {
              close();
              dispatch(discardHeldCard({ cardId: card.id }));
            }}
          />,
          <GiveToPlayerControl
            players={possiblePlayersToGiveTo}
            onChange={(toPlayerId) => {
              close();
              dispatch(giveHeldCardToPlayer({ cardId: card.id, toPlayerId }));
            }}
          />,
        ]}
      />
    </div>
  );
};

interface PlayerInventoryProps {
  barBox: BoundingBox;
}

const PlayerInventory: FunctionComponent<PlayerInventoryProps> = ({
  barBox: {
    dimensions: { width: barWidth },
  },
}) => {
  const cards = useSelector(getSelectedPlayer)?.cards;
  const [focusedCardId, setFocusedCardId] = useState<number | null>(null);

  useEffect(() => setFocusedCardId(null), [cards]);

  if (!cards || cards.length === 0) {
    return <i>Inventory empty</i>;
  }

  return (
    <div>
      <div
        className="inventoryContents"
        style={{ width: barWidth - 2 * INVENTORY_BAR_PADDING }}
      >
        {cards.map((card) => {
          const className = 'inventoryCard ' + card.card.type;

          return (
            <div
              className={className}
              key={card.id}
              onClick={() => {
                if (focusedCardId === card.id) {
                  setFocusedCardId(null);
                } else {
                  setFocusedCardId(card.id);
                }
              }}
              style={{
                height: INVENTORY_BAR_HEIGHT - 2 * INVENTORY_BAR_PADDING - 50,
              }}
            >
              <div>{card.card.name}</div>
            </div>
          );
        })}
      </div>
      {focusedCardId && (
        <CardHovercard
          card={cards.find((card) => card.id === focusedCardId)}
          close={() => setFocusedCardId(null)}
        />
      )}
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
  const box = getBox(useWindowDimensions());
  const {
    topLeft: { x, y },
    dimensions: { width, height },
  } = box;

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
          <PlayerInventory barBox={box} />
        </div>
      </DOMPortal>
    </Group>
  );
};

export default PlayerInventoryBar;
