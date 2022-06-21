import * as d3 from 'd3';
// interface Margins {
//   top: number,
//   bottom: number,
//   left: number,
//   right: number
// }
// interface Dms {
//   width: number,
//   height: number,
//   margins: Margins,
//   boundedWidth: number,
//   boundedHeight: number
// }

const Tree = () => {
    const drawStructure = async () => {
        console.log("DRAWSTRUCTURE INVOKED!!");
        const testData = await d3.json('../../data.json');
      
        const dms = {
          width: window.innerWidth * 0.9,
          height: 400,
          margins: {
            top: 30,
            bottom: 40,
            left: 60,
            right: 15
          },
          boundedWidth : this.width - this.margins.left - this.margins.right,
          boundedHeight : this.height - this.margins.top - this.margins.bottom
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
        // const dataStructured = d3
        //   .stratify()
        //   .id((d) => d["name"])
        //   .parentId((d) => d["parent"])(data);
        let information = d3.hierarchy(testData);
        information = tree(information);
      
        // console.log(dataStructured);
      
        console.log(information.descendants());
      
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
          .attr("r", 5)
          // .attr("height", 50)
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
      
      drawStructure();
};

export default Tree;