import React from 'react'

import './Table.css';

export default function Table({data, gridTemplate, attributesOrder, titles}) {

  return (<div className="table" style={{gridTemplateColumns: gridTemplate}}>
    <Header titles={titles}/>
    {data.map((row) => <Row key={row.resultingIllness} row={row} attributesOrder={attributesOrder}/>)}
  </div>)
}

function Row({row, attributesOrder}) {
  return attributesOrder.map((att) => (<div className="row" key={row[att]}>{row[att]}</div>))
  
}
function Header({titles}) {
  return titles.map((att) => (<div className="header" key={att}>{att}</div>))
}
