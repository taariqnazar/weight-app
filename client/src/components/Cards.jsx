function Cards({ data }) {

    return (
        <div className="Cards">
            {data? 
            data.map( c => (
                <Card key={c.id} value={c.value} description={c.description}/>
            )): null}
        </div>
    );
}


function Card({ value, description }) {
    return (
        <div className="Card">
            <h2> {value} Kg</h2>
            {description}
        </div>
    );
}
export default Cards
