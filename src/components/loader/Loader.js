import React from "react";
import { Grid } from "react-loader-spinner";
import { LoaderStyled } from "./Loader.styled";
const Loader = () => (
  <LoaderStyled>
    <Grid color=" #3f51b5" height={360} width={400} />
  </LoaderStyled>
);

export default Loader;
