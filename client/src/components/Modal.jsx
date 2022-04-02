import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios"
import { useState } from "react"

function Modal({ visible, setVisible, addItem }) {
    const [data, setData] =  useState({ value: "" })

    const handleClick = () => {
        // Handle data
        if (data.value.length > 0){
            axios
                .post("http://192.168.68.73:3001/?weight=" + data.value)
                .then(response => {
                    addItem(response.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        setData({value: ""})
        setVisible(false)
    }

    return (
        <div className={visible? "modal visible": "modal"} style={{ display:  visible? "block":"none"}}>
            <Box
              component="form"
              sx={{
                  p: 3,
                '& > :not(style)': { m: 1, width: 0.96 },
              }}
              noValidate
              autoComplete="off"
            >
            <Typography variant="h5" component="div">Add weight</Typography>
            <TextField id="outlined-basic" label="Weight" variant="outlined" onChange={e => setData({...data, value: e.target.value})}/>
            <Button variant="contained" onClick={() => handleClick()}>Add Item</Button>
            </Box>
        </div>
    );
}

export default Modal
