import React, { useState, createContext } from 'react';

const ReadContext = createContext({
  read: {
    chapterIdx: 0,
    isTtsPlaying: false,
  },
  dispatch: () => {},
});

const ReadProvider = ({ children }) => {
  const [read, setRead] = useState({
    chapterIdx: 0,
    isTtsPlaying: false,
  });
  const dispatch = ({ chapterIdx, isTtsPlaying }) => {
    setRead({
      chapterIdx,
      isTtsPlaying,
    });
  };
  const value = { read, dispatch };
  return <ReadContext.Provider value={value}>{children}</ReadContext.Provider>;
};

export { ReadContext, ReadProvider };
