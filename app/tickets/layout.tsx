import { getAuthRedirect } from "@/features/auth/queries/get-auth-redirect";

type AuthenticatedLayoutProps = {
  children: Readonly<React.ReactNode>;
};

export default async function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  await getAuthRedirect();

  return <>{children}</>;
}
