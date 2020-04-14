import React, { Component } from "react";
import Datatable from "react-data-table-component"; // Import this package
import axios from 'axios';
import CustomizeCase from './CustomizeCase';
import ExpandCaseData from './ExpandCaseData';
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      count: null,
      total: [],         
      stateitems: [],
    };
    this.header = [
      { name: "State/UT", 
        selector: "state", 
        sortable: true,
        style: {
          color: '#202124',
          fontSize: '12px',
          fontWeight: 500,
        },
      },
      {
        name: "Confirmed",
        selector: "confirmed",
        sortable: true,
        cell: row => <CustomizeCase row={row} case='confirmed' />,
        center: true,
      },
      { 
        name: "Active", 
        selector: "active", 
        sortable: true, 
        cell: row => <CustomizeCase row={row} case='active' />,
        center:true,
      },
      { 
        name: "Recovered", 
        selector: "recovered", 
        sortable: true, 
        cell: row => <CustomizeCase row={row} case='recovered' />,
        center: true,
      },
      { 
        name: "Deaths", 
        selector: "deaths", 
        sortable: true, 
        cell: row => <CustomizeCase row={row} case='deaths' />,
        center: true,
      }
    ];
    this.customStyles = {
      headRow: {
        style: {
          border: 'none',
        },
      },
      headCells: {
        style: {
          color: '#202124',
          fontSize: '14px',
          textAlign:'center'
        },
      },
      rows: {
        highlightOnHoverStyle: {
          backgroundColor: 'rgb(228, 231, 234)',
          borderBottomColor: '#FFFFFF',
          borderRadius: '25px',
          outline: '1px solid #FFFFFF',
          textAlign:'center'
        },
      },
      pagination: {
        style: {
          border: 'none',
        },
      },
    };
  }

  someHandler(event) {
    this.props.check(event)
  }
  

  componentDidMount() {
    axios.get('https://api.rootnet.in/covid19-in/stats/history')
        .then(
            result => {     
            var stateData = result.data.data;   
            this.setState({
                stateitems:stateData,
            }); 
            
             console.log('StateWiseData',this.state.stateitems);
            },
            error => {
            this.setState({
                isLoaded: true,
                error: error
            });
            }
        );
    axios.get("https://api.covid19india.org/data.json")
      .then(
        result => {
          const statewise = result.data.statewise.filter((item) => {
                              return (item.state !== 'Total' && item.confirmed > 0);
                            })
          var count = Object.keys(statewise).length;

          const total = result.data.statewise.filter((item) => {
            return (item.state === 'Total');
          })
          this.setState({
            isLoaded: true,
            items: statewise,
            count: count,
            total: total
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


  render() {    
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
     // console.log('All Data',this.state.items);
      return (
        <div>
          {/* <p>{ this.state.count + " States/UT Affected"}</p> */}
          <Datatable
            columns={this.header}
            data={this.state.items}
            defaultSortField="state"
            defaultSortAsc= {false}
            highlightOnHover
            pointerOnHover
            customStyles={this.customStyles}
            onRowDoubleClicked={this.someHandler}
            expandableRows
            expandOnRowClicked
            expandableRowsComponent={<ExpandCaseData statewiseData={this.state.stateitems}/>}
          />
          
        </div>
      );
    }
  }
}
export default Table;