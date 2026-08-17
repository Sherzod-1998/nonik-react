import axiosInstance from "../api/axiosInstance";
import {
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput,
} from "../../lib/types/member";

class MemberService {
  public async getTopUsers(): Promise<Member[]> {
    const result = await axiosInstance.get("/member/top-users");

    return result.data;
  }

  public async getSeller(): Promise<Member> {
    const result = await axiosInstance.get("/member/seller");

    return result.data;
  }

  public async signup(input: MemberInput): Promise<Member> {
    const result = await axiosInstance.post("/member/signup", input, {
      withCredentials: true,
    });

    const member: Member = result.data.member;

    return member;
  }

  public async login(input: LoginInput): Promise<Member> {
    const result = await axiosInstance.post("/member/login", input, {
      withCredentials: true,
    });

    const member: Member = result.data.member;

    return member;
  }

  public async logout(): Promise<void> {
    await axiosInstance.post("/member/logout", {}, { withCredentials: true });
  }

  public async updateMember(input: MemberUpdateInput): Promise<Member> {
    const formData = new FormData();
    formData.append("memberNick", input.memberNick || "");
    formData.append("memberPhone", input.memberPhone || "");
    formData.append("memberAddress", input.memberAddress || "");
    formData.append("memberDesc", input.memberDesc || "");
    formData.append("memberImage", input.memberImage || "");

    const result = await axiosInstance.post("/member/update", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const member: Member = result.data;
    return member;
  }
}

export default MemberService;
