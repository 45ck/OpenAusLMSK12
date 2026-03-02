# OpenAusLMSK12

OpenAusLMSK12 is an open, auditable Australian K-12 school management + LMS platform blueprint moving toward implementation.

This repository is now a **monorepo** with:

- `apps/backend`: .NET 8 modular monolith API scaffold
- `apps/web`: Next.js frontend scaffold
- `packages/domain-contracts`: shared TypeScript contract package
- `docs/`: ADR-led architecture, implementation, and research corpus

## Development setup

- Install Node.js 22+ and .NET SDK 8.x.
- From repo root:

```sh
npm install
npm run dev
```

The monorepo is designed around workspaces, with these key scripts:

- `npm run build` — build workspace projects
- `npm run lint` — lint workspace projects
- `npm run test` — run workspace tests
- `npm run format:check` — formatting check
- `npm run noslop:doctor` — verify gate enforcement files and hooks

## Quality gates (45ck/noslop)

This repo is configured with [45ck/noslop](https://github.com/45ck/noslop) guardrails:

- `.githooks/` for pre-commit/pre-push/commit-msg enforcement
- `.github/workflows/quality.yml` for CI quality
- `.claude/settings.json` and `.claude/hooks/pre-tool-use.sh` for command restrictions

Hooks are enforced by this repo layout, and gate commands are available via script aliases:

```sh
npm run noslop:check
npm run noslop:fast
npm run noslop:slow
npm run noslop:doctor
```

## Documentation

- [OpenAusLMSK12 Master Plan](docs/OPENAUSLMSK12_MASTER_PLAN.md)
- [ADR Index](docs/ADR_INDEX.md)
- [ADR Policy](docs/ADR_POLICY.md)
- [Research corpus](docs/COMPREHENSIVE_PLAN_RESEARCH_DISCOVERY.md)
- [Initial Research Set](docs/inital-research/)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening issues or pull requests.

## Security

Please report security concerns through [SECURITY.md](SECURITY.md).

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
