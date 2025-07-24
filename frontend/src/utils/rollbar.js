import { Provider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN || '7729c99337db49feb699d8ead4032922',
  environment: process.env.NODE_ENV || 'development',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: process.env.REACT_APP_VERSION || '1.0.0',
      }
    },
    server: {
      branch: process.env.REACT_APP_GIT_BRANCH || 'main',
      root: '/'
    }
  },
  ignoredMessages: [
    'Script error.',
    'Script error',
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
    'Non-Error promise rejection captured',
    'Network Error',
    'Failed to fetch'
  ],
  checkIgnore: (isUncaught, args, payload) => {
    if (payload.body && payload.body.trace && payload.body.trace.frames) {
      const frames = payload.body.trace.frames;
      const externalScripts = frames.some(frame => 
        frame.filename && (
          frame.filename.includes('chrome-extension://') ||
          frame.filename.includes('moz-extension://') ||
          frame.filename.includes('safari-extension://') ||
          frame.filename.includes('about:') ||
          frame.filename.includes('chrome://') ||
          frame.filename.includes('moz://')
        )
      );
      if (externalScripts) {
        return true;
      }
    }
    return false;
  },
  transform: (payload) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.username) {
      payload.person = {
        id: user.username,
        username: user.username,
        email: user.email || undefined
      };
    }
    
    payload.session = {
      id: sessionStorage.getItem('sessionId') || 'unknown',
      timestamp: new Date().toISOString()
    };
    
    return payload;
  }
};

export const rollbarUtils = {
  error: (message, error, extra = {}) => {
    if (window.rollbar) {
      window.rollbar.error(message, error, extra);
    }
  },
  
  warning: (message, extra = {}) => {
    if (window.rollbar) {
      window.rollbar.warning(message, extra);
    }
  },
  
  info: (message, extra = {}) => {
    if (window.rollbar) {
      window.rollbar.info(message, extra);
    }
  },
  
  critical: (message, error, extra = {}) => {
    if (window.rollbar) {
      window.rollbar.critical(message, error, extra);
    }
  },
  
  setUser: (user) => {
    if (window.rollbar && user && user.username) {
      window.rollbar.configure({
        payload: {
          person: {
            id: user.username,
            username: user.username,
            email: user.email || undefined
          }
        }
      });
    }
  },
  
  clearUser: () => {
    if (window.rollbar) {
      window.rollbar.configure({
        payload: {
          person: null
        }
      });
    }
  },
  
  addContext: (context) => {
    if (window.rollbar) {
      window.rollbar.configure({
        payload: {
          custom: context
        }
      });
    }
  }
};

window.addEventListener('error', (event) => {
  if (window.rollbar) {
    window.rollbar.error('Uncaught error', event.error, {
      url: event.filename,
      line: event.lineno,
      column: event.colno
    });
  }
});

window.addEventListener('unhandledrejection', (event) => {
  if (window.rollbar) {
    window.rollbar.error('Unhandled promise rejection', event.reason, {
      type: 'promise_rejection'
    });
  }
});

export { Provider, ErrorBoundary };
export default rollbarConfig; 