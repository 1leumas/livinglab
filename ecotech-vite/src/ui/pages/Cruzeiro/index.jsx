import { fetchCruzeiroData } from "../../../services/apiServices";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import Chart from "../../components/Chart";

const Cruzeiro = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetchCruzeiroData("lastWeek", "all").then((data) => {
      setData(data.data);
      console.log(data.data);
    });
  }, []);

  if (!data) return <Loading />;

  return (
    <div>
      <Chart data={data} />
    </div>
  );
};

export default Cruzeiro;
