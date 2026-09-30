# QuickPOS — Team Workflow

How Group#08 (Section-A 2nd 30) worked on QuickPOS for CSE 3206 Lab 2.

Repository: <https://github.com/TanzirulIslam22/QuickPOS>

## 1. Process model

We used **Incremental Development**, the model suggested in the assignment. Each increment
was small enough to finish and demo inside the lab timeline, and the core POS path was
usable before the optional work started.

| Inc. | Focus                     | Owner     | State                |
|------|---------------------------|-----------|----------------------|
| 1    | POS core baseline         | Tanzirul  | Delivered            |
| 2    | Sales summary             | Ruan      | Partially delivered  |
| 3    | Invoice & receipt         | Shuvo     | Delivered            |
| 4    | Report & collaboration    | Tanzirul  | Delivered            |

Increment 2 is recorded as partial on purpose: PR #2 was named
`feature: add sales summary and endpoint and dashboard page`, but only the
route-level changes were merged. The summary widget is still open as backlog item B-01.
Renaming a branch does not change what a pull request delivered, so the report states what
was actually merged.

## 2. Branch naming

```
<github-username>/<short-feature-name>
```

- `tanzirul/mvp-base` — core MVP
- `ruan/dashboard` — sales-summary increment
- `shuvo/category-receipt` — printable invoice
- `tanzirul/report-lab2` — report, workflow docs and screenshots

`main` is the only protected branch. Nothing is pushed straight to it.

## 3. Pull-request protocol

1. Create the branch from an up-to-date `main`.
2. Make the change in small, related commits.
3. Push the branch and open a pull request against `main`.
4. Every pull request description states **what** changed, **which increment** it belongs
   to, and **how it was tested**.
5. At least one other member reads the diff before the merge.
6. Merge with a merge commit, then delete the branch.

If a pull request turns out to deliver less than its title promised, it is merged as-is and
the shortfall is written down rather than hidden. The report references that record.

## 4. Commit messages

Short, imperative subject line, prefixed by the increment when useful:

```
Feature - Invoice function added
feature: add sales summary and endpoint and dashboard page
docs: add QuickPOS team information
Increment 4: project design report, workflow docs and MVP screenshots
```

## 5. Ownership rules

- A member owns the modules listed against their name in the report; nobody edits another
  member's module inside someone else's branch.
- Changes to `server/` routes and models are reviewed by the team lead.
- Frontend feature work stays inside the contributor's own page component.
- Documentation and the report are written from the code, not the other way round.

## 6. Review checklist

- [ ] Code runs: `npm run dev` in `server/` and `client/`
- [ ] Feature is reachable from the UI, not only the API
- [ ] Stock and payment validation re-checked on the server
- [ ] No secrets or `.env` committed
- [ ] `README.md` updated if behaviour changed
- [ ] Report updated if requirements or ownership changed

## 7. Known gaps after Lab 2

- No automated test suite; verification was manual plus a production build
  (`npm run build` in `client/`).
- Product update (`PUT /api/products/:id`) is available at the API level but has no UI
  screen yet (backlog B-02).
- The sales-summary dashboard from increment 2 is unfinished (backlog B-01).