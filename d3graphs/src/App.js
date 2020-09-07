import React, {useState, useEffect, useRef} from 'react';

import './App.css';
import {select} from 'd3';

function App(){
  const [data, setData] = useState([20, 25, 30]);
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", value=>value)
      .transition()
      .duration(2000)
      .attr("cx", value=> value*10)
      .attr("cy", value=>value*5)
      .attr("stroke", "red");
  }, [data]);


  return (
    <div className="App">
      <svg ref={svgRef} width="500px" height="500px"></svg>
      <button onClick={() => setData(data.map(value => value+5))}>
        Updata data
      </button>
      <button onClick={()=>setData(data.filter(value=>value<35))}>
        Filter data
      </button>
    </div>
  );
} 

export default App;
