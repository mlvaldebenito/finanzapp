import { useState, useRef } from 'react';
import { Button, Dialog, Typography, DialogTitle, DialogContent, Stack, Tooltip } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import InfoIcon from '@mui/icons-material/Info';
import Close from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { UPLOAD_SALES_FILE } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import Input from '@mui/material/Input';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const ImageDialog = () => {
    const [open, setOpen] = useState(false);
    const [uploadFile] = useMutation(UPLOAD_SALES_FILE); // Hook para la mutación
    const fileInputRef = useRef(null);
    const handleIconClick = () => {
        fileInputRef.current.click();
      };
    const handleFileChange = async (event) => {
        const file = event.target.files[0]; // Obtén el archivo seleccionado
        if (!file) return;
    
        try {
          const response = await uploadFile({
            variables: { file },
          });
          console.log('Respuesta del servidor:', response.data.uploadFile);
        } catch (error) {
          console.error('Error subiendo archivo:', error);
        }
      };
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
                <Stack spacing={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Sube una imagen con tu lista de precios y un asistente de IA te guiará a categorizar eventuales pagos</Typography>
                    <Tooltip title="Ejemplo" color='primary'>
                    <InfoIcon onClick={() => {}}/>
                    </Tooltip>
                    </Stack>
                    <Button onClick={handleIconClick} style={{ cursor: 'pointer' }} startIcon={<FileUploadIcon />}>
                    <Input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept="image/jpeg, image/png, image/gif, image/webp"
                        onChange={handleFileChange}
                    />
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default ImageDialog;