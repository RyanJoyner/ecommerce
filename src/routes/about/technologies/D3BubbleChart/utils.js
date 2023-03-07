// https://gist.github.com/jessihamel/9648495
import * as d3 from "d3";
import icons from "./icons";

export const mapSVGsToD3 = (leaf, callBack) => {
  const svg = leaf
    .append("svg")
    .attr("width", (d) => (icons[d.data].width * d.r) / 75)
    .attr("height", (d) => (icons[d.data].height * d.r) / 75)
    .attr("viewBox", (d) => icons[d.data].viewBox)
    .attr("fill", (d) => icons[d.data].fill)
    .attr("x", (d) => -d.r * 0.5)
    .attr("y", (d) => -d.r * 0.65)
    .on("mouseover", (e, d) => {
      const outerCircle = d3.select("#" + icons[d.data].id);
      mouseOver(outerCircle);
    })
    .on("mousedown", (e, d) => {
      callBack(d.data);
    });

  svg
    .selectAll("svg")
    .data((d) => icons[d.data].paths)
    .join("path")
    .attr("d", (d) => d.d)
    .attr("fill", (d) => d.fill);

  return svg;
};

export const mouseOver = (element) => {
  element
    .attr("fill", "rgb(51, 51, 51)")
    .attr("content", "")
    .transition()
    .duration("200")
    .attr("r", (d) => d.r + 8);
};
