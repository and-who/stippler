import React from "react";
import styled from "styled-components";

interface ContainerProps {
  controlElements: React.ReactNode;
  viewElements: React.ReactNode;
}

const Layout = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ControlArea = styled.div`
  display: flex;
  flex-basis: 200px;
  flex-grow: 1;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-width: 300px;
  overflow: hidden;
`;

const ViewArea = styled.div`
  display: flex;
  flex-basis: 600px;
  flex-grow: 3;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-width: 600px;
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
