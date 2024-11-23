import React, { useState } from 'react';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { mockTransactions } from '../data/mockData.ts';
import TransactionTable from '../components/TransactionTable';
import MetricsCard from '../components/MetricsCard';
import ReceiptIcon from '@mui/icons-material/Receipt';


const MainView = () => {
  const [selectedTransactions, setSelectedTransactions] = useState([]);

  // Calculate metrics
  const totalTransactions = mockTransactions.length;
  const totalAmount = mockTransactions.reduce((sum, t) => sum + t.amount, 0);
  const avgTicketProbability = mockTransactions.reduce((sum, t) => sum + t.ticketProbability, 0) / totalTransactions;

  // Add handler function
  const handleSendSelected = () => {
    if (selectedTransactions.length === 0) {
      alert('Please select transactions to send');
      return;
    }
    // TODO: Implement actual sending logic
    console.log('Sending transactions:', selectedTransactions);
  };

  return (
    <Container maxWidth="xl" sx={{ 
      py: 4, 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      backgroundColor: '#f1f5f9',
    }}>
      <Grid 
        container 
        spacing={3}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 2, sm: 3 },
          mb: 4,
          borderRadius: '16px',
          background: 'linear-gradient(145deg, #2196f3, #f8fafc)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
          backdropFilter: 'blur(8px)',
          width: '100%',
          margin: 0,
          '& .MuiGrid-item': {
            pt: { xs: '2', md: '0 !important' }
          },
        }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <MetricsCard
            title="Transacciones último mes"
            value={totalTransactions}
            color="#2196f3"
            subtitle={<Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* TODO: Add logic to calculate remaining transactions to be taxed COUNTING DIFFERENT ACCOUNT AMOUNTS */}
              <Typography variant="caption" sx={{ color: '#10b981', fontSize: '0.7rem', fontWeight: 600 }}>Estas a {50 -totalTransactions} transacciones de ser tributado.</Typography>
            </Box>}
          />
        </Grid>
        {/* TODO: Remover el monto total o complementarlo con el IVA. */}
        <Grid item xs={12} sm={6} md={4}>
          <MetricsCard
            title="Total Facturado"
            value={new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(totalAmount)}
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MetricsCard
            title="Avg. Ticket Probability"
            value={`${(avgTicketProbability * 100).toFixed(1)}%`}
            color="#ff9800"
          />
        </Grid>
      </Grid>
            {/* Add Button below the table */}
      <Box sx={{ my: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendSelected}
          disabled={selectedTransactions.length === 0}
          startIcon={<ReceiptIcon />}
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: '0.875rem',
            textTransform: 'none',
            padding: '8px 24px',
            borderRadius: '8px',
            letterSpacing: '0.01em'
          }}
        >
          Emitir Boelta ({selectedTransactions.length})
        </Button>
      </Box>
      <Paper
        elevation={0}
        sx={{
          // height: '100%',
          width: '100%',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '4px',
        }}
      >
        <TransactionTable
          transactions={mockTransactions}
          onSelectionChange={setSelectedTransactions}
        />
      </Paper>
    </Container>
  );
};

export default MainView;
