import React, {useState, useEffect} from 'react'

export default function GetData(path) {
  const [data, setData] = useState([]);

  useEffect(() => {
    updateData();
  }, []);

  const updateData = async () => {
    let result = await fetch(path);
    let body = await result.json();

    if(result.ok) {
      setData(body);
    } else {
      alert(body && body.error ? body.error : "There was an issue with getting " + path);
    }
  }
  return [data, updateData];
}