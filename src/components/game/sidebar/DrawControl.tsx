import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { drawEvent, drawItem, drawOmen } from '../../../features/cardStacks';
import { BoundingBox } from '../../layout';
import DOMPortal from '../portal/DOMPortal';
import './DrawControl.css';

interface DrawButtonProps {
  entity: string;
  thunk: () => any;
}

const DrawButton: FunctionComponent<DrawButtonProps> = ({ entity, thunk }) => {
  const dispatch = useDispatch();
  return (
    <button
      className="drawCardButton"
      onClick={() => dispatch(thunk())}
    >{`Draw ${entity}`}</button>
  );
};

const buttonProps: DrawButtonProps[] = [
  { entity: 'event', thunk: drawEvent },
  { entity: 'item', thunk: drawItem },
  { entity: 'omen', thunk: drawOmen },
];

interface DrawControlProps {
  box: BoundingBox;
}

const DrawControl: FunctionComponent<DrawControlProps> = ({
  box: {
    topLeft: { x, y },
    dimensions: { width, height },
  },
}) => {
  return (
    <DOMPortal name="drawControl">
      <div
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width,
          height,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
        {buttonProps.map((props) => (
          <DrawButton key={props.entity} {...props} />
        ))}
      </div>
    </DOMPortal>
  );
};

export default DrawControl;
