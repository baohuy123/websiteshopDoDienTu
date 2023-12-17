import Dotenv from "dotenv-webpack";

export const plugins = [
    new Dotenv({
        path: ".env",
    }),
];

export const port = 3000;

