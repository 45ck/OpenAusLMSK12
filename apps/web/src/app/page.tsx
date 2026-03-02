import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="landing">
      <p className="eyebrow">OpenAusLMSK12 Planning Platform</p>
      <h1>Ready-to-build school platform monorepo</h1>
      <p>
        This repository now includes a modular backend catalog for all major product domains and a frontend surface for
        module discovery.
      </p>
      <div className="cta-row">
        <Link href="/modules">Browse All Domains</Link>
      </div>
    </div>
  );
}
