import React, { useState } from 'react';
import JSONContext from '../context/JSONContext';


function JSONContextProvider({ children }) {
  const [data, setData] = useState([{
    id: 0,
    key: 'key',
    value: 'value',
    active: false
  }]);

  const del = (id) => {
    if (data.length !== 1) {
      const newData = data.filter(obj => obj.id !== id);
      console.log(newData)
      setData(newData)
    }
  }

  const add = () => {
    setData([...data, {
      id: data[data.length - 1].id + 1,
      key: 'key',
      value: 'value',
      active: false
    }])
    return
  }

  return (
    <JSONContext.Provider
      value={{
        data,
        setData,
        add,
        del
      }}
    >
      {children}
    </JSONContext.Provider>
  )
}

export default JSONContextProvider