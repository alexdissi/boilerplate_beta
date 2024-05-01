import Navigation from "@/components/common/navigation";
import Link from "next/link";
import {useLocale} from "next-intl";
import {auth} from "@/lib/auth";

export default async function Index() {
  const session = await auth();
  const locale = useLocale();
  return (
      <>
        <Navigation />
        <Link href={`${locale}/my-account/${session?.user.id}`}>Account</Link>
      </>
  );
}
