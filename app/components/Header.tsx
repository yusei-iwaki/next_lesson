import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../lib/next-auth/options";
import HeaderClient from "../server/HeaderClient";

export default async function Header() {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user;

  return <HeaderClient user={user} />;
}
