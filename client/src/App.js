import { useState, useEffect } from "react"
import axios from "axios"

import "./App.css"
import Chart from "./components/Chart"
import Cards from "./components/Cards"
import Modal from "./components/Modal"
import AddButton from "./components/AddButton"

function App() {
    useEffect(() => {
        getData()
    }, [])
    
    const [data, setData] = useState([])
    const [modal, setModal] = useState(false)

    const getData = ()=> {
        return axios
            .get("http://192.168.68.73:3001/", {method: 'get', mode: 'cors'})
            .then( res =>  {
                setData(res.data)
            })
            .catch(err => console.log(err))
    }
    
    return (
        <div className="App">
            <Chart data={data.data} />
            <Cards data={data.cards} />
            <Modal visible={modal} setVisible={setModal} addItem={setData}/>
            <AddButton visible={modal} setVisible={setModal}/>
        </div>
    );
}

export default App;
