import React from "react";
import { Helmet } from "react-helmet";

const MetaData: React.FC<{ color: string }> = (props) => {
  return (
    <Helmet>
      <meta name="theme-color" content={props.color}></meta>
      <style>
        {`
                    html {
                        background-color: ${props.color};
                    }
                    `}
      </style>
    </Helmet>
  );
};

export default MetaData;
