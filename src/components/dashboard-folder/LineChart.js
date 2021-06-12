import React,{useEffect,useState} from 'react';
import {Line} from 'react-chartjs-2';
import { connect } from 'react-redux';
import { getDataChart } from '../../actions/okrActions';


const LineChart = ({krs,dispatch,progressData,okrId}) => {

  let montArrayEnd = [];
  let montArrayStart = [];
  let montDif = [];
  let porcentDif = [];
  let basicPorcentage = [];
  const [dataLineChart, setDataLineChart] = useState([]);
  let c = 0;
  useEffect(() => {
    setDataLineChart(progressData.actualPercentage);
   dispatch(getDataChart(okrId)); 
  }, []);

  const progressSort = dataLineChart.sort();
  console.log(progressSort);

  krs.map((el) => {
    let parcialDate = el.startDate;
    montArrayStart.push(new Date(parcialDate));
  })

  krs.map((el) => {
    let parcialDate = el.endDate;

  
    montArrayEnd.push(new Date(parcialDate));
  })

  let minMontStart = new Date(Math.min.apply(null, montArrayStart));
  let maxMontEnd = new Date(Math.max.apply(null, montArrayEnd));
  let dif;
  if(maxMontEnd.getFullYear() > minMontStart.getFullYear()){
    dif = ((maxMontEnd.getFullYear() - minMontStart.getFullYear()) * 12) - minMontStart.getMonth();
  }else{
    dif = maxMontEnd.getMonth() - minMontStart.getMonth();
  }


  
  
  let numberOfPorcentage = 100 / dif;

  for (var i = 0; i <= dif; i++) {
    montDif.push("mes " + i);
  }

  for (var i = 0; i <= dif; i++) {
    i === 0 ? porcentDif.push(100) : porcentDif.push(Math.abs(porcentDif[i - 1] - numberOfPorcentage));
  }

  
    for(var i = -1; i < dataLineChart.length; i++ ){
      i === -1 ? basicPorcentage.push(100) :  basicPorcentage.push(Math.abs(100 - progressSort[i])); 
  }  

  
  

  return (
    <div id="bar-chart">
      <Line
        data={{
          labels: montDif,
          datasets: [
            {
              label: "% Progreso Ideal ",
              data: porcentDif,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
              yAxisID: "y-axis-1",
            },
            {
              label: "% Progreso",
              data: basicPorcentage,
              backgroundColor: "rgb(54, 162, 235)",
              borderColor: "rgba(54, 162, 235, 0.2)",
              yAxisID: "y-axis-1",
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  progressData: state.okr.DataProgressChart,
});

export default connect(mapStateToProps)(LineChart);

