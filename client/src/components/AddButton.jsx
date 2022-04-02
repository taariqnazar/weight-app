function AddButton({ visible, setVisible }){
    return(
        <div className={visible? "add-button visible": "add-button"} onClick={() => setVisible(!visible)}>
            <svg width="75" height="75" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle id="circle" cx="50" cy="50" r="50" fill="#78AC5F"/>
            <line x1="50" y1="25" x2="50" y2="75" stroke="white" strokeWidth="6"/>
            <line x1="75" y1="50" x2="25" y2="50" stroke="white" strokeWidth="6"/>
            </svg>
        </div>
    )
}

export default AddButton 
