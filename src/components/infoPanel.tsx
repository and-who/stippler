import React from "react";
import styled from "styled-components";
import Container from "./container";

const Layout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const InfoPanel: React.FC = () => {
  return (
    <Container>
      <Layout>
        <h1>Stippler</h1>
        <p>It stipples.</p>
        <p>
          <a href="https://github.com/and-who">
            <i>Author: Andreas Wolf</i>
          </a>
        </p>
      </Layout>
    </Container>
  );
};

export default InfoPanel;
