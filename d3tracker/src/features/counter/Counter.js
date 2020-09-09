import { useSelector, useDispatch } from "react-redux";
import React, { useRef, useEffect, useState } from "react";
import styles from "./Counter.module.css";
import { select, scaleBand, scaleLinear, max } from "d3";
import useResizeObserver from "../../useResizeObserver";
const clone = require('rfdc')();

export function Counter() {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  const [data, setData] = useState([
    {
      name: "alpha",
      value: 200,
      total: 1000,
      color: "#f4efd3"
    },
    {
      name: "beta",
      value: 70,
      total: 100,
      color: "#cccccc"
    }
  ]);

  useEffect(
    () => {
      const svg = select(svgRef.current);
      if (!dimensions) return;

      const yScale = scaleBand()
        .paddingInner(0.1)
        .domain(data.map((value, index) => index)) // [0,1,2,3,4,5]
        .range([0, dimensions.height]); // [0, 200]

      //CURRENT: This needs to be an array.
      const xScales = data.map(item =>
        scaleLinear().domain([0, item.total]).range([0, dimensions.width])
      );
      console.log(xScales);

      // draw the bars
      svg
        .selectAll(".bar")
        .data(data, (entry, index) => entry.name)
        .join(enter =>
          enter.append("rect").attr("y", (entry, index) => yScale(index))
        )
        .attr("fill", entry => entry.color)
        .attr("class", "bar")
        .attr("x", 0)
        .attr("height", yScale.bandwidth())
        .transition()
        .attr("width", (entry, i) => xScales[i](entry.value))
        .attr("y", (entry, index) => yScale(index));
    },
    [data, dimensions]
  );

  return (
    <div>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef} />
      </div>
      <button
        onClick={() => {
          let dataCopy = clone(data);
          dataCopy[0].value+=1
          setData(dataCopy);
        }}
      >
        Add
      </button>
    </div>
  );
}
