import * as React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faTvRetro,
  IconDefinition,
  faStarHalf,
  faWindowClose,
  faWindowMinimize,
  faWindowMaximize,
} from '@fortawesome/pro-duotone-svg-icons';

const INVISIBLE_IMG =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

const WINDOW_BAR_HEIGHT = 20;
const BOTTOM_BAR_HIGHT = WINDOW_BAR_HEIGHT * 2;

type Dimension = [number, number];

function useWindowDimensions(): Dimension {
  if (typeof window === 'undefined') return [0, 0];

  const [dimensions, setDimensions] = React.useState([0, 0] as Dimension);

  React.useLayoutEffect(() => {
    const handleResize = () => {
      setDimensions([window.innerWidth, window.innerHeight]);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return dimensions;
}

interface WindowProps {
  title: string;
  icon: IconDefinition;
  shown: boolean;
  initX?: number;
  initY?: number;
  onClose?: () => void;
  onMinimize?: () => void;
}

const Window: React.FC<WindowProps> = ({
  initX = 0,
  initY = 0,
  title,
  icon,
  shown,
  onClose,
  onMinimize,
  children,
}) => {
  const dimensions = useWindowDimensions();
  const [position, setPosition] = React.useState([initX, initY] as Dimension);
  const [diff, setDiff] = React.useState([0, 0] as Dimension);
  const innerWindowRef = React.useRef<HTMLDivElement | null>(null);

  const dragImage = React.useMemo(() => {
    if (typeof window === 'undefined') return null;

    const img = new Image();
    img.src = INVISIBLE_IMG;
    return img;
  }, []);

  const handleDragStart = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setDragImage(dragImage!, 0, 0);

      setDiff([e.clientX - position[0], e.clientY - position[1]]);
    },
    [dragImage, position]
  );

  const handleDrag = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (e.screenX === 0 && e.screenY === 0) return false;

      setPosition([e.clientX - diff[0], e.clientY - diff[1]]);
    },
    [diff]
  );

  const handleMaximize = React.useCallback(() => {
    setPosition([0, 0]);
    innerWindowRef.current!.style.width = `${dimensions[0]}px`;
    innerWindowRef.current!.style.height = `${
      dimensions[1] - BOTTOM_BAR_HIGHT - WINDOW_BAR_HEIGHT
    }px`;
  }, [innerWindowRef, dimensions]);

  return (
    <div
      style={{
        transform: `translate(${position[0]}px, ${position[1]}px)`,
        background: 'white',
        position: 'absolute',
        display: shown ? undefined : 'none',
      }}>
      <div
        draggable="true"
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        style={{
          height: `${WINDOW_BAR_HEIGHT}px`,
          width: '100%',
          background: 'purple',
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'Cabin',
          fontSize: '10pt',
          color: 'white',
        }}>
        <FontAwesomeIcon icon={icon} inverse style={{paddingLeft: '5px'}} />
        <span
          style={{
            flex: '1',
            paddingLeft: '5px',
          }}>
          {title}
        </span>
        <FontAwesomeIcon
          icon={faWindowMinimize}
          inverse
          style={{paddingRight: '5px', cursor: 'pointer'}}
          onClick={onMinimize}
        />
        <FontAwesomeIcon
          icon={faWindowMaximize}
          inverse
          style={{paddingRight: '5px', cursor: 'pointer'}}
          onClick={handleMaximize}
        />
        <FontAwesomeIcon
          icon={faWindowClose}
          inverse
          style={{paddingRight: '5px', cursor: 'pointer'}}
          onClick={onClose}
        />
      </div>
      <div
        ref={innerWindowRef}
        style={{
          overflow: 'scroll',
          resize: 'both',
          maxWidth: '100vw',
          maxHeight: `${
            dimensions[1] - BOTTOM_BAR_HIGHT - WINDOW_BAR_HEIGHT
          }px`,
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

let nextAppId = 1;

interface AppProps {
  readonly id?: number;
  readonly title: string;
  readonly icon: IconDefinition;
  readonly content: string;
  readonly shown: boolean;
}

class App implements AppProps {
  readonly id: number;
  readonly title: string;
  readonly icon: IconDefinition;
  readonly content: string;
  readonly shown: boolean;

  private constructor(props: AppProps) {
    this.title = props.title;
    this.icon = props.icon;
    this.content = props.content;
    this.shown = props.shown;

    if (props.id) {
      this.id = props.id;
    } else {
      this.id = nextAppId;
      nextAppId += 1;
    }
  }

  private props(): AppProps & {id: number} {
    return {
      id: this.id,
      title: this.title,
      icon: this.icon,
      content: this.content,
      shown: this.shown,
    };
  }

  static fromContent(title: string, icon: IconDefinition, content: string) {
    return new App({title, icon, content, shown: true});
  }

  minimize(): App {
    return new App({...this.props(), shown: false});
  }

  show(): App {
    return new App({...this.props(), shown: true});
  }
}

type AppShortcut = Pick<App, 'title' | 'icon'>;

interface DesktopProps {
  apps: App[];
  shortcuts: AppShortcut[];
  onOpenApp?: (shortcut: AppShortcut) => void;
  onCloseApp?: (app: App) => void;
  onMinimizeApp?: (app: App) => void;
  onShowApp?: (app: App) => void;
}

const Desktop: React.FC<DesktopProps> = ({
  apps,
  shortcuts,
  onOpenApp,
  onCloseApp,
  onMinimizeApp,
  onShowApp,
}) => {
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
      {apps.map((app) => {
        return (
          <Window
            key={app.id}
            title={app.title}
            icon={app.icon}
            shown={app.shown}
            onClose={() => onCloseApp?.(app)}
            onMinimize={() => onMinimizeApp?.(app)}>
            <p>{app.content}</p>
          </Window>
        );
      })}

      {shortcuts.map((shortcut) => {
        return (
          <DesktopShortcut
            key={shortcut.title}
            title="Hello world"
            icon={faTvRetro}
            action={() => onOpenApp?.(shortcut)}
          />
        );
      })}

      <div
        style={{
          position: 'absolute',
          height: `${WINDOW_BAR_HEIGHT * 2}px`,
          bottom: '0',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          background: 'purple',
        }}>
        <FontAwesomeIcon
          icon={faStarHalf}
          inverse
          size="lg"
          style={{padding: '.5rem'}}
        />

        {apps.map((app) => {
          return (
            <div
              key={app.id}
              onClick={() => onShowApp?.(app)}
              style={{
                height: '30px',
                width: '150px',
                border: '1px solid white',
                display: 'flex',
                alignItems: 'center',

                color: 'white',
                fontFamily: 'Cabin',
              }}>
              <FontAwesomeIcon
                icon={app.icon}
                inverse
                style={{paddingLeft: '5px'}}
              />

              <span style={{paddingLeft: '5px'}}>{app.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

type AppAction = ['close' | 'open' | 'minimize' | 'show', App];

const Home = () => {
  const [apps, dispatch] = React.useReducer(
    (apps: App[], [type, target]: AppAction) => {
      switch (type) {
        case 'close':
          return apps.filter((app) => app.id !== target.id);
        case 'open':
          return [...apps, target];
        case 'minimize':
          return apps.map((app) =>
            app.id === target.id ? app.minimize() : app
          );
        case 'show':
          return apps.map((app) => (app.id === target.id ? app.show() : app));
        default:
          return apps;
      }
    },
    [App.fromContent('Hello world', faTvRetro, 'Ryan was here')] as App[]
  );

  return (
    <Desktop
      apps={apps}
      shortcuts={[{title: 'Hello world', icon: faTvRetro}]}
      onOpenApp={(shortcut) => {
        dispatch([
          'open',
          App.fromContent(shortcut.title, shortcut.icon, 'Ryan was here'),
        ]);
      }}
      onCloseApp={(app) => {
        dispatch(['close', app]);
      }}
      onMinimizeApp={(app) => {
        dispatch(['minimize', app]);
      }}
      onShowApp={(app) => {
        dispatch(['show', app]);
      }}
    />
  );
};

export default Home;
