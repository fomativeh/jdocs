import { createContext, useState, Dispatch, ReactNode } from "react";

type documentType = {
  title: String;
  category: String;
};
type AppState = {
  documents: documentType[];
  categories: string[];
  queryItems: documentType[];
  isSearching: boolean;
  currentCategory:string
};

const initialState: AppState = {
  documents: [],
  categories: [],
  queryItems: [],
  isSearching: false,
  currentCategory:""
};

type AppContextProps = {
  appGlobalState: AppState;
  setAppGlobalState: (appGlobalState: any) => void;
};

export const AppContext = createContext<AppContextProps>({
  appGlobalState: initialState,
  setAppGlobalState: () => {},
});

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [appGlobalState, setAppGlobalState] = useState<AppState>(initialState);

  return (
    <AppContext.Provider value={{ appGlobalState, setAppGlobalState }}>
      {children}
    </AppContext.Provider>
  );
};
