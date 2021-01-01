import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './DrawnCard.css';
import CardDetails from './CardDetails';

interface DrawnCardProps {}

const DrawnCard: FunctionComponent<DrawnCardProps> = () => {
  const drawnCard = useSelector(
    (state: RootState) => state.cardStacks.drawnCard
  );
  if (!drawnCard) {
    return null;
  }

  return (
    <div className="drawnCardBackground">
      <CardDetails card={drawnCard} />
    </div>
  );
};

export default DrawnCard;
