import axiosInstance from "../api/axiosInstance";

class ContactService {
  public async submitMessage(
    senderName: string,
    senderEmail: string,
    message: string
  ): Promise<void> {
    await axiosInstance.post("/contact/submit", {
      senderName,
      senderEmail,
      message,
    });
  }
}

export default ContactService;
