import React, { Component } from 'react'
import CanvasJSReact from '../assets/canvasjs.react';
import './Table.css';
import TimeAgo from 'javascript-time-ago'
 
// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'
 
// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Expandedrow extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,   
          stateitems: [],
          dataPointst: [],
          dataPointsr: [],
          dataPointsd: [],
        };      
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
    loadData() {
        var chart = this.chart;
        // console.log(this.props.data.delta.confirmed);
        let dataPointst = [];
        let dataPointsr = [];
        let dataPointsd = [];
        // console.log('Expanded Component',this.props.statewiseData,this.props.data.state);
        let data1= this.props.statewiseData;
        for (var i = 0; i < data1.length; i++) {
            let val = 0;
            // console.log('HEy');
            var singleData = data1[i].regional.filter(item => {
                return item.loc === this.props.data.state;              
            });
            if(singleData.length == 0) {
                dataPointst.push({
                    x: new Date(data1[i].day),
                    y: 0
                  });
                  dataPointsr.push({
                    x: new Date(data1[i].day),
                    y: 0
                  });
                  dataPointsd.push({
                    x: new Date(data1[i].day),
                    y: 0
                  });
            }
            else {
                    dataPointst.push({
                        x: new Date(data1[i].day),
                        y: (singleData[0].confirmedCasesIndian)+singleData[0].confirmedCasesForeign
                      });
                      dataPointsr.push({
                        x: new Date(data1[i].day),
                        y: singleData[0].discharged,
                      });
                      dataPointsd.push({
                        x: new Date(data1[i].day),
                        y: singleData[0].deaths
                      });
            }
        }
        if(this.state.dataPointst.length == 0) {
            this.setState({
                dataPointst: dataPointst,
                dataPointsr: dataPointsr,
                dataPointsd: dataPointsd,
            })
        }
        chart.render();
    }
    componentDidMount() {
        this.loadData();
    }
    componentDidUpdate() {
        this.loadData();
    }
    render() {
        const options = {
            animationEnabled: true,
            responsive: true,
            height: 250,
            maintainAspectRatio: false,
            backgroundColor: "#f6f6f7",
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
                    dataPoints: this.state.dataPointsd
                  },
            
              {
                axisYType: "secondary",
                type: "splineArea",
                name: "Confirmed",
                showInLegend: true,
                xValueFormatString: "MMM DD",
                yValueFormatString: "##,##,##,###",
                dataPoints: this.state.dataPointst
              },
              {
                axisYType: "secondary",
                type: "splineArea",
                name: "Recovered",
                showInLegend: true,
                xValueFormatString: "MMM DD",
                yValueFormatString: "##,##,##,###",
                dataPoints: this.state.dataPointsr
              },
             
          ]
          }
                    
        return (
            <div>
                <div className="row" style={{marginTop:'19px'}}>
                      <div className="col-md-8">
                        <h3 className="country_heading">{this.props.data.state.toUpperCase()}</h3>
                      </div>
                      <div className="col-md-4" style={{textAlign: 'right',marginLeft: '-45px'}}>
                        <p className="para_onee">LAST UPDATE</p>
                           <p className="span_last_timee">{this.props.data.lastupdatedtime}</p>
                      </div>
                    </div>
                <div className="row">
                      <div className="col-md-3">
                        <div className="card_one">
                         
                            <h6 className="heading_6_style" style={{color:'#ef6060'}}>Confirmed</h6>
                            <div className="stats-bottom">
                                 <h1 className="heading_1_count_style">{this.props.data.confirmed}</h1>
                              </div>
                          
                        </div>
                      </div>
                      <div className="col-md-3">
                      <div className="card_two">
                         
                      <h6 className="heading_6_style" style={{color:'rgba(0,123,255,.6)'}}>Active</h6>
                            <div className="stats-bottom">
                                 <h1 className="heading_1_count_style" style={{color:'#007bff'}}>{this.props.data.active}</h1>
                              </div>
                       
                     </div>
                      </div>
                      <div className="col-md-3">
                      <div className="card_three">
                         
                      <h6 className="heading_6_style" style={{color:'rgba(40,167,69,.6)'}}>Recovered</h6>
                      <div className="stats-bottom">
                            <h1 className="heading_1_count_style" style={{color:'#28a745'}}>{this.props.data.recovered}</h1>
                      </div>
                       
                     </div>
                      </div>
                      <div className="col-md-3">
                      <div className="card_four">
                         
                      <h6 className="heading_6_style" style={{color:'rgba(108,117,125,.6)'}}>Deceased</h6>
                        <div className="stats-bottom">
                              <h1 className="heading_1_count_style" style={{color:'#6c757d'}}>{this.props.data.deaths}</h1>
                        </div>
                       
                     </div>
                      </div>
                    </div>
               
                <div className="row" style={{marginLeft:'-10px'}}>
                    <div className="col-md-11">
                    <CanvasJSChart options = {options} 
                        onRef={ref => this.chart = ref}
                    />
                    <br/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Expandedrow
