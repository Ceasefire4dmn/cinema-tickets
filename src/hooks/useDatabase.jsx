import { useContext } from 'react';
import { DatabaseContext } from '../contexts/DatabaseContext';

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error("useDatabase должен использоваться внутри DatabaseProvider");
  }
  return context;
};