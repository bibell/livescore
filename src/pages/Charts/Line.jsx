import React from 'react';
import { Header,LineChart } from '../../components';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';


const Line = () => {

 const [rows,setRows]=useState([])

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'User Name', width: 130 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    {
      field: 'Clube',
      headerName: 'following Clube',
      width: 150,
    },
    {
      field: 'date',
      headerName: 'Date',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 190,
      valueGetter: (value, row) => `${row.password || ''} ${row.password || ''}`,
    },

    {
      
        field: 'time',
        headerName: 'Time',
        width: 150,
        renderCell: (params) => (
          <Button onClick={() => handleShowClick(params.row)}>Show</Button>
        ),
      
    },

  ];



  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="Chart" title="Users Followers"/>
      <div className='w-full'>
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      </div> 
      </div>
    </div>
  )
}

export default Line