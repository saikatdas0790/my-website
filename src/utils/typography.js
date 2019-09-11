import Typography from "typography";
import "typeface-muli";
import "typeface-permanent-marker";

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.5,
  headerFontFamily: [
    "Permanent Marker",
    "Helvetica Neue",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif"
  ],
  bodyFontFamily: ["Muli", "sans-serif"]
});

export default typography;
