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
    width = 680, // outer width, in pixels
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
