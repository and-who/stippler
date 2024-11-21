import React from "react";
import { Helmet } from "react-helmet";

const MetaData: React.FC<{ color: string }> = (props) => {
  return (
    <Helmet>
      <meta
        name="description"
        content="Weighted Voronoi Stippling. It stipples."
      ></meta>
      <meta
        name="keywords"
        content="Stippler, Voronoi, Stippling, Weighted Voronoi, Weighted Voronoi Stippling"
      ></meta>
      <script type="application/ld+json">
        {`
                    {
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "url": "https://stippler.wolfandreas.com/",
                        "name": "Stippler",
                        "image": "https://stippler.wolfandreas.com/public/screenshot.png",
                        "abstract": "Weighted Voronoi Stippling. It stipples."
                    }
                `}
      </script>
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
