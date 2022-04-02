import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

function Chart({data}) {

    return (
        <div className="ChartContainer" >
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="5 5" />
                    <YAxis hide type="number" domain={[95, 115]}/>
                    <XAxis dataKey="date" />
                    <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}


export default Chart
