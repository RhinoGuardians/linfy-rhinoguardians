import { SignIn } from "@clerk/nextjs";

import { appRoutes } from "@/config/routes";

export default function SignInPage() {
  return (
    <SignIn
      appearance={{
        elements: {
          rootBox: "mx-auto w-full",
        },
      }}
      fallbackRedirectUrl={appRoutes.dashboard}
      signUpUrl={appRoutes.signUp}
    />
  );
}

