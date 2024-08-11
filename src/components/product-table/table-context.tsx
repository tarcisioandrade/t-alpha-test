import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type TableContextProps = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const TableContext = createContext({} as TableContextProps);

function TableProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  return <TableContext.Provider value={{ loading, setLoading }}>{children}</TableContext.Provider>;
}

function useTableContext() {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error("useTableContext não pode ser utilizado sem o provider.");
  }
  return context;
}

export { TableProvider, useTableContext };
