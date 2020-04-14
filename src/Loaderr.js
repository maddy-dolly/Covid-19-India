import React, {Component}  from 'react';import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

class Loaderr extends Component {
    render() {
        return(
            <div className="container">
            <div  style={{marginLeft:"35%", marginTop:"13%"}}>
            <Loader
       type="ThreeDots"
       color="black"
       height={300}
       width={300}
        //3 secs

    />
            </div>            
        </div>
        )
    } 
    
}

export default Loaderr;