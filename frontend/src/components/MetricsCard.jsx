import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const MetricsCard = ({ title, value, icon, color, subtitle }) => {
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: { xs: 1.5, sm: 2 },
        height: '100%',
        minHeight: { xs: '90px', sm: '100px' }, // Reduced from 120px/140px
        transition: 'all 0.3s ease',
        borderRadius: '16px', // Reduced from 24px
        background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        '&:hover': {
          transform: 'translateY(-2px) scale(1.01)', // Reduced scale effect
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.06)', // Reduced shadow
          background: 'linear-gradient(145deg, #ffffff, #ffffff)',
        },
        maxHeight: { xs: '60px', sm: '140px' },
        alignItems: 'center',
      }}
    >
      <Box display="flex" alignItems="center" gap={1.5} height="100%"> {/* Reduced gap */}
        <Box
          sx={{
            backgroundColor: `${color}`,
            borderRadius: '12px', // Reduced from 16px
            p: { xs: 1, sm: 1.5 }, // Reduced padding
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'rotate(5deg)',
              backgroundColor: `${color}25`,
            }
          }}
        >
          {icon && React.isValidElement(icon) ? 
            React.cloneElement(icon, { 
              sx: { 
                color: color, 
                width: { xs: 24, sm: 28 }, // Reduced from 28/32
                height: { xs: 24, sm: 28 } // Reduced from 28/32
              }
            })
            : null
          }
        </Box>
        <Box>
          <Typography 
            variant="body2" 
            sx={{ 
              mb: 0.5,
              color: 'text.secondary',
              fontSize: { xs: '0.75rem', sm: '0.8rem' }, // Reduced font sizes
              letterSpacing: '0.5px'
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              fontSize: { xs: '1rem', sm: '1.15rem' }, // Reduced from 1.1/1.35
              letterSpacing: '-0.5px'
            }}
          >
            {value}
          </Typography>
          {subtitle}
        </Box>
      </Box>
    </Paper>
  );
};

export default MetricsCard;