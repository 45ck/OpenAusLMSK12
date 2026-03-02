import { notFound } from 'next/navigation';
import { platformModuleCatalog } from '@45ck/openauslmsk12-contracts';

export function generateStaticParams() {
  return platformModuleCatalog.capabilities.map((module) => ({ slug: module.slug }));
}

export default function ModuleDetailPage({ params }: { params: { slug: string } }) {
  const moduleEntry = platformModuleCatalog.capabilities.find((entry) => entry.slug === params.slug);

  if (!moduleEntry) {
    notFound();
  }

  return (
    <section className="card-grid">
      <h1>{moduleEntry.name}</h1>
      <p>{moduleEntry.description}</p>
      <p>
        <strong>Stage:</strong> {moduleEntry.stage}
      </p>
      <h2>Critical Paths</h2>
      <ul>
        {moduleEntry.criticalUserPaths.map((path) => (
          <li key={path}>{path}</li>
        ))}
      </ul>
      <h2>Designed Journeys</h2>
      {moduleEntry.journey.map((journey) => (
        <article key={journey.id} className="journey-card">
          <h3>{journey.title}</h3>
          <p>{journey.summary}</p>
          <ol>
            {journey.sampleSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>
      ))}
    </section>
  );
}
