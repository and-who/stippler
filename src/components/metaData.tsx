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
      <meta
        property="og:title"
        content="Stippler - Weighted Voronoi Stippling"
      />
      <meta
        property="og:description"
        content="Weighted Voronoi Stippling. It stipples."
      />
      <meta
        property="og:image"
        content="https://stippler.wolfandreas.com/screenshot.png"
      />
      <script type="application/ld+json">
        {`
                    {
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "url": "https://stippler.wolfandreas.com/",
                        "name": "Stippler",
                        "image": "https://stippler.wolfandreas.com/screenshot.png",
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
