import React, { useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
import "./FlashSaleBanner.css";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const FLASH_SALE_DURATION_MS = 48 * 60 * 60 * 1000; // 48 hours

function getTimeLeft(targetTime: number): TimeLeft {
  const diff = Math.max(targetTime - Date.now(), 0);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function padTime(value: number): string {
  return value.toString().padStart(2, "0");
}

export default function FlashSaleBanner() {
  const history = useHistory();
  const [targetTime] = useState<number>(() => Date.now() + FLASH_SALE_DURATION_MS);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(targetTime));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(getTimeLeft(targetTime));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetTime]);

  const shopSaleHandler = () => {
    history.push("/products");
  };

  const digits: { label: string; value: number }[] = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flash-sale-frame">
      <Container>
        <Stack className="flash-sale-section">
          <Box className="flash-sale-label">Limited Time Offer</Box>
          <Box className="flash-sale-title">
            K-Beauty Flash Sale — <span className="gold-text">Up to 30% Off</span>
          </Box>
          <Box className="flash-sale-subtext">
            Stock up on your favorite K-beauty essentials before the clock runs out.
          </Box>

          <Stack className="flash-sale-countdown">
            {digits.map((digit, index) => (
              <React.Fragment key={digit.label}>
                <Stack className="flash-sale-digit-box">
                  <Box className="flash-sale-digit-value">{padTime(digit.value)}</Box>
                  <Box className="flash-sale-digit-label">{digit.label}</Box>
                </Stack>
                {index < digits.length - 1 && <Box className="flash-sale-colon">:</Box>}
              </React.Fragment>
            ))}
          </Stack>

          <Button
            className="flash-sale-cta"
            variant="contained"
            onClick={shopSaleHandler}
          >
            Shop the Sale
          </Button>
        </Stack>
      </Container>
    </div>
  );
}
