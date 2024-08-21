import React from 'react';
import {GridComponent,ColumnsDirective,ColumnDirective,Page,Selection,Inject,Edit,Toolbar,Sort,
  Filter} from '@syncfusion/ej2-react-grids';
import {customersData, customersGrid} from '../data/dummy';
import { Modal, Box, Button } from '@mui/material';
import { Header } from '../components';
import { DataGrid } from '@mui/x-data-grid';
import { useState,useEffect } from 'react';
import authAxois from '../requestHandler';
import { BiBorderRadius } from 'react-icons/bi';

const Customers = () => {
    const [rows,setRows]=useState([]);
    const [open, setOpen] = useState(false);
const [selectedRow, setSelectedRow] = useState(null);
const [rowss, setRowss] = useState([]);

//// handle priviladge
const handleEditPrivilege = (row) => {
  // Implement the logic to edit the privilege

  console.log('Editing privilege:',row);
}; 

// handle user click...
const handleShowClick = async(row) => {
  setSelectedRow(row);
  setOpen(true);
 console.log(row.phone)
 authAxois.get(`/user/admin/privilege/${row.phone}`).then((res)=>{
   setRowss(res.data)
 }).catch(e=>e)
 
};


//// users style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid gray',
  boxShadow: 24,
  borderRadius:5,
  p: 4,
};

  ///// fetch admin users
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Admin name', width: 130 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
    },
    {
      field: 'password',
      headerName: 'password',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 190,
      valueGetter: (value, row) => `${row.password || ''} ${row.password || ''}`,
    },

    {
      
        field: 'privilages',
        headerName: 'Privilages',
        width: 150,
        renderCell: (params) => (
          <Button onClick={() => handleShowClick(params.row)}>Show</Button>
        ),
      
    },

  ];


  //// fetch data for the privilege
  
  ///// fetch admin users
  const columnss = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'post', headerName: 'Post News', width: 130 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    {
      field: 'heighlight',
      headerName: 'Post Heighlight',
      width: 150,
    },
    {
      field: 'user',
      headerName: 'Create User',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 190,
      valueGetter: (value, row) => `${row.password || ''} ${row.password || ''}`,
    },

    {
      field: 'user',
      headerName: 'Block User',
      description: 'This column has a value getter and is not isorable.',
      sortable: false,
      width: 190,
      valueGetter: (value, row) => `${row.password || ''} ${row.password || ''}`,
    },

    {
      
        field: 'privilages',
        headerName: 'See User',
        width: 150,
        renderCell: (params) => (
          <Button onClick={() => handleShowClick(params.row)}>Edit</Button>
        ),
      
    },

  ];
  
 /* 
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ]; 
*/

  useEffect(()=>{
    authAxois.get('/admin/user/creation')
    .then((res) => {
      const dataWithId = res.data.data.map((row, index) => ({
        id: index.toString(), // or any other unique identifier
        ...row
      }));
      setRows(dataWithId);
    })
    .catch(e => console.error(e));  
  },[])


  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="Page" title="Admin Users"/>
     {/* 
      <GridComponent dataSource={customersData} allowPaging allowSorting
      toolbar={['Delete']} editSettings={{allowDeleting:true, allowEditing:true}} width="auto">
        <ColumnsDirective>
        {customersGrid.map((item,index)=>(
          <ColumnDirective key={index} {...item}/>
        ))}
        </ColumnsDirective>
        <Inject services={[Page,Toolbar, Selection, Edit, Sort, Filter]}/>
      </GridComponent>
      */}
    
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

    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
       
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rowss}
        columns={columnss}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div> 
      </Box>
    </Modal>

    </div>
  )
}

export default Customers