import { useState } from 'react';
import { Button, Dialog, Typography, DialogTitle, DialogContent } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import InfoIcon from '@mui/icons-material/Info';
import Close from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const ImageDialog = () => {
    const [open, setOpen] = useState(false);
    console.log('aca');
    return (
        <>
        <Button
          variant="contained"
          startIcon={<PhotoCameraIcon />}
          onClick={() => setOpen(true)}
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
          Sube una Foto de tu lista de Precios
          <InfoIcon onClick={() => {}}/>
        </Button>
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle
                component="div"
                sx={{
                borderRadius: '4px 4px 0 0',
                bgcolor: 'primary.main',
                py: 3,
                }}
            >
                <Typography color="white" align="center" variant="h6">Sube tus imágenes</Typography>
                <IconButton
                aria-label="close"
                onClick={() => setOpen(false)}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                }}
                color="fingoWhite"
                >
                <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ mt: 2, px: 6 }}>
                <Typography>asfas</Typography>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default ImageDialog;