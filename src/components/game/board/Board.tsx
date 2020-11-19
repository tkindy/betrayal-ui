import React, { FunctionComponent } from 'react';
import BoardRoom from './BoardRoom';
import { Group } from 'react-konva';
import { toString } from './grid';
import OpenSpot from './OpenSpot';
import { useSelector } from 'react-redux';
import { getOpenNeighbors, getRooms } from '../../../features/selectors';

interface BoardProps {}

const Board: FunctionComponent<BoardProps> = () => {
  const rooms = useSelector(getRooms);
  const openNeighbors = useSelector(getOpenNeighbors);

  if (!rooms || !openNeighbors) {
    return null;
  }

  return (
    <Group>
      {rooms.map((room) => (
        <BoardRoom key={room.name} {...room} />
      ))}
      {openNeighbors.map(({ loc, from }) => {
        return <OpenSpot key={toString(loc)} loc={loc} from={from} />;
      })}
    </Group>
  );
};

export default Board;
