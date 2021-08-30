import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
  

const TransferRatios = ({transferRatios}) => {


  const columns = [
      {
        field: 'Transfer Partner',
        headerName: 'Transfer Partner',
        width: 250,
        editable: true,
      },
      {
        field: 'Min Transfer',
        headerName: 'Min Transfer',
        type: 'number',
        width: 250,
        editable: true,
      },
      {
        field: 'Transfer Ratio',
        headerName: 'Transfer Ratio',
        description: 'From Source to destination.',
        type:"number",
        width: 250
      }
    ];

    return (
    <DataGrid rows={transferRatios}
        columns={columns} 
        // pageSize={1} 
        disableSelectionOnClick 
        style ={{minHeight: "800px"}}
      >      </DataGrid>

    )
}

export default TransferRatios
