import React from "react";
import styled from "styled-components";

interface ContainerProps {
  title?: string;
  children: React.ReactNode;
}

const Layout = styled.div<{ $hasTitle?: boolean }>`
  position: relative;
  margin: 5px;
  padding: 15px;
  ${(props) => props.$hasTitle && "padding-top: 15px;"}
  ${(props) => props.$hasTitle && "margin-top: 15px;"}
  border: 2px dotted var(--color);
`;

const TitleBox = styled.div`
  position: absolute;
  top: -10px;
  left: 15px;

  padding-left: 5px;
  padding-right: 5px;

  border: 2px dotted var(--color);
  background-color: var(--bgColor);
`;

const Container: React.FC<ContainerProps> = ({ title, children }) => {
  return (
    <Layout $hasTitle={!!title}>
      {title && <TitleBox>{title}</TitleBox>}
      {children}
    </Layout>
  );
};

export default Container;
