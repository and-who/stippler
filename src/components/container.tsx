import React from "react";
import styled from "styled-components";

interface ContainerProps {
  title?: string;
  children: React.ReactNode;
}

const Layout = styled.div`
  margin: 5px;
  padding: 5px;

  border: 1px dotted var(--color);
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
