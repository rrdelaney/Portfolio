import * as React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTvRetro, IconDefinition} from '@fortawesome/pro-duotone-svg-icons';

const INVISIBLE_IMG =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

const WINDOW_BAR_HEIGHT = 20;

interface WindowProps {
  title: string;
  initX?: number;
  initY?: number;
  onClose?: () => void;
}

const Window: React.FC<WindowProps> = ({
  initX = 0,
  initY = 0,
  title,
  onClose,
  children,
}) => {
  const [x, setX] = React.useState(initX);
  const [y, setY] = React.useState(initY);
  const [diff, setDiff] = React.useState([0, 0] as [number, number]);

  const dragImage = React.useMemo(() => {
    if (typeof window === 'undefined') return null;

    const img = new Image();
    img.src = INVISIBLE_IMG;
    return img;
  }, []);

  const handleDragStart = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setDragImage(dragImage!, 0, 0);

      setDiff([e.clientX - x, e.clientY - y]);
    },
    [dragImage, x, y]
  );

  const handleDrag = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (e.screenX === 0 && e.screenY === 0) return false;

      setX(e.clientX - diff[0]);
      setY(e.clientY - diff[1]);
    },
    [diff]
  );

  const handleDragEnd = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {},
    []
  );

  return (
    <div
      style={{
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
          fontFamily: 'VT323',
        }}>
        <span style={{flex: '1'}}>{title}</span>
        <button onClick={onClose}>x</button>
      </div>
      <div
        style={{
          overflow: 'scroll',
          resize: 'both',
        }}>
        {children}
      </div>
    </div>
  );
};

interface DesktopShortcutProps {
  title: string;
  icon: IconDefinition;
  action?: () => void;
}

const DesktopShortcut: React.FC<DesktopShortcutProps> = ({
  title,
  icon,
  action,
}) => {
  const [focused, setFocused] = React.useState(false);

  function handleDoubleClick() {
    setFocused(false);
    action?.();
  }

  return (
    <div
      onClick={() => setFocused(!focused)}
      onDoubleClick={handleDoubleClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
        margin: '.5rem',
        outline: focused ? 'auto' : undefined,
        outlineColor: focused ? 'white' : undefined,
      }}>
      <FontAwesomeIcon icon={icon} size="2x" inverse />
      <span
        style={{
          paddingTop: '.5rem',
          fontFamily: 'Cabin',
          fontSize: '10pt',
          color: 'white',
        }}>
        {title}
      </span>
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
        display: 'grid',
        gridTemplateColumns: 'repeat(10, 1fr)',
        gridTemplateRows: 'repeat(10, 1fr)',
      }}>
      {children}
    </div>
  );
};

interface App {
  title: string;
  content: string;
}

type AppAction = ['close' | 'open', App];

const Home = () => {
  const [apps, dispatch] = React.useReducer(
    (apps: App[], [type, target]: AppAction) => {
      switch (type) {
        case 'close':
          return apps.filter((app) => app !== target);
        case 'open':
          return [...apps, target];
        default:
          return apps;
      }
    },
    [] as App[]
  );

  return (
    <Desktop>
      {apps.map((app) => {
        return (
          <Window title={app.title} onClose={() => dispatch(['close', app])}>
            <p>{app.content}</p>
          </Window>
        );
      })}

      <DesktopShortcut
        title="Hello world"
        icon={faTvRetro}
        action={() => dispatch(['open', {title: 'New', content: 'Hey!'}])}
      />

      <DesktopShortcut
        title="Hello world"
        icon={faTvRetro}
        action={() => dispatch(['open', {title: 'New', content: 'Hey!'}])}
      />
    </Desktop>
  );
};

export default Home;
