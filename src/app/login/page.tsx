import type { Metadata } from "next";
import { AuthPlaceholder } from "@/components/auth-placeholder";
export const metadata: Metadata = { title: "Log In — Integration pending" };
export default function LoginPage() {
  return <AuthPlaceholder label="Log In" />;
}
