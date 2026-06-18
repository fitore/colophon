import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/** Flat config — eslint-config-next 16 ships native flat configs. */
const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    ignores: [".next/**", "out/**", "node_modules/**"],
  },
  {
    files: ["src/app/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/data", "@/data/*"],
              message:
                "UI consumers must use the catalogue query or presentation boundary, not repository-owned static data.",
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
