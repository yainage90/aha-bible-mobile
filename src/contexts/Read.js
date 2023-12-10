import React, { useState, createContext } from 'react';

const ReadContext = createContext({
  read: {
    chapterIdx: 0,
    verseIdx: 0,
    isTtsPlaying: false,
    mode: 0,
  },
  dispatch: () => {},
});

const ReadProvider = ({ children }) => {
  const [read, setRead] = useState({
    chapterIdx: 0,
    verseIdx: 0,
    isTtsPlaying: false,
    mode: 0,
  });
  const dispatch = ({ chapterIdx, verseIdx, isTtsPlaying, mode }) => {
    setRead({
      chapterIdx,
      verseIdx,
      isTtsPlaying,
      mode,
    });
  };
  const value = { read, dispatch };
  return <ReadContext.Provider value={value}>{children}</ReadContext.Provider>;
};

export { ReadContext, ReadProvider };
