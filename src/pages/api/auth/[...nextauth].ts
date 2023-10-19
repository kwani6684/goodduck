import { connectDB } from "@/util/database";
import NextAuth, { AuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

interface CustomCredentials {
  email: string;
  password: string;
}
interface Token {
  // 여기에 토큰과 관련된 필드 정의
  user?: { name: string; email: string };
  // 다른 필드도 추가 가능
}
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials: Record<"email" | "password", string> | undefined): Promise<User | null> {
        let db = (await connectDB).db("goodduck");
        let user = await db.collection("userinfo").findOne({ email: credentials?.email });
        console.log(user);
        if (!user) {
          console.log("해당 이메일은 없음");
          return null;
        }
        const { _id, ...userData } = user;
        if (credentials) {
          const pwcheck = await bcrypt.compare(credentials.password, user.password);
          if (!pwcheck) {
            console.log("비번틀림");
            return null;
          }
        }

        return { ...userData, id: user._id.toString() };
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID || "",
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    // }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30일
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.user = {};
        token.user.name = user.username;
        token.user.email = user.email;
        token.user.role = user.role;
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }: any) => {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
};
export default NextAuth(authOptions);
