import * as d3 from 'd3';

const svg = d3.select('#seats-chart');
const width = +svg.attr('width');
const height = +svg.attr('height');
const radius = Math.min(width, height) / 2;
const g = svg.append('g')
              .attr('transform', `translate(${width / 2}, ${height / 2})`);