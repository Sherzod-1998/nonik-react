import React, { useState } from "react";
import { Box, Button, Chip, Container, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
import { ProductCollection } from "../../../lib/enums/product.enum";
import "../../../css/SkinQuiz.css";

interface QuizQuestion {
  question: string;
  options: string[];
}

interface QuizAnswers {
  skinType: string;
  concern: string;
  intensity: string;
}

const questions: QuizQuestion[] = [
  {
    question: "What's your skin type?",
    options: ["Dry", "Oily", "Combination", "Sensitive"],
  },
  {
    question: "What's your main concern?",
    options: ["Hydration", "Brightening", "Anti-aging", "Acne"],
  },
  {
    question: "Preferred routine intensity?",
    options: ["Minimal", "Standard", "Full routine"],
  },
];

/** Maps quiz answers to a recommended product collection. Simple, not scientific. */
function getRecommendation(answers: QuizAnswers): ProductCollection {
  switch (answers.concern) {
    case "Acne":
      return ProductCollection.SKINCARE;
    case "Anti-aging":
      return ProductCollection.SKINCARE;
    case "Brightening":
      return answers.skinType === "Sensitive"
        ? ProductCollection.SKINCARE
        : ProductCollection.MAKEUP;
    case "Hydration":
    default:
      if (answers.skinType === "Dry") return ProductCollection.SKINCARE;
      if (answers.skinType === "Oily") return ProductCollection.SUNCARE;
      return ProductCollection.SKINCARE;
  }
}

const initialAnswers: QuizAnswers = {
  skinType: "",
  concern: "",
  intensity: "",
};

export default function SkinQuiz() {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);
  const history = useHistory();

  const answerKeys: (keyof QuizAnswers)[] = ["skinType", "concern", "intensity"];

  const selectOptionHandler = (option: string) => {
    const key = answerKeys[step];
    const updatedAnswers = { ...answers, [key]: option };
    setAnswers(updatedAnswers);
    setStep(step + 1);
  };

  const restartHandler = () => {
    setAnswers(initialAnswers);
    setStep(0);
  };

  const seeProductsHandler = () => {
    history.push("/products");
  };

  const isFinished = step >= questions.length;
  const recommendation = isFinished ? getRecommendation(answers) : null;

  return (
    <div className="skin-quiz-frame">
      <Container>
        <Stack className="skin-quiz-section">
          <Box className="category-title">Find Your Routine</Box>

          <Stack className="skin-quiz-card">
            {!isFinished ? (
              <Stack key={step} className="skin-quiz-step">
                <Box className="skin-quiz-progress">
                  Question {step + 1} of {questions.length}
                </Box>
                <Box className="skin-quiz-question">{questions[step].question}</Box>
                <Stack className="skin-quiz-options">
                  {questions[step].options.map((option) => (
                    <Chip
                      key={option}
                      label={option}
                      onClick={() => selectOptionHandler(option)}
                      className="skin-quiz-chip"
                      variant={answers[answerKeys[step]] === option ? "filled" : "outlined"}
                    />
                  ))}
                </Stack>
              </Stack>
            ) : (
              <Stack className="skin-quiz-result">
                <Box className="skin-quiz-result-title">Your recommended category</Box>
                <Box className="skin-quiz-result-value">
                  {recommendation!.charAt(0) + recommendation!.slice(1).toLowerCase()}
                </Box>
                <Box className="skin-quiz-result-summary">
                  Skin type: {answers.skinType} · Concern: {answers.concern} · Routine: {answers.intensity}
                </Box>
                <Stack className="skin-quiz-result-actions">
                  <Button
                    className="skin-quiz-btn skin-quiz-btn-primary"
                    variant="contained"
                    onClick={seeProductsHandler}
                  >
                    See recommended products
                  </Button>
                  <Button
                    className="skin-quiz-btn skin-quiz-btn-secondary"
                    variant="outlined"
                    onClick={restartHandler}
                  >
                    Start over
                  </Button>
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
