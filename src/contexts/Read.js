import React, { useState, createContext } from 'react';

const ReadContext = createContext({
  chapterIdx: 0,
  dispatch: () => {},
});

const ReadProvider = ({ children }) => {
  const [chapterIdx, setChapterIdx] = useState(0);
  const dispatch = ({ chapterIdx }) => {
    setChapterIdx(chapterIdx);
  };
  const value = { chapterIdx, dispatch };
  return <ReadContext.Provider value={value}>{children}</ReadContext.Provider>;
};

export { ReadContext, ReadProvider };
