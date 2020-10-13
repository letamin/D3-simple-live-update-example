let myData = [
    {
        option: "Banana",
        votes: 11,
        color: "rgba(255, 99, 132, 0.75)"
    },
    {
        option: "Apple",
        votes: 8,
        color: "rgba(54, 162, 235, 0.75)"
    },
    {
        option: "Lemon",
        votes: 11,
        color: "rgba(36, 36, 36, 0.75)"
    },
    {
        option: "Avocado",
        votes: 5,
        color: "rgb(255, 159, 64, 0.75)"
    },
    {
        option: "Grape",
        votes: 3,
        color: "rgba(75, 192, 192, 0.75)"
    },
    {
        option: "Mango",
        votes: 8,
        color: "rgba(255, 206, 86, 0.75)"
    },
    {
        option: "Other",
        votes: 10,
        color: "rgba(153, 102, 255, 0.75)"
    }
];

//Initializing data for chart
const svg = d3.select('svg');
const width = document.body.clientWidth;
const height = document.body.clientHeight;
svg.attr('width', width).attr('height', height);
const xValue = d => d.option;
const yValue = d => d.votes;
const margin = { top: 30, right: 100, bottom: 50, left: 100 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
const myForm = document.querySelector('#pollForm');

//Scaling value
const xScale = d3.scaleBand()
    .domain(myData.map(xValue))
    .range([0, innerWidth])
    .padding(0.2)
const yScale = d3.scaleLinear()
    .domain([0, d3.max(myData, yValue)])
    .range([innerHeight, 0])

//Adding axises
const xAxis = d3.axisBottom(xScale)
    .tickPadding(10);
const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(5);

const gyAxis = g.append('g').attr("class", "y axis").call(yAxis);
const gxAxis = g.append('g').attr("class", "x axis").call(xAxis)
    .attr('transform', `translate(0,${innerHeight})`);


//Form submit handle
myForm.addEventListener('submit', formSubmit)
function formSubmit(event) {
    event.preventDefault();
    const pollInput = document.querySelector('.poll-radio-input:checked');
    if (pollInput) {
        const inputValue = pollInput.value;
        myData.find(element => element.option === inputValue).votes++;
        render(myData)
    }
}

//Rendering chart
const render = (data) => {
    const fruits = g.selectAll('.bar').data(data)
    fruits.enter().append('rect')
        .attr("class", "bar")
        .attr('x', d => xScale(xValue(d)))
        .style('fill', d => d.color)
        .attr('width', xScale.bandwidth())
        .merge(fruits)
        .attr('height', d => innerHeight - yScale(yValue(d)))
        .attr('y', d => yScale(yValue(d)))

    fruits.exit().remove()
};

render(myData) //Render chart for the first time