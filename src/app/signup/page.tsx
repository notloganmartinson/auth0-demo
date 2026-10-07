import type { Metadata } from "next";
import { AuthPlaceholder } from "@/components/auth-placeholder";
export const metadata: Metadata = {
  title: "Create Account — Integration pending",
};
export default function SignupPage() {
  return <AuthPlaceholder label="Create Account" />;
}
