import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  EventCard as EventCardModel,
  ItemCard as ItemCardModel,
  OmenCard as OmenCardModel,
  RollTable,
  RollTableRow,
  RollTarget,
} from '../../features/models';
import { RootState } from '../../store';
import DOMPortal from './portal/DOMPortal';
import './DrawnCard.css';

interface BaseCardProps {
  color: string;
}

const BaseCard: FunctionComponent<BaseCardProps> = ({ color, children }) => {
  return (
    <div className="drawnCardBackground">
      <div className="drawnCardWrapper">
        <div
          className="drawnCard"
          style={{
            backgroundColor: color,
          }}
        >
          <div className="cardContentsContainer">{children}</div>
        </div>
        <div className="drawnCardControls">
          <button className="discardButton">Discard</button>
        </div>
      </div>
    </div>
  );
};

interface EventCardProps {
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

const renderDescription = (card: Card) =>
  card.description.split('\n').map((line) => {
    if (line === '<rollTable>') {
      return renderRollTable(card.rollTable!!);
    }
    return <p>{line}</p>;
  });

const EventCard: FunctionComponent<EventCardProps> = ({ card }) => {
  return (
    <BaseCard color="#a5c96c">
      <p className="cardName">{card.name}</p>
      <p className="cardCondition">{card.condition}</p>
      <p className="cardFlavorText">{card.flavorText}</p>
      <div className="cardDescription">{renderDescription(card)}</div>
    </BaseCard>
  );
};

interface ItemCardProps {
  card: ItemCardModel;
}

const ItemCard: FunctionComponent<ItemCardProps> = ({ card }) => {
  return null;
};

interface OmenCardProps {
  card: OmenCardModel;
}

const OmenCard: FunctionComponent<OmenCardProps> = ({ card }) => {
  return null;
};

interface DrawnCardProps {}

const DrawnCard: FunctionComponent<DrawnCardProps> = () => {
  const drawnCard = useSelector(
    (state: RootState) => state.cardStacks.drawnCard
  );
  if (!drawnCard) {
    return null;
  }

  let cardElement;
  switch (drawnCard.type) {
    case 'EVENT':
      cardElement = <EventCard card={drawnCard} />;
      break;
    case 'ITEM':
      cardElement = <ItemCard card={drawnCard} />;
      break;
    case 'OMEN':
      cardElement = <OmenCard card={drawnCard} />;
      break;
  }

  return <DOMPortal name="drawnCard">{cardElement}</DOMPortal>;
};

export default DrawnCard;
