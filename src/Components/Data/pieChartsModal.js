import * as React from 'react';
import Chart from 'chart.js/auto';
import PieChart from '../Charts/pieChartModal';


export function PieChartsModal({data}) {
   
      return (
        <div>
          <PieChart data={data} />
        </div>
      );
    
};