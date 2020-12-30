import React, { FunctionComponent, ReactElement } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { useSelector } from 'react-redux';
import { EventCard, ItemCard, OmenCard } from '../../features/models';
import { RootState } from '../../store';
import { useWindowDimensions } from '../windowDimensions';

const paintEvent: (card: EventCard) => ReactElement<any, any> | null = (
  card
) => {
  return (
    <Group>
      <Rect width={100} height={75} fill="white" />
      <Text text={card.name} />
    </Group>
  );
};

const paintItem: (card: ItemCard) => ReactElement<any, any> | null = (card) => {
  return null;
};

const paintOmen: (card: OmenCard) => ReactElement<any, any> | null = (card) => {
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

  let paintedCard: ReactElement<any, any> | null;
  switch (drawnCard.type) {
    case 'EVENT':
      paintedCard = paintEvent(drawnCard);
      break;
    case 'ITEM':
      paintedCard = paintItem(drawnCard);
      break;
    case 'OMEN':
      paintedCard = paintOmen(drawnCard);
      break;
  }

  return (
    <Group>
      <Rect width={width} height={height} fill="gray" opacity={0.8} />
      {paintedCard}
    </Group>
  );
};

export default DrawnCard;
