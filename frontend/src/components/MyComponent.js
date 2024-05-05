// MyComponent.js
import React, {useContext, useEffect, useState} from 'react';
import { DataContext } from '../context/DataContext';

const MyComponent = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/index/');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      {data.map(item => (
        <div key={item.id}><p>{item.category_name}</p></div>
      ))}
    </div>
  );
};

export default MyComponent;
