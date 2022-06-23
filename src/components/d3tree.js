import * as d3 from 'd3';

const d3tree = (props) => {

    console.log("DRAWSTRUCTURE INVOKED!!");
    const testData = props;
  
    const dms = {
      width: 500,
      height: 400,
      margins: {
        top: 30,
        bottom: 30,
        left: 30,
        right: 30
      },
      // boundedWidth : 500, //this.width - this.margins.left - this.margins.right,
      // boundedHeight : 300 //this.height - this.margins.top - this.margins.bottom
    };
    const svg = d3
      .select("#d3treeWrapper")
      .append("svg")
      .attr("height", dms.height)
      .attr("width", dms.width)
      .attr('fill','33CCCC')
  
    const bound = svg
      .append("g")
      .style(
        "transform",
        `translate(${dms.margins.left}px,${dms.margins.top}px)`
      )
      .attr("height","360")
      .attr("width","360");
  
    const tree = d3.tree().size([300, 320]);

    // const parsedInformation = d3.hierarchy(testData);
    
    // const information = tree(parsedInformation);
    const information = tree(d3.hierarchy(props))
    
    const rects = bound
      .append("g")
      .selectAll("rect")
      .data(information.descendants());
    rects
      .enter()
      .append("rect")
      .attr("y", (d) => d.y)
      .attr("x", (d) => d.x - 20)
      .attr("height", 40)
      .attr("width", 40)
      .attr("fill", "green");
  
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
      .attr("stroke", "gold");
  
    const names = bound
      .append("g")
      .selectAll("name")
      .data(information.descendants())
    names
      .enter()
      .append("text")
      .text((d) => d.data.name)
      .attr("x", (d) => d.x - 40)
      .attr("y", (d) => d.y - 5);
    const details = bound
      .append("g")
      .selectAll("detail")
      .data(information.descendants());
    details
      .enter()
      .append("text")
      .text((d) => d.data.image)
      .attr("x", (d) => d.x - 35)
      .attr("y", (d) => d.y + 20)
      .attr('size', 10);
  }

  export default d3tree;

  // const data = {
  //   "name": "Eve",
  //   "count": 100,
  //   "children": [
  //     {
  //       "name": "Cain"
  //     },
  //     {
  //       "name": "Seth",
  //       "children": [
  //         {
  //           "name": "Enos"
  //         },
  //         {
  //           "name": "Noam"
  //         }
  //       ]
  //     },
  //     {
  //       "name": "Abel"
  //     },
  //     {
  //       "name": "Awan",
  //       "children": [
  //         {
  //           "name": "Enoch"
  //         }
  //       ]
  //     },
  //     {
  //       "name": "Azura"
  //     }
  //   ]
  // };