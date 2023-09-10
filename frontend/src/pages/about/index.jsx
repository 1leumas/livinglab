import React from "react";
import styled from "styled-components";
import Header from "../../components/header";

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const About = () => {
  return (
    <div>
      <Header />
      <AboutContainer>
        <h1>About</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptate, voluptas, quod, qui
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptate, voluptas, quod, quiLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptate, voluptas, quod, quiLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptate, voluptas, quod, quiLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptate, voluptas, quod, quiLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptate, voluptas, quod, quiLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptate, voluptas, quod, quiLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptate, voluptas, quod, quiLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptate, voluptas, quod, qui
        </p>
      </AboutContainer>
    </div>
  );
};

export default About;
