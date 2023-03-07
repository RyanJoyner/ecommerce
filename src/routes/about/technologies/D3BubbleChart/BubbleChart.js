// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/bubble-chart
// https://www.youtube.com/watch?v=xkBheRZTkaw

import * as d3 from "d3";
import { mapSVGsToD3, mouseOver } from "./utils";

export const BubbleChart = (
  data,
  {
    value = ([, y]) => y, // given d in data, returns a quantitative size
    group, // given d in data, returns a categorical value for color
    width = 620, // outer width, in pixels
    height = width, // outer height, in pixels
    padding = 3, // padding between circles
    margin = 2, // default margins
    marginTop = margin, // top margin, in pixels
    marginRight = margin, // right margin, in pixels
    marginBottom = margin, // bottom margin, in pixels
    marginLeft = margin, // left margin, in pixels
    groups, // array of group names (the domain of the color scale)
    colors = d3.schemeTableau10, // an array of colors (for groups)
    fill = "#ccc", // a static fill color, if no group channel is specified
    fillOpacity = 0.7, // the fill opacity of the bubbles
    stroke, // a static stroke around the bubbles
    strokeWidth, // the stroke width around the bubbles, if any
    strokeOpacity, // the stroke opacity around the bubbles, if any
    callBack = () => {},
  } = {}
) => {
  // Compute the values.
  const Values = d3.map(data, value);
  const Groups = group == null ? null : d3.map(data, group);
  const I = d3.range(Values.length).filter((i) => Values[i] > 0);

  // Unique the groups.
  if (Groups && groups === undefined) groups = I.map((i) => Groups[i]);
  groups = Groups && new d3.InternSet(groups);

  // Construct scales.
  const color = Groups && d3.scaleOrdinal(groups, colors);
  const uid = `O-${Math.random().toString(16).slice(2)}`;

  const root = d3
    .pack()
    .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
    .padding(padding)(d3.hierarchy({ children: I }).sum((i) => Values[i]));

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-marginLeft, -marginTop, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
    .attr("fill", "currentColor")
    .attr("font-size", 10)
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "middle");

  const leaf = svg
    .selectAll("a")
    .data(root.leaves())
    .join("a")
    .attr("transform", (d) => `translate(${d.x - 25},${d.y})`);

  leaf
    .append("circle")
    .attr("stroke", stroke)
    .attr("stroke-width", strokeWidth)
    .attr("stroke-opacity", strokeOpacity)
    .attr(
      "fill",
      Groups ? (d) => color(Groups[d.data]) : fill == null ? "none" : fill
    )
    .attr("fill-opacity", fillOpacity)
    .attr("r", (d) => d.r - 8)
    .attr("id", (d) => data[d.data].id)
    .on("mouseover", (e) => {
      const self = d3.select(e.target);
      mouseOver(self);
    })
    .on("mouseout", (e) => {
      d3.select(e.target)
        .attr(
          "fill",
          Groups ? (d) => color(Groups[d.data]) : fill == null ? "none" : fill
        )
        .transition()
        .duration("200")
        .attr("r", (d) => d.r - 8);
    })
    .on("mousedown", (e, d) => {
      callBack(d.data);
    });

  mapSVGsToD3(leaf, callBack);

  return Object.assign(svg.node(), { scales: { color } });
};

// {
//   "id": "Python",
//   "width": 75,
//   "height": 100,
//   "viewBox": "0 0 512 512",
//   "fill": "none",
//   "paths": [
//     {
//       "d": "M253.543 2C123.878 2.00001 131.975 58.2304 131.975 58.2304L132.12 116.484H255.855V133.975H82.9723C82.9723 133.975 0 124.565 0 255.398C-9.248e-06 386.231 72.4201 381.591 72.4201 381.591H115.641V320.88C115.641 320.88 113.311 248.46 186.905 248.46H309.628C309.628 248.46 378.579 249.574 378.579 181.822V69.7945C378.579 69.7945 389.048 2 253.543 2ZM185.314 41.1733C197.625 41.1733 207.575 51.1234 207.575 63.4342C207.575 75.745 197.625 85.6951 185.314 85.6951C173.004 85.6951 163.054 75.745 163.054 63.4342C163.054 51.1234 173.004 41.1733 185.314 41.1733Z",
//       "fill": "#3B4351"
//     },
//     {
//       "d": "M257.225 510.108C386.89 510.108 378.793 453.878 378.793 453.878L378.648 395.624H254.912V378.133H427.796C427.796 378.133 510.768 387.543 510.768 256.71C510.768 125.877 438.348 130.517 438.348 130.517H395.127V191.228C395.127 191.228 397.457 263.648 323.863 263.648H201.139C201.139 263.648 132.188 262.534 132.188 330.286V442.314C132.188 442.314 121.72 510.108 257.225 510.108ZM325.453 470.935C313.143 470.935 303.192 460.985 303.192 448.674C303.192 436.363 313.143 426.413 325.453 426.413C337.764 426.413 347.714 436.363 347.714 448.674C347.714 460.985 337.764 470.935 325.453 470.935Z",
//       "fill": "#3B4351"
//     }
//   ]
// }
