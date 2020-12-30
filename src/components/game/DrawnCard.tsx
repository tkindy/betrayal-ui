import React, { FunctionComponent } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { useSelector } from 'react-redux';
import {
  EventCard as EventCardModel,
  ItemCard as ItemCardModel,
  OmenCard as OmenCardModel,
  RollTable,
  RollTableRow,
} from '../../features/models';
import { RootState } from '../../store';
import { BoundingBox } from '../layout';
import { useWindowDimensions } from '../windowDimensions';
import FlexContainer, { FlexDirection } from './sidebar/flex/FlexContainer';

interface BaseCardProps {
  box: BoundingBox;
  color: string;
}

const BaseCard: FunctionComponent<BaseCardProps> = ({
  box: {
    topLeft: { x, y },
    dimensions: { width, height },
  },
  color,
}) => {
  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={height}
      cornerRadius={10}
      fill={color}
      stroke="black"
    />
  );
};

interface EventCardProps {
  box: BoundingBox;
  card: EventCardModel;
}

const renderRollTableRow = (row: RollTableRow) => {
  switch (row.target.type) {
    case 'EXACT':
      return `${row.target.target}\t${row.outcome}`;
    case 'RANGE':
      return `${row.target.start}-${row.target.end}\t${row.outcome}`;
    case 'MIN':
      return `${row.target.minimum}+\t${row.outcome}`;
  }
};

const renderRollTable = (rollTable: RollTable | undefined) => {
  return rollTable?.reduce((acc, row) => {
    return acc + '\n\n' + renderRollTableRow(row);
  }, '');
};

const EventCard: FunctionComponent<EventCardProps> = ({ box, card }) => {
  return (
    <Group>
      <BaseCard box={box} color="#a5c96c" />
      <FlexContainer debug={true} box={box} direction={FlexDirection.COLUMN}>
        {[
          {
            units: 2,
            render: ({ topLeft: { x, y }, dimensions: { width, height } }) => (
              <Text
                x={x}
                y={y}
                width={width}
                height={height}
                text={card.name}
                fontSize={20}
                fontStyle="bold"
                align="center"
                verticalAlign="middle"
              />
            ),
          },
          {
            units: 3,
            render: ({ topLeft: { x, y }, dimensions: { width, height } }) => (
              <Text
                x={x}
                y={y}
                width={width}
                height={height}
                text={card.flavorText?.replace(/\n/g, '\n\n')}
                fontSize={16}
                fontStyle="italic"
                align="center"
                verticalAlign="middle"
              />
            ),
          },
          {
            units: 15,
            render: ({ topLeft: { x, y }, dimensions: { width, height } }) => (
              <Text
                x={x}
                y={y}
                width={width}
                height={height}
                text={card.description
                  .replace(/\n/g, '\n\n')
                  .replace(
                    '<rollTable>',
                    renderRollTable(card.rollTable) || 'MISSING ROW TABLE'
                  )}
                fontSize={16}
              />
            ),
          },
        ]}
      </FlexContainer>
    </Group>
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
  const { width, height } = useWindowDimensions();
  const drawnCard = useSelector(
    (state: RootState) => state.cardStacks.drawnCard
  );

  if (!drawnCard) {
    return null;
  }

  const cardHeight = height * 0.75;
  const cardWidth = cardHeight / 2;
  const cardBox: BoundingBox = {
    topLeft: {
      x: width / 2 - cardWidth / 2,
      y: height / 2 - cardHeight / 2,
    },
    dimensions: { width: cardWidth, height: cardHeight },
  };

  let cardElement;
  switch (drawnCard.type) {
    case 'EVENT':
      cardElement = <EventCard box={cardBox} card={drawnCard} />;
      break;
    case 'ITEM':
      cardElement = <ItemCard card={drawnCard} />;
      break;
    case 'OMEN':
      cardElement = <OmenCard card={drawnCard} />;
      break;
  }

  return (
    <Group>
      <Rect width={width} height={height} fill="gray" opacity={0.8} />
      {cardElement}
    </Group>
  );
};

export default DrawnCard;
