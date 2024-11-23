import React from 'react';
import {
  DataGrid,
} from '@mui/x-data-grid';
import { Typography } from '@mui/material';

const TransactionTable = ({
  transactions,
  onSelectionChange,
}) => {
  const columns = [
    { 
      field: 'date', 
      headerName: 'Date', 
      width: 120,
      valueFormatter: (params) => {
        return new Date(params).toLocaleDateString();
      }
    },
    { 
      field: 'description', 
      headerName: 'Description', 
      width: 300,
      flex: 1
    },
  {

    field: 'amount',
    headerName: 'Amount',
    width: 130,
    valueFormatter: (params) => {
      if (params == null) return '-';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(params);
    },
  },
    { 
      field: 'category', 
      headerName: 'Category', 
      width: 130 
    },
    {
      field: 'ticketProbability',
      headerName: 'Risk Score',
      width: 120,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            color: params.value >= 0.7 ? '#f43f5e' : '#10b981',
            fontWeight: 600
          }}
        >
          {`${(params.value * 100).toFixed(0)}%`}
        </Typography>
      ),
    },
  ];

  return (
    <DataGrid
      rows={transactions}
      columns={columns}
      checkboxSelection
      disableRowSelectionOnClick
      onRowSelectionModelChange={(ids) => {
        const selectedTransactions = transactions.filter((t) =>
          ids.includes(t.id)
        );
        onSelectionChange(selectedTransactions);
      }}
      initialState={{
        pagination: { paginationModel: { pageSize: 5 } },
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