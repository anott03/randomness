"use client";

import Plot from 'react-plotly.js';
export default function MyPlot({ bins }: { bins: number[] }) {
    return (
        <Plot data={[{
            x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            y: bins,
            type: "scatter",
            mode: "markers",
        }]}
        config={{ responsive: true }}
        layout={{
            font: { size: 14, color: "#ffffff" },
            colorway : ['#e7a4b6', '#cd7eaf', '#a262a9', '#6f4d96', '#3d3b72', '#182844', '#f3cec9'],
            paper_bgcolor: "#000000",
            plot_bgcolor: "#000000",
        }}
        />
    );
}
