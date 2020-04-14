import React,{ Component } from "react";
import India from "@svg-maps/india";
import axios from 'axios';
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import "./Map.css";


class Map extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            selectedState: [],
            max: 0,
          };

        this.onHoverHandler = this.onHoverHandler.bind(this);

        this.customIndia = {
            ...India,
            label: "Custom map label",
            locations: India.locations.map(location => {
                         
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


  
    onHoverHandler (event) {
     this.props.check(event)
        
    }

    getLocationClassName = (location, index) => {
        // Generate random heat map
        const hovered = location.id.toUpperCase();
        
        // console.log('Before Chnage',this.state.selectedState);
        const total = this.state.items.filter((item) => {
            return (item.statecode === hovered);
        });
        const t = +total[0].confirmed;
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
                
                    <div>
                        <SVGMap 
                            map={India} 
                            onLocationMouseOver={this.onHoverHandler} 
                            locationClassName={this.getLocationClassName}
                        />
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