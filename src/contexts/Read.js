import React, { useState, createContext } from 'react';

const ReadContext = createContext({
  read: { chapterIdx: 0, title: null, chapter: null, verses: [] },
  dispatch: () => {},
});

const ReadProvider = ({ children }) => {
  const [read, setRead] = useState({
    chapterIdx: 0,
  });
  const dispatch = ({ chapterIdx, title, chapter, verses }) => {
    setRead({ chapterIdx, title, chapter, verses });
  };
  const value = { read, dispatch };
  return <ReadContext.Provider value={value}>{children}</ReadContext.Provider>;
};

export { ReadContext, ReadProvider };
