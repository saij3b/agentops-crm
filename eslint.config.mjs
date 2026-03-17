import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      ".next_corrupt_*/**",
      ".playwright-cli*/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "*.bak-*",
    ],
  },
];

export default eslintConfig;
