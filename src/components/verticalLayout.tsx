import React from "react";
import styled from "styled-components";

interface VerticalLayoutProps {
  children: React.ReactNode;
}

const Layout = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;

  > * {
    flex-grow: 1;
    background-color: teal;
  }
  > *:first-child {
    flex-grow: 0;
    background-color: beige;
  }
  > *:last-child {
    flex-grow: 0;
    background-color: darkkhaki;
  }
`;

const VerticalLayout: React.FC<VerticalLayoutProps> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default VerticalLayout;
