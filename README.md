# UniJoin

Browser-based SQL practice tool made with a university enrollment database. No backend, quick install through and open through an HTML file where you can start writing SQL queries.

Every query is executed through an actual SQLite engine running client-side. The test cases aren't multiple choice, just type the query and UniJoin runs it, and checks your query if it matches with the actual result.

# Features
- **30 test cases, 5 points each - 150 points total**.
- Progress bar, scores, and in-progress answers across page reloads.
- **Timed Mode** to practice exams, with a countdown and auto-lock at zero.
-A **Database Schema** tab that has every table, columns, primary/foreign keys, and rows straight from the database itself.
-A free-form **Scratchpad** where you can test out queries and practice for yourself.
-Per-question **hints** to help aid when you're stuck in a question.

# How it works

`script.js` boots [sql.js](https://github.com/sql-js/sql.js) (SQLite compiled to WebAssembly) and loads a full schema and dataset for a fictional university registrar system:

| Table | Contents |
|---|---|
| `Colleges` | Top-level academic colleges and deans |
| `Programs` | Degree programs that are linked to a college |
| `Instructors` | Faculty, with rank and contact info |
| `Courses` | Course catalog, linked to a program |
| `Sections` | Scheduled offerings of a course, linked to an instructor |
| `Students` | Student records |
| `Enrollment` | Which student is in which section, and when |
| `Grades` | Midterm/finals/final grade per enrollment |
| `Payments` | Tuition payments per student |
| `ClassAttendance` | Per-session attendance per enrollment |

### Grading

Each test case stores an expected result when you click **Check Code**

1. Your query runs via `db.exec(...)`.
2. Column count and row contents are compared against the expected result, not order sensitive, rows are normalized and sorted before comparing, so you don't have to guess the exact `ORDER BY` the grader used.
3. A syntax error or empty result set is shown inline (real SQLite error messages) to show where you get it wrong.

### Hints 

Clicking **HINT** swaps the editor to a read-only reference answer for that test case, your in-progress answer is saved as you swap and restored when you go back.

## Modes

**Default mode** - normal form of the webpage, you can answer the test cases as freely as you want, your progress is saved even as you leave the website.

**Timed Mode** - timed mode where you can set the duration like an actual exam, the toolbar (shuffle/reset/scratchpad) locks for the duration. When time runs out, all editors and buttons lock and your final score is displayed. Just like default mode, timed mode is saved even with a page refresh.

**Shuffle Questions** - A button where you can shuffle the order of the questions

**Reset Progress** - A two-step "click again to confirm" button that wipes your score, solved state, hint/answer history, and any active timed session.

## Tech stack

- Vanilla HTML/CSS/JS — no framework, no build step, no package.json
- [sql.js](https://github.com/sql-js/sql.js) loaded from a CDN at runtime (WebAssembly SQLite)
- `localStorage` for all persistence (progress, saved answers, case order, timed-mode state, last-viewed tab)


## How to Run It

Clone the repo using Visual Studio Code and open 'queryreviewer.html' directly in your browser. Just copy and paste this in your VS CODE terminal

```
git clone https://github.com/huen814/UniJoin.git
cd UniJoin
open queryreviewer.html 
```

An internet connection is required on first load, since the SQL engine (`sql-wasm.js` / `sql-wasm.wasm`) is fetched from cdnjs. Once loaded, all query execution happens locally in the browser — nothing is sent to a server.

## File Structure

```
UniJoin/
├── queryreviewer.html   # page structure, tabs, layout
├── style.css            # all styling (dark navy "registrar" theme)
└── script.js            # schema + data, all 30 test cases, grading, timer, persistence
```

## Why was this made?

I personally made this webpage to help myself study and review for my upcoming exam on the course Information Management II where we had to use INNER/LEFT/RIGHT/CROSS/SELF joins, subqueries, and aggregates. I myself can say that using this webpage as a way to study has helped me alot as I got a high score on my exams.

## Possible future improvements

Though this webpage can be considered finish, there are possibilities for future improvements.

FUTURE IMPROVEMENTS:
- "Generate your own schema" mode to generate a schema that's different from the one used on the webpage.
- Difficulty tiers.
- Definitions on different SQL terms.
