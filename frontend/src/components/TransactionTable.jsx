import React from 'react';
import {
  DataGrid,
} from '@mui/x-data-grid';
import { Typography } from '@mui/material';

const TransactionTable = ({
  transactions,
  onSelectionChange,
}) => {
  const mobileColumns = [
    { 
      field: 'observation', 
      headerName: 'Descripción', 
      width: 100,
      flex: 1
    },
    {
      field: 'amount',
      headerName: 'Monto',
      width: 100,
      renderCell: ({row}) => {
        const formatted = Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'CLP',
        }).format(row.amount);
        return <Typography sx={{color: (row.amount < 0 ? 'red': 'green')}}>{formatted}</Typography>
      },
    },
  ];

  const columns = window.innerWidth <= 600 ? mobileColumns : [
    { 
      field: 'accountingDate', 
      headerName: 'Fecha', 
      width: 120,
    },
    { 
      field: 'observation', 
      headerName: 'Descripción', 
      width: 300,
      flex: 1
    },
  {

    field: 'amount',
    headerName: 'Monto',
    width: 130,
    renderCell: ({row}) => {
      const formatted = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'CLP',
      }).format(row.amount);
      return <Typography sx={{color: (row.amount< 0 ? 'red': 'green')}}>{formatted}</Typography>
    },
  },
    // { 
    //   field: 'category', 
    //   headerName: 'Categoría', 
    //   width: 130 
    // },
    {
      field: 'ticketProbability',
      headerName: 'Score',
      width: 120,
      renderCell: (params) => {
        const value = params.value ?? Math.random();
        return (
          <Typography
            variant="body2"
            sx={{
              color: value >= 0.7 ? '#f43f5e' : '#10b981',
              fontWeight: 600
            }}
          >
            {`${(value * 100).toFixed(0)}%`}
          </Typography>
        );
      },
    },
  ];

  return (
    <DataGrid
      rows={transactions}
      columns={columns}
      checkboxSelection
      disableRowSelectionOnClick
      onRowSelectionModelChange={(ids) => {
        const selectedTransactions = transactions?.filter((t) =>
          ids.includes(t.id)
        )
        onSelectionChange(selectedTransactions);
      }}
      isRowSelectable={({row}) => {return (row.amount > 0)}}
      initialState={{
        pagination: { paginationModel: { pageSize: 5 } },
        sorting: {
          sortModel: [{ field: 'accountingDate', sort: 'desc' }],
        },
      }}
      pageSizeOptions={[5, 10, 50, 100]}
      sx={{
        height: 'auto',
        mb: 'none',
        border: 'none',
        '& .MuiDataGrid-root': {
          fontFamily: "'Inter', sans-serif",
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: '#f8fafc',
          fontSize: '0.875rem',
          fontWeight: 600,
          color: '#475569',
        },
        '& .MuiDataGrid-cell': {
          fontSize: '0.875rem',
          padding: '12px 16px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          color: '#1e293b',
          letterSpacing: '0.01em',
          display: 'flex',
          alignItems: 'center',
        },
        '& .MuiDataGrid-cell:focus': {
          outline: 'none',
        },
        '& .MuiDataGrid-row': {
          '&:nth-of-type(odd)': {
            backgroundColor: '#fafafa',
          },
          '&:hover': {
            backgroundColor: '#f1f5f9',
            transition: 'background-color 0.2s ease',
          },
        },
        '& .MuiCheckbox-root': {
          color: '#94a3b8',
          '&.Mui-checked': {
            color: '#3b82f6',
          },
        },
        '& .MuiDataGrid-columnHeader:focus': {
          outline: 'none',
        },
        '& .MuiTablePagination-root': {
          fontSize: '0.875rem',
        },
      }}
    />
  );
};

export default TransactionTable;