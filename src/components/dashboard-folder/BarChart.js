import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from "react-redux";
import { getDataChart } from "../../actions/okrActions";

const BarChart = ({ krs, dispatch, progressData, okrId }) => {
  let montArrayEnd = [];
  let montArrayStart = [];
  let montDif = [];
  let porcentDif = [];

  useEffect(() => {
    dispatch(getDataChart(okrId));
  }, []);
  const progressSort = progressData.actualPercentage.sort();


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
  let dif = maxMontEnd.getMonth() - minMontStart.getMonth();

  for (var i = 1; i <= dif; i++) {
    montDif.push("mes " + i);
  }

  for (var i = 0; i < progressSort.length; i++) {
    porcentDif.push(Math.abs(0 + progressSort[i]));
  }

  return (
    <div id="bar-chart">
      <Bar
        data={{
          labels: montDif,
          datasets: [
            {
              label: "Progreso mensual",
              data: porcentDif,
              backgroundColor:
                "rgb(75, 73, 73)"
              ,
              borderColor: [
                "rgb(75, 73, 73)"
              ],
              borderWidth: 1,
            }
          ],
        }}
        height={400}
        width={600}
        options={{
          scales: {
            y:
            {
              suggestedMin: 0,
              suggestedMax: 100
            }

          }
        }}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  progressData: state.okr.DataProgressChart,
});

export default connect(mapStateToProps)(BarChart);