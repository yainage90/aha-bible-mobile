import React, { useState, createContext } from 'react';

const SearchContext = createContext({
  search: { query: '', total: 0, verses: [] },
  dispatch: () => {},
});

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState({
    query: '',
    total: 0,
    verses: [],
  });
  const dispatch = ({ query, total, verses }) => {
    setSearch({ query, total, verses });
  };
  const value = { search, dispatch };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
