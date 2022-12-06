import React, {useState} from 'react'
import GetData from '../GeneralComp/GetData/GetData';
import Table from '../GeneralComp/Table/Table';

export default function SuggestedTreatments() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);

  async function search() {
    let result = await fetch('/api/familydoctor/searchTreatment/' + query);
    let body = await result.json();

    if(result.ok) {
      setResult(body);
    } else {
      alert(body && body.error ? body.error : "There was an issue when processing your query.");
    }
  }
  return (<>
    <input type='text' value={query} onChange={(e) => setQuery(e.target.value)}/>
    <button onClick={() => search()}>Query</button>
    <br/><br/>
    <Table
    data={result}
    attributesOrder={['symptom', 'treatment']}
    titles={['Symptom', 'Treatment']}
    gridTemplate={'1fr 1fr'}
    />
  </>)
}
