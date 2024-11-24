import React, { useState } from 'react';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import TransactionTable from '../components/TransactionTable';
import MetricsCard from '../components/MetricsCard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SpeedometerGauge from '../components/speedometerGauge';
import WarningIcon from '@mui/icons-material/Warning';
import getSpeedometerMessage from '../helpers/speedometerMessages';
import { useQuery } from '@apollo/client';
import { GET_ALL_BANK_MOVEMENTS, GET_DISTINCT_RUTS_COUNT } from '../graphql/queries';
import TermometerLoader from '../components/termometerLoader';
import LogoutButton from '../components/LogoutButton';
import useGetUser from '../hooks/useGetUser';
import { useNavigate } from 'react-router-dom';
import Stack from "@mui/material/Stack";


const MainView = () => {
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const user = useGetUser()
  const navigate = useNavigate();

  // Query for all bank movements
  const { data, loading: allBankMovementsLoading } = useQuery(GET_ALL_BANK_MOVEMENTS, {
    variables: {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10), // 30 days ago
      endDate: new Date().toISOString().slice(0, 10) // today
    }
  });

  const { data: distinctRutsData } = useQuery(GET_DISTINCT_RUTS_COUNT, {
    variables: {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10), // 30 days ago
      endDate: new Date().toISOString().slice(0, 10) // today
    }
  });

  const { data: sixMonthsDistinctRuts } = useQuery(GET_DISTINCT_RUTS_COUNT, {
    variables: {
      startDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10), // 6 months ago
      endDate: new Date().toISOString().slice(0, 10) // today
    }
  });
  if (!user?.hasBankCredentials) return navigate('/register-credentials');


  console.log("DISTINCT RUTS DATA: ", distinctRutsData);
  console.log("SIX MONTHS DISTINCT RUTS DATA: ", sixMonthsDistinctRuts);
  const transactions = data?.allBankMovements || [];
  const incomeTransactions = transactions.filter((mov) => mov.amount > 0);

  // Calculate metrics
  const totalTransactions = transactions?.length || "";
  const totalAmount = transactions?.length
    ? transactions?.reduce((sum, t) => sum + t.amount, 0)
    : 0;
  const avgTicketProbability = transactions?.length
    ? transactions.reduce((sum, t) => sum + (t.ticketProbability || 0), 0) /
      totalTransactions
    : 0;

  const speedometerMessage = getSpeedometerMessage(
    incomeTransactions?.length ?? 0
  );

  // Add handler function
  const handleSendSelected = () => {
    if (!selectedTransactions?.length) {
      alert("Please select transactions to send");
      return;
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        boxShadow:
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        borderRadius: "16px",
        mx: "auto",
        my: 4,
        maxWidth: "1400px",
        position: "relative",
        zIndex: 1,
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Stack direction="row">
        <Typography variant="h1">
          Hola! Este es un resumen que tenemos para ti
        </Typography>
        <LogoutButton />
      </Stack>
      <Box
          sx={{
            maxWidth: '4xl',
            mx: 'auto',
            bgcolor: '#ffffff', //f1f5f9
            borderRadius: '16px',
            p: 4,
            pt: 0,
            backdropFilter: 'blur(16px)',
            border: '0px solid',
            borderColor: 'grey.800',
          }}
        >
          <SpeedometerGauge value={distinctRutsData?.distinctRutsCount ?? 0} maxValue={50} />
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#475569',
                fontSize: '1.125rem'  
              }}
            >
              {/* TODO: Add logic for calculating transactions when queries are ready */}
              Ingresos de transferencias de personas distintas: {distinctRutsData?.distinctRutsCount ?? 0}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <WarningIcon sx={{ color: speedometerMessage.color, fontSize: '2rem' }} />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: speedometerMessage.color,
                  fontSize: '2.25rem'
                }}
              >
                {speedometerMessage.message}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              color: speedometerMessage.color,
              mt: 1,
            }}
          >
            {speedometerMessage.subMessage}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ my: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendSelected}
          disabled={!selectedTransactions?.length}
          startIcon={<ReceiptIcon />}
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: "0.875rem",
            textTransform: "none",
            padding: "8px 24px",
            borderRadius: "8px",
            letterSpacing: "0.01em",
          }}
        >
          Emitir Boleta ({selectedTransactions?.length || ""})
        </Button>
      </Box>
      <Paper
        elevation={0}
        sx={{
          // height: '100%',
          width: "100%",
          overflow: "hidden",
          background: "linear-gradient(145deg, #ffffff, #f8fafc)",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          borderRadius: "4px",
        }}
      >{!allBankMovementsLoading ? (        
        <TransactionTable
          transactions={transactions}
          onSelectionChange={setSelectedTransactions}
          />
        ) : (
          <TermometerLoader />
        )
      }
      </Paper>
      <Grid
        container
        spacing={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 2, sm: 3 },
          mb: 4,
          borderRadius: "16px",
          background: "linear-gradient(145deg, #3b82f6, #f8fafc)",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04)",
          backdropFilter: "blur(8px)",
          width: "100%",
          margin: 0,
          "& .MuiGrid-item": {
            pt: { xs: "2", md: "0 !important" },
          },
        }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <MetricsCard
            title="Transacciones último mes"
            value={totalTransactions}
            color="#3b82f6"
            subtitle={<Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="caption" sx={{ color: '#10b981', fontSize: '0.7rem', fontWeight: 600 }}>
                Estas a {50 - distinctRutsData?.getDistinctRutsCount} transacciones de ser tributado.
              </Typography>
            </Box>}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <MetricsCard
            title="Total Facturado"
            value={new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
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
    </Container>
  );
};

export default MainView;
