const colors = require("tailwindcss/colors");

const config = {
  mode: "jit",
  purge: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        emerald: colors.emerald,
        fuchsia: colors.fuchsia,
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "code::before": {
              content: false,
            },
            "code::after": {
              content: false,
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};

module.exports = config;
