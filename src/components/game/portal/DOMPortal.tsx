import React, { FunctionComponent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '../../../store';

// For drawing DOM elements from inside the react-konva tree
// Adapted from https://konvajs.org/docs/react/DOM_Portal.html

interface DOMPortalProps {
  name: string;
}

const DOMPortal: FunctionComponent<DOMPortalProps> = ({ name, children }) => {
  const [node, setNode] = useState<Element>();

  useEffect(() => {
    const node = document.createElement('div');
    node.id = `_${name}-portal-exit`;
    document.body.appendChild(node);
    setNode(node);

    return () => {
      node.remove();
      setNode(undefined);
    };
  }, [name]);

  useEffect(() => {
    if (!node) {
      return;
    }

    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>{children}</Provider>
      </React.StrictMode>,
      node
    );
    return () => {
      ReactDOM.unmountComponentAtNode(node);
    };
  }, [node, children]);

  return null;
};

export default DOMPortal;
