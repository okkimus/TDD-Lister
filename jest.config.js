/** @type {import('jest').Config} */
const config = {
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  coverageReporters: ["json-summary"],
};

module.exports = config;
