import React, { useState } from 'react';
import { Box, Button, Container, Grid, Paper, Skeleton, Typography } from '@mui/material';
import TransactionTable from '../components/TransactionTable';
import MetricsCard from '../components/MetricsCard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SpeedometerGauge from '../components/speedometerGauge';
import getSpeedometerMessage from '../helpers/speedometerMessages';
import { useQuery } from '@apollo/client';
import { GET_ALL_BANK_MOVEMENTS, GET_DISTINCT_RUTS_COUNT } from '../graphql/queries';
import LogoutButton from '../components/LogoutButton';
import useGetUser from '../hooks/useGetUser';
import ChatInterface from '../components/chatInterface';
import Stack from '@mui/material/Stack';
import ImageDialog from '../dialog/ImagesDialog';

const MainView = () => {
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const user = useGetUser();

  // Query for all bank movements
  const { data } = useQuery(GET_ALL_BANK_MOVEMENTS, {
    variables: {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10), // 30 days ago
      endDate: new Date().toISOString().slice(0, 10) // today
    }
  });

  const { data: distinctRutsData } = useQuery(GET_DISTINCT_RUTS_COUNT, {
    variables: {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10), // 30 days ago
      endDate: new Date().toISOString().slice(0, 10), // today
    },
  });

  const { data: sixMonthsDistinctRuts } = useQuery(GET_DISTINCT_RUTS_COUNT, {
    variables: {
      startDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10), // 6 months ago
      endDate: new Date().toISOString().slice(0, 10), // today
    },
  });

  const transactions = data?.allBankMovements || [];

  // Calculate metrics
  const totalTransactions = transactions?.length || 0;
  const totalAmount = transactions?.reduce((sum, t) => sum + t.amount, 0) || 0;
  const avgTicketProbability =
    transactions.length > 0
      ? transactions.reduce((sum, t) => sum + (t.ticketProbability || 0), 0) /
        transactions.length
      : 0;

  const speedometerMessages = getSpeedometerMessage(
    distinctRutsData?.distinctRutsCount ?? 0
  );
  console.log(sixMonthsDistinctRuts);

  // Add handler function
  const handleSendSelected = () => {
    if (!selectedTransactions.length) {
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
      <LogoutButton />
      {user === undefined ? (
        <Skeleton height={40} />
      ) : (
        <>
          <Typography variant="h5" fontSize="1.6rem" align="center" gutterBottom sx={{
            mb: 2
          }}>
            Resumen de ingresos de {user?.fullName}
          </Typography>

          <Grid container spacing={1} sx={{ padding: 0, margin: 0 }}>
          <Grid item xs={12} md={6} sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
          }}>
              <Stack spacing={4}>
                {speedometerMessages?.messages.map((message, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    textAlign="start"
                    spacing={1}
                  >
                    {speedometerMessages && (
                      <speedometerMessages.icon
                        sx={{
                          color: speedometerMessages.color,
                          fontSize: "1.4rem",
                          mb: 1,
                        }}
                      />
                    )}
                    <Typography
                      sx={{
                        color: speedometerMessages.color,
                        fontSize: "1.4rem",
                      }}
                    >
                      {speedometerMessages.messages[index]}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box textAlign="center">
                <SpeedometerGauge
                  value={distinctRutsData?.distinctRutsCount ?? 0}
                  maxValue={50}
                />
                <Typography
                  variant="h6"
                  sx={{ color: "#475569", fontSize: "1.125rem", mt: 2 }}
                >
                  Ingresos de transferencias de personas distintas:{" "}
                  {distinctRutsData?.distinctRutsCount ?? 0}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </>
      )}

      <Box sx={{ my: 2, display: "flex", justifyContent: "flex-end" }}>
        <Stack direction="row" spacing={1}>
        <ImageDialog />
        <Button
          variant="contained"
          onClick={handleSendSelected}
          disabled={!selectedTransactions.length}
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
        </Stack>
      </Box>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          overflow: "hidden",
          background: "linear-gradient(145deg, #ffffff, #f8fafc)",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          borderRadius: "4px",
        }}
      >       
        <TransactionTable
          transactions={transactions}
          onSelectionChange={setSelectedTransactions}
          />
      </Paper>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <MetricsCard
            title="Transacciones último mes"
            value={totalTransactions}
            color="#3b82f6"
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

      <Box sx={{ my: 4 }}>
        <ChatInterface />
      </Box>
    </Container>
  );
};

export default MainView;
