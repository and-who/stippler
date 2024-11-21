import React from "react";
import styled from "styled-components";

interface ContainerProps {
  controlElements: React.ReactNode;
  viewElements: React.ReactNode;
}

const Layout = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: row;
  flex-wrap: wrap;

  @media (max-width: 1000px) {
    flex-direction: column-reverse;
  }
`;

const ControlArea = styled.div`
  display: flex;
  flex-basis: 200px;
  flex-grow: 1;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  min-width: 300px;
  overflow: hidden;
  overflow-y: auto;

  @media (max-width: 1000px) {
    flex-basis: initial;
    height: auto;
  }
`;

const ViewArea = styled.div`
  display: flex;
  flex-basis: 600px;
  flex-grow: 3;
  flex-direction: column;
  max-height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const Container: React.FC<ContainerProps> = ({
  controlElements,
  viewElements,
}) => {
  return (
    <Layout>
      <ControlArea>{controlElements}</ControlArea>
      <ViewArea>{viewElements}</ViewArea>
    </Layout>
  );
};

export default Container;
