import React from 'react';
import './Table.css'

function CustomizeCase(props) {
    let data= null;
    if(props.case === 'confirmed' && props.row.deltaconfirmed === 0) {
        data = <p>{props.row.confirmed}</p>
    }
    if(props.case === 'confirmed' && props.row.deltaconfirmed !== 0) {
        data = <p>
                {props.row.deltaconfirmed != 0? <span style={{color: 'red', fontSize: 10, marginRight: 5}}><i className="fas fa-arrow-up"></i><span>&nbsp;</span>{props.row.deltaconfirmed}</span>: null } 
                {props.row.confirmed}
              </p>
    }
    if(props.case === 'active'  && props.row.deltaactive === 0) {
        data = <p>{props.row.active}</p>
    }
    if(props.case === 'active'  && props.row.deltaactive !== 0) {
        data = <p>
               {props.row.deltaactive != 0? <span style={{color: 'red', fontSize: 10, marginRight: 5}}>{props.row.deltaactive}</span>: null } 
                {props.row.active}
             </p>
    }
   
    if(props.case === 'recovered' && props.row.deltarecovered === 0) {
        data = <p>{props.row.recovered}</p>
    }
    if(props.case === 'recovered' && props.row.deltarecovered !== 0) {
        data = <p>
        {props.row.deltarecovered != 0? <span style={{color: 'red', fontSize: 10, marginRight: 5}}><i className="fas fa-arrow-up"></i><span>&nbsp;</span>{props.row.deltarecovered}</span>: null } 
        {props.row.recovered}
      </p>
    }
    if(props.case === 'deaths' && props.row.deltadeaths === 0) {
        data = <p>{props.row.deaths}</p>
    }
    if(props.case === 'deaths' && props.row.deltadeaths !== 0) {
        data = <p>
        {props.row.deltadeaths != 0? <span style={{color: 'red', fontSize: 10, marginRight: 5}}><i className="fas fa-arrow-up"></i><span>&nbsp;</span>{props.row.deltadeaths}</span>: null } 
        {props.row.deaths}
      </p>
    }
    return (
        <div>
            {data}
        </div>
    )
}

export default CustomizeCase
