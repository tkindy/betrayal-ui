import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  discardDrawnCard,
  giveDrawnCardToPlayer,
} from '../../../features/cardStacks';
import {
  RollTarget,
  RollTableRow,
  RollTable,
  Card,
  EventCard as EventCardModel,
  ItemCard as ItemCardModel,
  OmenCard as OmenCardModel,
} from '../../../features/models';
import { RootState } from '../../../store';
import './CardDetails.css';

const DiscardControl: FunctionComponent<{}> = () => {
  const dispatch = useDispatch();

  return (
    <button
      className="discardButton"
      onClick={() => dispatch(discardDrawnCard())}
    >
      Discard
    </button>
  );
};

const GiveToPlayerControl: FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const players = useSelector((state: RootState) => state.players.players)!!;

  return (
    <select
      onChange={(e) =>
        dispatch(giveDrawnCardToPlayer({ playerId: parseInt(e.target.value) }))
      }
    >
      <option value="">Give card to...</option>
      {players.map((player) => (
        <option value={player.id}>{player.characterName}</option>
      ))}
    </select>
  );
};

interface BaseCardDetailsProps {
  color: string;
}

const BaseCardDetails: FunctionComponent<BaseCardDetailsProps> = ({
  color,
  children,
}) => (
  <div className="cardDetailsWrapper">
    <div
      className="cardDetails"
      style={{
        backgroundColor: color,
      }}
    >
      <div className="cardContentsContainer">{children}</div>
    </div>
    <div className="cardDetailsControls">
      <DiscardControl />
      <GiveToPlayerControl />
    </div>
  </div>
);

interface EventCardDetailsProps {
  card: EventCardModel;
}

const renderRollTarget = (target: RollTarget) => {
  switch (target.type) {
    case 'EXACT':
      return `${target.target}`;
    case 'RANGE':
      return `${target.start}-${target.end}`;
    case 'MIN':
      return `${target.minimum}+`;
  }
};

const renderRollTableRow = (row: RollTableRow) => {
  return (
    <tr className="rollTableRow">
      <td className="rollTarget">{renderRollTarget(row.target)}</td>
      <td className="rollOutcome">{row.outcome}</td>
    </tr>
  );
};

const renderRollTable = (rollTable: RollTable) => {
  return (
    <table className="rollTable">
      <tbody>{rollTable.map(renderRollTableRow)}</tbody>
    </table>
  );
};

const renderFlavorText = (card: Card) => (
  <div className="cardFlavorText">
    {card.flavorText?.split('\n').map((line) => (
      <p>{line}</p>
    ))}
  </div>
);

const renderDescription = (card: Card) => (
  <div className="cardDescription">
    {card.description.split('\n').map((line) => {
      if (line === '<rollTable>') {
        return renderRollTable(card.rollTable!!);
      }
      return <p>{line}</p>;
    })}
  </div>
);

const EventCardDetails: FunctionComponent<EventCardDetailsProps> = ({
  card,
}) => {
  return (
    <BaseCardDetails color="#edd281">
      <p className="cardName">{card.name}</p>
      <p className="cardCondition">{card.condition}</p>
      {renderFlavorText(card)}
      {renderDescription(card)}
    </BaseCardDetails>
  );
};

interface ItemCardDetailsProps {
  card: ItemCardModel;
}

const ItemCardDetails: FunctionComponent<ItemCardDetailsProps> = ({ card }) => {
  return (
    <BaseCardDetails color="#bc7043">
      <p className="cardName">{card.name}</p>
      <p className="cardSubtype">{card.subtype}</p>
      {renderFlavorText(card)}
      {renderDescription(card)}
    </BaseCardDetails>
  );
};

interface OmenCardDetailsProps {
  card: OmenCardModel;
}

const OmenCardDetails: FunctionComponent<OmenCardDetailsProps> = ({ card }) => {
  return (
    <BaseCardDetails color="#a5c96c">
      <p className="cardName">{card.name}</p>
      <p className="cardSubtype">{card.subtype}</p>
      {renderFlavorText(card)}
      {renderDescription(card)}
      <p>Make a haunt roll now.</p>
    </BaseCardDetails>
  );
};

interface CardDetailsProps {
  card: Card;
}

const CardDetails: FunctionComponent<CardDetailsProps> = ({ card }) => {
  switch (card.type) {
    case 'EVENT':
      return <EventCardDetails card={card} />;
    case 'ITEM':
      return <ItemCardDetails card={card} />;
    case 'OMEN':
      return <OmenCardDetails card={card} />;
  }
};

export default CardDetails;
