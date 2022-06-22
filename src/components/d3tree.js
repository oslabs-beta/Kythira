import * as d3 from 'd3';
const data = {
  "name": "Eve",
  "count": 100,
  "children": [
    {
      "name": "Cain"
    },
    {
      "name": "Seth",
      "children": [
        {
          "name": "Enos"
        },
        {
          "name": "Noam"
        }
      ]
    },
    {
      "name": "Abel"
    },
    {
      "name": "Awan",
      "children": [
        {
          "name": "Enoch"
        }
      ]
    },
    {
      "name": "Azura"
    }
  ]
};

const d3tree = () => {
    console.log("DRAWSTRUCTURE INVOKED!!");
    const testData = data;
  
    const dms = {
      width: 600,
      height: 400,
      margins: {
        top: 30,
        bottom: 40,
        left: 60,
        right: 15
      },
      boundedWidth : 525, //this.width - this.margins.left - this.margins.right,
      boundedHeight : 330 //this.height - this.margins.top - this.margins.bottom
    };
    const svg = d3
      .select("#wrapper")
      .append("svg")
      .attr("height", dms.height)
      .attr("width", dms.width);
  
    const bound = svg
      .append("g")
      .style(
        "transform",
        `translate(${dms.margins.left}px,${dms.margins.top}px)`
      );
  
    const tree = d3.tree().size([750, 300]);
    let information = d3.hierarchy(testData);
    information = tree(information);
    const rects = bound
      .append("g")
      .selectAll("rect")
      .data(information.descendants());
    rects
      .enter()
      .append("rect")
      .attr("y", (d) => d.y)
      .attr("x", (d) => d.x - 35)
      .attr("height", 70)
      .attr("width", 70)
      .attr("fill", "blue");
  
    const links = bound.append("g").selectAll("link").data(information.links());
    links
      .enter()
      .append("path")
      .attr(
        "d",
        d3
          .linkVertical()
          .x((d) => d.x)
          .y((d) => d.y)
      )
      .attr("fill", "none")
      .attr("stroke", "blue");
  
    const names = bound
      .append("g")
      .selectAll("name")
      .data(information.descendants())
    names
      .enter()
      .append("text")
      .text((d) => d.data.name)
      .attr("x", (d) => d.x - 35)
      .attr("y", (d) => d.y - 5);
    const details = bound
      .append("g")
      .selectAll("detail")
      .data(information.descendants());
    details
      .enter()
      .append("text")
      .text((d) => d.data.count)
      .attr("x", (d) => d.x - 15)
      .attr("y", (d) => d.y + 35);
  }

  export default d3tree;