# Agent Guidelines

This repo is protected by **noslop** quality gates.

## Before every commit

```sh
npm run noslop:fast
```

## Before opening a PR

```sh
npm run noslop:slow
```

## Rules

- Never use `git commit --no-verify`
- Never use `git push --force` without explicit human approval
- Do not modify `.githooks/`, `.github/workflows/`, or `.claude/settings.json` without the `noslop-approved` PR label
- Fix lint/type errors; do not disable rules

## Verify your setup

```sh
npm run noslop:doctor
```
