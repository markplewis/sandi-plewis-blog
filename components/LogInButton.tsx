import { useSession, signIn, signOut } from "next-auth/react";

// See: https://authjs.dev/getting-started/oauth-tutorial#consuming-the-session-via-hooks

export default function LogInButton() {
  // See: https://next-auth.js.org/getting-started/client#usesession
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Hang on there...</p>;
  }
  if (status === "authenticated") {
    const userEmail = session?.user?.email || "";
    // See https://next-auth.js.org/getting-started/client#signout
    return (
      <>
        <p>Signed in as {userEmail}</p>
        <button onClick={() => signOut({ callbackUrl: "/api/exit-preview" })}>Sign out</button>
      </>
    );
  }
  // See: https://next-auth.js.org/getting-started/client#signin
  return (
    <>
      <p>Not signed in.</p>
      <button onClick={() => signIn(undefined, { callbackUrl: "/api/preview" })}>Sign in</button>
    </>
  );
}
