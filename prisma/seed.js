const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Delete existing data
    await prisma.institution.deleteMany();
    await prisma.bursary.deleteMany();
    await prisma.resource.deleteMany();

    // ─── INSTITUTIONS ───
    const institutions = [
        // Universities
        { name: 'University of Cape Town', abbr: 'UCT', city: 'Cape Town', province: 'Western Cape', type: 'university', rank: 1, tuition: 45000, logo: '🎓', logoUrl: 'https://www.google.com/s2/favicons?domain=uct.ac.za&sz=128', color: '#003B5C', courses: ['Law', 'Medicine', 'Engineering', 'Commerce', 'Humanities', 'Science'], acceptance: 12, founded: 1829, students: 29000, description: "Africa's leading research university, consistently ranked in the world's top 200.", website: 'https://www.uct.ac.za', applyUrl: 'https://applyonline.uct.ac.za', aps: 34 },
        { name: 'University of the Witwatersrand', abbr: 'Wits', city: 'Johannesburg', province: 'Gauteng', type: 'university', rank: 2, tuition: 42000, logo: '🏛️', logoUrl: 'https://www.google.com/s2/favicons?domain=wits.ac.za&sz=128', color: '#003F72', courses: ['Mining Engineering', 'Medicine', 'Law', 'Commerce', 'Science', 'Arts'], acceptance: 15, founded: 1896, students: 38000, description: "A world-class research university in the heart of Johannesburg.", website: 'https://www.wits.ac.za', applyUrl: 'https://self-service.wits.ac.za', aps: 32 },
        { name: 'Stellenbosch University', abbr: 'SU', city: 'Stellenbosch', province: 'Western Cape', type: 'university', rank: 3, tuition: 40000, logo: '🌿', logoUrl: 'https://www.google.com/s2/favicons?domain=sun.ac.za&sz=128', color: '#8B2332', courses: ['Agriculture', 'Engineering', 'Medicine', 'Commerce', 'Arts', 'Science'], acceptance: 18, founded: 1866, students: 32000, description: "A leading research-intensive university in one of the world's most beautiful towns.", website: 'https://www.sun.ac.za', applyUrl: 'https://www.sun.ac.za/english/Pages/Apply-Online.aspx', aps: 30 },
        { name: 'University of Pretoria', abbr: 'UP', city: 'Pretoria', province: 'Gauteng', type: 'university', rank: 4, tuition: 38000, logo: '🦁', logoUrl: 'https://www.google.com/s2/favicons?domain=up.ac.za&sz=128', color: '#660033', courses: ['Veterinary Science', 'Engineering', 'Law', 'Commerce', 'Education', 'Medicine'], acceptance: 20, founded: 1908, students: 55000, description: "The largest residential university in South Africa.", website: 'https://www.up.ac.za', applyUrl: 'https://www.up.ac.za/apply', aps: 30 },
        { name: 'University of KwaZulu-Natal', abbr: 'UKZN', city: 'Durban', province: 'KwaZulu-Natal', type: 'university', rank: 5, tuition: 35000, logo: '🌊', logoUrl: 'https://www.google.com/s2/favicons?domain=ukzn.ac.za&sz=128', color: '#003366', courses: ['Medicine', 'Engineering', 'Law', 'Agriculture', 'Science', 'Arts'], acceptance: 22, founded: 2004, students: 47000, description: "The premier university of KwaZulu-Natal, known for its medical school.", website: 'https://www.ukzn.ac.za', applyUrl: 'https://applications.ukzn.ac.za', aps: 28 },
        { name: 'University of Johannesburg', abbr: 'UJ', city: 'Johannesburg', province: 'Gauteng', type: 'university', rank: 6, tuition: 32000, logo: '🔬', logoUrl: 'https://www.google.com/s2/favicons?domain=uj.ac.za&sz=128', color: '#FF6600', courses: ['Engineering', 'IT', 'Commerce', 'Law', 'Education', 'Health Sciences'], acceptance: 25, founded: 2005, students: 50000, description: "A vibrant, multicultural university at the heart of South Africa's economic centre.", website: 'https://www.uj.ac.za', applyUrl: 'https://www.uj.ac.za/studyatUJ/Pages/apply.aspx', aps: 26 },
        { name: 'Rhodes University', abbr: 'RU', city: 'Makhanda', province: 'Eastern Cape', type: 'university', rank: 7, tuition: 52000, logo: '🏔️', logoUrl: 'https://www.google.com/s2/favicons?domain=ru.ac.za&sz=128', color: '#660066', courses: ['Journalism', 'Pharmacy', 'Law', 'Commerce', 'Science', 'Humanities'], acceptance: 30, founded: 1904, students: 8500, description: "A small, prestigious university renowned for its research output per capita.", website: 'https://www.ru.ac.za', applyUrl: 'https://www.ru.ac.za/admissions/', aps: 30 },
        { name: 'University of the Western Cape', abbr: 'UWC', city: 'Cape Town', province: 'Western Cape', type: 'university', rank: 8, tuition: 28000, logo: '🌍', logoUrl: 'https://www.google.com/s2/favicons?domain=uwc.ac.za&sz=128', color: '#003399', courses: ['Dentistry', 'Pharmacy', 'Law', 'Science', 'Arts', 'Education'], acceptance: 35, founded: 1960, students: 24000, description: "A national university forged in the struggle against apartheid and injustice.", website: 'https://www.uwc.ac.za', applyUrl: 'https://www.uwc.ac.za/apply', aps: 24 },
        { name: 'North-West University', abbr: 'NWU', city: 'Potchefstroom', province: 'North West', type: 'university', rank: 9, tuition: 30000, logo: '🌾', logoUrl: 'https://www.google.com/s2/favicons?domain=nwu.ac.za&sz=128', color: '#003366', courses: ['Education', 'Engineering', 'Commerce', 'Law', 'Health Sciences', 'Theology'], acceptance: 40, founded: 2004, students: 64000, description: "One of the largest universities in SA with campuses across three provinces.", website: 'https://www.nwu.ac.za', applyUrl: 'https://studies.nwu.ac.za', aps: 24 },
        { name: 'University of the Free State', abbr: 'UFS', city: 'Bloemfontein', province: 'Free State', type: 'university', rank: 10, tuition: 28000, logo: '🏵️', logoUrl: 'https://www.google.com/s2/favicons?domain=ufs.ac.za&sz=128', color: '#CC6600', courses: ['Agriculture', 'Medicine', 'Law', 'Commerce', 'Science', 'Education'], acceptance: 42, founded: 1904, students: 40000, description: "A multicultural university in the heart of South Africa.", website: 'https://www.ufs.ac.za', applyUrl: 'https://www.ufs.ac.za/apply', aps: 22 },
        { name: 'UNISA', abbr: 'UNISA', city: 'Pretoria', province: 'Gauteng', type: 'university', rank: 11, tuition: 15000, logo: '📖', logoUrl: 'https://www.google.com/s2/favicons?domain=unisa.ac.za&sz=128', color: '#003366', courses: ['Law', 'Commerce', 'Education', 'Science', 'Arts', 'Agriculture'], acceptance: 90, founded: 1873, students: 400000, description: "Africa's largest open-distance learning institution.", website: 'https://www.unisa.ac.za', applyUrl: 'https://www.unisa.ac.za/sites/corporate/default/Apply-for-admission', aps: 0 },
        { name: 'Nelson Mandela University', abbr: 'NMU', city: 'Gqeberha', province: 'Eastern Cape', type: 'university', rank: 12, tuition: 30000, logo: '✊', logoUrl: 'https://www.google.com/s2/favicons?domain=mandela.ac.za&sz=128', color: '#003366', courses: ['Engineering', 'Business', 'Education', 'Health Sciences', 'Law', 'Architecture'], acceptance: 45, founded: 2005, students: 27000, description: "Named after the father of the nation, committed to transformative education.", website: 'https://www.mandela.ac.za', applyUrl: 'https://apps.mandela.ac.za/ufh-application', aps: 24 },
        { name: 'University of Limpopo', abbr: 'UL', city: 'Polokwane', province: 'Limpopo', type: 'university', rank: 13, tuition: 25000, logo: '🌳', logoUrl: 'https://www.google.com/s2/favicons?domain=ul.ac.za&sz=128', color: '#006633', courses: ['Medicine', 'Law', 'Science', 'Education', 'Management', 'Agriculture'], acceptance: 50, founded: 2005, students: 22000, description: "The university of choice in the Limpopo province.", website: 'https://www.ul.ac.za', applyUrl: 'https://www.ul.ac.za/application', aps: 22 },
        { name: 'University of Venda', abbr: 'UniVen', city: 'Thohoyandou', province: 'Limpopo', type: 'university', rank: 14, tuition: 24000, logo: '🌿', logoUrl: 'https://www.google.com/s2/favicons?domain=univen.ac.za&sz=128', color: '#006600', courses: ['Environmental Sciences', 'Education', 'Law', 'Health Sciences', 'Agriculture', 'Management'], acceptance: 55, founded: 1982, students: 16000, website: 'https://www.univen.ac.za', aps: 20 },
        { name: 'University of Zululand', abbr: 'UniZulu', city: 'Empangeni', province: 'KwaZulu-Natal', type: 'university', rank: 15, tuition: 24000, logo: '🦏', logoUrl: 'https://www.google.com/s2/favicons?domain=unizulu.ac.za&sz=128', color: '#003366', courses: ['Education', 'Commerce', 'Science', 'Arts', 'Law'], acceptance: 55, founded: 1960, students: 18000, website: 'https://www.unizulu.ac.za', aps: 20 },
        { name: 'Walter Sisulu University', abbr: 'WSU', city: 'Mthatha', province: 'Eastern Cape', type: 'university', rank: 16, tuition: 25000, logo: '🏗️', logoUrl: 'https://www.google.com/s2/favicons?domain=wsu.ac.za&sz=128', color: '#000066', courses: ['Education', 'Health Sciences', 'Engineering', 'Science', 'Commerce'], acceptance: 60, founded: 2005, students: 27000, website: 'https://www.wsu.ac.za', aps: 20 },

        // UoTs
        { name: 'Cape Peninsula University of Technology', abbr: 'CPUT', city: 'Cape Town', province: 'Western Cape', type: 'uot', rank: 1, tuition: 28000, logo: '⚙️', logoUrl: 'https://www.google.com/s2/favicons?domain=cput.ac.za&sz=128', color: '#003366', courses: ['Engineering', 'IT', 'Design', 'Business', 'Education', 'Health Sciences'], acceptance: 30, founded: 2005, students: 36000, website: 'https://www.cput.ac.za', applyUrl: 'https://www.cput.ac.za/study/apply', aps: 24 },
        { name: 'Tshwane University of Technology', abbr: 'TUT', city: 'Pretoria', province: 'Gauteng', type: 'uot', rank: 2, tuition: 26000, logo: '🔧', logoUrl: 'https://www.google.com/s2/favicons?domain=tut.ac.za&sz=128', color: '#003399', courses: ['Engineering', 'IT', 'Science', 'Agriculture', 'Arts', 'Business'], acceptance: 35, founded: 2004, students: 60000, website: 'https://www.tut.ac.za', applyUrl: 'https://www.tut.ac.za/apply', aps: 22 },
        { name: 'Durban University of Technology', abbr: 'DUT', city: 'Durban', province: 'KwaZulu-Natal', type: 'uot', rank: 3, tuition: 26000, logo: '🌊', logoUrl: 'https://www.google.com/s2/favicons?domain=dut.ac.za&sz=128', color: '#CC0000', courses: ['Engineering', 'IT', 'Health Sciences', 'Accounting', 'Design', 'Management'], acceptance: 35, founded: 2002, students: 33000, website: 'https://www.dut.ac.za', aps: 22 },
        { name: 'Vaal University of Technology', abbr: 'VUT', city: 'Vanderbijlpark', province: 'Gauteng', type: 'uot', rank: 4, tuition: 24000, logo: '🏭', logoUrl: 'https://www.google.com/s2/favicons?domain=vut.ac.za&sz=128', color: '#660000', courses: ['Engineering', 'IT', 'Applied Sciences', 'Management', 'Human Sciences'], acceptance: 40, founded: 1966, students: 20000, website: 'https://www.vut.ac.za', aps: 20 },
        { name: 'Central University of Technology', abbr: 'CUT', city: 'Bloemfontein', province: 'Free State', type: 'uot', rank: 5, tuition: 24000, logo: '⚡', logoUrl: 'https://www.google.com/s2/favicons?domain=cut.ac.za&sz=128', color: '#003366', courses: ['Engineering', 'IT', 'Health Sciences', 'Management', 'Education'], acceptance: 45, founded: 2004, students: 17000, website: 'https://www.cut.ac.za', aps: 20 },
        { name: 'Mangosuthu University of Technology', abbr: 'MUT', city: 'Durban', province: 'KwaZulu-Natal', type: 'uot', rank: 6, tuition: 22000, logo: '🔩', logoUrl: 'https://www.google.com/s2/favicons?domain=mut.ac.za&sz=128', color: '#990000', courses: ['Engineering', 'Natural Sciences', 'Management Sciences'], acceptance: 50, founded: 1979, students: 12000, website: 'https://www.mut.ac.za', aps: 18 },
        { name: 'Sefako Makgatho Health Sciences', abbr: 'SMU', city: 'Pretoria', province: 'Gauteng', type: 'uot', rank: 7, tuition: 35000, logo: '⚕️', logoUrl: 'https://www.google.com/s2/favicons?domain=smu.ac.za&sz=128', color: '#006633', courses: ['Medicine', 'Dentistry', 'Pharmacy', 'Nursing', 'Public Health'], acceptance: 15, founded: 2015, students: 6000, website: 'https://www.smu.ac.za', aps: 28 },

        // TVET Colleges (representative sample)
        ...generateTVETs(),

        // Private Colleges
        ...generatePrivate(),
    ];

    for (const inst of institutions) {
        await prisma.institution.create({
            data: { ...inst, courses: JSON.stringify(inst.courses) },
        });
    }
    console.log(`  ✅ ${institutions.length} institutions seeded`);

    // ─── BURSARIES (60+) ───
    const bursaries = [
        // Government
        { name: 'NSFAS', type: 'government', amount: 'Full funding', criteria: 'Household income < R350,000/year. SA citizen.', fields: ['All fields'], deadline: 'January 2026', logo: '🏛️', provider: 'Government', level: 'Undergraduate', website: 'https://www.nsfas.org.za' },
        { name: 'Funza Lushaka Bursary', type: 'government', amount: 'Full funding', criteria: 'SA citizens studying towards a teaching qualification. Must teach in a public school for the number of years funded.', fields: ['Education'], deadline: 'January 2026', logo: '📚', provider: 'DHET', website: 'https://www.funzalushaka.doe.gov.za' },
        { name: 'Department of Agriculture Bursary', type: 'government', amount: 'R80,000/year', criteria: 'SA citizen studying agriculture-related qualifications at a public institution.', fields: ['Agriculture', 'Environmental Science'], deadline: 'September 2025', logo: '🌾', provider: 'DAFF', website: 'https://www.dalrrd.gov.za' },
        { name: 'Department of Water and Sanitation', type: 'government', amount: 'R85,000/year', criteria: 'SA citizen studying water resources, engineering, or environmental science.', fields: ['Engineering', 'Environmental Science'], deadline: 'October 2025', logo: '💧', provider: 'DWS', level: 'Undergraduate' },
        { name: 'Gauteng City Region Academy', type: 'government', amount: 'Full funding', criteria: 'Gauteng residents studying scarce skills qualifications.', fields: ['Engineering', 'IT', 'Health Sciences'], deadline: 'October 2025', logo: '🏙️', provider: 'Gauteng Provincial Government', province: 'Gauteng' },
        { name: 'Western Cape Government Bursary', type: 'government', amount: 'R70,000/year', criteria: 'Western Cape residents in financial need studying priority fields.', fields: ['Engineering', 'IT', 'Health Sciences', 'Agriculture'], deadline: 'September 2025', logo: '🏔️', provider: 'WC Provincial Government', province: 'Western Cape' },
        { name: 'KZN Provincial Bursary', type: 'government', amount: 'R60,000/year', criteria: 'KwaZulu-Natal residents from disadvantaged backgrounds.', fields: ['All fields'], deadline: 'October 2025', logo: '🌊', provider: 'KZN Premier Office', province: 'KwaZulu-Natal' },
        { name: 'Limpopo Provincial Bursary', type: 'government', amount: 'R55,000/year', criteria: 'Limpopo residents studying critical-skills qualifications.', fields: ['Medicine', 'Engineering', 'Education'], deadline: 'October 2025', logo: '🌳', provider: 'Limpopo Provincial Government', province: 'Limpopo' },

        // SETAs
        { name: 'merSETA Bursary', type: 'seta', amount: 'R80,000/year', criteria: 'SA citizen studying manufacturing, engineering, or related technology.', fields: ['Engineering', 'Manufacturing'], deadline: 'October 2025', logo: '⚙️', provider: 'merSETA', website: 'https://www.merseta.org.za' },
        { name: 'CHIETA Bursary', type: 'seta', amount: 'R70,000/year', criteria: 'SA citizen studying chemical engineering, chemistry, or related fields.', fields: ['Chemical Engineering', 'Chemistry'], deadline: 'September 2025', logo: '🧪', provider: 'CHIETA' },
        { name: 'BANKSETA Bursary', type: 'seta', amount: 'R75,000/year', criteria: 'SA citizen studying banking, finance, risk management, or actuarial science.', fields: ['Finance', 'Accounting', 'Actuarial Science'], deadline: 'October 2025', logo: '🏦', provider: 'BANKSETA', website: 'https://www.bankseta.org.za' },
        { name: 'MICT SETA Bursary', type: 'seta', amount: 'R80,000/year', criteria: 'SA citizen studying IT, media, or telecommunications.', fields: ['IT', 'Computer Science', 'Media'], deadline: 'September 2025', logo: '💻', provider: 'MICT SETA', website: 'https://www.mict.org.za' },
        { name: 'ETDP SETA Bursary', type: 'seta', amount: 'R60,000/year', criteria: 'SA citizen pursuing an education, training, or development qualification.', fields: ['Education', 'Training'], deadline: 'October 2025', logo: '🎓', provider: 'ETDP SETA' },
        { name: 'CETA Bursary', type: 'seta', amount: 'R85,000/year', criteria: 'SA citizen studying construction, civil engineering, or quantity surveying.', fields: ['Construction', 'Civil Engineering'], deadline: 'September 2025', logo: '🏗️', provider: 'CETA' },
        { name: 'EWSETA Bursary', type: 'seta', amount: 'R80,000/year', criteria: 'SA citizen studying energy, water, or environmental management.', fields: ['Engineering', 'Environmental Science'], deadline: 'October 2025', logo: '⚡', provider: 'EWSETA' },
        { name: 'HWSETA Bursary', type: 'seta', amount: 'R70,000/year', criteria: 'SA citizen studying health or welfare-related qualifications.', fields: ['Health Sciences', 'Nursing', 'Social Work'], deadline: 'October 2025', logo: '🏥', provider: 'HWSETA' },
        { name: 'INSETA Bursary', type: 'seta', amount: 'R75,000/year', criteria: 'SA citizen studying insurance, actuarial, or risk management.', fields: ['Actuarial Science', 'Finance', 'Risk Management'], deadline: 'September 2025', logo: '📊', provider: 'INSETA' },
        { name: 'AgriSETA Bursary', type: 'seta', amount: 'R65,000/year', criteria: 'SA citizen studying agricultural sciences.', fields: ['Agriculture', 'Veterinary Science'], deadline: 'October 2025', logo: '🌱', provider: 'AgriSETA' },
        { name: 'TETA Bursary', type: 'seta', amount: 'R80,000/year', criteria: 'SA citizen studying transport, logistics, or maritime studies.', fields: ['Transport', 'Logistics', 'Maritime'], deadline: 'September 2025', logo: '🚢', provider: 'TETA' },
        { name: 'CATHSSETA Bursary', type: 'seta', amount: 'R55,000/year', criteria: 'SA citizen studying tourism, hospitality, or culinary arts.', fields: ['Tourism', 'Hospitality', 'Culinary Arts'], deadline: 'October 2025', logo: '🏨', provider: 'CATHSSETA' },
        { name: 'FoodBev SETA', type: 'seta', amount: 'R65,000/year', criteria: 'SA citizen studying food science, biotechnology, or beverage technology.', fields: ['Food Science', 'Biotechnology'], deadline: 'October 2025', logo: '🍔', provider: 'FoodBev SETA' },

        // Corporate
        { name: 'Sasol Bursary', type: 'corporate', amount: 'Full funding', criteria: 'SA citizen with strong Maths & Science. Min 70% in Maths, Physical Sciences, and English.', fields: ['Engineering', 'Chemistry', 'IT'], deadline: 'July 2025', logo: '🛢️', provider: 'Sasol', website: 'https://www.sasol.com', closingSoon: true },
        { name: 'Anglo American Bursary', type: 'corporate', amount: 'Full funding', criteria: 'SA citizen studying mining, engineering, geology, or metallurgy.', fields: ['Mining Engineering', 'Geology', 'Metallurgy'], deadline: 'August 2025', logo: '💎', provider: 'Anglo American', website: 'https://www.angloamerican.com' },
        { name: 'Eskom Bursary', type: 'corporate', amount: 'Full funding', criteria: 'SA citizen studying electrical/mechanical/civil engineering or IT.', fields: ['Engineering', 'IT'], deadline: 'September 2025', logo: '⚡', provider: 'Eskom', website: 'https://www.eskom.co.za' },
        { name: 'Transnet Bursary', type: 'corporate', amount: 'Full funding', criteria: 'SA citizen studying engineering, logistics, or IT at a public university.', fields: ['Engineering', 'Logistics', 'IT'], deadline: 'August 2025', logo: '🚂', provider: 'Transnet', website: 'https://www.transnet.net' },
        { name: 'MTN Foundation Bursary', type: 'corporate', amount: 'R85,000/year', criteria: 'SA citizen studying IT, engineering, or commerce with 65%+ average.', fields: ['IT', 'Engineering', 'Commerce'], deadline: 'October 2025', logo: '📱', provider: 'MTN', website: 'https://www.mtn.co.za' },
        { name: 'Standard Bank Bursary', type: 'corporate', amount: 'R80,000/year', criteria: 'SA citizen with 65%+ average studying commerce, IT, actuarial, or data science.', fields: ['Commerce', 'IT', 'Actuarial Science', 'Data Science'], deadline: 'September 2025', logo: '🏦', provider: 'Standard Bank', website: 'https://www.standardbank.co.za' },
        { name: 'Old Mutual Bursary', type: 'corporate', amount: 'R80,000/year', criteria: 'SA citizen studying actuarial science, data science, or finance.', fields: ['Actuarial Science', 'Finance', 'Data Science'], deadline: 'June 2025', logo: '🛡️', provider: 'Old Mutual', closingSoon: true },
        { name: 'Discovery Bursary', type: 'corporate', amount: 'R85,000/year', criteria: 'SA citizen with 70%+ average studying actuarial science, data science, or IT.', fields: ['Actuarial Science', 'IT', 'Data Science', 'Mathematics'], deadline: 'September 2025', logo: '💚', provider: 'Discovery' },
        { name: 'Deloitte Bursary', type: 'corporate', amount: 'Full funding', criteria: 'SA citizen studying BCom Accounting (CA stream) with 65%+ average.', fields: ['Accounting', 'Auditing'], deadline: 'August 2025', logo: '🔷', provider: 'Deloitte' },
        { name: 'PwC Bursary', type: 'corporate', amount: 'Full funding', criteria: 'SA citizen in CA stream with 65%+ in Accounting, Auditing, and Tax.', fields: ['Accounting', 'Auditing', 'Tax'], deadline: 'August 2025', logo: '🟠', provider: 'PwC' },
        { name: 'KPMG Bursary', type: 'corporate', amount: 'Full funding', criteria: 'SA citizen studying BCom Accounting with strong academic results.', fields: ['Accounting', 'Finance'], deadline: 'August 2025', logo: '🔵', provider: 'KPMG' },
        { name: 'EY Bursary', type: 'corporate', amount: 'Full funding', criteria: 'SA citizen in CA stream or IT with 65%+ average.', fields: ['Accounting', 'IT'], deadline: 'August 2025', logo: '🟡', provider: 'Ernst & Young' },
        { name: 'Investec Bursary', type: 'corporate', amount: 'R90,000/year', criteria: 'SA citizen studying commerce, IT, actuarial science, or engineering.', fields: ['Commerce', 'IT', 'Actuarial Science', 'Engineering'], deadline: 'September 2025', logo: '💰', provider: 'Investec' },
        { name: 'Nedbank Bursary', type: 'corporate', amount: 'R75,000/year', criteria: 'SA citizen studying commerce, IT, data science, or risk management.', fields: ['Commerce', 'IT', 'Data Science'], deadline: 'September 2025', logo: '🟢', provider: 'Nedbank' },
        { name: 'FNB Fund', type: 'corporate', amount: 'R70,000/year', criteria: 'SA citizen studying commerce, IT, or business management.', fields: ['Commerce', 'IT', 'Business'], deadline: 'October 2025', logo: '🟤', provider: 'First National Bank' },
        { name: 'Vodacom Bursary', type: 'corporate', amount: 'R80,000/year', criteria: 'SA citizen studying engineering, IT, or computer science with 65%+ average.', fields: ['Engineering', 'IT', 'Computer Science'], deadline: 'September 2025', logo: '📶', provider: 'Vodacom' },
        { name: 'Sappi Bursary', type: 'corporate', amount: 'Full funding', criteria: 'SA citizen studying chemical, mechanical, or electrical engineering.', fields: ['Chemical Engineering', 'Mechanical Engineering', 'Electrical Engineering'], deadline: 'August 2025', logo: '🌲', provider: 'Sappi' },
        { name: 'ArcelorMittal Bursary', type: 'corporate', amount: 'Full funding', criteria: 'SA citizen studying metallurgy, mechanical, chemical, or electrical engineering.', fields: ['Engineering', 'Metallurgy'], deadline: 'September 2025', logo: '🔩', provider: 'ArcelorMittal' },
        { name: 'South32 Bursary', type: 'corporate', amount: 'Full funding', criteria: 'SA citizen with 70%+ in Maths and Science, studying mining or engineering.', fields: ['Mining Engineering', 'Engineering', 'Geology'], deadline: 'August 2025', logo: '⛏️', provider: 'South32' },
        { name: 'BHP Bursary', type: 'corporate', amount: 'Full funding', criteria: 'SA citizen studying engineering, geoscience, or environmental science.', fields: ['Engineering', 'Geology', 'Environmental Science'], deadline: 'July 2025', logo: '🏔️', provider: 'BHP', closingSoon: true },
        { name: 'Shoprite Bursary', type: 'corporate', amount: 'R60,000/year', criteria: 'SA citizen studying supply chain, retail management, or food technology.', fields: ['Supply Chain', 'Business', 'Food Science'], deadline: 'October 2025', logo: '🛒', provider: 'Shoprite' },
        { name: 'Multichoice/DStv Bursary', type: 'corporate', amount: 'R80,000/year', criteria: 'SA citizen studying IT, software engineering, or media studies.', fields: ['IT', 'Software Engineering', 'Media'], deadline: 'September 2025', logo: '📺', provider: 'MultiChoice' },

        // NGO / Other
        { name: 'Allan Gray Orbis Fellowship', type: 'ngo', amount: 'Full funding + mentorship', criteria: 'Top academic achievers committed to responsible entrepreneurship.', fields: ['All fields'], deadline: 'March 2026', logo: '🏆', provider: 'Allan Gray Foundation', website: 'https://www.allangray.co.za' },
        { name: 'Oppenheimer Memorial Trust', type: 'ngo', amount: 'Full postgrad funding', criteria: 'SA citizen with excellent academic record pursuing postgraduate study.', fields: ['All fields'], deadline: 'April 2026', logo: '🌟', provider: 'Oppenheimer Trust', level: 'Postgraduate' },
        { name: 'Mandela Rhodes Scholarship', type: 'ngo', amount: 'Full funding + leadership', criteria: 'Young African with strong academics and leadership qualities.', fields: ['All fields'], deadline: 'June 2025', logo: '✊', provider: 'Mandela Rhodes Foundation', level: 'Postgraduate', closingSoon: true },
        { name: 'Canon Collins Trust', type: 'ngo', amount: 'Full postgrad funding', criteria: 'Southern African students pursuing postgrad studies in social justice fields.', fields: ['Law', 'Social Sciences', 'Education', 'Development Studies'], deadline: 'March 2026', logo: '📕', provider: 'Canon Collins Trust', level: 'Postgraduate' },
        { name: 'Mastercard Foundation Scholars', type: 'ngo', amount: 'Full funding', criteria: 'Academically talented young Africans from economically disadvantaged communities.', fields: ['All fields'], deadline: 'Varies by university', logo: '💳', provider: 'Mastercard Foundation' },
        { name: 'Abe Bailey Trust Bursary', type: 'ngo', amount: 'Full funding at UCT', criteria: 'Outstanding students who demonstrate leadership and community service.', fields: ['All fields'], deadline: 'September 2025', logo: '🎖️', provider: 'Abe Bailey Trust' },
        { name: 'Ruth First Fellowship', type: 'ngo', amount: 'Full postgrad funding', criteria: 'South African women pursuing postgraduate journalism studies.', fields: ['Journalism', 'Media Studies'], deadline: 'October 2025', logo: '📰', provider: 'Wits University', level: 'Postgraduate' },
    ];

    for (const b of bursaries) {
        await prisma.bursary.create({
            data: { ...b, fields: JSON.stringify(b.fields), closingSoon: b.closingSoon || false },
        });
    }
    console.log(`  ✅ ${bursaries.length} bursaries seeded`);

    // ─── FREE RESOURCES ───
    const resources = [
        { category: 'Software', name: 'GitHub Student Pack', emoji: '🐙', value: 'Free GitHub Pro + 100+ tools', how: 'Sign up with your .ac.za email at education.github.com.', link: 'https://education.github.com/pack', tags: ['Development', 'Cloud', 'Tools'], verified: true },
        { category: 'Software', name: 'JetBrains All Products', emoji: '💻', value: 'Free Professional IDEs', how: 'Apply with your student email at jetbrains.com/student.', link: 'https://www.jetbrains.com/student/', tags: ['Development', 'IDE', 'Python', 'Java'], verified: true },
        { category: 'Software', name: 'Microsoft Office 365', emoji: '📎', value: 'Free Word, Excel, PowerPoint', how: 'Sign in with your institution email at office.com.', link: 'https://www.office.com/', tags: ['Productivity', 'Writing', 'Office'], verified: true },
        { category: 'Software', name: 'AutoCAD Student', emoji: '📐', value: 'Free AutoCAD License', how: 'Create an Autodesk student account with your .ac.za email.', link: 'https://www.autodesk.com/education/free-software/autocad', tags: ['Engineering', 'Design', 'CAD'], verified: true },
        { category: 'Software', name: 'MATLAB Student', emoji: '📊', value: 'Up to 90% discount', how: 'Check if your institution has a campus license or purchase the student edition.', link: 'https://www.mathworks.com/academia/students.html', tags: ['Mathematics', 'Engineering', 'Data Science'], verified: true },
        { category: 'Cloud', name: 'Azure for Students', emoji: '☁️', value: '$100 free credit', how: 'Sign up at azure.microsoft.com/free/students with .ac.za email.', link: 'https://azure.microsoft.com/en-us/free/students/', tags: ['Cloud', 'Development', 'AI'], verified: true },
        { category: 'Cloud', name: 'AWS Educate', emoji: '🌐', value: 'Free AWS credits + training', how: 'Apply at aws.amazon.com/education/awseducate.', link: 'https://aws.amazon.com/education/awseducate/', tags: ['Cloud', 'Development', 'Machine Learning'], verified: true },
        { category: 'Cloud', name: 'Google Cloud Credits', emoji: '🔷', value: '$300 free credit', how: 'Sign up with student email at cloud.google.com', link: 'https://cloud.google.com/free', tags: ['Cloud', 'AI', 'BigQuery'], verified: true },
        { category: 'Learning', name: 'Coursera for Campus', emoji: '🎓', value: 'Free courses from top unis', how: 'Check if your institution is a Coursera partner, or audit courses for free.', link: 'https://www.coursera.org/campus/', tags: ['Online Learning', 'Certificates', 'Skills'], verified: true },
        { category: 'Learning', name: 'LinkedIn Learning', emoji: '💼', value: 'Free with many SA unis', how: 'Check your institution library portal for access.', link: 'https://www.linkedin.com/learning/', tags: ['Professional Development', 'Skills', 'Business'], verified: true },
        { category: 'Learning', name: 'Khan Academy', emoji: '📚', value: '100% Free', how: 'No account needed. Free for everyone at khanacademy.org.', link: 'https://www.khanacademy.org/', tags: ['Mathematics', 'Science', 'Free'], verified: true },
        { category: 'Writing', name: 'Grammarly Premium', emoji: '✍️', value: 'Free premium access', how: 'Some SA universities provide institutional Grammarly access.', link: 'https://www.grammarly.com/edu', tags: ['Writing', 'Grammar', 'Academic'], verified: false },
        { category: 'Writing', name: 'Mendeley Reference Manager', emoji: '📑', value: 'Free', how: 'Download from mendeley.com and manage all your citations.', link: 'https://www.mendeley.com/', tags: ['Citations', 'Research', 'Reference Management'], verified: true },
        { category: 'Writing', name: 'Overleaf (LaTeX)', emoji: '📄', value: 'Free Academic Plan', how: 'Sign up with your .ac.za email for upgraded features.', link: 'https://www.overleaf.com/', tags: ['LaTeX', 'Research', 'Academic Writing'], verified: true },
        { category: 'Design', name: 'Figma Education', emoji: '🎨', value: 'Free Professional Plan', how: 'Apply at figma.com/education with your student email.', link: 'https://www.figma.com/education/', tags: ['Design', 'UI/UX', 'Prototyping'], verified: true },
        { category: 'Design', name: 'Canva Pro for Students', emoji: '🖼️', value: 'Free Canva Pro', how: 'Sign up at canva.com/education with your .ac.za email.', link: 'https://www.canva.com/education/', tags: ['Design', 'Presentations', 'Social Media'], verified: true },
        { category: 'Finance', name: 'Student Banking (FNB)', emoji: '🏦', value: 'Zero monthly fees', how: 'Open an FNB Student Account with your student card.', link: 'https://www.fnb.co.za/student-solutions/', tags: ['Banking', 'Finance', 'Student Account'], verified: true },
        { category: 'Finance', name: 'Capitec Student Account', emoji: '💳', value: 'Zero monthly fees', how: 'Open in-branch with student card and SA ID.', link: 'https://www.capitecbank.co.za/', tags: ['Banking', 'Finance', 'Student Account'], verified: true },
    ];

    for (const r of resources) {
        await prisma.resource.create({
            data: { ...r, tags: JSON.stringify(r.tags) },
        });
    }
    console.log(`  ✅ ${resources.length} resources seeded`);

    console.log('🎉 Database seeded successfully!');
}

function generateTVETs() {
    const tvets = [
        { name: 'Ekurhuleni East TVET College', city: 'Springs', province: 'Gauteng' },
        { name: 'Ekurhuleni West TVET College', city: 'Germiston', province: 'Gauteng' },
        { name: 'Tshwane South TVET College', city: 'Pretoria', province: 'Gauteng' },
        { name: 'Tshwane North TVET College', city: 'Pretoria', province: 'Gauteng' },
        { name: 'Sedibeng TVET College', city: 'Vereeniging', province: 'Gauteng' },
        { name: 'South West Gauteng TVET College', city: 'Roodepoort', province: 'Gauteng' },
        { name: 'Western TVET College', city: 'Cape Town', province: 'Western Cape' },
        { name: 'False Bay TVET College', city: 'Cape Town', province: 'Western Cape' },
        { name: 'Northlink TVET College', city: 'Cape Town', province: 'Western Cape' },
        { name: 'Boland TVET College', city: 'Paarl', province: 'Western Cape' },
        { name: 'College of Cape Town', city: 'Cape Town', province: 'Western Cape' },
        { name: 'West Coast TVET College', city: 'Citrusdal', province: 'Western Cape' },
        { name: 'Coastal TVET College', city: 'Durban', province: 'KwaZulu-Natal' },
        { name: 'Elangeni TVET College', city: 'Durban', province: 'KwaZulu-Natal' },
        { name: 'Esayidi TVET College', city: 'Port Shepstone', province: 'KwaZulu-Natal' },
        { name: 'Majuba TVET College', city: 'Newcastle', province: 'KwaZulu-Natal' },
        { name: 'Mnambithi TVET College', city: 'Ladysmith', province: 'KwaZulu-Natal' },
        { name: 'Thekwini TVET College', city: 'Durban', province: 'KwaZulu-Natal' },
        { name: 'Umfolozi TVET College', city: 'Richards Bay', province: 'KwaZulu-Natal' },
        { name: 'Umgungundlovu TVET College', city: 'Pietermaritzburg', province: 'KwaZulu-Natal' },
        { name: 'Buffalo City TVET College', city: 'East London', province: 'Eastern Cape' },
        { name: 'Eastcape Midlands TVET College', city: 'Uitenhage', province: 'Eastern Cape' },
        { name: 'Ikhala TVET College', city: 'Queenstown', province: 'Eastern Cape' },
        { name: 'King Hintsa TVET College', city: 'Butterworth', province: 'Eastern Cape' },
        { name: 'Lovedale TVET College', city: 'Alice', province: 'Eastern Cape' },
        { name: 'Port Elizabeth TVET College', city: 'Gqeberha', province: 'Eastern Cape' },
        { name: 'King Sabata Dalindyebo TVET', city: 'Mthatha', province: 'Eastern Cape' },
        { name: 'Motheo TVET College', city: 'Bloemfontein', province: 'Free State' },
        { name: 'Flavius Mareka TVET College', city: 'Sasolburg', province: 'Free State' },
        { name: 'Goldfields TVET College', city: 'Welkom', province: 'Free State' },
        { name: 'Maluti TVET College', city: 'Phuthaditjhaba', province: 'Free State' },
        { name: 'Capricorn TVET College', city: 'Polokwane', province: 'Limpopo' },
        { name: 'Lephalale TVET College', city: 'Lephalale', province: 'Limpopo' },
        { name: 'Letaba TVET College', city: 'Tzaneen', province: 'Limpopo' },
        { name: 'Mopani South East TVET College', city: 'Phalaborwa', province: 'Limpopo' },
        { name: 'Sekhukhune TVET College', city: 'Groblersdal', province: 'Limpopo' },
        { name: 'Vhembe TVET College', city: 'Thohoyandou', province: 'Limpopo' },
        { name: 'Waterberg TVET College', city: 'Mokopane', province: 'Limpopo' },
        { name: 'Ehlanzeni TVET College', city: 'Mbombela', province: 'Mpumalanga' },
        { name: 'Gert Sibande TVET College', city: 'Standerton', province: 'Mpumalanga' },
        { name: 'Nkangala TVET College', city: 'Witbank', province: 'Mpumalanga' },
        { name: 'Orbit TVET College', city: 'Rustenburg', province: 'North West' },
        { name: 'Taletso TVET College', city: 'Mmabatho', province: 'North West' },
        { name: 'Vuselela TVET College', city: 'Klerksdorp', province: 'North West' },
        { name: 'Northern Cape Rural TVET', city: 'Upington', province: 'Northern Cape' },
        { name: 'Northern Cape Urban TVET', city: 'Kimberley', province: 'Northern Cape' },
    ];

    return tvets.map((t, i) => ({
        ...t, abbr: t.name.replace(/\sTVET\s?College?/g, '').trim(), type: 'tvet', tuition: 8000 + Math.floor(Math.random() * 5000),
        logo: '🔧', color: '#30D980', courses: ['N1-N6 Engineering', 'Business Studies', 'IT', 'Hospitality', 'Safety in Society', 'Office Administration'],
        acceptance: 60 + Math.floor(Math.random() * 30), students: 3000 + Math.floor(Math.random() * 15000),
        description: `${t.name} offers vocational and occupational programmes in ${t.city}, ${t.province}.`,
        website: `https://www.${t.name.split(' ')[0].toLowerCase()}.edu.za`,
    }));
}

function generatePrivate() {
    return [
        { name: 'Varsity College', abbr: 'VC', city: 'Multiple', province: 'Gauteng', type: 'private', tuition: 55000, logo: '🎓', color: '#B22222', courses: ['Commerce', 'Law', 'IT', 'Design', 'Humanities'], acceptance: 60, founded: 1991, students: 12000, website: 'https://www.varsitycollege.co.za' },
        { name: 'Rosebank College', abbr: 'RC', city: 'Multiple', province: 'Gauteng', type: 'private', tuition: 35000, logo: '🌹', color: '#CC3366', courses: ['Business', 'IT', 'Management', 'Office Admin'], acceptance: 75, founded: 2009, students: 8000 },
        { name: 'Damelin', abbr: 'DAM', city: 'Multiple', province: 'Gauteng', type: 'private', tuition: 38000, logo: '📓', color: '#003399', courses: ['Business', 'IT', 'Engineering', 'Education'], acceptance: 70, founded: 1943, students: 10000, website: 'https://www.damelin.co.za' },
        { name: 'Boston City Campus', abbr: 'BCC', city: 'Multiple', province: 'Gauteng', type: 'private', tuition: 30000, logo: '🏫', color: '#006699', courses: ['Business', 'IT', 'Education', 'Law'], acceptance: 75, students: 6000, website: 'https://www.boston.co.za' },
        { name: 'Pearson Institute', abbr: 'Pearson', city: 'Multiple', province: 'Gauteng', type: 'private', tuition: 50000, logo: '📘', color: '#003366', courses: ['Commerce', 'IT', 'Psychology', 'Applied Sciences'], acceptance: 55, students: 7000 },
        { name: 'AFDA', abbr: 'AFDA', city: 'Johannesburg', province: 'Gauteng', type: 'private', tuition: 70000, logo: '🎬', color: '#660066', courses: ['Film', 'Animation', 'Live Performance', 'Business Innovation'], acceptance: 40, founded: 1994, students: 4000, website: 'https://www.afda.co.za' },
        { name: 'CTI Education Group', abbr: 'CTI', city: 'Multiple', province: 'Gauteng', type: 'private', tuition: 45000, logo: '💻', color: '#009999', courses: ['IT', 'Commerce', 'Engineering', 'Humanities'], acceptance: 60, students: 5000 },
        { name: 'Henley Business School Africa', abbr: 'Henley', city: 'Johannesburg', province: 'Gauteng', type: 'private', tuition: 120000, logo: '🏛️', color: '#003366', courses: ['MBA', 'Executive Education', 'Finance', 'Leadership'], acceptance: 25, students: 1500 },
        { name: 'AAA School of Advertising', abbr: 'AAA', city: 'Johannesburg', province: 'Gauteng', type: 'private', tuition: 55000, logo: '🎨', color: '#FF0066', courses: ['Advertising', 'Graphic Design', 'Digital Marketing', 'Communication'], acceptance: 50, founded: 1990, students: 2000 },
        { name: 'Vega School', abbr: 'Vega', city: 'Multiple', province: 'Gauteng', type: 'private', tuition: 60000, logo: '✨', color: '#9933FF', courses: ['Brand Strategy', 'Design', 'Digital Business', 'Communication'], acceptance: 45, founded: 1999, students: 3000 },
        { name: 'Richfield Graduate Institute', abbr: 'Richfield', city: 'Multiple', province: 'Gauteng', type: 'private', tuition: 32000, logo: '📗', color: '#006633', courses: ['IT', 'Commerce', 'Business Administration'], acceptance: 70, students: 5000 },
        { name: 'Lyceum College', abbr: 'Lyceum', city: 'Johannesburg', province: 'Gauteng', type: 'private', tuition: 25000, logo: '📚', color: '#660033', courses: ['Policing', 'Business', 'Legal Studies'], acceptance: 80, students: 3000 },
        { name: 'Monash South Africa', abbr: 'Monash SA', city: 'Johannesburg', province: 'Gauteng', type: 'private', tuition: 75000, logo: '🦅', color: '#003C6C', courses: ['IT', 'Business', 'Education', 'Social Sciences'], acceptance: 40, founded: 2001, students: 3500, website: 'https://www.monash.ac.za' },
        { name: 'Stadio Holdings', abbr: 'Stadio', city: 'Multiple', province: 'Western Cape', type: 'private', tuition: 42000, logo: '🎓', color: '#336699', courses: ['Education', 'Commerce', 'IT', 'Law', 'Humanities'], acceptance: 55, students: 35000, website: 'https://www.stadio.ac.za' },
        { name: 'The IIE (Independent Institute of Education)', abbr: 'IIE', city: 'Multiple', province: 'Gauteng', type: 'private', tuition: 50000, logo: '📚', color: '#003366', courses: ['All fields via Varsity College, Vega, Rosebank'], acceptance: 50, students: 25000, website: 'https://www.iie.ac.za' },
    ];
}

main()
    .then(async () => { await prisma.$disconnect(); })
    .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
