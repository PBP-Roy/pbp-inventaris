import { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { useParams, Link } from "react-router-dom";
import DataVisual from "../components/DataVisual";
import { useStateContext } from "../contexts/ContextProvider";
import "./Report.css";

export default function Report() {
  const { param } = useParams();
  const { logs, items } = useStateContext();
  const totalProduct = useMemo(() => {
    if (param == 'in') {
      return logs.filter(log => log.statuses_id == 1).length;
    } else {
      return logs.filter(log => log.statuses_id == 2).length;
    }
  }, [param]);
  const viableProduct = useMemo(() => {
    return items.reduce((acc, item) => {
      return acc += item.eligible_items;
    }, 0);
  }, [items]);
  const nonViableProduct = useMemo(() => {
    return items.reduce((acc, item) => {
      return acc += item.defective_items;
    }, 0);
  }, [items]);
  const chartData = useMemo(() => {
    const filteredLogs = logs.filter(log => param == 'in' ? log.statuses_id == 1 : log.statuses_id == 2);
    const labels = filteredLogs.map(log => new Date(log.created_at).toLocaleDateString());
    const eligibleProducts = filteredLogs.map(log => log.eligible_log_items);
    const defectiveProducts = filteredLogs.map(log => log.defectives_log_items);

    return {
      labels,
      datasets: [
        {
          label: "Eligible Products",
          data: eligibleProducts,
          borderColor: "#4F86F9",
          backgroundColor: "rgba(79, 134, 249, 0.2)",
          tension: 0.4,
          pointBackgroundColor: "#4F86F9",
          pointBorderColor: "#fff",
          pointHoverRadius: 8,
          pointRadius: 6,
        },
        {
          label: "Defective Products",
          data: defectiveProducts,
          borderColor: "#ff2525",
          backgroundColor: "rgba(229, 184, 160, 0.2)",
          tension: 0,
          pointBackgroundColor: "#ff2525",
          pointBorderColor: "#fff",
          pointHoverRadius: 8,
          pointRadius: 6,
        },
      ],
    };
  }, [param, logs]);

  return (
    <>
      {/* button header product inventory */}
      <div className="header">
        <div className="headerCategori">
          <Link to={'/reports/in'} className={`categoriProducts ${param == 'in' ? 'active' : ''}`}>
            <span>Product-in</span>
          </Link>
          <Link to={'/reports/out'} className={`categoriProducts ${param == 'out' ? 'active' : ''}`}>
            <span>Product-out</span>
          </Link>
        </div>
      </div>
      {/*End header */}

      {/* Start overview */}
      <div className="overview-container">
        <div className="overview-title">
          <h1>Overview</h1>
        </div>
        <div className="overview-data">
          <div className="overview-info">
            <div className="quantity-overview">{totalProduct}</div>
            <div className="title-overview">Total {param == 'in' ? 'Products-in' : 'Products-out'}</div>
          </div>
          <div className="vertical-divider"></div>
          <div className="overview-info">
            <div className="quantity-overview">{viableProduct}</div>
            <div className="title-overview">Total Viable Products</div>
          </div>
          <div className="vertical-divider"></div>
          <div className="overview-info">
            <div className="quantity-overview">{nonViableProduct}</div>
            <div className="title-overview">Total Non-viable Products</div>
          </div>
        </div>
      </div>
      {/* End overview */}

      {/* Data Visualisasi */}
      <div className="data-visual-container">
        <h1>Data Visualization</h1>
        <div className="chart">
          <DataVisual chartData={chartData} />
        </div>
      </div>
      {/* End Data Visualisasi */}
    </>
  );
}
