import React, { useRef, useEffect, useState } from "react";
import { select, scaleBand, scaleLinear } from "d3";
import useResizeObserver from "../../useResizeObserver";
const clone = require("rfdc")();

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

      // draw the labels
      svg
        .selectAll(".label")
        .data(data, (entry, index) => entry.name)
        .join(enter =>
          enter
            .append("text")
            .attr(
              "y",
              (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5
            )
        )
        .text(entry => `🐎 ... ${entry.name} (${entry.value} meters)`)
        .attr("class", "label")
        .attr("x", 10)
        .transition()
        .attr(
          "y",
          (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5
        );

      svg
        .selectAll(".d3button")
        .data(data, (entry, index) => entry.name)
        .join(enter =>
          enter
            .append("text")
            .attr(
              "y",
              (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5
            )
        )
        .text(entry => `+`)
        .attr("class", "d3button")
        .attr("class", entry => `d3button ${entry.name}`)
        .attr("height", 30)
        .attr("width", 30)
        .attr("x", -40)
        .attr(
          "y",
          (entry, index) => yScale(index) + yScale.bandwidth() / 2 - 15
        )
        .on("mouseenter", function(value, index) {
          svg
            .select(`.d3button.${index.name}`)
            .transition()
            .attr("fill", "blue")
            .attr("x", -30)
        })
        .on("mouseleave", function(value, index) {
          svg
            .select(`.d3button.${index.name}`)
            .transition()
            .attr("fill", "black")
            .attr("x", -40)
        })
        
        .transition();
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
          dataCopy[0].value += 1;
          setData(dataCopy);
        }}
      >
        Add
      </button>
      <button type="button" className="btn btn-primary">
        Primary
      </button>
    </div>
  );
}
