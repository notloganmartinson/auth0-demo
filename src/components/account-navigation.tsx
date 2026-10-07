import Link from "next/link";
import { accountNavigation } from "@/lib/navigation";
import { Icon } from "./icon";

// This is always the same public navigation. Add user-aware presentation here later.
export function AccountNavigation() {
  return (
    <div className="account-nav">
      <Link href={accountNavigation.login.href}>
        {accountNavigation.login.label}
      </Link>
      <Link href={accountNavigation.signup.href} className="signup-link">
        {accountNavigation.signup.label}
      </Link>
      <Link
        href={accountNavigation.account.href}
        className="icon-link"
        aria-label={accountNavigation.account.label}
      >
        <Icon name="user" />
      </Link>
    </div>
  );
}
