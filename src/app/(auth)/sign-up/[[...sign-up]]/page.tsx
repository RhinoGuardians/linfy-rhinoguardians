import { SignUp } from "@clerk/nextjs";

import { appRoutes } from "@/config/routes";

export default function SignUpPage() {
  return (
    <SignUp
      appearance={{
        elements: {
          rootBox: "mx-auto w-full",
        },
      }}
      fallbackRedirectUrl={appRoutes.dashboard}
      signInUrl={appRoutes.signIn}
    />
  );
}

