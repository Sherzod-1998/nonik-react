import React from "react";
import { Box, Container, Stack, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import "../../../css/help.css";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";
import ContactService from "../../services/ContactService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/swettAlert";

const contactService = new ContactService();

export default function HelpPage() {
  const [value, setValue] = React.useState("1");
  const [senderName, setSenderName] = React.useState("");
  const [senderEmail, setSenderEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  /** HANDLERS **/
  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!senderName.trim() || !senderEmail.trim() || !message.trim()) {
        throw new Error("Please fill out all fields!");
      }
      if (!emailPattern.test(senderEmail.trim())) {
        throw new Error("Please provide a valid email address!");
      }

      await contactService.submitMessage(
        senderName.trim(),
        senderEmail.trim(),
        message.trim()
      );

      await sweetTopSmallSuccessAlert("Message sent!");
      setSenderName("");
      setSenderEmail("");
      setMessage("");
    } catch (err) {
      await sweetErrorHandling(err);
    }
  };

  return (
    <div className={"help-page"}>
      <Container className={"help-container"}>
        <Box className={"order-page-title"}>Help & Support</Box>
        <TabContext value={value}>
          <Box className={"help-menu"}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="lab API tabs example"
                className={"table_list"}
              >
                <Tab label="TERMS" value={"1"} />
                <Tab label="FAQ" value={"2"} />
                <Tab label="CONTACT" value={"3"} />
              </Tabs>
            </Box>
          </Box>
          <Stack>
            <Stack className={"help-main-content"}>
              <TabPanel value={"1"}>
                <Stack className={"rules-box"}>
                  <Box className={"rules-frame"}>
                    {terms.map((value, number) => {
                      return <p key={number}>{value}</p>;
                    })}
                  </Box>
                </Stack>
              </TabPanel>
              <TabPanel value={"2"}>
                <Stack className={"accordion-menu"}>
                  {faq.map((value, number) => {
                    return (
                      <Accordion key={number}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>{value.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{value.answer}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </Stack>
              </TabPanel>
              <TabPanel value={"3"}>
                <Stack className={"admin-letter-box"}>
                  <Stack className={"admin-letter-container"}>
                    <Box className={"admin-letter-frame"}>
                      <span>Contact us!</span>
                      <p>Fill out below form to send a message!</p>
                    </Box>
                    <form
                      onSubmit={handleContactSubmit}
                      className={"admin-letter-frame"}
                    >
                      <div className={"admin-input-box"}>
                        <label>Your name</label>
                        <input
                          type={"text"}
                          name={"memberNick"}
                          placeholder={"Type your name here"}
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                        />
                      </div>
                      <div className={"admin-input-box"}>
                        <label>Your email</label>
                        <input
                          type={"text"}
                          name={"memberEmail"}
                          placeholder={"Type your email here"}
                          value={senderEmail}
                          onChange={(e) => setSenderEmail(e.target.value)}
                        />
                      </div>
                      <div className={"admin-input-box"}>
                        <label>Message</label>
                        <textarea
                          name={"memberMsg"}
                          placeholder={"Your message"}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                      </div>
                      <Box
                        display={"flex"}
                        justifyContent={"flex-end"}
                        sx={{ mt: "30px" }}
                      >
                        <Button type={"submit"} variant="contained">
                          Send
                        </Button>
                      </Box>
                    </form>
                  </Stack>
                </Stack>
              </TabPanel>
            </Stack>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
}
