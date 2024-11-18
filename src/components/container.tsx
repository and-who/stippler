import React from "react";
import styled from "styled-components";

interface ContainerProps {
  title?: string;
  children: React.ReactNode;
}

const Layout = styled.div`
  height: 100%;
  width: 100%;
`;

const Container: React.FC<ContainerProps> = ({ title, children }) => {
  return (
    <Layout>
      {title && <h1>{title}</h1>}
      {children}
    </Layout>
  );
};

export default Container;
