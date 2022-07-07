import * as d3 from 'd3';

const d3tree = (props) => {
  
  //Setting the dimension of the SVG
  const dms = {
    width: 900,
    height: 400,
    margins: {
      top: 30,
      bottom: 30,
      left: 80,
      right: 30
    },
  };

  // Removes existing tree & children when new tree is generated
  if(document.querySelector('#d3treeWrapper').hasChildNodes())  document.querySelector('#d3treeWrapper').removeChild( document.querySelector('#d3tree'));

  //The foundation element
  const svg = d3
    .select('#d3treeWrapper')
    .append('svg')
    .attr('width', dms.width)
    .attr('height', dms.height)
    .attr('fill','33CCCC')
    .attr('id','d3tree');
  
  //Subelement of SVG to hold the chart without touching the svg border
  const bound = svg
    .append('g')
    .style(
      'transform',
      `translate(${dms.margins.left}px,${dms.margins.top}px)`
    )
    .attr('width','800')
    .attr('height','300');
  
  //Initialize tree chart type
  const tree = d3.tree().size([700, 300]);
    
  // converts the passed in data to a hierarchy then to a tree
  const information = tree(d3.hierarchy(props));
    
  //Rectangles that represent each component of the cluster
  const rects = bound
    .append('g')
    .selectAll('rect')
    .data(information.descendants());
  rects
    .enter()
    .append('rect')
    .attr('y', (d) => d.y)
    .attr('x', (d) => d.x - 20)
    .attr('height', 40)
    .attr('width', 40)
    .attr('fill', 'green');
  
  //Connection lines that join the components together to depict the hierarchy of cluster
  const links = bound.append('g').selectAll('link').data(information.links());
  links
    .enter()
    .append('path')
    .attr(
      'd',
      d3
        .linkVertical()
        .x((d) => d.x)
        .y((d) => d.y)
    )
    .attr('fill', 'none')
    .attr('stroke', 'gold');
    
  //Labels for each component
  const names = bound
    .append('g')
    .selectAll('name')
    .data(information.descendants());
  names
    .enter()
    .append('text')
    .text((d) => d.data.name)
    .attr('x', (d) => d.x - 40)
    .attr('y', (d) => d.y - 5)
    .style('font','14px times');

  //Additional detail about container
  const details = bound
    .append('g')
    .selectAll('detail')
    .data(information.descendants());
  details
    .enter()
    .append('text')
    .text((d) => d.data.image)
    .attr('x', (d) => d.x - 35)
    .attr('y', (d) => d.y + 55)
    .style('font','10px times');
};

export default d3tree;