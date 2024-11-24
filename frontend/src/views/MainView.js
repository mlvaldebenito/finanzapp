import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import TransactionTable from "../components/TransactionTable";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SpeedometerGauge from "../components/speedometerGauge";
import getSpeedometerMessage from "../helpers/speedometerMessages";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_BANK_MOVEMENTS,
  GET_DISTINCT_RUTS_COUNT,
} from "../graphql/queries";
import useGetUser from "../hooks/useGetUser";
import ChatInterface from "../components/chatInterface";
import Stack from "@mui/material/Stack";
import ImageDialog from "../dialog/ImagesDialog";
import { keyframes } from "@mui/system";

const MainView = () => {
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const user = useGetUser();

  const { data } = useQuery(GET_ALL_BANK_MOVEMENTS, {
    variables: {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10), // 30 days ago
      endDate: new Date().toISOString().slice(0, 10), // today
      amountGt: true,
    },
  });

  const { data: distinctRutsData } = useQuery(GET_DISTINCT_RUTS_COUNT, {
    variables: {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10), // 30 days ago
      endDate: new Date().toISOString().slice(0, 10), // today
    },
  });


  const transactions = data?.allBankMovements || [];

  const speedometerMessages = getSpeedometerMessage(
    distinctRutsData?.distinctRutsCount ?? 0
  );

  const slideAnimation = keyframes`
    0%, 25% {
      transform: translateY(0);
      opacity: 1;
    }
    30%, 55% {
      transform: translateY(-33.33%);
      opacity: 1;
    }
    60%, 85% {
      transform: translateY(-66.66%);
      opacity: 1;
    }
    95% {
      transform: translateY(-66.66%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  `;

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
        borderRadius: "24px",
        mx: "auto",
        my: 4,
        maxWidth: "1400px",
        position: "relative",
        zIndex: 1,
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {user === undefined ? (
        <Skeleton height={40} />
      ) : (
        <>
          <Typography
            variant="h3"
            sx={{ color: "#475569", fontWeight: 700, mb: 1 }}
            align="center"
            gutterBottom
          >
            Resumen de ingresos
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "#64748b", mb: 3 }}
            align="center"
            gutterBottom
          >
            {user?.fullName}
          </Typography>

          <Grid container spacing={1} sx={{ padding: 0, margin: 0 }}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                order: { xs: 2, md: 1 },
              }}
            >
              <Box
                sx={{
                  minHeight: "200px",
                  position: "relative",
                  overflow: "hidden",
                  width: "100%",
                  maxWidth: "800px",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    animation: `${slideAnimation} 20s infinite ease-in-out`,
                  }}
                >
                  {speedometerMessages?.messages?.map((message, index) => (
                    <Box
                      key={index}
                      sx={{
                        height: "80px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        my: 12,
                        px: 3,
                      }}
                    >
                      {speedometerMessages?.icon && (
                        <Box
                          component={speedometerMessages.icon}
                          sx={{
                            color: speedometerMessages.color,
                            fontSize: "1.6rem",
                          }}
                        />
                      )}
                      <Typography
                        sx={{
                          color: "#202125",
                          fontSize: { xs: "1.25rem", sm: "1.5rem" },
                          fontWeight: 600,
                          textAlign: "center",
                          lineHeight: 1.5,
                          letterSpacing: "0.01em",
                          textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                          padding: "0.5rem",
                          transition: "all 0.2s ease-in-out",
                        }}
                      >
                        {message}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                order: { xs: 1, md: 2 },
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

      <Box sx={{ my: 4 }}>
        <ChatInterface />
      </Box>
    </Container>
  );
};

export default MainView;
