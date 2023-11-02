import styled from "styled-components";

export const ChartContainer = styled.div`
  width: 100%; // Use 100% instead of a fixed width
  max-width: 950px; // Max-width ensures it doesn't exceed this value
  height: 350px;
  margin: 6rem auto; // Center the chart

  @media (max-width: 1000px) {
    max-width: 85%;
    margin: 3rem auto; // Reduce top margin on smaller screens
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center; // This will center the children horizontally
  width: 100%;
  min-height: 100%; // Use min-height to ensure it covers at least the viewport height
  padding: 0;
  margin: 0;
  box-sizing: border-box; // Include padding and border in the element's total width and height
`;

export const DropdownContainer = styled.div`
  width: 100%; // Ensure the container fits within the viewport width
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 0 1rem; // Add padding to prevent content from touching the edges
  box-sizing: border-box;
  margin-top: 2rem;
`;

export const CardContainer = styled.div`
  width: 50%; // Ensure the container fits within the viewport width
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap; // Allow the cards to wrap on smaller screens
  padding: 0 1rem; // Add padding to prevent content from touching the edges
  box-sizing: border-box;
  margin-top: 1.5rem;

  @media (max-width: 1000px) {
    width: 100%;
    margin: 3rem auto; // Reduce top margin on smaller screens
  }
`;

export const StationTitle = styled.h1`
  font-size: 2.5rem; /* Example font size */
  color: #333; /* Dark grey text color */
  text-align: center; /* Center the title */
  margin-top: 2rem; /* Space at the top */
  margin-bottom: 1rem; /* Space at the bottom */
  font-weight: bold; /* Make the font bold */
`;