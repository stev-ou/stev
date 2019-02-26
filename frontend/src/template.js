// This will contain the components for the header and footer

import './App.css';

const Header = props => (
  <div>
    <LineChart
      width={800}
      height={400}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="Sam"
        stroke="#8884d8"
        strokeWidth={3}
        activeDot={{ r: 6 }}
      />
      <Line type="monotone" dataKey="Janet" stroke="#82ca9d" />
      <Line type="monotone" dataKey="Joe" stroke="#868788" />
    </LineChart>
    <h1> Sam has been playing with this </h1>
  </div>
);
