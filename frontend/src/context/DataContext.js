// DataContext.js
import React, { createContext, useState, useEffect } from 'react';

const DataContext = createContext([]);

const DataProvider = ({ children }) => {

  return (
    <DataContext.Provider value={{ data }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
