/* eslint-disable react/jsx-no-undef */
import React, {Component}  from 'react';
import { Sparklines, SparklinesCurve, SparklinesSpots } from 'react-sparklines';
import './Home.css'
import Map from '../MapHome/Map';


let confirmedCase = [];
let recoveredCase = [];
let deceasesCase = [];
let activeCase = [];
let totalConfirmed=null;
let totalActive=null;
let totalRecovered=null;
let totalDeceased=null;
let totalDeltaConfirmed=null;
let lastupdatedtime=null;
let totalDeltaRecovered=null;
let totalDeltaDeaths=null;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      count: null,
      total: [],         
      stateitems: [],
      selectedState:[]
    };
  }


  componentDidMount(){
    fetch('https://api.covid19india.org/data.json')
    .then(function(response) {
      return response.json();
    })
    .then(data => {
    //console.log(data.statewise[0].lastupdatedtime);
    
      let case_time_data = data.cases_time_series;
       console.log('Total Data',data.statewise[0]);
      totalConfirmed=data.statewise[0].confirmed;
      totalActive=data.statewise[0].active;
      totalRecovered=data.statewise[0].recovered;
      totalDeceased=data.statewise[0].deaths;
      totalDeltaConfirmed=data.statewise[0].deltaconfirmed;
      lastupdatedtime=data.statewise[0].lastupdatedtime;
      totalDeltaRecovered=data.statewise[0].deltarecovered;
      totalDeltaDeaths=data.statewise[0].deltadeaths;

      
      
      for (var i = 0; i < case_time_data.length; i++) {
        confirmedCase.push(+case_time_data[i].totalconfirmed);
        recoveredCase.push(+case_time_data[i].totalrecovered);
        deceasesCase.push(+case_time_data[i].totaldeceased);
        activeCase.push((+case_time_data[i].totalconfirmed)-((+case_time_data[i].totalrecovered)+(+case_time_data[i].totaldeceased)))
      }
      this.setState({
          showGraph: true,
      })
    });
  }



  render() {   
       
      if(! this.state.showGraph) {
        return(
            <div className="IndiaData">
                <div className="col-md-4">
                Loading......
                </div>            
                <div className="col-md-8">
                    Loading......
                </div>
            </div>
        );
      }
      else {
            return(

                <div className="card">
                  <div className="card-body">
                  <div className="row">
                    <div className="col-md-5">
                    <div className="row">
                            <div className="col-md-8">
                              <h3 className="main_heading">INDIA COVID-19 TRACKER</h3>
                              <p className="main_para">A CROWDSOURCED INITIATIVE</p>
                            </div>
                            <div className="col-md-4">
                              <p className="para_one">LAST UPDATE</p>
                              <p className="span_last_time">{lastupdatedtime}</p>
                            </div>
                          </div>
                        <div className="row">
                         
                            <div className="col-md-3" style={{ color:'#ff073a99',textAlign:'center'}}>
                                <h6>Confirmed</h6>
                                <h5 className="heading_h5_style">[+{totalDeltaConfirmed}]</h5>
                                <h3 style={{color:'red'}}>{totalConfirmed}</h3>
                                <Sparklines data={confirmedCase} svgWidth={100} >
                                    <SparklinesCurve style={{ strokeWidth: 5, stroke: "#ff073a99", fill: "none" }} />
                                    <SparklinesSpots size={7} />
                                </Sparklines>
                            </div>
                            <div className="col-md-3" style={{ color: 'rgba(0,123,255,.6)',textAlign:'center'}}>
                                <h6>Active</h6>
                                <h5>&nbsp;</h5>
                                <h3 style={{color:'blue'}}>{totalActive}</h3>
                                <Sparklines data={activeCase} svgWidth={100} limit={30}>
                                    <SparklinesCurve style={{ strokeWidth: 5, stroke: "rgba(0,123,255,.6)", fill: "none" }} />
                                    <SparklinesSpots size={7}/>
                                </Sparklines>
                            </div>
                            <div className="col-md-3" style={{color: 'rgba(40,167,69,.6)',textAlign:'center'}}>
                                <h6>Recovered</h6>
                                <h5 className="heading_h5_style">[+{totalDeltaRecovered}]</h5>
                                <h3 style={{color:'green'}}>{totalRecovered}</h3>
                                <Sparklines data={recoveredCase} limit={20} svgWidth={100} >
                                    <SparklinesCurve style={{ strokeWidth: 5, stroke: "rgba(40,167,69,.6)", fill: "none" }} />
                                    <SparklinesSpots size={7}/>
                                </Sparklines>
                            </div>
                            <div className="col-md-3" style={{ color: 'rgba(108,117,125,.6)',textAlign:'center'}}>
                                <h6>Deceased</h6>
                                <h5 className="heading_h5_style">[+{totalDeltaDeaths}]</h5>
                                <h3 style={{color:'gray'}}>{totalDeceased}</h3>
                                <Sparklines data={deceasesCase} limit={10} svgWidth={100} >
                                    <SparklinesCurve style={{ strokeWidth: 5, stroke: "rgba(108,117,125,.6)", fill: "none" }} />
                                    <SparklinesSpots size={7}/>
                                </Sparklines>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-1"></div>
                                   
                    <div className="col-md-6">
                      <div>
                        <h6 className="main_heading">India</h6>
                        <p className="main_para">HOVER OVER A STATE/UT FOR MORE DETAILS</p>
                      </div>
                          <div className="row">
                            <div className="col-md-3">
                              <div className="card_one">
                               
                                  <h6 className="heading_6_style" style={{color:'#ef6060'}}>Confirmed</h6>
                                  <div className="stats-bottom">
                                       <h1 className="heading_1_count_style">{totalConfirmed}</h1>
                                    </div>
                                
                              </div>
                            </div>
                            <div className="col-md-3">
                            <div className="card_two">
                               
                            <h6 className="heading_6_style" style={{color:'rgba(0,123,255,.6)'}}>Active</h6>
                                  <div className="stats-bottom">
                                       <h1 className="heading_1_count_style" style={{color:'#007bff'}}>{totalActive}</h1>
                                    </div>
                             
                           </div>
                            </div>
                            <div className="col-md-3">
                            <div className="card_three">
                               
                            <h6 className="heading_6_style" style={{color:'rgba(40,167,69,.6)'}}>Recovered</h6>
                            <div className="stats-bottom">
                                  <h1 className="heading_1_count_style" style={{color:'#28a745'}}>{totalRecovered}</h1>
                            </div>
                             
                           </div>
                            </div>
                            <div className="col-md-3">
                            <div className="card_four">
                               
                            <h6 className="heading_6_style" style={{color:'rgba(108,117,125,.6)'}}>Deceased</h6>
                              <div className="stats-bottom">
                                    <h1 className="heading_1_count_style" style={{color:'#6c757d'}}>{totalDeltaDeaths}</h1>
                              </div>
                             
                           </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-8">
                              <h3 className="country_heading">India</h3>
                            </div>
                            <div className="col-md-4" style={{textAlign: 'right',marginLeft: '-45px'}}>
                              <p className="para_onee">LAST UPDATE</p>
                              <p className="span_last_timee">{lastupdatedtime}</p>
                            </div>
                          </div>
                    </div>
                </div>
              </div>
              <Map></Map>
              </div>
            );
        }
  }
}
export default Home;
