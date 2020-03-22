import { base } from "@theme-ui/presets";
import nightOwl from "@theme-ui/prism/presets/night-owl.json";

const theme = {
  ...base,
  fonts: {
    ...base.fonts,
    body: `Muli, ${base.fonts.body}`,
    heading: `Muli, ${base.fonts.body}`,
    decoration: `"Permanent Marker", Muli, ${base.fonts.body}`,
    monospace: `"Source Code Pro", ${base.fonts.monospace}`,
  },
  fontWeights: {
    ...base.fontWeights,
    heading: 500,
  },
  colors: {
    ...base.colors,
    text: "#073438",
    background: "#FFFFFA",
    primary: "#5DD9C1",
    secondary: "#247B7B",
    highlight: "#FFDEDB",
    muted: "#DFF2D8",
    gray: "#DFF2D8",
    backgroundGradient: "linear-gradient(90deg, #5dd9c1 0%, #fbbebe 100%)",
    modes: {
      dark: {
        text: "#DAF5F5",
        background: "#0B132B",
        secondary: "#7BB6BA",
        backgroundGradient: "linear-gradient(90deg, #006087 0%, #FF6584 100%)",
      },
    },
  },
  styles: {
    ...base.styles,
    code: {
      ...nightOwl,
    },
  },
  breakpoints: ["768px"],
  useBorderBox: true,
};

// console.log(base);
// console.log(theme);

export default theme;
