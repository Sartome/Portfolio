import { createContext, useContext, createElement } from 'react';

const InitialDataContext = createContext({ page: null, props: {} });

export function InitialDataProvider({ children }) {
  const root = typeof document !== 'undefined' ? document.getElementById('react-root') : null;
  const page = root?.dataset.page || null;
  let props = {};
  if (root && root.dataset.props) {
    try {
      props = JSON.parse(root.dataset.props);
    } catch (e) {
      console.warn('Failed to parse initial props', e);
    }
  }

  return createElement(InitialDataContext.Provider, { value: { page, props } }, children);
}

export function useInitialData() {
  return useContext(InitialDataContext);
}

export function useServerProps(pageName) {
  const { page, props } = useInitialData();
  return page === pageName ? props : {};
}
