import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";
import CountUp from 'react-countup';

export default function Statistics() {
  return (
    <div className={"static-frame"}>
      <Container>
        <Stack className="info">
          <Stack className="static-box">
            <Box className="static-num">
              <CountUp start={0} end={500} duration={2} />+
            </Box>
            <Box className="static-text">Products</Box>
          </Stack>
          <Divider height="64" width="2" bg="#E3C08D" />
          <Stack className="static-box">
            <Box className="static-num">
              <CountUp start={0} end={4.8} decimals={1} duration={2} />/5
            </Box>
            <Box className="static-text">Average rating</Box>
          </Stack>
          <Divider height="64" width="2" bg="#E3C08D" />
          <Stack className="static-box">
            <Box className="static-num">
              <CountUp start={0} end={90} duration={2} />%
            </Box>
            <Box className="static-text">Proven product effectiveness</Box>
          </Stack>
          <Divider height="64" width="2" bg="#E3C08D" />
          <Stack className="static-box">
            <Box className="static-num">
              <CountUp start={0} end={50} duration={2} />k +
            </Box>
            <Box className="static-text">Satisfied customers</Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
