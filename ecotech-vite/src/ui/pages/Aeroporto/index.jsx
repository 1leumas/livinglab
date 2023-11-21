import { fetchAeroportoData } from "../../../services/apiServices";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import Chart from "../../components/Chart";
import { Container } from "./styles";

const Aeroporto = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetchAeroportoData("lastWeek", "all").then((data) => {
      setData(data.data);
      //console.log(data.data);
    });
  }, []);

  if (!data) return <Loading />;

  return (
    <Container>
      <Chart data={data} />
    </Container>
  );
};

export default Aeroporto;
