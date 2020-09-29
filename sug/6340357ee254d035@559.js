// https://observablehq.com/@erikbrinkman/d3-dag-sugiyama-with-arrows@559
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# D3-DAG: Sugiyama with Arrows

The sugiyama method is a way to render DAGs by assigning each node a layer, and then aligning nodes within a layer to produce a pleasing DAG layout.
This algorithm is the primary method to lay out DAGs in d3-dag.
This example gives a rough way to add arrows to the edges
`
)});
  main.variable(observer()).define(["svg","width","height","d3","layout","dag"], function*(svg,width,height,d3,layout,dag)
{ 
  // This code only handles rendering
  const nodeRadius = 20;
  const svgNode = svg`<svg width=${width} height=${height} viewbox="${-nodeRadius} ${-nodeRadius} ${width + 2 * nodeRadius} ${height + 2 * nodeRadius}"></svg>`
  
  const svgSelection = d3.select(svgNode);
  const defs = svgSelection.append('defs'); // For gradients
  
  // Use computed layout
  layout(dag);
  
  const steps = dag.size();
  const interp = d3.interpolateRainbow;
  const colorMap = {};
  for (const [i, node] of dag.idescendants().entries()) {
    colorMap[node.id] = interp(i / steps);
  };
  
  // How to draw edges
  const line = d3.line()
    .curve(d3.curveCatmullRom)
    .x(d => d.x)
    .y(d => d.y);
    
  // Plot edges
  svgSelection.append('g')
    .selectAll('path')
    .data(dag.links())
    .enter()
    .append('path')
    .attr('d', ({ points }) => line(points))
    .attr('fill', 'none')
    .attr('stroke-width', 3)
    .attr('stroke', ({source, target}) => {
      const gradId = `${source.id}-${target.id}`;
      const grad = defs.append('linearGradient')
        .attr('id', gradId)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', source.x)
        .attr('x2', target.x)
        .attr('y1', source.y)
        .attr('y2', target.y);
      grad.append('stop').attr('offset', '0%').attr('stop-color', colorMap[source.id]);
      grad.append('stop').attr('offset', '100%').attr('stop-color', colorMap[target.id]);
      return `url(#${gradId})`;
    });
  
  // Select nodes
  const nodes = svgSelection.append('g')
    .selectAll('g')
    .data(dag.descendants())
    .enter()
    .append('g')
    .attr('transform', ({x, y}) => `translate(${x}, ${y})`);
  
  // Plot node circles
  nodes.append('circle')
    .attr('r', nodeRadius)
    .attr('fill', n => colorMap[n.id]);
  
  const arrow = d3.symbol().type(d3.symbolTriangle).size(nodeRadius * nodeRadius / 5.0);
  svgSelection.append('g')
    .selectAll('path')
    .data(dag.links())
    .enter()
    .append('path')
    .attr('d', arrow)
    .attr('transform', ({
      source,
      target,
      points
    }) => {
      const [end, start] = points.slice().reverse();
      // This sets the arrows the node radius (20) + a little bit (3) away from the node center, on the last line segment of the edge. This means that edges that only span ine level will work perfectly, but if the edge bends, this will be a little off.
      const dx = start.x - end.x;
      const dy = start.y - end.y;
      const scale = nodeRadius * 1.15 / Math.sqrt(dx * dx + dy * dy);
      // This is the angle of the last line segment
      const angle = Math.atan2(-dy, -dx) * 180 / Math.PI + 90;
      console.log(angle, dx, dy);
      return `translate(${end.x + dx * scale}, ${end.y + dy * scale}) rotate(${angle})`;
    })
    .attr('fill', ({target}) => colorMap[target.id])
    .attr('stroke', 'white')
    .attr('stroke-width', 1.5);

  // Add text to nodes
  nodes.append('text')
    .text(d => d.id)
    .attr('font-weight', 'bold')
    .attr('font-family', 'sans-serif')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('fill', 'white');
    
  yield svgNode;
}
);
  main.variable(observer()).define(["md","time"], function(md,time){return(
md`The layout above took ${time} milliseconds to compute. The drop downs below allow you to tweak configurations and inspect the layout time vs quality of layout.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Layering
This algorithm assigns each node to a layer`
)});
  main.variable(observer("viewof layering")).define("viewof layering", ["DOM","layerings"], function(DOM,layerings){return(
DOM.select(Object.keys(layerings))
)});
  main.variable(observer("layering")).define("layering", ["Generators", "viewof layering"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`### Crossing Minimization
This sets how to arrange each node in a layer to minimize edge crossings, and is often the most expensive part`
)});
  main.variable(observer("viewof decross")).define("viewof decross", ["DOM","decrossings"], function(DOM,decrossings){return(
DOM.select(Object.keys(decrossings))
)});
  main.variable(observer("decross")).define("decross", ["Generators", "viewof decross"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`### Coordinate Assignment
This gives ordered nodes in a layer an actual x coordinate, spacing some out more than others`
)});
  main.variable(observer("viewof coord")).define("viewof coord", ["DOM","coords"], function(DOM,coords){return(
DOM.select(Object.keys(coords))
)});
  main.variable(observer("coord")).define("coord", ["Generators", "viewof coord"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`### Input data
A few different DAG datasets exist to render`
)});
  main.variable(observer("viewof source")).define("viewof source", ["DOM","sources"], function(DOM,sources){return(
DOM.select(Object.keys(sources))
)});
  main.variable(observer("source")).define("source", ["Generators", "viewof source"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`# Setup
These cells inport the module, load the data, and set the layout based on the drop downs above`
)});
  main.variable(observer("width")).define("width", function(){return(
400
)});
  main.variable(observer("height")).define("height", function(){return(
400
)});
  main.variable(observer("d3")).define("d3", ["require"], async function(require)
{
  const d3_base = await require('d3');
  const d3_dag = await require('d3-dag@0.4.3');
  return Object.assign({}, d3_base, d3_dag);
}
);
  main.variable(observer("sources")).define("sources", ["d3"], function(d3)
{
  return {
    "Grafo": ["grafo", d3.dagStratify()],
    "X-Shape": ["ex", d3.dagStratify()],
    "Zherebko": ["zherebko", d3.dagConnect()],
  };
}
);
  main.variable(observer("dag")).define("dag", ["sources","source","d3"], async function(sources,source,d3)
{
  const [key, reader] = sources[source];
  const dag_data = await d3.json(`https://raw.githubusercontent.com/erikbrinkman/d3-dag/master/examples/${key}.json`);
  return reader(dag_data);
}
);
  main.variable(observer("layerings")).define("layerings", ["d3"], function(d3)
{
  return {
    "Simplex (slow)": d3.layeringSimplex(),
    "Longest Path (fast)": d3.layeringLongestPath(),
    "Coffman Graham (medium)": d3.layeringCoffmanGraham(),
  };
}
);
  main.variable(observer("decrossings")).define("decrossings", ["d3"], function(d3)
{
  return {
    "Optimal (slow)": d3.decrossOpt(),
    "Two Layer Opt (medium)": d3.decrossTwoLayer().order(d3.twolayerOpt()),
    "Two Layer (flast)": d3.decrossTwoLayer(),
  };
}
);
  main.variable(observer("coords")).define("coords", ["d3"], function(d3)
{
  return {
    "Vertical (slow)": d3.coordVert(),
    "Minimum Curves (slow)": d3.coordMinCurve(),
    "Greedy (medium)": d3.coordGreedy(),
    "Center (fast)": d3.coordCenter(),
  };
}
);
  main.variable(observer("layout")).define("layout", ["d3","width","height","layerings","layering","decrossings","decross","coords","coord"], function(d3,width,height,layerings,layering,decrossings,decross,coords,coord){return(
d3.sugiyama()
    .size([width, height])
    .layering(layerings[layering])
    .decross(decrossings[decross])
    .coord(coords[coord])
)});
  main.variable(observer("time")).define("time", ["layout","dag"], function(layout,dag)
{
  const start = Date.now();
  layout(dag);
  return Date.now() - start;
}
);
  return main;
}
