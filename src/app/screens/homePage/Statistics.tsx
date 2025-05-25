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
              <CountUp start={0} end={15} duration={2} />
            </Box>
            <Box className="static-text">Branches</Box>
          </Stack>
          <Divider height="64" width="2" bg="#E3C08D" />
          <Stack className="static-box">
            <Box className="static-num">
              <CountUp start={0} end={10} duration={2} />
            </Box>
            <Box className="static-text">Experience</Box>
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
              <CountUp start={0} end={200} duration={2} />
            </Box>
            <Box className="static-text">satisfied customers</Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
