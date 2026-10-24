import Link from "next/link";
import { accountNavigation } from "@/lib/navigation";
import { auth0 } from "@/lib/auth0";
import { Icon } from "./icon";

export async function AccountNavigation() {
  const session = await auth0.getSession();

  if (!session) {
    return (
      <div className="account-nav">
        <a href={accountNavigation.login.href}>
          {accountNavigation.login.label}
        </a>

        <a
          href={accountNavigation.signup.href}
          className="signup-link"
        >
          {accountNavigation.signup.label}
        </a>
      </div>
    );
  }

  return (
    <div className="account-nav">
      <span>
        Hi, {session.user.given_name ?? session.user.name}
      </span>

      <Link
        href={accountNavigation.account.href}
        className="icon-link"
        aria-label={accountNavigation.account.label}
      >
        <Icon name="user" />
      </Link>

      <a href="/auth/logout">Log Out</a>
    </div>
  );
}
