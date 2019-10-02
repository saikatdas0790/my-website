import Typography from "typography";
<<<<<<< HEAD
import "typeface-muli";
import "typeface-permanent-marker";
=======
>>>>>>> development
import CodePlugin from "typography-plugin-code";

const theme = {
  baseFontSize: "16px",
  baseLineHeight: 1.5,
  headerFontFamily: ["Permanent Marker", "serif"],
  bodyFontFamily: [
    "Muli",
    "Helvetica Neue",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif"
  ],
  headerWeight: "normal",
  blockMarginBottom: 0
};

theme.plugins = [new CodePlugin()];

theme.overrideStyles = ({ adjustFontSizeTo, rhythm }, options, styles) => ({
  ul: {
    margin: 0
  },
  p: {
    fontSize: "1.5rem"
  }
});

const typography = new Typography(theme);

export default typography;
