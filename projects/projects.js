import { fetchJSON, renderProjects } from '../global.js';
const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');

import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';
let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
let colors = d3.scaleOrdinal(d3.schemeTableau10);
let legend = d3.select('.legend');
let query = '';
// let arc = arcGenerator({
//     startAngle: 0,
//     endAngle: 2 * Math.PI,
//   });

renderProjects(projects, projectsContainer, 'h2');
renderPieChart(projects);
let searchInput = document.querySelector('.searchBar');
searchInput.addEventListener('input', (event) => {
  query = event.target.value;
    let filteredProjects = projects.filter((project) => {
    let values = Object.values(project).join('\n').toLowerCase();
    return values.includes(query.toLowerCase());
  });
  renderProjects(filteredProjects, projectsContainer, 'h2');
  renderPieChart(filteredProjects)
});


let selectedIndex = -1;

function renderPieChart(projectsGiven) {
    // re-calculate rolled data
      // TODO: clear up paths and legends
    let newSVG = d3.select('#projects-pie-plot');
    newSVG.selectAll('path').remove();
    legend.selectAll('li').remove();

    let newRolledData = d3.rollups(
      projectsGiven,
      (v) => v.length,
      (d) => d.year,
    );

    let newData = newRolledData.map(([year, count]) => {
        return { value: count, label: year };
    });

      // re-calculate slice generator, arc data, arc, etc.
    let newSliceGenerator = d3.pie().value((d) => d.value);
    let newArcData = newSliceGenerator(newData);
    let newArcs = newArcData.map((d) => arcGenerator(d));

    
    newArcs.forEach((arc, i) => {
        // newSVG.append('path')
        // .attr('d', arc)
        // .attr('fill', colors(idx)) 
        newSVG
        .append('path')
        .attr('d', arc)
        .attr('fill', colors(i))
        .on('click', () => {
            selectedIndex = selectedIndex === i ? -1 : i;

            newSVG
            .selectAll('path')
            .attr('class', (_, idx) => (
            idx === selectedIndex ? 'selected' : ''
            // TODO: filter idx to find correct pie slice and apply CSS from above
            ));

            legend
            .selectAll('li')
            .attr('class', (_, idx) => (
                idx === selectedIndex ? 'selected-legend' : ''
            // TODO: filter idx to find correct legend and apply CSS from above
            ));

            if (selectedIndex === -1) {
                renderProjects(projects, projectsContainer, 'h2');
            } else {
                renderProjects(projects.filter(p => p.year === newData[selectedIndex].label), projectsContainer, 'h2')
        // TODO: filter projects and project them onto webpage
        // Hint: `.label` might be useful
            }
        });
    });
                

  // Draw updated legend
    newData.forEach((d, idx) => {
        legend.append('li')
        .attr('style', `--color:${colors(idx)}`)
        .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
    });
}





  