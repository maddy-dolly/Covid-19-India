import React,{ Component } from "react";
import India from "@svg-maps/india";
import axios from 'axios';
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import "./Map.css";
import TimeAgo from 'javascript-time-ago'
 
// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'
 
// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');


class Map extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            selectedState: [],
            max: 0
          };

        this.onHoverHandler = this.onHoverHandler.bind(this);

        this.customIndia = {
            ...India,
            label: "Custom map label",
            locations: India.locations.map(location => {
              // Modify each location
            //   console.log('Location is',location);              
            })
          };
    }
    componentDidMount() {
        axios.get("https://api.covid19india.org/data.json")
      .then(
        result => {
          const statewise = result.data.statewise;
          if(this.state.selectedState.length === 0) {
            const total = result.data.statewise.filter((item) => {
                return (item.state === 'Total');
              });
              this.setState({
                  selectedState: total[0]
              })
            var max = 0;
            for(var i=0;i<result.data.statewise.length;i++) {
                if(result.data.statewise[i].state !== 'Total') {
                    if(+result.data.statewise[i].confirmed >= max) {
                        max = +result.data.statewise[i].confirmed;
                    }
                }
            }
            max = Math.floor(max/5);
            this.setState({
                max: max
            })
            
          }
          this.setState({
            isLoaded: true,
            items: statewise,
            max: max
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error: error
          });
        }
      );
    }


    getLocationName(event) {
        return event.target.attributes.id.value;
    }

    onHoverHandler (event) {
        const hovered = this.getLocationName(event).toUpperCase();
        // console.log('Before Chnage',this.state.selectedState);
        const total = this.state.items.filter((item) => {
            return (item.statecode === hovered);
        });
        this.setState({
            selectedState: total[0]
        });
        // console.log('After Chnage',this.state.selectedState);     

        
    }

    getLocationClassName = (location, index) => {
        // Generate random heat map
        const hovered = location.id.toUpperCase();
        
        // console.log('Before Chnage',this.state.selectedState);
        const total = this.state.items.filter((item) => {
            return (item.statecode === hovered);
        });
        const t = +total[0].confirmed;
        console.log(t);
        if(t>=0 && t<this.state.max) {
            return 'state1Color';
        }
        else if(t>=this.state.max && t<(this.state.max*2)) {
            return 'state2Color'
        }
        else if(t>=(this.state.max*2) && t<(this.state.max*3)) {
            return 'state3Color'
        }
        else if(t>=(this.state.max*3) && t<(this.state.max*4)) {
            return 'state4Color'
        }
        else if(t>=(this.state.max*4) && t<(this.state.max*5)) {
            return 'state5Color'
        }
        else if(t>=(this.state.max*5)) {
            return 'state6Color'
        }
        
	}

    render() {
        if(this.state.isLoaded) {
            return (
                <div className="MapData" style={{width: '80%', margin: 'auto'}}>
                    <div className="col-lg-6" style={{height: '50%'}}>
                        <SVGMap 
                            map={India} 
                            onLocationMouseOver={this.onHoverHandler} 
                            locationClassName={this.getLocationClassName}
                        />
                    </div>
                    <div className="col-lg-6">
                        <div className="MapData">
                            <span className="col-lg-6" style={{textAlign:'left',paddingLeft: 20, color: '#ff0739', fontWeight: 'bold'}}>
                                {this.state.selectedState.state.toUpperCase()}
                            </span>
                            <span className="col-lg-6" style={{textAlign:'right',paddingRight: 20, color: '#28a744'}}>
                                    <span style={{fontSize: 13}}>LAST UPDATED</span>
                                    <h6>{timeAgo.format(new Date())}</h6>
                            </span>
                        </div>
                        <div className="col-lg-12" style={{marginBottom: 20, color:'#6f42c1'}}>
                            <h6>Confirmed</h6>
                            <h5>[+{this.state.selectedState.deltaconfirmed}]</h5>
                            <h3>{this.state.selectedState.confirmed}</h3>
                        </div>
                        <div className="col-lg-12" style={{marginBottom: 20, color:'#6b757d'}}>
                            <h6>Active</h6>
                            <h5>[+{this.state.selectedState.active}]</h5>
                            <h3>{this.state.selectedState.active}</h3>
                        </div>
                        <div className="col-lg-12" style={{marginBottom: 20, color:'#28a744'}}>
                            <h6>Recovered</h6>
                            <h5>[+{this.state.selectedState.deltarecovered}]</h5>
                            <h3>{this.state.selectedState.recovered}</h3>
                        </div>
                        <div className="col-lg-12" style={{marginBottom: 20, color:'#ff0739'}}>
                            <h6>Deceased</h6>
                            <h5>[+{this.state.selectedState.deltadeaths}]</h5>
                            <h3>{this.state.selectedState.deaths}</h3>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    Loading............
                </div>
            );
        }
        
    }
}

export default Map;