import React, { useState, useEffect, useRef } from "react";

import "./App.css";
import {
  select,
  interpolateRainbow,
  line,
  curveCatmullRom,
  symbol,
  symbolTriangle
} from "d3";
import {
  sugiyama,
  layeringSimplex,
  decrossOpt,
  coordMinCurve,
  dagStratify
} from "d3-dag";
import { grapho } from "./grapho";

function App() {
  const [data, setData] = useState([20, 25, 30]);
  const svgRef = useRef();
  const nodeRadius = 20;
  const width = 400;
  const height = 400;

  useEffect(
    () => {
      const svg = select(svgRef.current);
      const defs = svg.append("defs");

      let layout = sugiyama()
        .size([width, height])
        .layering(layeringSimplex())
        .decross(decrossOpt())
        .coord(coordMinCurve());

      let reader = dagStratify();
      let dag = reader(grapho);

      layout(dag);
      const steps = dag.size();
      const interp = interpolateRainbow;
      const colorMap = {};
      for (const [i, node] of dag.idescendants().entries()) {
        colorMap[node.id] = interp(i / steps);
      }
      const myLine = line().curve(curveCatmullRom).x(d => d.x).y(d => d.y);

      svg
        .append("g")
        .selectAll("path")
        .data(dag.links())
        .enter()
        .append("path")
        .attr("d", ({ points }) => myLine(points))
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .attr("stroke", ({ source, target }) => {
          const gradId = `${source.id}-${target.id}`;
          const grad = defs
            .append("linearGradient")
            .attr("id", gradId)
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", source.x)
            .attr("x2", target.x)
            .attr("y1", source.y)
            .attr("y2", target.y);
          grad
            .append("stop")
            .attr("offset", "0%")
            .attr("stop-color", colorMap[source.id]);
          grad
            .append("stop")
            .attr("offset", "100%")
            .attr("stop-color", colorMap[target.id]);
          return `url(#${gradId})`;
        });

      // Select nodes
      const nodes = svg
        .append("g")
        .selectAll("g")
        .data(dag.descendants())
        .enter()
        .append("g")
        .attr("transform", ({ x, y }) => `translate(${x}, ${y})`);

      nodes
        .append("circle")
        .attr("r", nodeRadius)
        .attr("fill", n => colorMap[n.id]);

      const arrow = symbol()
        .type(symbolTriangle)
        .size(nodeRadius * nodeRadius / 5.0);
      svg
        .append("g")
        .selectAll("path")
        .data(dag.links())
        .enter()
        .append("path")
        .attr("d", arrow)
        .attr("transform", ({ source, target, points }) => {
          const [end, start] = points.slice().reverse();
          // This sets the arrows the node radius (20) + a little bit (3) away from the node center, on the last line segment of the edge. This means that edges that only span ine level will work perfectly, but if the edge bends, this will be a little off.
          const dx = start.x - end.x;
          const dy = start.y - end.y;
          const scale = nodeRadius * 1.15 / Math.sqrt(dx * dx + dy * dy);
          // This is the angle of the last line segment
          const angle = Math.atan2(-dy, -dx) * 180 / Math.PI + 90;
          // console.log(angle, dx, dy);
          return `translate(${end.x + dx * scale}, ${end.y +
            dy * scale}) rotate(${angle})`;
        })
        .attr("fill", ({ target }) => colorMap[target.id])
        .attr("stroke", "white")
        .attr("stroke-width", 1.5);

      nodes
        .append("text")
        .text(d => d.id)
        .attr("font-weight", "bold")
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "white");
    },
    [data]
  );

  return (
    <div className="App">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`${-nodeRadius} ${-nodeRadius} ${width +
          2 * nodeRadius} ${height + 2 * nodeRadius}`}
      />
    </div>
  );
}

export default App;
