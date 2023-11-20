import { LoadingContainer, LoadingText, Spinner } from "./styles";

const Loading = () => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>Fetching Data</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;
