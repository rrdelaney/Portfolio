import * as React from 'react';

const INVISIBLE_IMG =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

const WINDOW_BAR_HEIGHT = 20;

interface WindowProps {
  title: string;
  initX?: number;
  initY?: number;
  initHeight?: number;
  initWidth?: number;
  onClose?: () => void;
}

const Window: React.FC<WindowProps> = ({
  initX = 0,
  initY = 0,
  initHeight = 200,
  initWidth = 200,
  title,
  onClose,
  children,
}) => {
  const [x, setX] = React.useState(initX);
  const [y, setY] = React.useState(initY);
  const [height, setHeight] = React.useState(initHeight);
  const [width, setWidth] = React.useState(initWidth);

  const dragImage = React.useMemo(() => {
    if (typeof window === 'undefined') return null;

    const img = new Image();
    img.src = INVISIBLE_IMG;
    return img;
  }, []);

  const handleDragStart = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setDragImage(dragImage!, 0, 0);
    },
    [dragImage]
  );

  const handleDrag = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
    if (e.screenX === 0 && e.screenY === 0) return false;

    setX(e.clientX);
    setY(e.clientY);
  }, []);

  const handleDragEnd = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {},
    []
  );

  return (
    <div
      style={{
        height: `${height}px`,
        width: `${width}px`,
        transform: `translate(${x}px, ${y}px)`,
        background: 'white',
        position: 'absolute',
      }}>
      <div
        draggable="true"
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={{
          height: `${WINDOW_BAR_HEIGHT}px`,
          width: '100%',
          background: 'purple',
          display: 'flex',
        }}>
        <span style={{flex: '1'}}>{title}</span>
        <button onClick={onClose}>x</button>
      </div>
      <div
        style={{
          height: `${height - WINDOW_BAR_HEIGHT}px`,
          width: `${width}px`,
          overflow: 'scroll',
        }}>
        {children}
      </div>
    </div>
  );
};

const Desktop: React.FC = ({children}) => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        backgroundImage: `url('/background.jpg')`,
        backgroundSize: 'cover',
      }}>
      {children}
    </div>
  );
};

const Home = () => (
  <Desktop>
    <Window title="Hello World">
      <p>Ryans in the house</p>
    </Window>
  </Desktop>
);

export default Home;
