const SCHEMA_SQL = `
CREATE TABLE Colleges (
  college_id INTEGER PRIMARY KEY AUTOINCREMENT,
  college_name VARCHAR(100),
  dean VARCHAR(100)
);

CREATE TABLE Programs (
  program_id INTEGER PRIMARY KEY AUTOINCREMENT,
  program_name VARCHAR(100),
  college_id INT,
  FOREIGN KEY (college_id) REFERENCES Colleges(college_id)
);

CREATE TABLE Instructors (
  instructor_id INTEGER PRIMARY KEY AUTOINCREMENT,
  instructor_name VARCHAR(100),
  rank VARCHAR(50),
  email VARCHAR(100)
);

CREATE TABLE Courses (
  course_id INTEGER PRIMARY KEY AUTOINCREMENT,
  course_code VARCHAR(20),
  course_title VARCHAR(100),
  units INT,
  program_id INT,
  FOREIGN KEY (program_id) REFERENCES Programs(program_id)
);

CREATE TABLE Sections (
  section_id INTEGER PRIMARY KEY AUTOINCREMENT,
  course_id INT,
  instructor_id INT,
  section_name VARCHAR(20),
  schedule VARCHAR(100),
  room VARCHAR(30),
  FOREIGN KEY (course_id) REFERENCES Courses(course_id),
  FOREIGN KEY (instructor_id) REFERENCES Instructors(instructor_id)
);

CREATE TABLE Students (
  student_id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  gender VARCHAR(10),
  birthdate DATE,
  email VARCHAR(100) UNIQUE,
  contact_no VARCHAR(20)
);

CREATE TABLE Enrollment (
  enrollment_id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INT,
  section_id INT,
  semester VARCHAR(20),
  school_year VARCHAR(20),
  enrollment_date DATE,
  FOREIGN KEY (student_id) REFERENCES Students(student_id),
  FOREIGN KEY (section_id) REFERENCES Sections(section_id)
);

CREATE TABLE Grades (
  grade_id INTEGER PRIMARY KEY AUTOINCREMENT,
  enrollment_id INT,
  midterm DECIMAL(4,2),
  finals DECIMAL(4,2),
  final_grade DECIMAL(4,2),
  remarks VARCHAR(20),
  FOREIGN KEY (enrollment_id) REFERENCES Enrollment(enrollment_id)
);

CREATE TABLE Payments (
  payment_id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INT,
  amount DECIMAL(10,2),
  payment_date DATE,
  payment_method VARCHAR(30),
  FOREIGN KEY (student_id) REFERENCES Students(student_id)
);

CREATE TABLE ClassAttendance (
  attendance_id INTEGER PRIMARY KEY AUTOINCREMENT,
  enrollment_id INT,
  attendance_date DATE,
  status VARCHAR(20),
  FOREIGN KEY (enrollment_id) REFERENCES Enrollment(enrollment_id)
);

INSERT INTO Colleges (college_name, dean) VALUES
('College of Engineering', 'Dr. Ramirez'),
('College of Arts and Sciences', 'Dr. Santos'),
('College of Business', 'Dr. Cruz'),
('College of Education', 'Dr. Bautista'),
('College of Nursing', 'Dr. Villanueva');

INSERT INTO Programs (program_name, college_id) VALUES
('BS Computer Science', 1),
('BS Civil Engineering', 1),
('BS Psychology', 2),
('BA Communication', 2),
('BS Accountancy', 3),
('BS Business Administration', 3),
('BS Elementary Education', 4),
('BS Nursing', 5);

INSERT INTO Instructors (instructor_name, rank, email) VALUES
('Dr. Alan Reyes', 'Professor', 'alan.reyes@usc.edu.ph'),
('Prof. Maria Lopez', 'Associate Professor', 'maria.lopez@usc.edu.ph'),
('Dr. James Tan', 'Professor', 'james.tan@usc.edu.ph'),
('Prof. Carla Dizon', 'Assistant Professor', 'carla.dizon@usc.edu.ph'),
('Dr. Miguel Torres', 'Professor', 'miguel.torres@usc.edu.ph'),
('Prof. Elena Cruz', 'Associate Professor', 'elena.cruz@usc.edu.ph'),
('Dr. Sophia Reyes', 'Professor', 'sophia.reyes@usc.edu.ph'),
('Prof. Daniel Uy', 'Assistant Professor', 'daniel.uy@usc.edu.ph'),
('Dr. Grace Manalo', 'Professor', 'grace.manalo@usc.edu.ph'),
('Prof. Victor Chua', 'Associate Professor', 'victor.chua@usc.edu.ph');

INSERT INTO Courses (course_code, course_title, units, program_id) VALUES
('CS101', 'Intro to Programming', 3, 1),
('CS102', 'Data Structures', 3, 1),
('CS201', 'Database Systems', 3, 1),
('CE101', 'Statics of Rigid Bodies', 3, 2),
('CE102', 'Surveying', 3, 2),
('PSY101', 'General Psychology', 3, 3),
('PSY102', 'Developmental Psychology', 3, 3),
('COM101', 'Intro to Communication', 3, 4),
('ACC101', 'Financial Accounting', 3, 5),
('ACC102', 'Cost Accounting', 3, 5),
('BUS101', 'Principles of Management', 3, 6),
('EDU101', 'Foundations of Education', 3, 7),
('NUR101', 'Anatomy and Physiology', 4, 8),
('NUR102', 'Fundamentals of Nursing', 4, 8);

INSERT INTO Sections (course_id, instructor_id, section_name, schedule, room) VALUES
(1, 1, 'A', 'MWF 8:00-9:00AM', 'Rm 101'),
(1, 1, 'B', 'TTh 9:00-10:30AM', 'Rm 101'),
(2, 2, 'A', 'MWF 10:00-11:00AM', 'Rm 102'),
(3, 2, 'A', 'TTh 1:00-2:30PM', 'Rm 103'),
(4, 3, 'A', 'MWF 9:00-10:00AM', 'Rm 201'),
(5, 3, 'A', 'TTh 8:00-9:30AM', 'Rm 202'),
(6, 4, 'A', 'MWF 11:00-12:00PM', 'Rm 301'),
(6, 4, 'B', 'TTh 10:00-11:30AM', 'Rm 301'),
(7, 4, 'A', 'MWF 1:00-2:00PM', 'Rm 302'),
(8, 5, 'A', 'TTh 2:00-3:30PM', 'Rm 303'),
(9, 6, 'A', 'MWF 8:00-9:00AM', 'Rm 401'),
(10, 6, 'A', 'TTh 9:00-10:30AM', 'Rm 401'),
(11, 7, 'A', 'MWF 10:00-11:00AM', 'Rm 402'),
(12, 8, 'A', 'TTh 11:00-12:30PM', 'Rm 501'),
(13, 9, 'A', 'MWF 1:00-3:00PM', 'Rm 601'),
(14, 10, 'A', 'TTh 1:00-3:00PM', 'Rm 602');

INSERT INTO Students (first_name, last_name, gender, birthdate, email, contact_no) VALUES
('Juan', 'Dela Cruz', 'M', '2003-05-14', 'juan.delacruz@usc.edu.ph', '09171234501'),
('Maria', 'Santos', 'F', '2003-08-22', 'maria.santos@usc.edu.ph', '09171234502'),
('Pedro', 'Reyes', 'M', '2002-11-03', 'pedro.reyes@usc.edu.ph', '09171234503'),
('Ana', 'Garcia', 'F', '2003-02-17', 'ana.garcia@usc.edu.ph', '09171234504'),
('Jose', 'Ramos', 'M', '2003-09-30', 'jose.ramos@usc.edu.ph', '09171234505'),
('Liza', 'Torres', 'F', '2002-12-05', 'liza.torres@usc.edu.ph', '09171234506'),
('Mark', 'Villanueva', 'M', '2003-04-19', 'mark.villanueva@usc.edu.ph', '09171234507'),
('Grace', 'Bautista', 'F', '2003-07-08', 'grace.bautista@usc.edu.ph', '09171234508'),
('Paolo', 'Cruz', 'M', '2002-10-25', 'paolo.cruz@usc.edu.ph', '09171234509'),
('Nina', 'Aquino', 'F', '2003-01-12', 'nina.aquino@usc.edu.ph', '09171234510'),
('Carlo', 'Mendoza', 'M', '2003-06-27', 'carlo.mendoza@usc.edu.ph', '09171234511'),
('Ella', 'Fernandez', 'F', '2002-09-14', 'ella.fernandez@usc.edu.ph', '09171234512'),
('Rafael', 'Gonzales', 'M', '2003-03-21', 'rafael.gonzales@usc.edu.ph', '09171234513'),
('Sofia', 'Navarro', 'F', '2003-11-09', 'sofia.navarro@usc.edu.ph', '09171234514'),
('Diego', 'Castillo', 'M', '2002-08-16', 'diego.castillo@usc.edu.ph', '09171234515'),
('Camille', 'Ocampo', 'F', '2003-05-30', 'camille.ocampo@usc.edu.ph', '09171234516'),
('Miguel', 'Salazar', 'M', '2003-02-04', 'miguel.salazar@usc.edu.ph', '09171234517'),
('Isabel', 'Pascual', 'F', '2002-12-19', 'isabel.pascual@usc.edu.ph', '09171234518'),
('Gabriel', 'Domingo', 'M', '2003-10-11', 'gabriel.domingo@usc.edu.ph', '09171234519'),
('Trisha', 'Roxas', 'F', '2003-07-23', 'trisha.roxas@usc.edu.ph', '09171234520');

INSERT INTO Enrollment (student_id, section_id, semester, school_year, enrollment_date) VALUES
(1, 1, '1st Semester', '2025-2026', '2025-08-01'),
(2, 1, '1st Semester', '2025-2026', '2025-08-01'),
(3, 1, '1st Semester', '2025-2026', '2025-08-02'),
(4, 3, '1st Semester', '2025-2026', '2025-08-01'),
(5, 4, '1st Semester', '2025-2026', '2025-08-03'),
(1, 4, '1st Semester', '2025-2026', '2025-08-03'),
(6, 5, '1st Semester', '2025-2026', '2025-08-02'),
(7, 5, '1st Semester', '2025-2026', '2025-08-02'),
(8, 7, '1st Semester', '2025-2026', '2025-08-01'),
(9, 7, '1st Semester', '2025-2026', '2025-08-01'),
(10, 9, '1st Semester', '2025-2026', '2025-08-04'),
(2, 9, '1st Semester', '2025-2026', '2025-08-04'),
(11, 10, '1st Semester', '2025-2026', '2025-08-02'),
(12, 11, '1st Semester', '2025-2026', '2025-08-01'),
(13, 11, '1st Semester', '2025-2026', '2025-08-01'),
(14, 12, '1st Semester', '2025-2026', '2025-08-03'),
(15, 13, '1st Semester', '2025-2026', '2025-08-02'),
(16, 14, '1st Semester', '2025-2026', '2025-08-01'),
(17, 15, '1st Semester', '2025-2026', '2025-08-02'),
(18, 15, '1st Semester', '2025-2026', '2025-08-02'),
(19, 16, '1st Semester', '2025-2026', '2025-08-03'),
(3, 16, '1st Semester', '2025-2026', '2025-08-03');

INSERT INTO Grades (enrollment_id, midterm, finals, final_grade, remarks) VALUES
(1, 88.00, 90.00, 89.00, 'Passed'),
(2, 75.00, 78.00, 76.50, 'Passed'),
(3, 60.00, 55.00, 57.50, 'Failed'),
(4, 92.00, 94.00, 93.00, 'Passed'),
(5, 85.00, 80.00, 82.50, 'Passed'),
(6, 70.00, 72.00, 71.00, 'Passed'),
(7, 65.00, 60.00, 62.50, 'Passed'),
(8, 95.00, 96.00, 95.50, 'Passed'),
(9, 55.00, 58.00, 56.50, 'Failed'),
(10, 89.00, 91.00, 90.00, 'Passed'),
(11, 80.00, 83.00, 81.50, 'Passed'),
(12, 77.00, 74.00, 75.50, 'Passed'),
(13, 68.00, 70.00, 69.00, 'Passed'),
(14, 90.00, 92.00, 91.00, 'Passed');

INSERT INTO Payments (student_id, amount, payment_date, payment_method) VALUES
(1, 15000.00, '2025-08-05', 'Bank Transfer'),
(2, 15000.00, '2025-08-05', 'Cash'),
(3, 12000.00, '2025-08-06', 'Bank Transfer'),
(4, 15000.00, '2025-08-06', 'Credit Card'),
(5, 10000.00, '2025-08-07', 'Cash'),
(6, 15000.00, '2025-08-07', 'Bank Transfer'),
(8, 15000.00, '2025-08-08', 'Cash'),
(9, 15000.00, '2025-08-08', 'Credit Card'),
(10, 15000.00, '2025-08-09', 'Bank Transfer'),
(12, 15000.00, '2025-08-09', 'Cash');

INSERT INTO ClassAttendance (enrollment_id, attendance_date, status) VALUES
(1, '2025-08-11', 'Present'),
(1, '2025-08-13', 'Present'),
(1, '2025-08-15', 'Absent'),
(2, '2025-08-11', 'Present'),
(2, '2025-08-13', 'Late'),
(3, '2025-08-11', 'Absent'),
(3, '2025-08-13', 'Absent'),
(4, '2025-08-11', 'Present'),
(5, '2025-08-12', 'Present'),
(5, '2025-08-14', 'Present');
`;

const TEST_CASES = [
{
  tag: "TEST CASE 1",
  points: 5,
  narrative: "Registrar analyst Sua needs a quick catalog view: for courses 1 through 5, return <b>course_code, course_title, program_name</b> by joining Courses to Programs.",
  starter: "SELECT co.course_code, co.course_title, p.program_name\nFROM Courses co\nJOIN Programs p ON co.program_id = p.program_id\nWHERE co.course_id BETWEEN 1 AND 5\nORDER BY co.course_id;",
  expected: {"columns": ["course_code", "course_title", "program_name"], "rows": [["CS101", "Intro to Programming", "BS Computer Science"], ["CS102", "Data Structures", "BS Computer Science"], ["CS201", "Database Systems", "BS Computer Science"], ["CE101", "Statics of Rigid Bodies", "BS Civil Engineering"], ["CE102", "Surveying", "BS Civil Engineering"]]}
},
{
  tag: "TEST CASE 2",
  points: 5,
  narrative: "One student record has <b>never</b> touched an enrollment table \u2014 Mizuki wants to flag it before the semester audit. Return <b>student_id, first_name, last_name</b> for every student with no matching row in Enrollment.",
  starter: "SELECT s.student_id, s.first_name, s.last_name\nFROM Students s\nLEFT JOIN Enrollment e ON s.student_id = e.student_id\nWHERE e.enrollment_id IS NULL;",
  expected: {"columns": ["student_id", "first_name", "last_name"], "rows": [[20, "Trisha", "Roxas"]]}
},
{
  tag: "TEST CASE 3",
  points: 5,
  narrative: "Huen is building a quick roster for enrollment records 1 through 3: the enrollment_id, the student's first name, and the section they're in \u2014 pulled together from <b>three</b> separate tables.",
  starter: "SELECT e.enrollment_id, st.first_name, se.section_name\nFROM Enrollment e\nJOIN Students st ON e.student_id = st.student_id\nJOIN Sections se ON e.section_id = se.section_id\nWHERE e.enrollment_id BETWEEN 1 AND 3\nORDER BY e.enrollment_id;",
  expected: {"columns": ["enrollment_id", "first_name", "section_name"], "rows": [[1, "Juan", "A"], [2, "Maria", "A"], [3, "Pedro", "A"]]}
},
{
  tag: "TEST CASE 4",
  points: 5,
  narrative: "For sections 1 through 5, Clementine wants a capacity check \u2014 <b>every</b> section should show up whether or not anyone has enrolled in it yet. Return <b>section_id, enrollment_id</b> (NULL where nobody's enrolled).",
  starter: "SELECT se.section_id, e.enrollment_id\nFROM Sections se\nLEFT JOIN Enrollment e ON se.section_id = e.section_id\nWHERE se.section_id BETWEEN 1 AND 5\nORDER BY se.section_id, e.enrollment_id;",
  expected: {"columns": ["section_id", "enrollment_id"], "rows": [[1, 1], [1, 2], [1, 3], [2, null], [3, 4], [4, 5], [4, 6], [5, 7], [5, 8]]}
},
{
  tag: "TEST CASE 5",
  points: 5,
  narrative: "To show a new clerk exactly why forgetting the <b>ON</b> clause is dangerous, Snow wants a deliberate, unfiltered pairing: every one of students 1, 2, 3 matched against every one of courses 1, 2, 3 \u2014 a plain cross join, no join condition at all (3 \u00d7 3 = 9 rows). Return <b>first_name, course_title</b>.",
  starter: "SELECT st.first_name, co.course_title\nFROM Students st\nCROSS JOIN Courses co\nWHERE st.student_id IN (1,2,3) AND co.course_id IN (1,2,3)\nORDER BY st.student_id, co.course_id;",
  expected: {"columns": ["first_name", "course_title"], "rows": [["Juan", "Intro to Programming"], ["Juan", "Data Structures"], ["Juan", "Database Systems"], ["Maria", "Intro to Programming"], ["Maria", "Data Structures"], ["Maria", "Database Systems"], ["Pedro", "Intro to Programming"], ["Pedro", "Data Structures"], ["Pedro", "Database Systems"]]}
},
{
  tag: "TEST CASE 6",
  points: 5,
  narrative: "Varka suspects certain instructor ranks are understaffed. <b>Self-join</b> Instructors to itself to pair up instructors who share the same rank \u2014 no instructor paired with themselves, and no reversed duplicate pairs. Return <b>the two instructor names and the shared rank</b>, limited to the first 5 pairs ordered by both instructor_ids.",
  starter: "SELECT i1.instructor_name, i2.instructor_name, i1.rank\nFROM Instructors i1\nJOIN Instructors i2\n  ON i1.rank = i2.rank\n  AND i1.instructor_id < i2.instructor_id\nORDER BY i1.instructor_id, i2.instructor_id\nLIMIT 5;",
  expected: {"columns": ["instructor_name", "instructor_name", "rank"], "rows": [["Dr. Alan Reyes", "Dr. James Tan", "Professor"], ["Dr. Alan Reyes", "Dr. Miguel Torres", "Professor"], ["Dr. Alan Reyes", "Dr. Sophia Reyes", "Professor"], ["Dr. Alan Reyes", "Dr. Grace Manalo", "Professor"], ["Prof. Maria Lopez", "Prof. Elena Cruz", "Associate Professor"]]}
},
{
  tag: "TEST CASE 7",
  points: 5,
  narrative: "For grade records 1 through 3, Dan Heng wants the full academic trail: course title, final grade, and remarks \u2014 walking from Grades, through Enrollment and Sections, to Courses.",
  starter: "SELECT co.course_title, g.final_grade, g.remarks\nFROM Grades g\nJOIN Enrollment e ON g.enrollment_id = e.enrollment_id\nJOIN Sections se ON e.section_id = se.section_id\nJOIN Courses co ON se.course_id = co.course_id\nWHERE g.enrollment_id BETWEEN 1 AND 3\nORDER BY g.enrollment_id;",
  expected: {"columns": ["course_title", "final_grade", "remarks"], "rows": [["Intro to Programming", 89, "Passed"], ["Intro to Programming", 76.5, "Passed"], ["Intro to Programming", 57.5, "Failed"]]}
},
{
  tag: "TEST CASE 8",
  points: 5,
  narrative: "Students 1 through 3 each have multiple Enrollment rows, and a careless join would repeat them. Louise only wants each student's <b>student_id, semester</b> to appear <b>once</b>, even though the underlying join produces duplicates.",
  starter: "SELECT DISTINCT st.student_id, e.semester\nFROM Students st\nJOIN Enrollment e ON st.student_id = e.student_id\nWHERE st.student_id IN (1,2,3)\nORDER BY st.student_id;",
  expected: {"columns": ["student_id", "semester"], "rows": [[1, "1st Semester"], [2, "1st Semester"], [3, "1st Semester"]]}
},
{
  tag: "TEST CASE 9",
  points: 5,
  narrative: "For programs 1 through 5, Francis wants a per-program course count \u2014 <b>every</b> program should appear, even one with very few courses on file. Return <b>program_name, course_count</b>.",
  starter: "SELECT p.program_name, COUNT(co.course_id) AS course_count\nFROM Programs p\nLEFT JOIN Courses co ON p.program_id = co.program_id\nWHERE p.program_id BETWEEN 1 AND 5\nGROUP BY p.program_id\nORDER BY p.program_id;",
  expected: {"columns": ["program_name", "course_count"], "rows": [["BS Computer Science", 3], ["BS Civil Engineering", 2], ["BS Psychology", 2], ["BA Communication", 1], ["BS Accountancy", 2]]}
},
{
  tag: "TEST CASE 10 \u2014 CLOSING THE TERM",
  points: 5,
  narrative: "Closing the semester audit: for sections 1 through 5, return <b>section_id, course_title, instructor_name</b> chained across Courses and Instructors \u2014 and make sure <b>no section disappears</b> from the report just because it's missing a course or instructor link.",
  starter: "SELECT se.section_id, co.course_title, i.instructor_name\nFROM Sections se\nLEFT JOIN Courses co ON se.course_id = co.course_id\nLEFT JOIN Instructors i ON se.instructor_id = i.instructor_id\nWHERE se.section_id BETWEEN 1 AND 5\nORDER BY se.section_id;",
  expected: {"columns": ["section_id", "course_title", "instructor_name"], "rows": [[1, "Intro to Programming", "Dr. Alan Reyes"], [2, "Intro to Programming", "Dr. Alan Reyes"], [3, "Data Structures", "Prof. Maria Lopez"], [4, "Database Systems", "Prof. Maria Lopez"], [5, "Statics of Rigid Bodies", "Dr. James Tan"]]}
},
{
  tag: "TEST CASE 11",
  points: 5,
  narrative: "Alex wants a grade summary for sections 1, 4, and 5: the course title and the <b>average final_grade</b> (rounded to 2 decimal places), grouped by course.",
  starter: "SELECT co.course_title, ROUND(AVG(g.final_grade), 2) AS avg_grade\nFROM Grades g\nJOIN Enrollment e ON g.enrollment_id = e.enrollment_id\nJOIN Sections se ON e.section_id = se.section_id\nJOIN Courses co ON se.course_id = co.course_id\nWHERE se.section_id IN (1,4,5)\nGROUP BY co.course_id\nORDER BY co.course_id;",
  expected: {"columns": ["course_title", "avg_grade"], "rows": [["Intro to Programming", 74.33], ["Database Systems", 76.75], ["Statics of Rigid Bodies", 79.0]]}
},
{
  tag: "TEST CASE 12",
  points: 5,
  narrative: "Cherry needs to find sections that are actually filling up. Return <b>section_id, enrolled</b> (a count of enrollment rows) for every section with <b>more than one</b> enrolled student, using <b>GROUP BY</b> and <b>HAVING</b>.",
  starter: "SELECT se.section_id, COUNT(e.enrollment_id) AS enrolled\nFROM Sections se\nJOIN Enrollment e ON se.section_id = e.section_id\nGROUP BY se.section_id\nHAVING COUNT(e.enrollment_id) > 1\nORDER BY se.section_id;",
  expected: {"columns": ["section_id", "enrolled"], "rows": [[1, 3], [4, 2], [5, 2], [7, 2], [9, 2], [11, 2], [15, 2], [16, 2]]}
},
{
  tag: "TEST CASE 13",
  points: 5,
  narrative: "Using a <b>subquery</b>, Lin wants to flag the students who paid <b>more</b> than the average payment amount across the whole university. Return <b>first_name, last_name, amount</b>, ordered by amount descending.",
  starter: "SELECT s.first_name, s.last_name, p.amount\nFROM Payments p\nJOIN Students s ON p.student_id = s.student_id\nWHERE p.amount > (SELECT AVG(amount) FROM Payments)\nORDER BY p.amount DESC, s.student_id;",
  expected: {"columns": ["first_name", "last_name", "amount"], "rows": [["Juan", "Dela Cruz", 15000], ["Maria", "Santos", 15000], ["Ana", "Garcia", 15000], ["Liza", "Torres", 15000], ["Grace", "Bautista", 15000], ["Paolo", "Cruz", 15000], ["Nina", "Aquino", 15000], ["Ella", "Fernandez", 15000]]}
},
{
  tag: "TEST CASE 14",
  points: 5,
  narrative: "Mei is auditing tuition payments made by students enrolled in <b>BS Computer Science</b> (program_id 1). Chain Students through Enrollment, Sections, and Courses to Payments, and return <b>first_name, last_name, amount</b>.",
  starter: "SELECT s.first_name, s.last_name, py.amount\nFROM Students s\nJOIN Enrollment e ON s.student_id = e.student_id\nJOIN Sections se ON e.section_id = se.section_id\nJOIN Courses co ON se.course_id = co.course_id\nJOIN Payments py ON py.student_id = s.student_id\nWHERE co.program_id = 1\nORDER BY s.student_id;",
  expected: {"columns": ["first_name", "last_name", "amount"], "rows": [["Juan", "Dela Cruz", 15000], ["Juan", "Dela Cruz", 15000], ["Maria", "Santos", 15000], ["Pedro", "Reyes", 12000], ["Ana", "Garcia", 15000], ["Jose", "Ramos", 10000]]}
},
{
  tag: "TEST CASE 15",
  points: 5,
  narrative: "For enrollment records 1 through 5, Maomao wants an attendance tally \u2014 <b>every</b> enrollment should show up even if no attendance has been logged yet. Return <b>enrollment_id, days_logged</b> (a count of ClassAttendance rows).",
  starter: "SELECT e.enrollment_id, COUNT(ca.attendance_id) AS days_logged\nFROM Enrollment e\nLEFT JOIN ClassAttendance ca ON e.enrollment_id = ca.enrollment_id\nWHERE e.enrollment_id BETWEEN 1 AND 5\nGROUP BY e.enrollment_id\nORDER BY e.enrollment_id;",
  expected: {"columns": ["enrollment_id", "days_logged"], "rows": [[1, 3], [2, 2], [3, 2], [4, 1], [5, 2]]}
},
{
  tag: "TEST CASE 16",
  points: 5,
  narrative: "Akito wants a college-level overview: <b>college_name, program_count</b> for every college, including any college that happens to offer very few programs.",
  starter: "SELECT c.college_name, COUNT(p.program_id) AS program_count\nFROM Colleges c\nLEFT JOIN Programs p ON c.college_id = p.college_id\nGROUP BY c.college_id\nORDER BY c.college_id;",
  expected: {"columns": ["college_name", "program_count"], "rows": [["College of Engineering", 2], ["College of Arts and Sciences", 2], ["College of Business", 2], ["College of Education", 1], ["College of Nursing", 1]]}
},
{
  tag: "TEST CASE 17",
  points: 5,
  narrative: "For students 1 and 2, An wants the full academic path: first_name, course_code, and program_name \u2014 chained across Enrollment, Sections, Courses, and Programs, a <b>four-table</b> join.",
  starter: "SELECT st.first_name, co.course_code, p.program_name\nFROM Students st\nJOIN Enrollment e ON st.student_id = e.student_id\nJOIN Sections se ON e.section_id = se.section_id\nJOIN Courses co ON se.course_id = co.course_id\nJOIN Programs p ON co.program_id = p.program_id\nWHERE st.student_id IN (1,2)\nORDER BY st.student_id, co.course_id;",
  expected: {"columns": ["first_name", "course_code", "program_name"], "rows": [["Juan", "CS101", "BS Computer Science"], ["Juan", "CS201", "BS Computer Science"], ["Maria", "CS101", "BS Computer Science"], ["Maria", "PSY102", "BS Psychology"]]}
},
{
  tag: "TEST CASE 18",
  points: 5,
  narrative: "Nicole needs a list of students who have <b>no payment record at all</b> on file \u2014 an anti-join between Students and Payments. Return <b>student_id, first_name, last_name</b>.",
  starter: "SELECT s.student_id, s.first_name, s.last_name\nFROM Students s\nLEFT JOIN Payments p ON s.student_id = p.student_id\nWHERE p.payment_id IS NULL\nORDER BY s.student_id;",
  expected: {"columns": ["student_id", "first_name", "last_name"], "rows": [[7, "Mark", "Villanueva"], [11, "Carlo", "Mendoza"], [13, "Rafael", "Gonzales"], [14, "Sofia", "Navarro"], [15, "Diego", "Castillo"], [16, "Camille", "Ocampo"], [17, "Miguel", "Salazar"], [18, "Isabel", "Pascual"], [19, "Gabriel", "Domingo"], [20, "Trisha", "Roxas"]]}
},
{
  tag: "TEST CASE 19",
  points: 5,
  narrative: "For the Dean's List shortlist, Darren wants the <b>top 3</b> highest final_grade records university-wide. Return <b>first_name, last_name, final_grade</b>, ordered highest first.",
  starter: "SELECT st.first_name, st.last_name, g.final_grade\nFROM Grades g\nJOIN Enrollment e ON g.enrollment_id = e.enrollment_id\nJOIN Students st ON e.student_id = st.student_id\nORDER BY g.final_grade DESC\nLIMIT 3;",
  expected: {"columns": ["first_name", "last_name", "final_grade"], "rows": [["Mark", "Villanueva", 95.5], ["Ana", "Garcia", 93], ["Ella", "Fernandez", 91]]}
},
{
  tag: "TEST CASE 20 \u2014 CLOSING THE FILE",
  points: 5,
  narrative: "Final check: for instructors 8 through 10, return <b>instructor_name, section_id, course_title</b> chained across Sections and Courses \u2014 and make sure <b>no instructor disappears</b> from the report just because they aren't assigned a section yet.",
  starter: "SELECT i.instructor_name, se.section_id, co.course_title\nFROM Instructors i\nLEFT JOIN Sections se ON i.instructor_id = se.instructor_id\nLEFT JOIN Courses co ON se.course_id = co.course_id\nWHERE i.instructor_id BETWEEN 8 AND 10\nORDER BY i.instructor_id, se.section_id;",
  expected: {"columns": ["instructor_name", "section_id", "course_title"], "rows": [["Prof. Daniel Uy", 14, "Foundations of Education"], ["Dr. Grace Manalo", 15, "Anatomy and Physiology"], ["Prof. Victor Chua", 16, "Fundamentals of Nursing"]]}
}
];
let db = null;
let score = 0;
let solved = new Array(TEST_CASES.length).fill(false);

function esc(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function buildCaseList(){
  const wrap = document.getElementById('caseList');
  wrap.innerHTML = TEST_CASES.map((tc, idx) => `
    <div class="case-card" id="card-${idx}">
      <span class="qpoints">${tc.points} PTS</span>
      <div class="evidence-tag">${tc.tag}</div>
      <div class="narrative">${tc.narrative}</div>
      <div class="editor">
        <div class="gutter" id="gutter-${idx}">1</div>
        <textarea class="sqlbox" id="sql-${idx}" spellcheck="false" placeholder="-- write your query here"></textarea>
      </div>
      <div class="card-actions">
        <div class="btn-group">
          <button class="btn-check" id="btn-${idx}" onclick="checkCase(${idx})" disabled>CHECK CODE</button>
          <button class="btn-hint" id="hintbtn-${idx}" onclick="toggleHint(${idx})">HINT</button>
        </div>
        <span class="status-pill" id="pill-${idx}"></span>
      </div>
    </div>
  `).join('');

  TEST_CASES.forEach((tc, idx) => {
    const ta = document.getElementById('sql-'+idx);
    const gutter = document.getElementById('gutter-'+idx);
    const updateGutter = () => {
      const lines = ta.value.split('\n').length;
      let nums = '';
      for(let i=1;i<=lines;i++) nums += i + '\n';
      gutter.textContent = nums.trim('\n');
    };
    updateGutter();
    ta.addEventListener('input', () => { updateGutter(); saveProgress(); });
    ta.addEventListener('scroll', () => { gutter.scrollTop = ta.scrollTop; });
  });
}

function toggleHint(idx){
  const ta = document.getElementById('sql-'+idx);
  const btn = document.getElementById('hintbtn-'+idx);
  const checkBtn = document.getElementById('btn-'+idx);
  const showingHint = ta.dataset.hintShown === '1';

  if(showingHint){
    ta.value = ta.dataset.userAnswer || '';
    ta.readOnly = false;
    ta.classList.remove('hint-active');
    ta.dataset.hintShown = '0';
    btn.textContent = 'HINT';
    btn.classList.remove('on');
    if(db) checkBtn.disabled = false;
  } else {
    ta.dataset.userAnswer = ta.value;
    ta.value = TEST_CASES[idx].starter;
    ta.readOnly = true;
    ta.classList.add('hint-active');
    ta.dataset.hintShown = '1';
    btn.textContent = 'BACK TO MY ANSWER';
    btn.classList.add('on');
    checkBtn.disabled = true;
  }
  ta.dispatchEvent(new Event('input'));
}

function normalizeRows(rows){
  return rows.map(r => r.map(v => v===null||v===undefined ? 'NULL' : String(v)).join('~~')).sort();
}

function renderTable(columns, rows){
  if(rows.length === 0){
    return '<p class="placeholder">(0 rows)</p>';
  }
  let html = '<table class="resultTbl"><thead><tr>';
  columns.forEach(c => html += `<th>${esc(c)}</th>`);
  html += '</tr></thead><tbody>';
  rows.slice(0, 40).forEach(row => {
    html += '<tr>';
    row.forEach(v => {
      if(v === null || v === undefined){
        html += '<td class="nullval">NULL</td>';
      } else {
        html += `<td>${esc(v)}</td>`;
      }
    });
    html += '</tr>';
  });
  html += '</tbody></table>';
  if(rows.length > 40) html += `<p class="placeholder">…and ${rows.length-40} more rows</p>`;
  return html;
}

function updateScore(){
  document.getElementById('scoreVal').textContent = score + ' / 100';
  const solvedCount = solved.filter(Boolean).length;
  const pct = Math.round((solvedCount / TEST_CASES.length) * 100);
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressLabel').textContent = solvedCount + ' / ' + TEST_CASES.length + ' solved';
}

function showView(name){
  ['cases','schema','scratchpad'].forEach(v => {
    document.getElementById('view-'+v).classList.toggle('hidden', v !== name);
    document.getElementById('tab-'+v).classList.toggle('active', v === name);
  });
  try { localStorage.setItem('activeView', name); } catch(e){}
}

function renderSchemaTable(columns, rows){
  if(rows.length === 0){
    return '<p class="placeholder">(no rows yet)</p>';
  }
  let html = '<div class="sample-scroll"><table class="sampleTbl"><thead><tr>';
  columns.forEach(c => html += `<th>${esc(c)}</th>`);
  html += '</tr></thead><tbody>';
  rows.forEach(row => {
    html += '<tr>';
    row.forEach(v => {
      if(v === null || v === undefined){
        html += '<td class="nullval">NULL</td>';
      } else {
        html += `<td>${esc(v)}</td>`;
      }
    });
    html += '</tr>';
  });
  html += '</tbody></table></div>';
  return html;
}

function buildSchemaView(){
  const wrap = document.getElementById('schemaWrap');
  try {
    const tableRows = db.exec("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;");
    const tableNames = tableRows.length ? tableRows[0].values.map(r => r[0]) : [];

    wrap.innerHTML = tableNames.map(tname => {
      const colInfo = db.exec(`PRAGMA table_info(${tname});`);
      const fkInfo = db.exec(`PRAGMA foreign_key_list(${tname});`);
      const countRes = db.exec(`SELECT COUNT(*) FROM ${tname};`);
      const rowCount = countRes.length ? countRes[0].values[0][0] : 0;

      const fkMap = {};
      if(fkInfo.length){
        fkInfo[0].values.forEach(fk => {
          const cols = fkInfo[0].columns;
          const fromCol = fk[cols.indexOf('from')];
          const toTable = fk[cols.indexOf('table')];
          const toCol = fk[cols.indexOf('to')];
          fkMap[fromCol] = `${toTable}.${toCol}`;
        });
      }

      const cols = colInfo.length ? colInfo[0].values : [];
      const colHtml = cols.map(c => {
        const [, name, type, , , pk] = c;
        const badges = [];
        if(pk) badges.push('<span class="key-badge pk">PK</span>');
        if(fkMap[name]) badges.push(`<span class="key-badge fk">FK → ${esc(fkMap[name])}</span>`);
        return `<tr><td>${esc(name)}</td><td>${esc(type)}</td><td>${badges.join(' ')}</td></tr>`;
      }).join('');

      const sample = db.exec(`SELECT * FROM ${tname} LIMIT 5;`);
      const sampleHtml = sample.length
        ? renderSchemaTable(sample[0].columns, sample[0].values)
        : '<p class="placeholder">(no rows yet)</p>';

      return `
        <div class="schema-table-card">
          <h4>${esc(tname)}</h4>
          <div class="rowcount">${rowCount} row${rowCount === 1 ? '' : 's'}</div>
          <table class="schemaTbl">
            <thead><tr><th>Column</th><th>Type</th><th>Keys</th></tr></thead>
            <tbody>${colHtml}</tbody>
          </table>
          <div class="schema-sample-label">SAMPLE ROWS</div>
          ${sampleHtml}
        </div>
      `;
    }).join('');
  } catch(err){
    wrap.innerHTML = `<div class="errBox">Could not read database schema: ${esc(err.message)}</div>`;
  }
}

function checkCase(idx){
  const tc = TEST_CASES[idx];
  const sql = document.getElementById('sql-'+idx).value;
  const queryPanel = document.getElementById('queryPanel');
  const yourPanel = document.getElementById('yourOutputPanel');
  const expPanel = document.getElementById('expectedPanel');
  const pill = document.getElementById('pill-'+idx);

  queryPanel.innerHTML = `<pre class="queryEcho">${esc(sql)}</pre>`;
  expPanel.innerHTML = renderTable(tc.expected.columns, tc.expected.rows);

  let result;
  try {
    result = db.exec(sql);
  } catch(err){
    yourPanel.innerHTML = `<div class="errBox">SQL ERROR:\n${esc(err.message)}</div>`;
    pill.textContent = 'INCORRECT';
    pill.className = 'status-pill fail';
    return;
  }

  if(!result || result.length === 0){
    yourPanel.innerHTML = `<div class="errBox">Query ran but returned no result set (did you write a SELECT?).</div>`;
    pill.textContent = 'INCORRECT';
    pill.className = 'status-pill fail';
    return;
  }

  const { columns, values } = result[0];
  yourPanel.innerHTML = renderTable(columns, values);

  const colCountMatch = columns.length === tc.expected.columns.length;
  const gotNorm = normalizeRows(values);
  const expNorm = normalizeRows(tc.expected.rows);
  const rowsMatch = colCountMatch && gotNorm.length === expNorm.length &&
    gotNorm.every((v, i) => v === expNorm[i]);

  if(rowsMatch){
    pill.textContent = 'VERIFIED';
    pill.className = 'status-pill pass';
    if(!solved[idx]){
      solved[idx] = true;
      score += tc.points;
      updateScore();
    }
  } else {
    pill.textContent = 'INCORRECT';
    pill.className = 'status-pill fail';
  }
  saveProgress();
}

function runScratch(){
  const sql = document.getElementById('sql-scratch').value;
  const resultPanel = document.getElementById('scratchResult');
  const pill = document.getElementById('pill-scratch');

  let result;
  try {
    result = db.exec(sql);
  } catch(err){
    resultPanel.innerHTML = `<div class="errBox">SQL ERROR:\n${esc(err.message)}</div>`;
    pill.textContent = 'ERROR';
    pill.className = 'status-pill fail';
    return;
  }

  if(!result || result.length === 0){
    resultPanel.innerHTML = `<p class="placeholder">Query ran with no result set returned (e.g. a statement other than SELECT).</p>`;
    pill.textContent = '';
    pill.className = 'status-pill';
    return;
  }

  const { columns, values } = result[0];
  resultPanel.innerHTML = renderTable(columns, values);
  pill.textContent = 'RAN';
  pill.className = 'status-pill pass';
}

function saveProgress(){
  try {
    const answers = TEST_CASES.map((tc, idx) => {
      const ta = document.getElementById('sql-'+idx);
      return ta.dataset.hintShown === '1' ? (ta.dataset.userAnswer || '') : ta.value;
    });
    const state = { score, solved, answers };
    localStorage.setItem('registrarProgress', JSON.stringify(state));
  } catch(e){}
}

function loadProgress(){
  try {
    const raw = localStorage.getItem('registrarProgress');
    if(!raw) return;
    const state = JSON.parse(raw);
    if(!state || !Array.isArray(state.solved)) return;

    score = state.score || 0;
    solved = TEST_CASES.map((tc, idx) => !!state.solved[idx]);

    TEST_CASES.forEach((tc, idx) => {
      const ta = document.getElementById('sql-'+idx);
      if(state.answers && state.answers[idx]){
        ta.value = state.answers[idx];
        ta.dispatchEvent(new Event('input'));
      }
      if(solved[idx]){
        const pill = document.getElementById('pill-'+idx);
        pill.textContent = 'VERIFIED';
        pill.className = 'status-pill pass';
      }
    });

    updateScore();
  } catch(e){}
}

function boot(){
  initSqlJs({ locateFile: f => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${f}` }).then(SQL => {
    db = new SQL.Database();
    try {
      db.run(SCHEMA_SQL);
      const statusEl = document.getElementById('dbStatus');
      statusEl.textContent = 'University database loaded — 10 tables, ready for query.';
      statusEl.className = 'ready';
      document.querySelectorAll('.btn-check').forEach(b => b.disabled = false);
      buildSchemaView();
    } catch(err){
      const statusEl = document.getElementById('dbStatus');
      statusEl.textContent = 'Failed to load university database: ' + err.message;
      statusEl.className = 'error';
    }
  }).catch(err => {
    const statusEl = document.getElementById('dbStatus');
    statusEl.textContent = 'Could not load the SQL engine (check your internet connection): ' + err.message;
    statusEl.className = 'error';
  });
}

function initScratchGutter(){
  const ta = document.getElementById('sql-scratch');
  const gutter = document.getElementById('gutter-scratch');
  const updateGutter = () => {
    const lines = ta.value.split('\n').length;
    let nums = '';
    for(let i=1;i<=lines;i++) nums += i + '\n';
    gutter.textContent = nums.trim('\n');
  };
  updateGutter();
  ta.addEventListener('input', updateGutter);
  ta.addEventListener('scroll', () => { gutter.scrollTop = ta.scrollTop; });
}

buildCaseList();
initScratchGutter();
loadProgress();
boot();

try {
  const savedView = localStorage.getItem('activeView');
  if(savedView === 'schema' || savedView === 'scratchpad'){ showView(savedView); }
} catch(e){}
