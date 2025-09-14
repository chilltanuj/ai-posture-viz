import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', score: 65, incidents: 12 },
  { month: 'Feb', score: 68, incidents: 8 },
  { month: 'Mar', score: 72, incidents: 6 },
  { month: 'Apr', score: 75, incidents: 4 },
  { month: 'May', score: 78, incidents: 3 },
  { month: 'Jun', score: 82, incidents: 2 },
  { month: 'Jul', score: 85, incidents: 1 },
];

export function TrendChart() {
  return (
    <div className="chart-container">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Security Trend</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Security Score</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-destructive rounded-full"></div>
            <span className="text-muted-foreground">Incidents</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px hsl(215 25% 27% / 0.1)',
            }}
          />
          <Line 
            type="monotone" 
            dataKey="score" 
            stroke="hsl(var(--primary))" 
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
          />
          <Line 
            type="monotone" 
            dataKey="incidents" 
            stroke="hsl(var(--destructive))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5, fill: 'hsl(var(--destructive))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}