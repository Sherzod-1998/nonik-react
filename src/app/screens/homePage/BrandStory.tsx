import React from "react";
import { Box, Container, Stack } from "@mui/material";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import "../../../css/BrandStory.css";

interface RitualStep {
  icon: React.ReactNode;
  label: string;
  description: string;
}

const ritualSteps: RitualStep[] = [
  {
    icon: <WaterDropOutlinedIcon className="ritual-icon" />,
    label: "Cleanse",
    description: "Gentle formulas lift away the day, prepping skin to receive what comes next.",
  },
  {
    icon: <SpaOutlinedIcon className="ritual-icon" />,
    label: "Nourish",
    description: "Fermented botanicals and hydrating actives restore balance from within.",
  },
  {
    icon: <AutoAwesomeOutlinedIcon className="ritual-icon" />,
    label: "Glow",
    description: "A final layer seals in radiance, leaving skin luminous and protected.",
  },
];

export default function BrandStory() {
  return (
    <div className="brand-story-frame">
      <Container>
        <Stack className="brand-story-section">
          <Box className="category-title">Our Story</Box>

          <Box className="brand-story-quote">
            Blending centuries of Korean beauty tradition with modern
            skincare science, Nonik Cosmetics turns everyday rituals into
            moments of quiet transformation. Each formula is crafted to
            honor time-tested wisdom while embracing the innovation of
            today, so every layer you apply feels like a small act of care.
          </Box>

          <Stack className="brand-story-steps">
            {ritualSteps.map((step) => (
              <Box key={step.label} className="brand-story-step">
                {step.icon}
                <Box className="brand-story-step-label">{step.label}</Box>
                <Box className="brand-story-step-desc">{step.description}</Box>
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
