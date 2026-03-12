// ── RIASEC Assessment Questions (expanded to 36) ──
export const RIASEC_QUESTIONS = [
    // Realistic (6)
    { text: 'I enjoy working with tools, machines, or equipment.', type: 'R' },
    { text: 'I like building, fixing, or repairing things.', type: 'R' },
    { text: 'I prefer outdoor or hands-on activities.', type: 'R' },
    { text: 'I would enjoy working on a construction site or farm.', type: 'R' },
    { text: 'I like working with my hands to create or assemble things.', type: 'R' },
    { text: 'I prefer practical tasks over theoretical discussions.', type: 'R' },
    // Investigative (6)
    { text: 'I like solving complex puzzles and problems.', type: 'I' },
    { text: 'I enjoy learning about scientific concepts.', type: 'I' },
    { text: 'I like analysing data or conducting experiments.', type: 'I' },
    { text: 'I enjoy reading about discoveries and innovations.', type: 'I' },
    { text: 'I would enjoy investigating the cause of a problem.', type: 'I' },
    { text: 'I like understanding how and why things work.', type: 'I' },
    // Artistic (6)
    { text: 'I enjoy creative activities like writing, music, or art.', type: 'A' },
    { text: 'I value original ideas and self-expression.', type: 'A' },
    { text: 'I like designing things or creating visual content.', type: 'A' },
    { text: 'I enjoy attending cultural events, exhibitions, or performances.', type: 'A' },
    { text: 'I prefer unstructured environments where I can be creative.', type: 'A' },
    { text: 'I would enjoy creating content for social media or a blog.', type: 'A' },
    // Social (6)
    { text: 'I enjoy helping people with their problems.', type: 'S' },
    { text: 'I like teaching, mentoring, or coaching others.', type: 'S' },
    { text: 'I am empathetic and enjoy supporting people emotionally.', type: 'S' },
    { text: 'I would enjoy volunteering at a community organisation.', type: 'S' },
    { text: 'I prefer working in teams rather than alone.', type: 'S' },
    { text: 'I care deeply about social justice and equality.', type: 'S' },
    // Enterprising (6)
    { text: 'I enjoy leading groups and taking charge of projects.', type: 'E' },
    { text: 'I like persuading or motivating others.', type: 'E' },
    { text: 'I am interested in business, sales, or entrepreneurship.', type: 'E' },
    { text: 'I enjoy debating and presenting ideas to others.', type: 'E' },
    { text: 'I would enjoy running my own business one day.', type: 'E' },
    { text: 'I like setting ambitious goals and working toward them.', type: 'E' },
    // Conventional (6)
    { text: 'I like organising information and keeping records.', type: 'C' },
    { text: 'I prefer structured environments with clear rules.', type: 'C' },
    { text: 'I enjoy working with numbers, spreadsheets, or data.', type: 'C' },
    { text: 'I pay close attention to detail and accuracy.', type: 'C' },
    { text: 'I like filing, categorising, and systemising information.', type: 'C' },
    { text: 'I would enjoy planning and scheduling events or tasks.', type: 'C' },
];

// ── RIASEC Career Recommendations (expanded with SA-specific careers) ──
export const RIASEC_CAREERS = {
    R: {
        name: 'Realistic', desc: 'Practical, hands-on problem-solving',
        careers: ['Civil Engineer', 'Electrician', 'Mining Engineer', 'Agricultural Scientist', 'Mechanic', 'Surveyor', 'Environmental Technician', 'Artisan (TVET)'],
        qualifications: ['BSc Civil Engineering', 'N4-N6 Electrical Engineering', 'BSc Mining Engineering', 'Diploma in Agriculture'],
    },
    I: {
        name: 'Investigative', desc: 'Analytical, intellectual, scientific',
        careers: ['Data Scientist', 'Research Scientist', 'Medical Doctor', 'Forensic Analyst', 'Pharmacist', 'Actuary', 'Software Engineer', 'Biomedical Technologist'],
        qualifications: ['BSc Data Science', 'MBChB (Medicine)', 'BPharm (Pharmacy)', 'BSc Actuarial Science'],
    },
    A: {
        name: 'Artistic', desc: 'Creative, expressive, innovative',
        careers: ['Graphic Designer', 'Filmmaker', 'Architect', 'Content Creator', 'Fashion Designer', 'UX/UI Designer', 'Musician', 'Journalist'],
        qualifications: ['BA Design', 'BA Film & Television', 'BSc Architecture', 'Diploma in Multimedia'],
    },
    S: {
        name: 'Social', desc: 'Helping, teaching, counselling',
        careers: ['Social Worker', 'Teacher', 'Nurse', 'Psychologist', 'Occupational Therapist', 'Community Development Worker', 'Human Resources Manager', 'Speech Therapist'],
        qualifications: ['BSW (Social Work)', 'BEd (Education)', 'BCur (Nursing)', 'BA Psychology'],
    },
    E: {
        name: 'Enterprising', desc: 'Leading, persuading, managing',
        careers: ['Business Manager', 'Lawyer', 'Marketing Director', 'Real Estate Agent', 'Entrepreneur', 'Political Analyst', 'Sales Director', 'Management Consultant'],
        qualifications: ['BCom Business Management', 'LLB (Law)', 'BCom Marketing', 'MBA'],
    },
    C: {
        name: 'Conventional', desc: 'Organising, detail-oriented, systematic',
        careers: ['Chartered Accountant (SA)', 'Auditor', 'Financial Analyst', 'Tax Consultant', 'Logistics Manager', 'Bank Manager', 'Compliance Officer', 'Bookkeeper'],
        qualifications: ['BCom Accounting (CA stream)', 'Diploma in Financial Planning', 'BCom Supply Chain Management'],
    },
};

// ── RIASEC Type Colours ──
export const RIASEC_TYPE_COLORS = {
    R: '#FF8C42', I: '#4F8EF7', A: '#FF5A9E', S: '#30D980', E: '#F5C842', C: '#7B5FFF',
};

// ── Institution Type Metadata ──
export const TYPE_META = {
    university: { label: 'Universities', icon: '🏛️', color: '#4F8EF7', filter: 'Universities' },
    uot: { label: 'Universities of Technology', icon: '⚙️', color: '#7B5FFF', filter: 'UoT' },
    tvet: { label: 'TVET Colleges', icon: '🔧', color: '#30D980', filter: 'TVET' },
    private: { label: 'Private Colleges', icon: '🏫', color: '#F5C842', filter: 'Private' },
};

// ── CV Templates ──
export const CV_TEMPLATES = [
    { id: 'graduate', label: 'Graduate / Entry-Level', icon: '🎓', desc: 'Best for recent graduates and first-time job seekers. Emphasises education and skills.' },
    { id: 'professional', label: 'Professional', icon: '💼', desc: 'For candidates with 2+ years of experience. Focuses on work history and achievements.' },
    { id: 'academic', label: 'Academic / Bursary', icon: '📚', desc: 'Ideal for bursary and postgraduate applications. Highlights research and academic achievements.' },
];

export const EMPTY_CV = {
    name: '', email: '', phone: '', city: '', linkedin: '', idNumber: '', objective: '',
    education: [{ institution: '', qualification: '', year: '', average: '' }],
    experience: [{ company: '', role: '', period: '', duties: '' }],
    skills: '', languages: '', references: '',
};

// ── Freebie Categories ──
export const FREEBIE_CATEGORIES = ['All', 'Software', 'Cloud', 'Learning', 'Writing', 'Design', 'Finance'];

// ── APS Subject Points ──
export const APS_POINTS = {
    '90-100': 8, '80-89': 7, '70-79': 6, '60-69': 5, '50-59': 4, '40-49': 3, '30-39': 2, '0-29': 1,
};

export const MATRIC_SUBJECTS = [
    'Home Language', 'First Additional Language', 'Mathematics', 'Mathematical Literacy',
    'Physical Sciences', 'Life Sciences', 'Accounting', 'Business Studies', 'Economics',
    'Geography', 'History', 'Information Technology', 'Computer Applications Technology',
    'Engineering Graphics & Design', 'Agricultural Sciences', 'Life Orientation',
    'Tourism', 'Consumer Studies', 'Visual Arts', 'Dramatic Arts', 'Music',
];
