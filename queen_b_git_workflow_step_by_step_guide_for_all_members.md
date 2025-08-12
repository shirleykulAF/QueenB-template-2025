# QueenB Git Workflow — Step‑by‑Step Guide

A consistent, low‑drama routine for working on feature branches, opening PRs, and **squash‑merging** into `main`.

---

## 0) One‑time Setup

1. **Clone & set upstream**
   ```bash
   git clone <repo-url>
   cd <repo>
   git remote -v
   ```
2. **Identify the default branch** (assume `main`).
   ```bash
   git fetch origin
   git switch main
   git pull --ff-only
   ```
3. **Helpful configs (recommended)**
   ```bash
   # Safer pulls and merges
   git config --global pull.ff only

   # Handy aliases (optional)
   git config --global alias.sw 'switch'
   git config --global alias.fp 'push --force-with-lease'
   git config --global alias.lg "log --oneline --graph --decorate --all"
   ```

---

## 1) Start Work on a New Feature/Fix

**Create a branch off **`` (use your name/namespace):

```bash
git fetch origin
git sw -c yana/<short-feature-name> origin/main
# Example: yana/login-form
```

**Branch naming**: `yana/<feature>` or `yana/bugfix-<topic>`

---

## 2) Daily Development Loop

1. **Run the app locally** (for our React+Express template):

   ```bash
   npm run dev
   ```

2. **Code in small steps** and commit often:

   ```bash
   git add -A
   git commit -m "feat(ui): add password toggle in login form"
   ```

   Use **Conventional Commits** (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`) for tidy history.

3. **If you’re correcting a previous commit**, prefer *fixup* so it can auto‑squash later:

   ```bash
   git commit --fixup <commitSHA>
   ```

4. **Keep your branch fresh** (rebase on `main` regularly):

   ```bash
   git fetch origin
   git rebase origin/main
   # resolve conflicts ->
   git add -A
   git rebase --continue
   ```

5. **Push the branch** (after a rebase, use lease):

   ```bash
   git push -u origin HEAD --force-with-lease
   ```

---

## 3) Open a Pull Request (PR)

1. **Create PR**: from `yana/<feature>` → `main`.
2. **PR title** (clear & scoped):
   - Example: `feat(auth): login form with email validation`
3. **PR description** (template):
   - **What** changed and **why**
   - Screenshots/GIFs for UI
   - API changes/migrations
   - How to test (steps)
   - Rollback plan (if useful)
4. Wait for CI to pass; request/assign reviewers.

---

## 4) Iterate During Review

- Make changes as new commits (use `--fixup` when adjusting earlier commits):
  ```bash
  git add -A
  git commit --fixup <commitSHA>
  git rebase -i --autosquash origin/main
  git push --force-with-lease
  ```
- Keep your branch rebased on latest `main` to reduce merge pain.

---

## 5) Squash & Merge

On GitHub (PR page):

1. Choose **“Squash and merge.”**
2. **Edit the final commit message** to one clean message:
   - Title: `feat(auth): login form with email validation`
   - Body: bullets for notable changes/impact.
3. Confirm merge.

> Result: `main` gets **one clean commit** representing the entire feature.

---

## 6) Post‑Merge Cleanup

On your machine:

```bash
git sw main
git pull --ff-only origin main

# remove local branch
git branch -d yana/<feature>

# delete remote branch
git push origin :yana/<feature>
```

Start your next branch from the updated `main`.

---

## 7) Frontend vs Backend Routine (Quick Reference)

- **Frontend‑only change**: `npm run dev` → edit → commit → (optional) `npm run build` to test prod → PR → squash merge.
- **Backend‑only change**: `npm run server` (or `npm run dev`) → edit → commit → PR → squash merge.
- **Both**: `npm run dev` for integrated testing; same PR flow.

> Only run `npm run build` when testing production behavior or before deployment; **not** for everyday iteration.

---

## 8) Conflict Resolution (Short Playbook)

When `git rebase origin/main` stops with conflicts:

```bash
# open files, fix conflicts
git add <fixed-files>
 git rebase --continue
# if you need to abort and rethink
 git rebase --abort
```

If you accidentally committed to the wrong branch, you can move the commit(s):

```bash
# from the wrong branch
git sw -c temp/saved
# go back, reset, and cherry-pick commits as needed
```

(Ask for help if unsure—better to pause than to damage history.)

---

## 9) Common Errors & Remedies

- **“Updates were rejected because the remote contains work that you do not have”**
  ```bash
  git fetch origin
  git rebase origin/main
  git push --force-with-lease
  ```
- **Accidentally pushed merge commits into your branch**: rebase onto `origin/main` and force‑push with lease.
- **Stuck process on ports 3000/5000**:
  ```bash
  npx kill-port 3000
  npx kill-port 5000
  ```

---

## 10) Optional Enhancements

- **Protect **`` (GitHub settings): require PR review + passing CI; allow only *Squash and merge*.
- **PR Template**: add `.github/pull_request_template.md`:
  ```md
  ## What
  -

  ## Why
  -

  ## How to test
  1.

  ## Screenshots / Video

  ## Risks / Rollback
  -
  ```
- **Commit linting** (Conventional Commits): adopt tooling if you want automated release notes.

---

## 11) Quick Cheatsheet

```bash
# create branch
git sw -c yana/feature origin/main

# work
git add -A
git commit -m "feat: ..."

# keep up to date
git fetch origin
git rebase origin/main

# push (after rebase)
git push -u origin HEAD --force-with-lease

# open PR → squash & merge

# clean up
git sw main && git pull --ff-only
git branch -d yana/feature
git push origin :yana/feature
```

---

## Sources & Further Reading

- GitHub Docs — Merge methods (Squash & merge)
- GitHub Docs — Protected branches
- Git — `rebase` (interactive, autosquash)
- Git — `commit --fixup`
- Conventional Commits — Specification

