"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";

function GoogleCallbackContent() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      router.push("/home");
    }
  }, [params, router]);

  return <p>Signing you in...</p>;
}

export default function GoogleCallback() {
  return (
    <Suspense fallback={<p>Signing you in...</p>}>
      <GoogleCallbackContent />
    </Suspense>
  );
}

