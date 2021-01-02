import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import './DrawnCard.css';
import CardDetails from './CardDetails';
import DiscardControl from './DiscardControl';
import GiveToPlayerControl from './GiveToPlayerControl';
import {
  discardDrawnCard,
  giveDrawnCardToPlayer,
} from '../../../features/cardStacks';

interface DrawnCardProps {}

const DrawnCard: FunctionComponent<DrawnCardProps> = () => {
  const dispatch = useDispatch();
  const drawnCard = useSelector(
    (state: RootState) => state.cardStacks.drawnCard
  );

  if (!drawnCard) {
    return null;
  }

  return (
    <div className="drawnCardBackground">
      <CardDetails
        card={drawnCard}
        renderControls={() => [
          <DiscardControl onClick={() => dispatch(discardDrawnCard())} />,
          <GiveToPlayerControl
            onChange={(playerId) =>
              dispatch(giveDrawnCardToPlayer({ playerId }))
            }
          />,
        ]}
      />
    </div>
  );
};

export default DrawnCard;