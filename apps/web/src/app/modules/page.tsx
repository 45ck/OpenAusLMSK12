import Link from 'next/link';
import { platformModuleCatalog } from '@45ck/openauslmsk12-contracts';

export default function ModulesPage() {
  return (
    <section className="card-grid">
      <h1>OpenAusLMSK12 Module Catalog (17 domains)</h1>
      <p>Planned modular surface currently implemented as a shared domain contract and API-backed index.</p>
      <ul>
        {platformModuleCatalog.capabilities.map((module) => (
          <li key={module.id} className="card">
            <h2>{module.name}</h2>
            <p>{module.description}</p>
            <p>
              <strong>Stage:</strong> {module.stage}
            </p>
            <p>
              <strong>Critical paths:</strong> {module.criticalUserPaths.join(' · ')}
            </p>
            <Link href={`/modules/${module.slug}`}>Open domain details →</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
