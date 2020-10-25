import React, { FunctionComponent } from 'react';
import BoardRoom, { BoardRoomProps } from './BoardRoom';
import { Group } from 'react-konva';

interface BoardProps {
  rooms: BoardRoomProps[];
}

const Board: FunctionComponent<BoardProps> = ({ rooms }) => {
  return (
    <Group>
      {rooms.map((room) => (
        <BoardRoom key={room.name} {...room} />
      ))}
    </Group>
  );
};

export default Board;
