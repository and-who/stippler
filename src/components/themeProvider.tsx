import React from "react";
import styled from "styled-components";

interface ThemeProviderProps {
  color: string;
  bgColor: string;
  children: React.ReactNode;
}

const Layout = styled.div<{ $color: string; $bgColor: string }>`
  --color: ${(props) => props.$color};
  --bgColor: ${(props) => props.$bgColor};
  color: var(--color);
  background-color: var(--bgColor);
`;

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  color,
  bgColor,
}) => {
  return (
    <Layout $color={color} $bgColor={bgColor}>
      {children}
    </Layout>
  );
};

export default ThemeProvider;
