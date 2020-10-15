import React, { FunctionComponent } from 'react';
import Room, { RoomProps } from './Room';
import { Group } from 'react-konva';

interface BoardProps {
  rooms: RoomProps[];
}

const Board: FunctionComponent<BoardProps> = ({ rooms }) => {
  return (
    <Group>
      {rooms.map((room) => (
        <Room {...room} />
      ))}
    </Group>
  );
};

export default Board;
