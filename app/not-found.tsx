import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-display text-8xl text-ink sm:text-9xl">
        404<span className="text-accent">.</span>
      </p>
      <h1 className="text-2xl font-semibold">This page drifted out of the index.</h1>
      <p className="max-w-md text-ink-muted">
        The page you&apos;re looking for doesn&apos;t exist — but the retrieval
        pipeline suggests heading home.
      </p>
      <Link href="/" className="btn-secondary">
        <MoveLeft className="h-4 w-4" aria-hidden />
        Back to home
      </Link>
    </main>
  );
}
