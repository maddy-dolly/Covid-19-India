import React from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
import './Chart.css';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

let dataPointst = [];
let dataPointsr = [];
let dataPointsd = [];

class ApexChartExample extends React.Component {
    constructor(props) {
      super(props);
      this.toggleDataSeries = this.toggleDataSeries.bind(this);

    }  

    toggleDataSeries(e){
      if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      }
      else{
        e.dataSeries.visible = true;
      }
      this.chart.render();
    }

    componentDidMount(){
      var chart = this.chart;
      fetch('https://api.covid19india.org/data.json')
      .then(function(response) {
        console.log(response);
        
        return response.json();
      })
      .then(function(data) {
        let data1 = data.cases_time_series;
        
        for (var i = 0; i < data1.length; i++) {
         
          dataPointsr.push({
            x: new Date(data1[i].date+',2020'),
					  y: +data1[i].totalrecovered
          });
         
        }
        chart.render();
      });
    }

    render() {	
      const options = {
        animationEnabled: true,
        responsive: true,
        height: 200,
        maintainAspectRatio: false,
        backgroundColor: "#e2f2e8",
        theme: "light",
        title: {
          text: ""
        },
        axisY2: {
          title: "No. of cases",
          prefix: "",
          includeZero: false,
          gridThickness: 0,
          stripLines: [
            {
              value: 0,
              showOnTop: true,
              color: "gray",
              thickness: 2
            }
          ]
        },
        toolTip: {
          shared: true,
          cornerRadius: 10,
        },
        legend: {
          // verticalAlign: "center",
				  // horizontalAlign: "right",
			  	// reversed: true,
          cursor: "pointer",
          itemclick: this.toggleDataSeries
        },
        data: [
            {
                axisYType: "secondary",
                type: "splineArea",
                name: "Deceased",
                showInLegend: true,
                xValueFormatString: "MMM DD",
                yValueFormatString: "##,##,##,###",
                dataPoints: dataPointsd
              },
        
          {
            axisYType: "secondary",
            type: "splineArea",
            name: "Confirmed",
            showInLegend: true,
            xValueFormatString: "MMM DD",
            yValueFormatString: "##,##,##,###",
            dataPoints:dataPointst
          },
          {
            axisYType: "secondary",
            type: "splineArea",
            name: "Recovered",
            showInLegend: true,
            xValueFormatString: "MMM DD",
            yValueFormatString: "##,##,##,###",
            dataPoints: dataPointsr
          },
      ]
      }
      return (
     
        <CanvasJSChart options = {options} 
           onRef={ref => this.chart = ref}
        />
        
      );
    }
}

export default ApexChartExample