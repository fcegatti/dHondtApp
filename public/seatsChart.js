const svg = d3.select('#seats-chart');
const width = +svg.attr('width');
const height = +svg.attr('height');
const radius = Math.min(width, height) / 2;
const g = svg.append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

// Defino las proporciones del arco
const arc = d3.arc()
  .outerRadius(radius - 10)
  .innerRadius(radius - 50);

// Defino el layout del pie chart
const pie = d3.pie()
  .startAngle(-Math.PI/2)
  .endAngle(Math.PI/2)
  .sort(null)
  .value(d => d.seatsPercentage);

function drawSeatsArc(partiesData) {
  // Creo un grupo SGV para cada segmento del pie chart
  const arcs = g.selectAll('.arc')
      .data(pie(partiesData))
      .enter()
      .append('g')
      .attr('class', 'arc');

  // Creo el gráfico de sectores
  arcs.append('path')
    .attr('d', arc)
    .style('fill', d => d.data.color);
}

window.drawSeatsArc = drawSeatsArc;  