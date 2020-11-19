import React, { FunctionComponent } from 'react';
import { Group } from 'react-konva';
import { useSelector } from 'react-redux';
import { getPlayerMap } from '../../../features/selectors';
import { mapCartMap } from '../../../map';
import { toString } from '../board/grid';
import RoomPlayers from './RoomPlayers';

const Players: FunctionComponent<{}> = () => {
  const playerMap = useSelector(getPlayerMap);
  if (!playerMap) {
    return null;
  }

  return (
    <Group>
      {mapCartMap(playerMap, ({ x, y }, players) => {
        const loc = { gridX: x, gridY: y };
        return (
          <RoomPlayers key={toString(loc)} players={players} roomLoc={loc} />
        );
      })}
    </Group>
  );
};

export default Players;
