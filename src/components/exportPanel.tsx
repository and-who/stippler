import React from "react";
import styled from "styled-components";
import Container from "./container";

const Layout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const ExportPanel: React.FC = () => {
  return (
    <Container title="Export">
      <Layout>
        <h1>Stippler</h1>
        <p>
          Stippler is a tool that converts images to dots. It uses a genetic
          algorithm to find the best positions for the dots.
        </p>
      </Layout>
    </Container>
  );
};

export default ExportPanel;
