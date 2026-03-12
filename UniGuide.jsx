import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

// category: "traditional" | "comprehensive" | "distance" | "uot" | "tvet" | "private"

const UNIVERSITIES = [
  // ── Traditional Universities (11) ──────────────────────────────────────────
  { id: 1,  name: "University of Cape Town", abbr: "UCT", city: "Cape Town", province: "Western Cape", type: "university", category: "traditional", rank: 1, tuition: 45000, logo: "🎓", color: "#003B5C", courses: ["Law", "Medicine", "Engineering", "Commerce", "Humanities", "Science"], acceptance: 12, founded: 1829, students: 29000, description: "Africa's leading research university, consistently ranked in the world's top 200." },
  { id: 2,  name: "University of the Witwatersrand", abbr: "Wits", city: "Johannesburg", province: "Gauteng", type: "university", category: "traditional", rank: 2, tuition: 42000, logo: "🏛️", color: "#003DA5", courses: ["Mining Engineering", "Medicine", "Law", "Commerce", "Science", "Arts"], acceptance: 15, founded: 1922, students: 40000, description: "Premier research university in the heart of Johannesburg, renowned for mining and medical sciences." },
  { id: 3,  name: "Stellenbosch University", abbr: "SU", city: "Stellenbosch", province: "Western Cape", type: "university", category: "traditional", rank: 3, tuition: 40000, logo: "🍇", color: "#8B1A1A", courses: ["Agriculture", "Engineering", "Medicine", "Law", "Arts", "Science"], acceptance: 18, founded: 1918, students: 32000, description: "Research-intensive university in the scenic Cape Winelands with strong Afrikaans heritage." },
  { id: 4,  name: "University of Pretoria", abbr: "UP", city: "Pretoria", province: "Gauteng", type: "university", category: "traditional", rank: 4, tuition: 38000, logo: "🔬", color: "#003366", courses: ["Veterinary Science", "Engineering", "Law", "Medicine", "IT", "Education"], acceptance: 20, founded: 1908, students: 52000, description: "One of South Africa's largest residential universities with world-class veterinary and engineering faculties." },
  { id: 5,  name: "University of KwaZulu-Natal", abbr: "UKZN", city: "Durban", province: "KwaZulu-Natal", type: "university", category: "traditional", rank: 5, tuition: 35000, logo: "🌊", color: "#006633", courses: ["Medicine", "Engineering", "Law", "Education", "Science", "Arts"], acceptance: 22, founded: 2004, students: 48000, description: "Comprehensive research university formed by the merger of UND and UNnatal." },
  { id: 6,  name: "Rhodes University", abbr: "RU", city: "Makhanda", province: "Eastern Cape", type: "university", category: "traditional", rank: 6, tuition: 36000, logo: "📚", color: "#CC0000", courses: ["Journalism", "Law", "Science", "Arts", "Pharmacy", "Education"], acceptance: 25, founded: 1904, students: 8500, description: "Boutique research university known for its intimate environment and high academic standards." },
  { id: 7,  name: "University of the Free State", abbr: "UFS", city: "Bloemfontein", province: "Free State", type: "university", category: "traditional", rank: 7, tuition: 34000, logo: "🌻", color: "#8B4513", courses: ["Agriculture", "Law", "Medicine", "Education", "Humanities", "Science"], acceptance: 28, founded: 1904, students: 37000, description: "Leading university in central South Africa serving the Free State and Northern Cape regions." },
  { id: 8,  name: "University of Johannesburg", abbr: "UJ", city: "Johannesburg", province: "Gauteng", type: "university", category: "comprehensive", rank: 8, tuition: 36000, logo: "🏙️", color: "#004B87", courses: ["Engineering", "Arts", "Science", "Law", "Commerce", "Education"], acceptance: 30, founded: 2005, students: 50000, description: "Dynamic comprehensive university in Johannesburg formed by the merger of RAU and TWR." },
  { id: 9,  name: "University of the Western Cape", abbr: "UWC", city: "Bellville", province: "Western Cape", type: "university", category: "comprehensive", rank: 9, tuition: 32000, logo: "🌍", color: "#006400", courses: ["Law", "Arts", "Dentistry", "Community Health", "Science", "Education"], acceptance: 32, founded: 1960, students: 22000, description: "Historically disadvantaged university with strength in law, dentistry, and community health." },
  { id: 10, name: "University of Limpopo", abbr: "UL", city: "Polokwane", province: "Limpopo", type: "university", category: "comprehensive", rank: 10, tuition: 28000, logo: "🌿", color: "#556B2F", courses: ["Medicine", "Agriculture", "Humanities", "Science", "Commerce", "Education"], acceptance: 35, founded: 1959, students: 18000, description: "Comprehensive university serving the Limpopo region with notable medical and agricultural programmes." },
  { id: 11, name: "University of Zululand", abbr: "UNIZULU", city: "Richards Bay", province: "KwaZulu-Natal", type: "university", category: "comprehensive", rank: 11, tuition: 26000, logo: "🦁", color: "#8B0000", courses: ["Arts", "Commerce", "Education", "Science", "Law"], acceptance: 40, founded: 1960, students: 16000, description: "Comprehensive university serving northern KwaZulu-Natal with a focus on community development." },
  { id: 12, name: "Walter Sisulu University", abbr: "WSU", city: "Mthatha", province: "Eastern Cape", type: "university", category: "comprehensive", rank: 12, tuition: 25000, logo: "✊", color: "#8B0000", courses: ["Health Sciences", "Engineering", "Commerce", "Education", "Arts"], acceptance: 42, founded: 2005, students: 28000, description: "Comprehensive university in the Eastern Cape honouring the legacy of Walter Sisulu." },
  { id: 13, name: "North-West University", abbr: "NWU", city: "Potchefstroom", province: "North West", type: "university", category: "comprehensive", rank: 13, tuition: 33000, logo: "🌾", color: "#4B0082", courses: ["Engineering", "Pharmacy", "Law", "Education", "Commerce", "Science"], acceptance: 30, founded: 2004, students: 65000, description: "One of South Africa's largest universities with campuses in Potchefstroom, Mahikeng, and Vanderbijlpark." },
  { id: 14, name: "University of Venda", abbr: "UNIVEN", city: "Thohoyandou", province: "Limpopo", type: "university", category: "comprehensive", rank: 14, tuition: 24000, logo: "🌄", color: "#006400", courses: ["Science", "Management", "Education", "Health Sciences", "Human & Social Sciences"], acceptance: 45, founded: 1982, students: 15000, description: "Comprehensive university serving the Vhembe district in the far north of Limpopo." },
  { id: 15, name: "Mangosuthu University of Technology", abbr: "MUT", city: "Umlazi", province: "KwaZulu-Natal", type: "university", category: "uot", rank: 15, tuition: 27000, logo: "⚙️", color: "#006699", courses: ["Engineering", "Natural Sciences", "Management Sciences"], acceptance: 38, founded: 1977, students: 13000, description: "University of technology named after Prince Mangosuthu Buthelezi, focused on technical education." },
  // Distance
  { id: 16, name: "University of South Africa", abbr: "UNISA", city: "Pretoria", province: "Gauteng", type: "university", category: "distance", rank: 16, tuition: 12000, logo: "💻", color: "#004080", courses: ["Law", "Commerce", "Education", "Science", "Arts", "Engineering"], acceptance: 60, founded: 1873, students: 400000, description: "Africa's largest open distance learning institution, offering qualifications in virtually every field." },
];

const UNIVERSITIES_OF_TECHNOLOGY = [
  { id: 51, name: "Cape Peninsula University of Technology", abbr: "CPUT", city: "Cape Town", province: "Western Cape", type: "uot", category: "uot", tuition: 28000, logo: "⚙️", color: "#E87722", courses: ["IT", "Engineering", "Business", "Applied Sciences", "Design", "Health Sciences"], acceptance: 35, founded: 2005, students: 35000, description: "Leading university of technology in the Western Cape, offering career-focused qualifications." },
  { id: 52, name: "Durban University of Technology", abbr: "DUT", city: "Durban", province: "KwaZulu-Natal", type: "uot", category: "uot", tuition: 26000, logo: "🔩", color: "#CC6600", courses: ["Engineering", "Health Sciences", "Arts & Design", "Management", "Applied Sciences"], acceptance: 36, founded: 2002, students: 29000, description: "Technology-focused university serving Durban and the broader KwaZulu-Natal region." },
  { id: 53, name: "Tshwane University of Technology", abbr: "TUT", city: "Pretoria", province: "Gauteng", type: "uot", category: "uot", tuition: 27000, logo: "🏗️", color: "#003366", courses: ["Engineering", "IT", "Arts", "Sciences", "Management", "Education"], acceptance: 34, founded: 2004, students: 60000, description: "South Africa's largest residential university of technology with campuses across Gauteng and Mpumalanga." },
  { id: 54, name: "University of Johannesburg (Doornfontein)", abbr: "UJ-Tech", city: "Johannesburg", province: "Gauteng", type: "uot", category: "uot", tuition: 36000, logo: "🏭", color: "#004B87", courses: ["Engineering", "Built Environment", "Health Sciences", "Applied Sciences"], acceptance: 30, founded: 2005, students: 50000, description: "UJ's technology and engineering-focused campus at Doornfontein, Johannesburg." },
  { id: 55, name: "Central University of Technology", abbr: "CUT", city: "Bloemfontein", province: "Free State", type: "uot", category: "uot", tuition: 25000, logo: "🔬", color: "#8B4513", courses: ["Engineering", "Health Sciences", "Management", "Humanities", "Education"], acceptance: 40, founded: 2004, students: 14000, description: "University of technology serving the Free State and Northern Cape provinces." },
  { id: 56, name: "Vaal University of Technology", abbr: "VUT", city: "Vanderbijlpark", province: "Gauteng", type: "uot", category: "uot", tuition: 24000, logo: "⚗️", color: "#660033", courses: ["Engineering", "Applied Sciences", "Management", "IT", "Hospitality"], acceptance: 42, founded: 2004, students: 21000, description: "University of technology in the southern Gauteng Vaal Triangle area." },
  { id: 57, name: "Walter Sisulu University (Technology)", abbr: "WSU-Tech", city: "Butterworth", province: "Eastern Cape", type: "uot", category: "uot", tuition: 25000, logo: "🔧", color: "#8B0000", courses: ["Engineering", "Built Environment", "Health Sciences", "Applied Sciences"], acceptance: 44, founded: 2005, students: 28000, description: "Technology programmes at WSU campuses serving the Eastern Cape." },
];

const TVET_COLLEGES = [
  { id: 101, name: "Boland TVET College", abbr: "Boland", city: "Paarl", province: "Western Cape", type: "tvet", tuition: 2300, logo: "🏔️", color: "#8B1A1A", courses: ["Engineering Studies", "Business Studies", "Tourism", "Agriculture"], students: 9000, campuses: 3 },
  { id: 102, name: "Buffalo City TVET College", abbr: "Buffalo City", city: "East London", province: "Eastern Cape", type: "tvet", tuition: 2100, logo: "🦬", color: "#4B0082", courses: ["Engineering Studies", "Business Studies", "IT", "Hospitality"], students: 14000, campuses: 5 },
  { id: 103, name: "Capricorn TVET College", abbr: "Capricorn", city: "Polokwane", province: "Limpopo", type: "tvet", tuition: 2000, logo: "🌿", color: "#009933", courses: ["Agriculture", "Engineering Studies", "Business Studies", "IT"], students: 12000, campuses: 4 },
  { id: 104, name: "Central Johannesburg TVET College", abbr: "CJC", city: "Johannesburg", province: "Gauteng", type: "tvet", tuition: 2500, logo: "🏫", color: "#FF6B00", courses: ["Business Studies", "Engineering Studies", "IT", "Hospitality"], students: 15000, campuses: 5 },
  { id: 105, name: "Coastal KZN TVET College", abbr: "Coastal KZN", city: "Durban", province: "KwaZulu-Natal", type: "tvet", tuition: 2200, logo: "🌴", color: "#0066CC", courses: ["Engineering Studies", "Business Studies", "Tourism", "ICT"], students: 18000, campuses: 6 },
  { id: 106, name: "College of Cape Town", abbr: "CCT", city: "Cape Town", province: "Western Cape", type: "tvet", tuition: 2400, logo: "🌉", color: "#003B5C", courses: ["Engineering Studies", "Business Studies", "IT", "Tourism"], students: 10000, campuses: 4 },
  { id: 107, name: "Eastcape Midlands TVET College", abbr: "EMC", city: "Graaff-Reinet", province: "Eastern Cape", type: "tvet", tuition: 2000, logo: "🌵", color: "#8B4513", courses: ["Agriculture", "Engineering Studies", "Business Studies", "IT"], students: 8000, campuses: 4 },
  { id: 108, name: "Ehlanzeni TVET College", abbr: "Ehlanzeni", city: "Nelspruit", province: "Mpumalanga", type: "tvet", tuition: 2100, logo: "🌳", color: "#2E8B57", courses: ["Engineering Studies", "Business Studies", "Tourism", "IT"], students: 11000, campuses: 4 },
  { id: 109, name: "Ekurhuleni East TVET College", abbr: "EEC", city: "Springs", province: "Gauteng", type: "tvet", tuition: 2300, logo: "🏭", color: "#CC6600", courses: ["Engineering Studies", "Business Studies", "IT", "Hospitality"], students: 13000, campuses: 5 },
  { id: 110, name: "Ekurhuleni West TVET College", abbr: "EWC", city: "Alberton", province: "Gauteng", type: "tvet", tuition: 2300, logo: "⚙️", color: "#800080", courses: ["Engineering Studies", "Business Studies", "IT", "Tourism"], students: 12000, campuses: 4 },
  { id: 111, name: "Elangeni TVET College", abbr: "Elangeni", city: "Durban", province: "KwaZulu-Natal", type: "tvet", tuition: 2200, logo: "☀️", color: "#FF8C00", courses: ["Engineering Studies", "Business Studies", "Hospitality", "IT"], students: 14000, campuses: 5 },
  { id: 112, name: "Esayidi TVET College", abbr: "Esayidi", city: "Port Shepstone", province: "KwaZulu-Natal", type: "tvet", tuition: 2000, logo: "🌊", color: "#006699", courses: ["Engineering Studies", "Business Studies", "Agriculture", "Tourism"], students: 9000, campuses: 4 },
  { id: 113, name: "False Bay TVET College", abbr: "False Bay", city: "Cape Town", province: "Western Cape", type: "tvet", tuition: 2400, logo: "⛵", color: "#006699", courses: ["Engineering Studies", "Business Studies", "IT", "Hospitality"], students: 11000, campuses: 4 },
  { id: 114, name: "Flavius Mareka TVET College", abbr: "FMC", city: "Sasolburg", province: "Free State", type: "tvet", tuition: 2100, logo: "🌼", color: "#DAA520", courses: ["Engineering Studies", "Business Studies", "IT", "Agriculture"], students: 8000, campuses: 3 },
  { id: 115, name: "Goldfields TVET College", abbr: "Goldfields", city: "Welkom", province: "Free State", type: "tvet", tuition: 2100, logo: "🥇", color: "#B8860B", courses: ["Mining", "Engineering Studies", "Business Studies", "IT"], students: 9000, campuses: 3 },
  { id: 116, name: "Ikhala TVET College", abbr: "Ikhala", city: "Queenstown", province: "Eastern Cape", type: "tvet", tuition: 2000, logo: "🏞️", color: "#4B6043", courses: ["Agriculture", "Engineering Studies", "Business Studies", "Community Work"], students: 7000, campuses: 3 },
  { id: 117, name: "Ingwe TVET College", abbr: "Ingwe", city: "Mount Frere", province: "Eastern Cape", type: "tvet", tuition: 2000, logo: "🐆", color: "#5C4033", courses: ["Agriculture", "Engineering Studies", "Business Studies", "IT"], students: 6500, campuses: 3 },
  { id: 118, name: "King Hintsa TVET College", abbr: "KHC", city: "Butterworth", province: "Eastern Cape", type: "tvet", tuition: 2000, logo: "👑", color: "#8B0000", courses: ["Business Studies", "Engineering Studies", "IT", "Community Work"], students: 7000, campuses: 3 },
  { id: 119, name: "King Sabata Dalindyebo TVET", abbr: "KSDTVET", city: "Mthatha", province: "Eastern Cape", type: "tvet", tuition: 2000, logo: "🏛️", color: "#6B3A2A", courses: ["Business Studies", "Engineering Studies", "Tourism", "IT"], students: 8000, campuses: 3 },
  { id: 120, name: "Lephalale TVET College", abbr: "Lephalale", city: "Lephalale", province: "Limpopo", type: "tvet", tuition: 1900, logo: "⚡", color: "#4682B4", courses: ["Engineering Studies", "Business Studies", "Mining", "IT"], students: 5000, campuses: 2 },
  { id: 121, name: "Letaba TVET College", abbr: "Letaba", city: "Tzaneen", province: "Limpopo", type: "tvet", tuition: 2000, logo: "🍃", color: "#228B22", courses: ["Agriculture", "Engineering Studies", "Business Studies", "Tourism"], students: 8000, campuses: 3 },
  { id: 122, name: "Lovedale TVET College", abbr: "Lovedale", city: "Alice", province: "Eastern Cape", type: "tvet", tuition: 2000, logo: "📖", color: "#8B4513", courses: ["Business Studies", "Engineering Studies", "IT", "Community Work"], students: 6000, campuses: 3 },
  { id: 123, name: "Majuba TVET College", abbr: "Majuba", city: "Newcastle", province: "KwaZulu-Natal", type: "tvet", tuition: 2200, logo: "⛰️", color: "#556B2F", courses: ["Engineering Studies", "Business Studies", "IT", "Tourism"], students: 10000, campuses: 4 },
  { id: 124, name: "Mnambithi TVET College", abbr: "Mnambithi", city: "Ladysmith", province: "KwaZulu-Natal", type: "tvet", tuition: 2100, logo: "🌄", color: "#8B4513", courses: ["Engineering Studies", "Business Studies", "Agriculture", "IT"], students: 8000, campuses: 3 },
  { id: 125, name: "Mopani South East TVET College", abbr: "MSETVET", city: "Phalaborwa", province: "Limpopo", type: "tvet", tuition: 2000, logo: "🦏", color: "#808000", courses: ["Mining", "Engineering Studies", "Business Studies", "Tourism"], students: 7000, campuses: 3 },
  { id: 126, name: "Motheo TVET College", abbr: "Motheo", city: "Bloemfontein", province: "Free State", type: "tvet", tuition: 2100, logo: "🌻", color: "#DAA520", courses: ["Engineering Studies", "Business Studies", "IT", "Hospitality"], students: 11000, campuses: 4 },
  { id: 127, name: "Nkangala TVET College", abbr: "Nkangala", city: "Middleburg", province: "Mpumalanga", type: "tvet", tuition: 2100, logo: "🏔️", color: "#696969", courses: ["Engineering Studies", "Business Studies", "IT", "Mining"], students: 9000, campuses: 3 },
  { id: 128, name: "Northern Cape Rural TVET College", abbr: "NCR", city: "Upington", province: "Northern Cape", type: "tvet", tuition: 1900, logo: "🌵", color: "#CD853F", courses: ["Agriculture", "Engineering Studies", "Business Studies", "IT"], students: 5000, campuses: 3 },
  { id: 129, name: "Northern Cape Urban TVET College", abbr: "NCU", city: "Kimberley", province: "Northern Cape", type: "tvet", tuition: 1900, logo: "💎", color: "#708090", courses: ["Mining", "Engineering Studies", "Business Studies", "IT"], students: 6000, campuses: 3 },
  { id: 130, name: "Northlink TVET College", abbr: "Northlink", city: "Bellville", province: "Western Cape", type: "tvet", tuition: 2300, logo: "🔧", color: "#CC6600", courses: ["Engineering Studies", "Business Studies", "IT", "Hairdressing"], students: 13000, campuses: 5 },
  { id: 131, name: "Orbit TVET College", abbr: "Orbit", city: "Rustenburg", province: "North West", type: "tvet", tuition: 2100, logo: "🪐", color: "#483D8B", courses: ["Mining", "Engineering Studies", "Business Studies", "IT"], students: 10000, campuses: 4 },
  { id: 132, name: "Port Elizabeth TVET College", abbr: "PEC", city: "Gqeberha", province: "Eastern Cape", type: "tvet", tuition: 2200, logo: "🌊", color: "#006B9F", courses: ["Engineering Studies", "Business Studies", "IT", "Hospitality"], students: 12000, campuses: 5 },
  { id: 133, name: "Sedibeng TVET College", abbr: "Sedibeng", city: "Vereeniging", province: "Gauteng", type: "tvet", tuition: 2300, logo: "💧", color: "#1C6B9E", courses: ["Engineering Studies", "Business Studies", "IT", "Tourism"], students: 10000, campuses: 4 },
  { id: 134, name: "Sekhukhune TVET College", abbr: "Sekhukhune", city: "Burgersfort", province: "Limpopo", type: "tvet", tuition: 2000, logo: "⛏️", color: "#8B4513", courses: ["Mining", "Engineering Studies", "Business Studies", "Agriculture"], students: 7000, campuses: 3 },
  { id: 135, name: "South Cape TVET College", abbr: "South Cape", city: "George", province: "Western Cape", type: "tvet", tuition: 2200, logo: "🌴", color: "#228B22", courses: ["Engineering Studies", "Business Studies", "Tourism", "Agriculture"], students: 8000, campuses: 3 },
  { id: 136, name: "South West Gauteng TVET College", abbr: "SWGC", city: "Johannesburg", province: "Gauteng", type: "tvet", tuition: 2400, logo: "🏙️", color: "#4169E1", courses: ["Engineering Studies", "Business Studies", "IT", "Hospitality"], students: 14000, campuses: 5 },
  { id: 137, name: "Taletso TVET College", abbr: "Taletso", city: "Mahikeng", province: "North West", type: "tvet", tuition: 2000, logo: "🌾", color: "#8B6914", courses: ["Agriculture", "Engineering Studies", "Business Studies", "IT"], students: 6500, campuses: 3 },
  { id: 138, name: "Thekwini TVET College", abbr: "Thekwini", city: "Durban", province: "KwaZulu-Natal", type: "tvet", tuition: 2200, logo: "🌇", color: "#CC0066", courses: ["Engineering Studies", "Business Studies", "IT", "Hospitality"], students: 13000, campuses: 5 },
  { id: 139, name: "Tshwane North TVET College", abbr: "TNC", city: "Pretoria", province: "Gauteng", type: "tvet", tuition: 2300, logo: "🔩", color: "#003366", courses: ["Engineering Studies", "Business Studies", "IT", "Tourism"], students: 12000, campuses: 4 },
  { id: 140, name: "Tshwane South TVET College", abbr: "TSC", city: "Pretoria", province: "Gauteng", type: "tvet", tuition: 2300, logo: "🏗️", color: "#36454F", courses: ["Engineering Studies", "Business Studies", "IT", "Hospitality"], students: 11000, campuses: 4 },
  { id: 141, name: "Umfolozi TVET College", abbr: "Umfolozi", city: "Empangeni", province: "KwaZulu-Natal", type: "tvet", tuition: 2100, logo: "🦛", color: "#556B2F", courses: ["Engineering Studies", "Business Studies", "Agriculture", "IT"], students: 10000, campuses: 4 },
  { id: 142, name: "Umgungundlovu TVET College", abbr: "UCTVET", city: "Pietermaritzburg", province: "KwaZulu-Natal", type: "tvet", tuition: 2200, logo: "🐘", color: "#8B0000", courses: ["Engineering Studies", "Business Studies", "IT", "Hospitality"], students: 11000, campuses: 4 },
  { id: 143, name: "Vuselela TVET College", abbr: "Vuselela", city: "Klerksdorp", province: "North West", type: "tvet", tuition: 2000, logo: "🌅", color: "#CC6600", courses: ["Engineering Studies", "Business Studies", "Agriculture", "IT"], students: 7000, campuses: 3 },
  { id: 144, name: "Waterberg TVET College", abbr: "Waterberg", city: "Mokopane", province: "Limpopo", type: "tvet", tuition: 2000, logo: "💧", color: "#4169E1", courses: ["Agriculture", "Engineering Studies", "Business Studies", "Mining"], students: 6500, campuses: 3 },
  { id: 145, name: "West Coast TVET College", abbr: "WCC", city: "Malmesbury", province: "Western Cape", type: "tvet", tuition: 2200, logo: "🌊", color: "#4682B4", courses: ["Engineering Studies", "Business Studies", "Agriculture", "IT"], students: 8000, campuses: 3 },
];

const PRIVATE_COLLEGES = [
  { id: 201, name: "Stadio (formerly Educor)", abbr: "Stadio", city: "Cape Town", province: "Western Cape", type: "private", tuition: 35000, logo: "🎯", color: "#E63946", courses: ["Law", "Accounting", "Marketing", "Psychology", "Education", "IT"], students: 28000, founded: 2017, description: "Registered private higher education institution offering accredited degrees and diplomas across South Africa." },
  { id: 202, name: "Varsity College", abbr: "VC", city: "Cape Town", province: "Western Cape", type: "private", tuition: 55000, logo: "📐", color: "#003B5C", courses: ["Business", "IT", "Law", "Graphic Design", "Marketing", "HR"], students: 20000, founded: 1989, description: "Private higher education institution offering IIE-accredited qualifications through The Independent Institute of Education." },
  { id: 203, name: "Rosebank College", abbr: "RC", city: "Johannesburg", province: "Gauteng", type: "private", tuition: 38000, logo: "🌹", color: "#B22222", courses: ["Business", "IT", "Marketing", "Graphic Design", "Accounting", "Media"], students: 14000, founded: 1944, description: "An IIE-accredited private college offering career-focused diplomas and degrees." },
  { id: 204, name: "Boston City Campus", abbr: "Boston", city: "Johannesburg", province: "Gauteng", type: "private", tuition: 28000, logo: "🦅", color: "#00205B", courses: ["Business", "IT", "Marketing", "Finance", "HR", "Project Management"], students: 12000, founded: 1922, description: "One of South Africa's longest-standing private colleges offering part-time and full-time study." },
  { id: 205, name: "Regent Business School", abbr: "RBS", city: "Durban", province: "KwaZulu-Natal", type: "private", tuition: 30000, logo: "👔", color: "#1B3A6B", courses: ["Business Administration", "Project Management", "Finance", "Marketing", "HR"], students: 8000, founded: 1996, description: "Private higher education institution specialising in business and management qualifications." },
  { id: 206, name: "Richfield Graduate Institute", abbr: "Richfield", city: "Durban", province: "KwaZulu-Natal", type: "private", tuition: 25000, logo: "📊", color: "#006400", courses: ["Business", "IT", "Commerce", "Marketing", "Finance"], students: 9000, founded: 1996, description: "DHET-registered private higher education institution offering accredited business and IT programmes." },
  { id: 207, name: "MANCOSA", abbr: "MANCOSA", city: "Durban", province: "KwaZulu-Natal", type: "private", tuition: 32000, logo: "🌐", color: "#800020", courses: ["MBA", "Business Administration", "Project Management", "Supply Chain", "Finance"], students: 10000, founded: 1995, description: "Management College of Southern Africa offering postgraduate business qualifications via distance learning." },
  { id: 208, name: "IMM Graduate School", abbr: "IMM", city: "Johannesburg", province: "Gauteng", type: "private", tuition: 30000, logo: "📣", color: "#CC0033", courses: ["Marketing", "Supply Chain", "Purchasing", "Retail", "Business"], students: 7000, founded: 1941, description: "South Africa's only specialist marketing and supply chain management higher education institution." },
  { id: 209, name: "Regenesys Business School", abbr: "Regenesys", city: "Johannesburg", province: "Gauteng", type: "private", tuition: 35000, logo: "♻️", color: "#2E8B57", courses: ["MBA", "Business Administration", "Finance", "Public Administration", "HR"], students: 9000, founded: 1998, description: "Private business school offering MBA and management programmes with campuses across SA and internationally." },
  { id: 210, name: "AFDA (The South African School of Motion Picture)", abbr: "AFDA", city: "Johannesburg", province: "Gauteng", type: "private", tuition: 62000, logo: "🎬", color: "#FF0000", courses: ["Film & TV", "Live Performance", "Motion Picture", "Sound Engineering", "Business Innovation"], students: 3500, founded: 1994, description: "South Africa's premier film, television, and performing arts institution." },
  { id: 211, name: "Red & Yellow Creative School of Business", abbr: "R&Y", city: "Cape Town", province: "Western Cape", type: "private", tuition: 68000, logo: "🎨", color: "#FF4500", courses: ["Creative Brand Communications", "Digital Marketing", "UX Design", "Copywriting", "Business Strategy"], students: 2500, founded: 1994, description: "Award-winning creative and digital marketing school in Cape Town's De Waterkant." },
  { id: 212, name: "Oakfields College", abbr: "Oakfields", city: "Pretoria", province: "Gauteng", type: "private", tuition: 32000, logo: "🌳", color: "#556B2F", courses: ["Business", "Tourism", "Hospitality", "Marketing", "IT"], students: 3000, founded: 2000, description: "Private college offering vocational and higher certificate programmes in Gauteng and beyond." },
  { id: 213, name: "CTI Education Group", abbr: "CTI", city: "Johannesburg", province: "Gauteng", type: "private", tuition: 48000, logo: "🖥️", color: "#003399", courses: ["IT", "Engineering", "Commerce", "Arts & Design", "Science"], students: 11000, founded: 1987, description: "Part of Pearson, offering IIE-accredited qualifications in IT, engineering, and business." },
  { id: 214, name: "Lyceum College", abbr: "Lyceum", city: "Pretoria", province: "Gauteng", type: "private", tuition: 18000, logo: "📜", color: "#8B008B", courses: ["Business", "Law", "Education", "Psychology", "Social Work"], students: 5000, founded: 1921, description: "One of South Africa's oldest private colleges, offering distance and contact learning programmes." },
  { id: 215, name: "Midrand Graduate Institute", abbr: "MGI", city: "Midrand", province: "Gauteng", type: "private", tuition: 35000, logo: "🎓", color: "#006699", courses: ["Business", "IT", "Engineering", "Psychology", "Education"], students: 4000, founded: 1995, description: "Private higher education institution in Midrand offering a range of undergraduate qualifications." },
];

const RIASEC_QUESTIONS = [
  { id: 1, text: "I enjoy fixing or building mechanical things", type: "R" },
  { id: 2, text: "I like solving complex mathematical problems", type: "I" },
  { id: 3, text: "I enjoy creating art, music, or writing", type: "A" },
  { id: 4, text: "I like helping people with personal problems", type: "S" },
  { id: 5, text: "I enjoy leading and influencing others", type: "E" },
  { id: 6, text: "I like organising files and keeping records accurate", type: "C" },
  { id: 7, text: "I enjoy working outdoors with tools or machinery", type: "R" },
  { id: 8, text: "I like conducting scientific experiments", type: "I" },
  { id: 9, text: "I enjoy performing or expressing myself creatively", type: "A" },
  { id: 10, text: "I find satisfaction in teaching or coaching others", type: "S" },
  { id: 11, text: "I enjoy starting new business ventures", type: "E" },
  { id: 12, text: "I like working with data and spreadsheets", type: "C" },
  { id: 13, text: "I enjoy hands-on technical work and repairs", type: "R" },
  { id: 14, text: "I like researching and reading academic content", type: "I" },
  { id: 15, text: "I enjoy designing visuals or user experiences", type: "A" },
  { id: 16, text: "I like volunteering or working in the community", type: "S" },
  { id: 17, text: "I enjoy negotiating and persuading people", type: "E" },
  { id: 18, text: "I like following clear procedures and checklists", type: "C" },
];

const RIASEC_CAREERS = {
  R: { label: "Realistic", emoji: "🔧", desc: "Practical, hands-on, mechanical", careers: ["Mechanical Engineer", "Civil Engineer", "Electrician", "Architect", "Pilot", "Carpenter"] },
  I: { label: "Investigative", emoji: "🔬", desc: "Analytical, intellectual, scientific", careers: ["Medical Doctor", "Data Scientist", "Researcher", "Pharmacist", "Software Developer", "Chemist"] },
  A: { label: "Artistic", emoji: "🎨", desc: "Creative, expressive, original", careers: ["Graphic Designer", "Journalist", "Architect", "Film Director", "UX Designer", "Writer"] },
  S: { label: "Social", emoji: "🤝", desc: "Helpful, empathetic, cooperative", careers: ["Social Worker", "Teacher", "Nurse", "Psychologist", "HR Manager", "Counsellor"] },
  E: { label: "Enterprising", emoji: "📈", desc: "Persuasive, leadership, business", careers: ["Business Manager", "Lawyer", "Entrepreneur", "Marketing Director", "Investment Analyst", "CEO"] },
  C: { label: "Conventional", emoji: "📊", desc: "Organised, detail-oriented, systematic", careers: ["Accountant", "Auditor", "IT Administrator", "Financial Analyst", "Compliance Officer", "Actuary"] },
};

const BURSARIES = [
  { id: 1, name: "NSFAS", type: "Government", amount: "Full tuition + allowances", criteria: "Household income < R350,000/year", fields: ["All fields"], deadline: "31 January", logo: "🏛️", color: "#003B5C" },
  { id: 2, name: "Sasol Bursary", type: "Corporate", amount: "R80,000/year", criteria: "60%+ Mathematics & Physical Science", fields: ["Engineering", "Science", "IT"], deadline: "30 September", logo: "⚗️", color: "#E87722" },
  { id: 3, name: "Standard Bank Bursary", type: "Corporate", amount: "R70,000/year", criteria: "65%+ average, financial need", fields: ["Commerce", "IT", "Engineering"], deadline: "31 August", logo: "💳", color: "#0066CC" },
  { id: 4, name: "Eskom EPPF Bursary", type: "Corporate", amount: "R65,000/year", criteria: "60%+ average, South African citizen", fields: ["Engineering", "Science", "IT"], deadline: "31 July", logo: "⚡", color: "#FFCC00" },
  { id: 5, name: "Nedbank Bursary", type: "Corporate", amount: "R60,000/year", criteria: "65%+ average, financial need", fields: ["Commerce", "Law", "IT"], deadline: "31 August", logo: "🏦", color: "#009900" },
  { id: 6, name: "Allan Gray Orbis Foundation", type: "Foundation", amount: "Full tuition + mentorship", criteria: "Exceptional leadership potential", fields: ["All fields"], deadline: "30 June", logo: "🌟", color: "#4A0E8F" },
  { id: 7, name: "Absa Bank Bursary", type: "Corporate", amount: "R55,000/year", criteria: "60%+ average, financial need", fields: ["Commerce", "Actuarial Science", "IT"], deadline: "31 July", logo: "🔴", color: "#CC0000" },
  { id: 8, name: "Anglo American Bursary", type: "Corporate", amount: "R75,000/year", criteria: "65%+ Mathematics", fields: ["Mining Engineering", "Geology", "Metallurgy"], deadline: "31 August", logo: "⛏️", color: "#404040" },
];

// ─── STYLES ──────────────────────────────────────────────────────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0A0E1A;
    --bg2: #111827;
    --bg3: #1A2235;
    --card: #141C2E;
    --card2: #1E2A40;
    --border: rgba(255,255,255,0.08);
    --border2: rgba(255,255,255,0.14);
    --text: #F0F4FF;
    --text2: #9BAAC7;
    --text3: #6B7DA0;
    --accent: #4F8EF7;
    --accent2: #7B5FFF;
    --gold: #F5C842;
    --green: #30D980;
    --red: #FF5A5A;
    --orange: #FF8C42;
    --glow: rgba(79,142,247,0.15);
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --nav-h: 64px;
    --r: 14px;
    --r-sm: 8px;
    --shadow: 0 4px 32px rgba(0,0,0,0.4);
  }

  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--text); font-family: var(--font-body); font-size: 15px; line-height: 1.6; min-height: 100vh; overflow-x: hidden; }

  /* ── Nav ── */
  .nav { position: fixed; top: 0; left: 0; right: 0; height: var(--nav-h); background: rgba(10,14,26,0.85); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); z-index: 100; display: flex; align-items: center; padding: 0 24px; gap: 0; }
  .nav-logo { font-family: var(--font-display); font-size: 22px; font-weight: 800; color: var(--text); margin-right: 40px; display: flex; align-items: center; gap: 8px; cursor: pointer; }
  .nav-logo span { background: linear-gradient(135deg, var(--accent), var(--accent2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .nav-links { display: flex; gap: 4px; flex: 1; }
  .nav-link { padding: 6px 14px; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500; color: var(--text2); transition: all 0.2s; background: none; border: none; font-family: var(--font-body); }
  .nav-link:hover { color: var(--text); background: rgba(255,255,255,0.06); }
  .nav-link.active { color: var(--accent); background: rgba(79,142,247,0.12); }
  .nav-flag { margin-left: auto; font-size: 22px; }

  /* ── Page wrapper ── */
  .page { padding-top: var(--nav-h); min-height: 100vh; }

  /* ── Hero ── */
  .hero { position: relative; min-height: calc(100vh - var(--nav-h)); display: flex; align-items: center; padding: 80px 48px; overflow: hidden; }
  .hero-bg { position: absolute; inset: 0; z-index: 0; }
  .hero-orb { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.35; }
  .hero-orb-1 { width: 600px; height: 600px; background: radial-gradient(circle, #4F8EF7, transparent); top: -100px; left: -100px; }
  .hero-orb-2 { width: 500px; height: 500px; background: radial-gradient(circle, #7B5FFF, transparent); bottom: -50px; right: 100px; }
  .hero-orb-3 { width: 300px; height: 300px; background: radial-gradient(circle, #30D980, transparent); top: 200px; right: 300px; }
  .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px); background-size: 60px 60px; opacity: 0.4; }
  .hero-content { position: relative; z-index: 1; max-width: 680px; }
  .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(79,142,247,0.12); border: 1px solid rgba(79,142,247,0.3); border-radius: 100px; padding: 6px 16px; font-size: 13px; color: var(--accent); margin-bottom: 28px; font-weight: 500; }
  .hero-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); display: block; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
  .hero h1 { font-family: var(--font-display); font-size: clamp(42px, 6vw, 72px); font-weight: 800; line-height: 1.05; letter-spacing: -1.5px; margin-bottom: 20px; }
  .hero h1 em { font-style: normal; background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 50%, var(--gold) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .hero p { font-size: 18px; color: var(--text2); max-width: 520px; margin-bottom: 40px; line-height: 1.7; font-weight: 300; }
  .hero-btns { display: flex; gap: 16px; flex-wrap: wrap; }
  .btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: var(--r-sm); font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; border: none; font-family: var(--font-body); text-decoration: none; }
  .btn-primary { background: linear-gradient(135deg, var(--accent), var(--accent2)); color: white; box-shadow: 0 4px 20px rgba(79,142,247,0.4); }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(79,142,247,0.5); }
  .btn-ghost { background: rgba(255,255,255,0.06); color: var(--text); border: 1px solid var(--border2); }
  .btn-ghost:hover { background: rgba(255,255,255,0.1); }
  .hero-stats { display: flex; gap: 48px; margin-top: 64px; padding-top: 48px; border-top: 1px solid var(--border); }
  .hero-stat-val { font-family: var(--font-display); font-size: 36px; font-weight: 800; color: var(--text); }
  .hero-stat-label { font-size: 13px; color: var(--text3); margin-top: 2px; }

  /* ── Feature cards ── */
  .features { padding: 100px 48px; }
  .section-label { font-size: 12px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
  .section-title { font-family: var(--font-display); font-size: clamp(28px, 4vw, 44px); font-weight: 800; letter-spacing: -1px; margin-bottom: 16px; }
  .section-sub { color: var(--text2); font-size: 16px; max-width: 540px; margin-bottom: 56px; font-weight: 300; }
  .feat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
  .feat-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--r); padding: 28px; cursor: pointer; transition: all 0.25s; position: relative; overflow: hidden; }
  .feat-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, var(--glow), transparent); opacity: 0; transition: opacity 0.3s; }
  .feat-card:hover { border-color: var(--border2); transform: translateY(-4px); box-shadow: var(--shadow); }
  .feat-card:hover::before { opacity: 1; }
  .feat-icon { font-size: 36px; margin-bottom: 16px; display: block; }
  .feat-card h3 { font-family: var(--font-display); font-size: 18px; font-weight: 700; margin-bottom: 8px; }
  .feat-card p { color: var(--text2); font-size: 14px; line-height: 1.6; }

  /* ── Inner page header ── */
  .page-header { padding: 56px 48px 40px; border-bottom: 1px solid var(--border); }
  .page-header h1 { font-family: var(--font-display); font-size: clamp(28px, 4vw, 42px); font-weight: 800; letter-spacing: -1px; }
  .page-header p { color: var(--text2); margin-top: 8px; font-size: 16px; }

  /* ── Filter bar ── */
  .filter-bar { display: flex; gap: 12px; padding: 20px 48px; border-bottom: 1px solid var(--border); flex-wrap: wrap; align-items: center; }
  .filter-btn { padding: 7px 18px; border-radius: 100px; font-size: 13px; font-weight: 600; cursor: pointer; border: 1px solid var(--border2); background: transparent; color: var(--text2); font-family: var(--font-body); transition: all 0.2s; }
  .filter-btn:hover { color: var(--text); border-color: rgba(255,255,255,0.25); }
  .filter-btn.active { background: var(--accent); color: white; border-color: var(--accent); }
  .filter-search { margin-left: auto; padding: 8px 16px; background: var(--card); border: 1px solid var(--border2); border-radius: 8px; color: var(--text); font-family: var(--font-body); font-size: 14px; outline: none; min-width: 220px; }
  .filter-search::placeholder { color: var(--text3); }
  .filter-search:focus { border-color: var(--accent); }

  /* ── Institution grid ── */
  .inst-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; padding: 32px 48px; }
  .inst-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--r); padding: 24px; cursor: pointer; transition: all 0.25s; position: relative; overflow: hidden; }
  .inst-card:hover { border-color: var(--border2); transform: translateY(-3px); box-shadow: var(--shadow); }
  .inst-top { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 16px; }
  .inst-logo { width: 52px; height: 52px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
  .inst-name { font-family: var(--font-display); font-size: 15px; font-weight: 700; line-height: 1.3; margin-bottom: 4px; }
  .inst-meta { font-size: 12px; color: var(--text3); }
  .inst-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
  .tag { padding: 3px 10px; border-radius: 100px; font-size: 11px; font-weight: 600; background: rgba(79,142,247,0.12); color: var(--accent); border: 1px solid rgba(79,142,247,0.2); }
  .tag-green { background: rgba(48,217,128,0.1); color: var(--green); border-color: rgba(48,217,128,0.2); }
  .inst-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 14px; border-top: 1px solid var(--border); }
  .inst-tuition { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--text); }
  .inst-tuition span { font-size: 11px; font-weight: 400; color: var(--text3); display: block; }
  .inst-rank { display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--gold); font-weight: 600; }

  /* ── Compare badge ── */
  .compare-btn { position: absolute; top: 14px; right: 14px; width: 28px; height: 28px; border-radius: 6px; border: 1px solid var(--border2); background: var(--card2); display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 14px; transition: all 0.2s; color: var(--text3); }
  .compare-btn:hover, .compare-btn.selected { background: var(--accent); border-color: var(--accent); color: white; }

  /* ── RIASEC ── */
  .riasec-wrap { max-width: 760px; margin: 0 auto; padding: 48px; }
  .riasec-progress { height: 4px; background: var(--card2); border-radius: 2px; margin-bottom: 48px; overflow: hidden; }
  .riasec-progress-fill { height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent2)); border-radius: 2px; transition: width 0.4s; }
  .riasec-q { font-family: var(--font-display); font-size: 22px; font-weight: 700; margin-bottom: 32px; line-height: 1.4; }
  .riasec-q small { display: block; font-size: 13px; font-weight: 400; color: var(--text3); font-family: var(--font-body); margin-bottom: 10px; }
  .riasec-options { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
  .riasec-opt { padding: 14px 8px; border-radius: var(--r-sm); border: 1px solid var(--border); background: var(--card); cursor: pointer; text-align: center; transition: all 0.2s; font-family: var(--font-body); color: var(--text2); font-size: 13px; }
  .riasec-opt:hover { border-color: var(--accent); color: var(--accent); }
  .riasec-opt.selected { background: rgba(79,142,247,0.15); border-color: var(--accent); color: var(--accent); }
  .riasec-opt span { display: block; font-size: 18px; margin-bottom: 6px; }
  .riasec-nav { display: flex; justify-content: space-between; margin-top: 40px; }
  .riasec-results { animation: fadeIn 0.5s; }
  @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  .riasec-type-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 32px 0; }
  .riasec-type-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--r); padding: 20px; text-align: center; }
  .riasec-type-card.top { border-color: var(--accent); background: rgba(79,142,247,0.08); }
  .riasec-type-bar { height: 6px; background: var(--card2); border-radius: 3px; margin: 10px 0 6px; overflow: hidden; }
  .riasec-type-fill { height: 100%; border-radius: 3px; }
  .career-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
  .career-chip { padding: 5px 12px; background: rgba(123,95,255,0.1); border: 1px solid rgba(123,95,255,0.25); border-radius: 100px; font-size: 12px; color: #A992FF; }

  /* ── Financial Aid ── */
  .aid-wrap { padding: 32px 48px; }
  .aid-filters { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 32px; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-label { font-size: 12px; font-weight: 600; color: var(--text3); text-transform: uppercase; letter-spacing: 1px; }
  .form-select { padding: 10px 14px; background: var(--card); border: 1px solid var(--border2); border-radius: var(--r-sm); color: var(--text); font-family: var(--font-body); font-size: 14px; outline: none; cursor: pointer; }
  .form-select:focus { border-color: var(--accent); }
  .form-input { padding: 10px 14px; background: var(--card); border: 1px solid var(--border2); border-radius: var(--r-sm); color: var(--text); font-family: var(--font-body); font-size: 14px; outline: none; }
  .form-input::placeholder { color: var(--text3); }
  .form-input:focus { border-color: var(--accent); }
  .aid-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
  .aid-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--r); padding: 24px; transition: all 0.25s; }
  .aid-card:hover { border-color: var(--border2); transform: translateY(-2px); }
  .aid-card.highlight { border-color: var(--green); background: linear-gradient(135deg, rgba(48,217,128,0.05), var(--card)); }
  .aid-header { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
  .aid-logo { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 22px; }
  .aid-name { font-family: var(--font-display); font-size: 16px; font-weight: 700; }
  .aid-type { font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 100px; background: rgba(79,142,247,0.12); color: var(--accent); }
  .aid-amount { font-family: var(--font-display); font-size: 24px; font-weight: 800; color: var(--green); margin: 12px 0; }
  .aid-detail { font-size: 13px; color: var(--text2); display: flex; align-items: flex-start; gap: 8px; margin-bottom: 6px; }
  .aid-deadline { margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; font-size: 13px; }
  .deadline-val { color: var(--orange); font-weight: 600; }
  .match-badge { display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; color: var(--green); }

  /* ── Comparison ── */
  .compare-wrap { padding: 32px 48px; }
  .compare-selector { display: flex; gap: 16px; margin-bottom: 32px; flex-wrap: wrap; }
  .compare-slot { flex: 1; min-width: 240px; padding: 16px; background: var(--card); border: 2px dashed var(--border2); border-radius: var(--r); text-align: center; color: var(--text3); font-size: 14px; position: relative; cursor: pointer; transition: border-color 0.2s; }
  .compare-slot.filled { border-style: solid; border-color: var(--border2); cursor: default; }
  .compare-slot:not(.filled):hover { border-color: var(--accent); color: var(--accent); }
  .compare-slot-name { font-family: var(--font-display); font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
  .compare-remove { position: absolute; top: 10px; right: 10px; background: rgba(255,90,90,0.15); border: none; color: var(--red); width: 22px; height: 22px; border-radius: 4px; cursor: pointer; font-size: 12px; display: flex; align-items: center; justify-content: center; }
  .compare-table { width: 100%; border-collapse: collapse; }
  .compare-table th { background: var(--card2); padding: 14px 20px; text-align: left; font-family: var(--font-display); font-size: 13px; font-weight: 700; color: var(--text2); border-bottom: 1px solid var(--border); }
  .compare-table td { padding: 14px 20px; border-bottom: 1px solid var(--border); font-size: 14px; vertical-align: top; }
  .compare-table tr:hover td { background: rgba(255,255,255,0.02); }
  .compare-table .row-label { font-weight: 600; color: var(--text2); font-size: 13px; width: 160px; }
  .compare-best { color: var(--green); font-weight: 700; }
  .compare-header-cell { font-family: var(--font-display); font-size: 15px; font-weight: 700; }

  /* ── Dropdown ── */
  .dropdown { position: relative; }
  .dropdown-menu { position: absolute; top: calc(100% + 8px); left: 0; right: 0; background: var(--card2); border: 1px solid var(--border2); border-radius: var(--r-sm); z-index: 50; max-height: 280px; overflow-y: auto; }
  .dropdown-item { padding: 10px 14px; cursor: pointer; font-size: 14px; transition: background 0.15s; }
  .dropdown-item:hover { background: rgba(255,255,255,0.06); }

  /* ── Modal ── */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(6px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px; }
  .modal { background: var(--bg2); border: 1px solid var(--border2); border-radius: 20px; max-width: 640px; width: 100%; max-height: 85vh; overflow-y: auto; padding: 36px; position: relative; }
  .modal-close { position: absolute; top: 20px; right: 20px; background: var(--card2); border: none; color: var(--text2); width: 32px; height: 32px; border-radius: 8px; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; }
  .modal-logo { font-size: 48px; margin-bottom: 16px; }
  .modal h2 { font-family: var(--font-display); font-size: 26px; font-weight: 800; margin-bottom: 6px; }
  .modal-sub { color: var(--text2); font-size: 14px; margin-bottom: 24px; }
  .modal-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px; }
  .modal-stat { background: var(--card); border-radius: 10px; padding: 14px; text-align: center; }
  .modal-stat-val { font-family: var(--font-display); font-size: 20px; font-weight: 800; color: var(--text); }
  .modal-stat-label { font-size: 11px; color: var(--text3); margin-top: 2px; }
  .modal-section { margin-bottom: 20px; }
  .modal-section h4 { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: var(--text3); margin-bottom: 10px; }

  /* ── Compare bar ── */
  .compare-bar { position: fixed; bottom: 0; left: 0; right: 0; background: var(--card2); border-top: 1px solid var(--border2); padding: 14px 48px; display: flex; align-items: center; gap: 16px; z-index: 90; transform: translateY(100%); transition: transform 0.3s; }
  .compare-bar.visible { transform: translateY(0); }
  .compare-bar-items { display: flex; gap: 12px; flex: 1; }
  .compare-bar-item { background: var(--card); border: 1px solid var(--border2); border-radius: 8px; padding: 6px 12px; font-size: 13px; display: flex; align-items: center; gap: 6px; }

  /* ── Empty state ── */
  .empty { text-align: center; padding: 80px 40px; color: var(--text3); }
  .empty-icon { font-size: 48px; margin-bottom: 16px; }
  .empty h3 { font-family: var(--font-display); font-size: 20px; color: var(--text2); margin-bottom: 8px; }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--card2); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--border2); }

  /* ── Misc ── */
  .divider { height: 1px; background: var(--border); margin: 0 48px; }
  .pill { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 100px; font-size: 11px; font-weight: 600; }
  .pill-blue { background: rgba(79,142,247,0.12); color: var(--accent); border: 1px solid rgba(79,142,247,0.2); }
  .pill-purple { background: rgba(123,95,255,0.12); color: #A992FF; border: 1px solid rgba(123,95,255,0.2); }
  .pill-green { background: rgba(48,217,128,0.1); color: var(--green); border: 1px solid rgba(48,217,128,0.2); }
  .highlight-row { background: rgba(48,217,128,0.05); }
`;

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Nav({ page, setPage, compareCount }) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const links = [
    { id: "home", label: "Home" },
    { id: "institutions", label: "Institutions" },
    { id: "assessment", label: "Career Assessment" },
    { id: "financial-aid", label: "Financial Aid" },
    { id: "compare", label: `Compare${compareCount ? ` (${compareCount})` : ""}` },
    { id: "resume", label: "CV Builder" },
  ];
  const toolLinks = [
    { id: "tools", label: "🛠️  Academic Tools" },
    { id: "freebies", label: "🎁  Free Resources" },
  ];
  const isToolPage = ["tools","freebies"].includes(page);
  return (
    <nav className="nav" style={{ flexWrap: "wrap", height: "auto", minHeight: "var(--nav-h)", padding: "0 20px" }}>
      <div className="nav-logo" onClick={() => setPage("home")}><span>Uni</span>Guide</div>
      <div className="nav-links" style={{ flexWrap: "wrap" }}>
        {links.map(l => (
          <button key={l.id} className={`nav-link${page === l.id ? " active" : ""}`} onClick={() => setPage(l.id)}>{l.label}</button>
        ))}
        <div style={{ position: "relative" }} onMouseLeave={() => setToolsOpen(false)}>
          <button className={`nav-link${isToolPage ? " active" : ""}`} onMouseEnter={() => setToolsOpen(true)} onClick={() => setToolsOpen(o => !o)} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            Student Hub ▾
          </button>
          {toolsOpen && (
            <div style={{ position: "absolute", top: "100%", left: 0, background: "var(--card2)", border: "1px solid var(--border2)", borderRadius: 10, minWidth: 200, zIndex: 200, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
              {toolLinks.map(t => (
                <button key={t.id} className="dropdown-item" style={{ width: "100%", textAlign: "left", background: "none", border: "none", color: "var(--text)", cursor: "pointer", padding: "12px 16px", fontFamily: "var(--font-body)", fontSize: 14 }}
                  onClick={() => { setPage(t.id); setToolsOpen(false); }}>{t.label}</button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="nav-flag">🇿🇦</div>
    </nav>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────

function HomePage({ setPage }) {
  const features = [
    { icon: "🏛️", title: "Explore Institutions", desc: "Browse universities, UoTs, TVET colleges and private institutions with full profiles and course listings.", page: "institutions" },
    { icon: "🧠", title: "Career Assessment", desc: "Complete our RIASEC personality assessment and discover careers and qualifications that match you.", page: "assessment" },
    { icon: "💰", title: "Financial Aid Matcher", desc: "Find NSFAS and bursary opportunities tailored to your field of study and financial situation.", page: "financial-aid" },
    { icon: "⚖️", title: "Compare Institutions", desc: "Side-by-side comparison of tuition, rankings, acceptance rates, and course offerings.", page: "compare" },
    { icon: "📄", title: "CV Builder", desc: "Build a professional South African CV in minutes with guided templates tailored for graduates and school-leavers.", page: "resume" },
    { icon: "🛠️", title: "Academic Tools", desc: "Reference generators, GPA calculators, study planners, plagiarism checkers and more — all free.", page: "tools" },
    { icon: "🎁", title: "Free Student Resources", desc: "Unlock hundreds of rands worth of free software, cloud storage, and learning tools using your student email.", page: "freebies" },
  ];
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-grid" />
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
        </div>
        <div className="hero-content">
          <div className="hero-badge">South Africa's #1 Student Platform</div>
          <h1>Find Your Path to <em>Higher Education</em></h1>
          <p>UniGuide connects South African students with the right universities, TVET colleges, bursaries, and career pathways — all in one place.</p>
          <div className="hero-btns">
            <button className="btn btn-primary" onClick={() => setPage("assessment")}>🧠 Take Career Assessment</button>
            <button className="btn btn-ghost" onClick={() => setPage("institutions")}>Explore Institutions →</button>
          </div>
          <div className="hero-stats">
            {[["76+", "Institutions"], ["100+", "Bursaries"], ["500+", "Career Paths"], ["Free", "Forever"]].map(([v, l]) => (
              <div key={l}><div className="hero-stat-val">{v}</div><div className="hero-stat-label">{l}</div></div>
            ))}
          </div>
        </div>
      </section>
      <section className="features">
        <div className="section-label">What We Offer</div>
        <h2 className="section-title">Everything You Need to Decide</h2>
        <p className="section-sub">From personality-based career matching to financial aid — UniGuide covers every step of your journey.</p>
        <div className="feat-grid">
          {features.map(f => (
            <div key={f.title} className="feat-card" onClick={() => setPage(f.page)}>
              <span className="feat-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── INSTITUTIONS ─────────────────────────────────────────────────────────────

const TYPE_META = {
  university:  { label: "Universities",               badge: "Uni",     badgeColor: "#4F8EF7", icon: "🎓" },
  uot:         { label: "Universities of Technology", badge: "UoT",     badgeColor: "#FF8C42", icon: "⚙️" },
  tvet:        { label: "TVET Colleges",              badge: "TVET",    badgeColor: "#30D980", icon: "🏫" },
  private:     { label: "Private Colleges",           badge: "Private", badgeColor: "#A992FF", icon: "🏢" },
};

function InstCard({ inst, compareList, toggleCompare, onOpen }) {
  const isSelected = !!compareList.find(c => c.id === inst.id);
  const meta = TYPE_META[inst.type];
  return (
    <div className="inst-card" onClick={() => onOpen(inst)}>
      <button className={`compare-btn${isSelected ? " selected" : ""}`}
        onClick={e => { e.stopPropagation(); toggleCompare(inst); }} title="Add to compare">
        {isSelected ? "✓" : "+"}
      </button>
      <div className="inst-top">
        <div className="inst-logo" style={{ background: inst.color + "22" }}>{inst.logo}</div>
        <div>
          <div className="inst-name">{inst.name}</div>
          <div className="inst-meta">{inst.city} · {inst.province}</div>
        </div>
      </div>
      <div className="inst-tags">
        {inst.courses.slice(0, 3).map(c => <span key={c} className="tag">{c}</span>)}
        {inst.courses.length > 3 && <span className="tag">+{inst.courses.length - 3}</span>}
      </div>
      <div className="inst-footer">
        <div className="inst-tuition">
          R{inst.tuition.toLocaleString()}
          <span>per year</span>
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 100,
          background: meta.badgeColor + "22", color: meta.badgeColor, border: `1px solid ${meta.badgeColor}44` }}>
          {meta.badge}
        </span>
      </div>
      {inst.rank && (
        <div style={{ position: "absolute", top: 14, left: 14, fontSize: 11, color: "var(--gold)", fontWeight: 700 }}>
          ⭐ #{inst.rank}
        </div>
      )}
    </div>
  );
}

function SectionHeader({ type, count, collapsed, onToggle }) {
  const meta = TYPE_META[type];
  return (
    <div onClick={onToggle} style={{ display: "flex", alignItems: "center", gap: 14, padding: "20px 48px 12px",
      cursor: "pointer", borderBottom: "1px solid var(--border)", userSelect: "none" }}>
      <span style={{ fontSize: 22 }}>{meta.icon}</span>
      <div style={{ flex: 1 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--text)" }}>
          {meta.label}
        </span>
        <span style={{ marginLeft: 10, fontSize: 12, color: "var(--text3)", fontWeight: 500 }}>
          {count} institution{count !== 1 ? "s" : ""}
        </span>
      </div>
      <span style={{ color: "var(--text3)", fontSize: 18, transition: "transform 0.25s",
        transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)" }}>▾</span>
    </div>
  );
}

function InstitutionsPage({ compareList, setCompareList, setPage }) {
  const [filter, setFilter] = useState("all");
  const [province, setProvince] = useState("all");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [collapsed, setCollapsed] = useState({ university: false, uot: false, tvet: false, private: false });

  const all = [...UNIVERSITIES, ...UNIVERSITIES_OF_TECHNOLOGY, ...TVET_COLLEGES, ...PRIVATE_COLLEGES];
  const provinces = [...new Set(all.map(i => i.province))].sort();

  const filterInst = (arr) => arr.filter(i => {
    if (province !== "all" && i.province !== province) return false;
    if (search && !i.name.toLowerCase().includes(search.toLowerCase()) &&
        !i.city.toLowerCase().includes(search.toLowerCase()) &&
        !i.abbr.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleCompare = (inst) => {
    if (compareList.find(c => c.id === inst.id)) setCompareList(compareList.filter(c => c.id !== inst.id));
    else if (compareList.length < 3) setCompareList([...compareList, inst]);
  };

  const toggleCollapse = (type) => setCollapsed(c => ({ ...c, [type]: !c[type] }));

  const sections = [
    { type: "university", data: filterInst(UNIVERSITIES) },
    { type: "uot",        data: filterInst(UNIVERSITIES_OF_TECHNOLOGY) },
    { type: "tvet",       data: filterInst(TVET_COLLEGES) },
    { type: "private",    data: filterInst(PRIVATE_COLLEGES) },
  ].filter(s => {
    if (filter === "all") return true;
    return s.type === filter;
  });

  const totalShown = sections.reduce((n, s) => n + s.data.length, 0);

  return (
    <div className="page">
      <div className="page-header">
        <div className="section-label">Directory</div>
        <h1>Institutions</h1>
        <p>
          {UNIVERSITIES.length} traditional universities · {UNIVERSITIES_OF_TECHNOLOGY.length} universities of technology · {TVET_COLLEGES.length} TVET colleges · {PRIVATE_COLLEGES.length} private colleges
        </p>
      </div>

      <div className="filter-bar">
        {[["all","All"],["university","Universities"],["uot","UoT"],["tvet","TVET"],["private","Private"]].map(([v,l]) => (
          <button key={v} className={`filter-btn${filter === v ? " active" : ""}`} onClick={() => setFilter(v)}>{l}</button>
        ))}
        <select className="form-select" style={{ background: "var(--card)", border: "1px solid var(--border2)", color: "var(--text)", padding: "7px 12px", borderRadius: 100, fontSize: 13 }}
          value={province} onChange={e => setProvince(e.target.value)}>
          <option value="all">All Provinces</option>
          {provinces.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <input className="filter-search" placeholder="🔍  Search name, city, abbreviation..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {totalShown === 0 ? (
        <div className="empty"><div className="empty-icon">🔍</div><h3>No results found</h3><p>Try adjusting your filters or search term</p></div>
      ) : (
        sections.map(({ type, data }) => data.length === 0 ? null : (
          <div key={type}>
            <SectionHeader type={type} count={data.length} collapsed={collapsed[type]} onToggle={() => toggleCollapse(type)} />
            {!collapsed[type] && (
              <div className="inst-grid">
                {data.map(inst => (
                  <InstCard key={inst.id} inst={inst} compareList={compareList} toggleCompare={toggleCompare} onOpen={setModal} />
                ))}
              </div>
            )}
          </div>
        ))
      )}

      {compareList.length > 0 && (
        <div className="compare-bar visible">
          <span style={{ fontSize: 13, color: "var(--text2)", fontWeight: 600 }}>Compare:</span>
          <div className="compare-bar-items">
            {compareList.map(c => (
              <div key={c.id} className="compare-bar-item">{c.logo} {c.abbr}</div>
            ))}
          </div>
          <button className="btn btn-primary" style={{ padding: "8px 18px", fontSize: 13 }} onClick={() => setPage("compare")}>
            Compare Now →
          </button>
        </div>
      )}

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 44, background: modal.color + "22", borderRadius: 14, width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center" }}>{modal.logo}</div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <h2 style={{ fontSize: 22 }}>{modal.name}</h2>
                </div>
                <p className="modal-sub" style={{ margin: 0 }}>{modal.city}, {modal.province}{modal.founded ? ` · Est. ${modal.founded}` : ""}</p>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 100, marginTop: 6, display: "inline-block",
                  background: TYPE_META[modal.type].badgeColor + "22", color: TYPE_META[modal.type].badgeColor }}>
                  {TYPE_META[modal.type].label}
                </span>
              </div>
            </div>
            <div className="modal-stats">
              <div className="modal-stat"><div className="modal-stat-val">R{modal.tuition.toLocaleString()}</div><div className="modal-stat-label">Tuition / year</div></div>
              <div className="modal-stat"><div className="modal-stat-val">{modal.students?.toLocaleString() || "—"}</div><div className="modal-stat-label">Students</div></div>
              <div className="modal-stat">
                <div className="modal-stat-val">{modal.acceptance ? `${modal.acceptance}%` : modal.campuses ? `${modal.campuses}` : "—"}</div>
                <div className="modal-stat-label">{modal.acceptance ? "Acceptance Rate" : modal.campuses ? "Campuses" : "—"}</div>
              </div>
            </div>
            {modal.description && <p style={{ color: "var(--text2)", fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>{modal.description}</p>}
            <div className="modal-section">
              <h4>Courses / Faculties</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {modal.courses.map(c => <span key={c} className="tag">{c}</span>)}
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { toggleCompare(modal); setModal(null); }}>
                {compareList.find(c => c.id === modal.id) ? "✓ Remove from Compare" : "+ Add to Compare"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── RIASEC ASSESSMENT ────────────────────────────────────────────────────────

function AssessmentPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const opts = [
    { val: 1, label: "Strongly Disagree", emoji: "😑" },
    { val: 2, label: "Disagree", emoji: "🙁" },
    { val: 3, label: "Neutral", emoji: "😐" },
    { val: 4, label: "Agree", emoji: "🙂" },
    { val: 5, label: "Strongly Agree", emoji: "😄" },
  ];

  const q = RIASEC_QUESTIONS[current];
  const progress = ((current) / RIASEC_QUESTIONS.length) * 100;

  const handleAnswer = (val) => {
    const newAnswers = { ...answers, [q.id]: { val, type: q.type } };
    setAnswers(newAnswers);
    if (current < RIASEC_QUESTIONS.length - 1) {
      setTimeout(() => setCurrent(current + 1), 300);
    } else {
      setTimeout(() => setDone(true), 300);
    }
  };

  const calcScores = () => {
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    Object.values(answers).forEach(a => { scores[a.type] += a.val; });
    return scores;
  };

  const reset = () => { setAnswers({}); setCurrent(0); setDone(false); };

  if (done) {
    const scores = calcScores();
    const max = Math.max(...Object.values(scores));
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topTypes = sorted.slice(0, 3);
    const typeColors = { R: "#FF8C42", I: "#4F8EF7", A: "#FF5A9E", S: "#30D980", E: "#F5C842", C: "#7B5FFF" };

    return (
      <div className="page">
        <div className="page-header">
          <div className="section-label">Results</div>
          <h1>Your Career Profile</h1>
          <p>Based on your RIASEC assessment responses</p>
        </div>
        <div className="riasec-wrap riasec-results">
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: 28, marginBottom: 32, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{RIASEC_CAREERS[sorted[0][0]].emoji}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, marginBottom: 6 }}>
              {RIASEC_CAREERS[sorted[0][0]].label} Type
            </div>
            <div style={{ color: "var(--text2)", fontSize: 15 }}>{RIASEC_CAREERS[sorted[0][0]].desc}</div>
            <div style={{ marginTop: 12, fontSize: 13, color: "var(--text3)" }}>Your Holland Code: <strong style={{ color: "var(--accent)" }}>{topTypes.map(t => t[0]).join("")}</strong></div>
          </div>

          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 20 }}>Your RIASEC Profile</h3>
          <div className="riasec-type-grid">
            {sorted.map(([type, score], i) => {
              const info = RIASEC_CAREERS[type];
              const pct = Math.round((score / (max || 1)) * 100);
              return (
                <div key={type} className={`riasec-type-card${i === 0 ? " top" : ""}`}>
                  <div style={{ fontSize: 28 }}>{info.emoji}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, margin: "6px 0 2px" }}>{info.label}</div>
                  <div className="riasec-type-bar">
                    <div className="riasec-type-fill" style={{ width: `${pct}%`, background: typeColors[type] }} />
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text3)" }}>{pct}%</div>
                </div>
              );
            })}
          </div>

          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 16, marginTop: 32 }}>Recommended Careers</h3>
          <div className="career-chips">
            {topTypes.flatMap(([type]) => RIASEC_CAREERS[type].careers).slice(0, 12).map(c => (
              <span key={c} className="career-chip">{c}</span>
            ))}
          </div>

          <div style={{ marginTop: 32 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 16 }}>Suggested Institutions</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {UNIVERSITIES.slice(0, 4).map(u => (
                <div key={u.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 16px", display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 24 }}>{u.logo}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, fontFamily: "var(--font-display)" }}>{u.abbr}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)" }}>{u.city}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", marginTop: 32 }} onClick={reset}>
            🔄 Retake Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div className="section-label">RIASEC Assessment</div>
        <h1>Discover Your Career Type</h1>
        <p>Answer {RIASEC_QUESTIONS.length} questions to find careers and courses that match your personality</p>
      </div>
      <div className="riasec-wrap">
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text3)", marginBottom: 8 }}>
          <span>Question {current + 1} of {RIASEC_QUESTIONS.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="riasec-progress"><div className="riasec-progress-fill" style={{ width: `${progress}%` }} /></div>
        <div className="riasec-q">
          <small>How much does this describe you?</small>
          {q.text}
        </div>
        <div className="riasec-options">
          {opts.map(o => (
            <button key={o.val} className={`riasec-opt${answers[q.id]?.val === o.val ? " selected" : ""}`} onClick={() => handleAnswer(o.val)}>
              <span>{o.emoji}</span>
              {o.label}
            </button>
          ))}
        </div>
        <div className="riasec-nav">
          <button className="btn btn-ghost" onClick={() => current > 0 && setCurrent(current - 1)} disabled={current === 0} style={{ opacity: current === 0 ? 0.4 : 1 }}>← Back</button>
          {answers[q.id] && <button className="btn btn-primary" onClick={() => current < RIASEC_QUESTIONS.length - 1 ? setCurrent(current + 1) : setDone(true)}>
            {current === RIASEC_QUESTIONS.length - 1 ? "See Results →" : "Next →"}
          </button>}
        </div>
      </div>
    </div>
  );
}

// ─── FINANCIAL AID ────────────────────────────────────────────────────────────

function FinancialAidPage() {
  const [income, setIncome] = useState("");
  const [field, setField] = useState("all");
  const [type, setType] = useState("all");
  const [avg, setAvg] = useState("");

  const fields = [...new Set(BURSARIES.flatMap(b => b.fields))].filter(f => f !== "All fields");

  const isEligible = (b) => {
    if (type !== "all" && b.type !== type) return false;
    if (field !== "all" && !b.fields.includes(field) && !b.fields.includes("All fields")) return false;
    if (income && b.name === "NSFAS" && parseInt(income) > 350000) return false;
    return true;
  };

  const eligible = BURSARIES.filter(isEligible);
  const notEligible = BURSARIES.filter(b => !isEligible(b));

  return (
    <div className="page">
      <div className="page-header">
        <div className="section-label">Funding</div>
        <h1>Financial Aid & Bursaries</h1>
        <p>Find funding options matched to your circumstances and field of study</p>
      </div>
      <div className="aid-wrap">
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: 24, marginBottom: 32 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, marginBottom: 20 }}>🎯 Match Bursaries to Your Profile</h3>
          <div className="aid-filters">
            <div className="form-group">
              <label className="form-label">Household Income (R/year)</label>
              <input className="form-input" placeholder="e.g. 280000" value={income} onChange={e => setIncome(e.target.value)} type="number" />
            </div>
            <div className="form-group">
              <label className="form-label">Field of Study</label>
              <select className="form-select" value={field} onChange={e => setField(e.target.value)}>
                <option value="all">All Fields</option>
                {fields.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Bursary Type</label>
              <select className="form-select" value={type} onChange={e => setType(e.target.value)}>
                <option value="all">All Types</option>
                <option value="Government">Government</option>
                <option value="Corporate">Corporate</option>
                <option value="Foundation">Foundation</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Academic Average (%)</label>
              <input className="form-input" placeholder="e.g. 75" value={avg} onChange={e => setAvg(e.target.value)} type="number" max="100" min="0" />
            </div>
          </div>
        </div>

        {eligible.length > 0 && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <span className="pill pill-green">✓ {eligible.length} Matches Found</span>
              <span style={{ fontSize: 13, color: "var(--text3)" }}>Showing bursaries that match your filters</span>
            </div>
            <div className="aid-cards">
              {eligible.map(b => (
                <div key={b.id} className="aid-card highlight">
                  <div className="aid-header">
                    <div className="aid-logo" style={{ background: b.color + "22" }}>{b.logo}</div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <div className="aid-name">{b.name}</div>
                        <span className="aid-type">{b.type}</span>
                      </div>
                      <div className="match-badge">✓ You may qualify</div>
                    </div>
                  </div>
                  <div className="aid-amount">{b.amount}</div>
                  <div className="aid-detail">🎯 <span>{b.criteria}</span></div>
                  <div className="aid-detail">📚 <span>{b.fields.join(", ")}</span></div>
                  <div className="aid-deadline">
                    <span style={{ color: "var(--text3)", fontSize: 12 }}>Application Deadline</span>
                    <span className="deadline-val">📅 {b.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {notEligible.length > 0 && eligible.length > 0 && (
          <div style={{ margin: "40px 0 18px" }}>
            <div className="pill pill-blue" style={{ marginBottom: 12 }}>Other Available Bursaries</div>
          </div>
        )}
        {notEligible.length > 0 && (
          <div className="aid-cards">
            {notEligible.map(b => (
              <div key={b.id} className="aid-card">
                <div className="aid-header">
                  <div className="aid-logo" style={{ background: b.color + "22" }}>{b.logo}</div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <div className="aid-name">{b.name}</div>
                      <span className="aid-type">{b.type}</span>
                    </div>
                  </div>
                </div>
                <div className="aid-amount">{b.amount}</div>
                <div className="aid-detail">🎯 <span>{b.criteria}</span></div>
                <div className="aid-detail">📚 <span>{b.fields.join(", ")}</span></div>
                <div className="aid-deadline">
                  <span style={{ color: "var(--text3)", fontSize: 12 }}>Application Deadline</span>
                  <span className="deadline-val">📅 {b.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── COMPARE ─────────────────────────────────────────────────────────────────

function ComparePage({ compareList, setCompareList }) {
  const [slots, setSlots] = useState(compareList.slice(0, 3));
  const [openSlot, setOpenSlot] = useState(null);
  const [search, setSearch] = useState("");
  const all = [...UNIVERSITIES, ...UNIVERSITIES_OF_TECHNOLOGY, ...TVET_COLLEGES, ...PRIVATE_COLLEGES];

  useEffect(() => { setSlots(compareList.slice(0, 3)); }, [compareList]);

  const removeSlot = (idx) => {
    const n = [...slots]; n.splice(idx, 1); setSlots(n); setCompareList(n);
  };
  const addToSlot = (inst) => {
    if (slots.find(s => s.id === inst.id)) return;
    const n = [...slots, inst].slice(0, 3); setSlots(n); setCompareList(n); setOpenSlot(null); setSearch("");
  };

  const rows = [
    { label: "Type", key: inst => inst.type === "university" ? "University" : "TVET College" },
    { label: "Province", key: inst => inst.province },
    { label: "City", key: inst => inst.city },
    { label: "Annual Tuition", key: inst => `R${inst.tuition.toLocaleString()}`, compare: "min" },
    { label: "Students", key: inst => inst.students?.toLocaleString() || "—" },
    { label: "Courses Offered", key: inst => inst.courses.join(", ") },
    { label: "National Rank", key: inst => inst.rank ? `#${inst.rank}` : "—", compare: "min" },
    { label: "Acceptance Rate", key: inst => inst.acceptance ? `${inst.acceptance}%` : "—", compare: "min" },
    { label: "Founded", key: inst => inst.founded || "—" },
  ];

  const getBest = (row) => {
    if (!row.compare || slots.length < 2) return null;
    const vals = slots.map(s => {
      const v = parseFloat(String(row.key(s)).replace(/[^0-9.]/g, ""));
      return isNaN(v) ? null : v;
    });
    const validVals = vals.filter(v => v !== null);
    if (!validVals.length) return null;
    const best = row.compare === "min" ? Math.min(...validVals) : Math.max(...validVals);
    return vals.map(v => v === best);
  };

  const filteredAll = all.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) && !slots.find(s => s.id === i.id)
  );

  return (
    <div className="page">
      <div className="page-header">
        <div className="section-label">Side-by-Side</div>
        <h1>Compare Institutions</h1>
        <p>Select up to 3 institutions to compare side-by-side</p>
      </div>
      <div className="compare-wrap">
        <div className="compare-selector">
          {[0, 1, 2].map(i => (
            <div key={i} className={`compare-slot${slots[i] ? " filled" : ""}`} onClick={() => !slots[i] && setOpenSlot(i)}>
              {slots[i] ? (
                <>
                  <button className="compare-remove" onClick={e => { e.stopPropagation(); removeSlot(i); }}>✕</button>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{slots[i].logo}</div>
                  <div className="compare-slot-name">{slots[i].abbr}</div>
                  <div style={{ fontSize: 12, color: "var(--text3)" }}>{slots[i].city}</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>+</div>
                  <div>Add Institution {i + 1}</div>
                  {openSlot === i && (
                    <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "var(--card2)", border: "1px solid var(--border2)", borderRadius: 10, zIndex: 50, padding: 12, marginTop: 6 }}
                      onClick={e => e.stopPropagation()}>
                      <input autoFocus className="filter-search" style={{ width: "100%", marginBottom: 8 }} placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
                      <div style={{ maxHeight: 220, overflowY: "auto" }}>
                        {filteredAll.slice(0, 12).map(inst => (
                          <div key={inst.id} className="dropdown-item" style={{ borderRadius: 6 }} onClick={() => addToSlot(inst)}>
                            {inst.logo} {inst.name}
                          </div>
                        ))}
                        {filteredAll.length === 0 && <div style={{ color: "var(--text3)", fontSize: 13, padding: "8px 0" }}>No results</div>}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {slots.length === 0 ? (
          <div className="empty"><div className="empty-icon">⚖️</div><h3>No institutions selected</h3><p>Add institutions above to start comparing</p></div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="compare-table">
              <thead>
                <tr>
                  <th style={{ width: 160 }}></th>
                  {slots.map(s => (
                    <th key={s.id}>
                      <div className="compare-header-cell">{s.logo} {s.name}</div>
                      <div style={{ fontWeight: 400, fontSize: 12, color: "var(--text3)", marginTop: 4 }}>{s.type === "university" ? "University" : "TVET College"}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(row => {
                  const best = getBest(row);
                  return (
                    <tr key={row.label}>
                      <td className="row-label">{row.label}</td>
                      {slots.map((s, i) => (
                        <td key={s.id} className={best && best[i] ? "compare-best" : ""}>
                          {row.key(s)}
                          {best && best[i] && <span style={{ marginLeft: 6, fontSize: 11 }}>✓ Best</span>}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CV BUILDER ───────────────────────────────────────────────────────────────

const CV_TEMPLATES = [
  { id: "graduate", label: "Graduate / Entry-Level", icon: "🎓", desc: "Perfect for recent graduates applying for their first professional role." },
  { id: "tvet", label: "TVET / Technical", icon: "⚙️", desc: "Highlights practical skills, learnerships, and trade qualifications." },
  { id: "academic", label: "Academic / Research", icon: "📚", desc: "Designed for postgraduate students and research assistant applications." },
];

const EMPTY_CV = {
  name: "", email: "", phone: "", city: "", linkedin: "",
  objective: "",
  education: [{ institution: "", qualification: "", year: "", average: "" }],
  experience: [{ company: "", role: "", period: "", duties: "" }],
  skills: "",
  languages: "",
  references: "Available on request",
};

function CVBuilderPage() {
  const [template, setTemplate] = useState(null);
  const [cv, setCv] = useState(EMPTY_CV);
  const [preview, setPreview] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");

  const update = (field, val) => setCv(c => ({ ...c, [field]: val }));
  const updateEdu = (i, field, val) => {
    const n = [...cv.education]; n[i] = { ...n[i], [field]: val }; setCv(c => ({ ...c, education: n }));
  };
  const updateExp = (i, field, val) => {
    const n = [...cv.experience]; n[i] = { ...n[i], [field]: val }; setCv(c => ({ ...c, experience: n }));
  };
  const addEdu = () => setCv(c => ({ ...c, education: [...c.education, { institution: "", qualification: "", year: "", average: "" }] }));
  const addExp = () => setCv(c => ({ ...c, experience: [...c.experience, { company: "", role: "", period: "", duties: "" }] }));
  const removeEdu = (i) => setCv(c => ({ ...c, education: c.education.filter((_, j) => j !== i) }));
  const removeExp = (i) => setCv(c => ({ ...c, experience: c.experience.filter((_, j) => j !== i) }));

  if (!template) {
    return (
      <div className="page">
        <div className="page-header">
          <div className="section-label">CV Builder</div>
          <h1>Build Your Professional CV</h1>
          <p>Choose a template designed for South African employers and graduate programmes</p>
        </div>
        <div style={{ padding: "40px 48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, maxWidth: 900 }}>
            {CV_TEMPLATES.map(t => (
              <div key={t.id} className="feat-card" style={{ cursor: "pointer", textAlign: "center", padding: 36 }} onClick={() => setTemplate(t.id)}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{t.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 10 }}>{t.label}</h3>
                <p style={{ color: "var(--text2)", fontSize: 14, marginBottom: 20 }}>{t.desc}</p>
                <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Use This Template →</button>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: 28, maxWidth: 900 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, marginBottom: 16 }}>📋 South African CV Tips</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                ["Keep it to 2 pages max", "South African employers prefer concise CVs — 1 page for fresh graduates, 2 for experienced candidates."],
                ["Include your ID number", "Many SA employers and government positions require your SA ID number on your CV."],
                ["Matric results matter", "Always include your Matric results and distinctions — especially for your first job or bursary application."],
                ["Avoid a photo unless asked", "Unlike European CVs, a photo is optional in SA. Only include one if the employer explicitly requests it."],
                ["List referees with contact details", "Include 2–3 referees with their job title, company, and phone number — not just 'available on request'."],
                ["Use action verbs", "Start bullet points with verbs: 'Managed', 'Developed', 'Coordinated', 'Achieved', 'Implemented'."],
              ].map(([title, desc]) => (
                <div key={title} style={{ background: "var(--bg3)", borderRadius: 10, padding: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, color: "var(--accent)" }}>✓ {title}</div>
                  <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.5 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const sections = [
    { id: "personal", label: "Personal Info", icon: "👤" },
    { id: "objective", label: "Profile / Objective", icon: "🎯" },
    { id: "education", label: "Education", icon: "🎓" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "skills", label: "Skills & Languages", icon: "⚡" },
    { id: "references", label: "References", icon: "📞" },
  ];

  if (preview) {
    return (
      <div className="page">
        <div style={{ padding: "24px 48px", display: "flex", gap: 12, borderBottom: "1px solid var(--border)", alignItems: "center" }}>
          <button className="btn btn-ghost" onClick={() => setPreview(false)}>← Edit CV</button>
          <button className="btn btn-primary" onClick={() => window.print()}>🖨️ Print / Download PDF</button>
          <span style={{ fontSize: 13, color: "var(--text3)", marginLeft: 8 }}>Use Ctrl+P → Save as PDF in your browser</span>
        </div>
        <div style={{ maxWidth: 794, margin: "40px auto", background: "white", color: "#111", padding: "60px 72px", borderRadius: 4, boxShadow: "0 4px 40px rgba(0,0,0,0.3)", fontFamily: "Georgia, serif", fontSize: 13, lineHeight: 1.6 }}>
          <div style={{ borderBottom: "3px solid #003B5C", paddingBottom: 20, marginBottom: 24 }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#003B5C", marginBottom: 4 }}>{cv.name || "Your Name"}</div>
            <div style={{ fontSize: 12, color: "#555", display: "flex", flexWrap: "wrap", gap: "4px 20px" }}>
              {cv.email && <span>✉ {cv.email}</span>}
              {cv.phone && <span>📞 {cv.phone}</span>}
              {cv.city && <span>📍 {cv.city}</span>}
              {cv.linkedin && <span>🔗 {cv.linkedin}</span>}
            </div>
          </div>
          {cv.objective && <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#003B5C", marginBottom: 8 }}>Professional Profile</div>
            <p style={{ color: "#333" }}>{cv.objective}</p>
          </div>}
          {cv.education.some(e => e.institution) && <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#003B5C", marginBottom: 10, borderBottom: "1px solid #ddd", paddingBottom: 4 }}>Education</div>
            {cv.education.filter(e => e.institution).map((e, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>{e.qualification}</strong><span style={{ color: "#666" }}>{e.year}</span>
                </div>
                <div style={{ color: "#555" }}>{e.institution}{e.average ? ` · Average: ${e.average}%` : ""}</div>
              </div>
            ))}
          </div>}
          {cv.experience.some(e => e.company) && <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#003B5C", marginBottom: 10, borderBottom: "1px solid #ddd", paddingBottom: 4 }}>Work Experience</div>
            {cv.experience.filter(e => e.company).map((e, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>{e.role}</strong><span style={{ color: "#666" }}>{e.period}</span>
                </div>
                <div style={{ color: "#555", marginBottom: 4 }}>{e.company}</div>
                {e.duties && <div style={{ color: "#444", whiteSpace: "pre-line", fontSize: 12 }}>{e.duties}</div>}
              </div>
            ))}
          </div>}
          {cv.skills && <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#003B5C", marginBottom: 8, borderBottom: "1px solid #ddd", paddingBottom: 4 }}>Skills</div>
            <div style={{ color: "#333" }}>{cv.skills}</div>
          </div>}
          {cv.languages && <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#003B5C", marginBottom: 8, borderBottom: "1px solid #ddd", paddingBottom: 4 }}>Languages</div>
            <div style={{ color: "#333" }}>{cv.languages}</div>
          </div>}
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: "#003B5C", marginBottom: 8, borderBottom: "1px solid #ddd", paddingBottom: 4 }}>References</div>
            <div style={{ color: "#333" }}>{cv.references}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div className="section-label">CV Builder</div>
          <h1>Build Your CV</h1>
          <p>{CV_TEMPLATES.find(t => t.id === template)?.label} Template</p>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <button className="btn btn-ghost" onClick={() => setTemplate(null)}>Change Template</button>
          <button className="btn btn-primary" onClick={() => setPreview(true)}>Preview CV →</button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", minHeight: "calc(100vh - 180px)" }}>
        <div style={{ borderRight: "1px solid var(--border)", padding: "24px 0" }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              style={{ width: "100%", textAlign: "left", padding: "12px 24px", background: activeSection === s.id ? "rgba(79,142,247,0.1)" : "none",
                border: "none", borderLeft: activeSection === s.id ? "3px solid var(--accent)" : "3px solid transparent",
                color: activeSection === s.id ? "var(--accent)" : "var(--text2)", cursor: "pointer", fontSize: 14,
                fontFamily: "var(--font-body)", display: "flex", alignItems: "center", gap: 8 }}>
              <span>{s.icon}</span> {s.label}
            </button>
          ))}
        </div>
        <div style={{ padding: "32px 48px", maxWidth: 700 }}>
          {activeSection === "personal" && (
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 24 }}>👤 Personal Information</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[["Full Name","name"],["Email Address","email"],["Phone Number","phone"],["City / Town","city"],["LinkedIn URL","linkedin"]].map(([label, field]) => (
                  <div key={field} className="form-group" style={field === "linkedin" ? { gridColumn: "1 / -1" } : {}}>
                    <label className="form-label">{label}</label>
                    <input className="form-input" value={cv[field]} onChange={e => update(field, e.target.value)} placeholder={label} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeSection === "objective" && (
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 8 }}>🎯 Professional Profile</h3>
              <p style={{ color: "var(--text2)", fontSize: 13, marginBottom: 20 }}>Write 2–4 sentences summarising who you are, what you studied, and what kind of role you are seeking. Keep it specific and confident.</p>
              <textarea className="form-input" rows={6} style={{ width: "100%", resize: "vertical" }} value={cv.objective}
                onChange={e => update("objective", e.target.value)}
                placeholder="E.g. Recent BCom Accounting graduate from UCT with a strong foundation in financial reporting and auditing. Seeking an entry-level role in financial services where I can apply my analytical skills and SAICA training requirements..." />
            </div>
          )}
          {activeSection === "education" && (
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 24 }}>🎓 Education</h3>
              {cv.education.map((e, i) => (
                <div key={i} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: 20, marginBottom: 16, position: "relative" }}>
                  {cv.education.length > 1 && <button onClick={() => removeEdu(i)} style={{ position: "absolute", top: 12, right: 12, background: "rgba(255,90,90,0.15)", border: "none", color: "var(--red)", borderRadius: 6, padding: "2px 8px", cursor: "pointer", fontSize: 12 }}>Remove</button>}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[["Institution","institution"],["Qualification / Degree","qualification"],["Year Completed","year"],["Final Average (%)","average"]].map(([label, field]) => (
                      <div key={field} className="form-group">
                        <label className="form-label">{label}</label>
                        <input className="form-input" value={e[field]} onChange={ev => updateEdu(i, field, ev.target.value)} placeholder={label} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button className="btn btn-ghost" onClick={addEdu}>+ Add Another Qualification</button>
            </div>
          )}
          {activeSection === "experience" && (
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 8 }}>💼 Work Experience</h3>
              <p style={{ color: "var(--text2)", fontSize: 13, marginBottom: 20 }}>Include internships, vacation work, part-time jobs, and community service. No experience? Leave blank — your education and skills sections carry you.</p>
              {cv.experience.map((e, i) => (
                <div key={i} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: 20, marginBottom: 16, position: "relative" }}>
                  {cv.experience.length > 1 && <button onClick={() => removeExp(i)} style={{ position: "absolute", top: 12, right: 12, background: "rgba(255,90,90,0.15)", border: "none", color: "var(--red)", borderRadius: 6, padding: "2px 8px", cursor: "pointer", fontSize: 12 }}>Remove</button>}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[["Company / Organisation","company"],["Your Role / Title","role"],["Period (e.g. Jan 2023 – Dec 2023)","period"]].map(([label, field]) => (
                      <div key={field} className="form-group" style={field === "period" ? { gridColumn: "1 / -1" } : {}}>
                        <label className="form-label">{label}</label>
                        <input className="form-input" value={e[field]} onChange={ev => updateExp(i, field, ev.target.value)} placeholder={label} />
                      </div>
                    ))}
                    <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                      <label className="form-label">Key Duties / Achievements (one per line)</label>
                      <textarea className="form-input" rows={4} style={{ width: "100%", resize: "vertical" }} value={e.duties}
                        onChange={ev => updateExp(i, "duties", ev.target.value)} placeholder="• Assisted with financial reconciliations&#10;• Managed customer queries and escalations&#10;• Developed weekly progress reports for management" />
                    </div>
                  </div>
                </div>
              ))}
              <button className="btn btn-ghost" onClick={addExp}>+ Add Another Role</button>
            </div>
          )}
          {activeSection === "skills" && (
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 24 }}>⚡ Skills & Languages</h3>
              <div className="form-group" style={{ marginBottom: 24 }}>
                <label className="form-label">Technical & Soft Skills</label>
                <textarea className="form-input" rows={5} style={{ width: "100%", resize: "vertical" }} value={cv.skills}
                  onChange={e => update("skills", e.target.value)}
                  placeholder="E.g. Microsoft Excel (Advanced), Python (Intermediate), Financial Reporting, Communication, Time Management, Teamwork, Critical Thinking..." />
              </div>
              <div className="form-group">
                <label className="form-label">Languages (include proficiency level)</label>
                <input className="form-input" value={cv.languages} onChange={e => update("languages", e.target.value)} placeholder="E.g. English (Fluent), Zulu (Native), Afrikaans (Conversational)" />
              </div>
              <div style={{ marginTop: 24, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, padding: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)", marginBottom: 12 }}>💡 In-Demand Skills for SA Graduates (2025)</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Data Analysis","Microsoft Excel","Power BI","SQL","Python","Project Management","Financial Reporting","Customer Service","Communication","Critical Thinking","SAP","AutoCAD","IFRS Compliance","COBIT","ISO 27001","Agile / Scrum"].map(s => (
                    <button key={s} onClick={() => update("skills", cv.skills ? cv.skills + ", " + s : s)}
                      style={{ padding: "4px 10px", borderRadius: 100, fontSize: 11, fontWeight: 600, background: "rgba(79,142,247,0.1)", color: "var(--accent)", border: "1px solid rgba(79,142,247,0.2)", cursor: "pointer" }}>
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeSection === "references" && (
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 8 }}>📞 References</h3>
              <p style={{ color: "var(--text2)", fontSize: 13, marginBottom: 20 }}>South African employers typically want 2–3 referees. Include their full name, title, organisation, and contact number.</p>
              <textarea className="form-input" rows={6} style={{ width: "100%", resize: "vertical" }} value={cv.references}
                onChange={e => update("references", e.target.value)}
                placeholder="Mr John Smith&#10;Senior Lecturer, Department of Finance&#10;University of Cape Town&#10;Tel: 021 650 XXXX&#10;&#10;Mrs Sarah Nkosi&#10;Branch Manager, FNB Bellville&#10;Tel: 082 XXX XXXX" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ACADEMIC TOOLS ───────────────────────────────────────────────────────────

function AcademicToolsPage() {
  const [activeTool, setActiveTool] = useState(null);
  const [gpa, setGpa] = useState([{ subject: "", mark: "", credits: "" }]);
  const [cite, setCite] = useState({ author: "", year: "", title: "", publisher: "", city: "", url: "", type: "book" });
  const [pomodoro, setPomodoro] = useState({ running: false, seconds: 25 * 60, mode: "work", sessions: 0 });
  const [wordCount, setWordCount] = useState("");
  const [gradeConv, setGradeConv] = useState("");

  useEffect(() => {
    if (!pomodoro.running) return;
    const t = setInterval(() => {
      setPomodoro(p => {
        if (p.seconds <= 1) {
          const isWork = p.mode === "work";
          return { ...p, seconds: isWork ? 5 * 60 : 25 * 60, mode: isWork ? "break" : "work", sessions: isWork ? p.sessions + 1 : p.sessions, running: false };
        }
        return { ...p, seconds: p.seconds - 1 };
      });
    }, 1000);
    return () => clearInterval(t);
  }, [pomodoro.running]);

  const addSubject = () => setGpa(g => [...g, { subject: "", mark: "", credits: "" }]);
  const updateSubject = (i, f, v) => { const n = [...gpa]; n[i][f] = v; setGpa(n); };
  const removeSubject = (i) => setGpa(g => g.filter((_, j) => j !== i));

  const calcWA = () => {
    const valid = gpa.filter(g => g.mark && g.credits);
    if (!valid.length) return null;
    const total = valid.reduce((s, g) => s + parseFloat(g.mark) * parseFloat(g.credits), 0);
    const credits = valid.reduce((s, g) => s + parseFloat(g.credits), 0);
    return (total / credits).toFixed(2);
  };

  const saGrade = (pct) => {
    const n = parseFloat(pct);
    if (isNaN(n)) return "";
    if (n >= 80) return "Distinction (75%+)";
    if (n >= 70) return "Merit";
    if (n >= 60) return "Pass with Credit";
    if (n >= 50) return "Pass";
    if (n >= 40) return "Sub-minimum";
    return "Fail";
  };

  const genHarvardBook = () => {
    const c = cite;
    if (!c.author || !c.year || !c.title) return "Please fill in Author, Year, and Title.";
    if (c.type === "book") return `${c.author} ${c.year}. ${c.title}. ${c.city ? c.city + ": " : ""}${c.publisher || "[Publisher]"}.`;
    if (c.type === "journal") return `${c.author} ${c.year}. ${c.title}. [Journal Name], [Volume](Issue), pp. [Pages].`;
    if (c.type === "website") return `${c.author} ${c.year}. ${c.title}. [Online] Available at: ${c.url || "[URL]"} [Accessed: [Date]].`;
    return "";
  };

  const fmtTime = (s) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
  const wc = wordCount.trim() ? wordCount.trim().split(/\s+/).length : 0;
  const wa = calcWA();

  const tools = [
    { id: "gpa", icon: "📊", label: "GPA / Weighted Average", desc: "Calculate your semester or year-end weighted average across all subjects." },
    { id: "cite", icon: "📖", label: "Harvard Citation Generator", desc: "Generate correctly formatted Harvard-style references for your assignments." },
    { id: "pomodoro", icon: "⏱️", label: "Pomodoro Study Timer", desc: "Stay focused with 25-minute study blocks and 5-minute breaks." },
    { id: "wordcount", icon: "🔤", label: "Word & Character Counter", desc: "Paste your text to count words, characters, sentences, and reading time." },
    { id: "grade", icon: "🎯", label: "Grade Converter", desc: "Convert percentage marks to SA letter grades and understand what your mark means." },
    { id: "planner", icon: "📅", label: "Study Tips & Exam Planning", desc: "Evidence-based study strategies and advice for SA students." },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div className="section-label">Student Hub</div>
        <h1>Academic Tools</h1>
        <p>Free tools to help you study smarter, write better, and plan effectively</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "calc(100vh - 180px)" }}>
        <div style={{ borderRight: "1px solid var(--border)", padding: "24px 0" }}>
          {tools.map(t => (
            <button key={t.id} onClick={() => setActiveTool(t.id)}
              style={{ width: "100%", textAlign: "left", padding: "14px 24px", background: activeTool === t.id ? "rgba(79,142,247,0.1)" : "none",
                border: "none", borderLeft: activeTool === t.id ? "3px solid var(--accent)" : "3px solid transparent",
                color: activeTool === t.id ? "var(--accent)" : "var(--text2)", cursor: "pointer",
                fontFamily: "var(--font-body)", fontSize: 14 }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{t.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{t.label}</div>
            </button>
          ))}
        </div>
        <div style={{ padding: "36px 48px" }}>
          {!activeTool && (
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Select a tool to get started</div>
              <p style={{ color: "var(--text2)", marginBottom: 32 }}>All tools are free, run in your browser, and require no account.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
                {tools.map(t => (
                  <div key={t.id} className="feat-card" onClick={() => setActiveTool(t.id)}>
                    <span style={{ fontSize: 32, display: "block", marginBottom: 12 }}>{t.icon}</span>
                    <h3 style={{ fontSize: 15, marginBottom: 6 }}>{t.label}</h3>
                    <p style={{ fontSize: 13 }}>{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTool === "gpa" && (
            <div style={{ maxWidth: 600 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 6 }}>📊 Weighted Average Calculator</h2>
              <p style={{ color: "var(--text2)", fontSize: 14, marginBottom: 28 }}>Enter each subject's mark and credit load to calculate your weighted average.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 40px", gap: 8, marginBottom: 8 }}>
                {["Subject", "Mark (%)", "Credits", ""].map(h => <div key={h} style={{ fontSize: 11, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 1 }}>{h}</div>)}
              </div>
              {gpa.map((g, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 80px 80px 40px", gap: 8, marginBottom: 8 }}>
                  <input className="form-input" value={g.subject} onChange={e => updateSubject(i, "subject", e.target.value)} placeholder="e.g. Mathematics" />
                  <input className="form-input" value={g.mark} onChange={e => updateSubject(i, "mark", e.target.value)} placeholder="75" type="number" min="0" max="100" />
                  <input className="form-input" value={g.credits} onChange={e => updateSubject(i, "credits", e.target.value)} placeholder="16" type="number" min="1" />
                  <button onClick={() => removeSubject(i)} style={{ background: "rgba(255,90,90,0.15)", border: "none", color: "var(--red)", borderRadius: 6, cursor: "pointer", fontSize: 14 }}>✕</button>
                </div>
              ))}
              <button className="btn btn-ghost" style={{ marginBottom: 28 }} onClick={addSubject}>+ Add Subject</button>
              {wa && (
                <div style={{ background: "rgba(79,142,247,0.08)", border: "1px solid rgba(79,142,247,0.25)", borderRadius: "var(--r)", padding: 24, textAlign: "center" }}>
                  <div style={{ fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>Weighted Average</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 52, fontWeight: 800, color: parseFloat(wa) >= 75 ? "var(--green)" : parseFloat(wa) >= 50 ? "var(--accent)" : "var(--red)" }}>{wa}%</div>
                  <div style={{ color: "var(--text2)", marginTop: 4 }}>{saGrade(wa)}</div>
                </div>
              )}
            </div>
          )}

          {activeTool === "cite" && (
            <div style={{ maxWidth: 600 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 6 }}>📖 Harvard Citation Generator</h2>
              <p style={{ color: "var(--text2)", fontSize: 14, marginBottom: 24 }}>Used by most South African universities. Fill in the fields and copy your reference.</p>
              <div className="form-group" style={{ marginBottom: 16 }}>
                <label className="form-label">Source Type</label>
                <select className="form-select" value={cite.type} onChange={e => setCite(c => ({ ...c, type: e.target.value }))}>
                  <option value="book">Book</option>
                  <option value="journal">Journal Article</option>
                  <option value="website">Website</option>
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                {[["Author(s) — Surname, Initials","author"],["Year of Publication","year"],["Title","title"],["Publisher","publisher"],["City of Publication","city"],[cite.type==="website"?"URL":"Edition","url"]].map(([label, field]) => (
                  <div key={field} className="form-group" style={["title","url"].includes(field) ? { gridColumn: "1 / -1" } : {}}>
                    <label className="form-label">{label}</label>
                    <input className="form-input" value={cite[field]} onChange={e => setCite(c => ({ ...c, [field]: e.target.value }))} placeholder={label} />
                  </div>
                ))}
              </div>
              <div style={{ background: "var(--card2)", border: "1px solid var(--border2)", borderRadius: 10, padding: 20, marginTop: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "var(--text3)", marginBottom: 10 }}>Generated Reference</div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 14, color: "var(--text)", lineHeight: 1.7 }}>{genHarvardBook()}</div>
                <button className="btn btn-ghost" style={{ marginTop: 14, padding: "6px 14px", fontSize: 13 }} onClick={() => navigator.clipboard?.writeText(genHarvardBook())}>📋 Copy to Clipboard</button>
              </div>
            </div>
          )}

          {activeTool === "pomodoro" && (
            <div style={{ maxWidth: 420, textAlign: "center" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 6 }}>⏱️ Pomodoro Study Timer</h2>
              <p style={{ color: "var(--text2)", fontSize: 14, marginBottom: 40 }}>25 minutes of focused study → 5-minute break. Repeat 4 times, then take a longer break.</p>
              <div style={{ width: 200, height: 200, borderRadius: "50%", border: `8px solid ${pomodoro.mode === "work" ? "var(--accent)" : "var(--green)"}`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", background: "var(--card)",
                boxShadow: `0 0 40px ${pomodoro.mode === "work" ? "rgba(79,142,247,0.3)" : "rgba(48,217,128,0.3)"}` }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 42, fontWeight: 800 }}>{fmtTime(pomodoro.seconds)}</div>
                <div style={{ fontSize: 12, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 2, marginTop: 4 }}>{pomodoro.mode === "work" ? "Focus" : "Break"}</div>
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 24 }}>
                <button className="btn btn-primary" onClick={() => setPomodoro(p => ({ ...p, running: !p.running }))}>
                  {pomodoro.running ? "⏸ Pause" : "▶ Start"}
                </button>
                <button className="btn btn-ghost" onClick={() => setPomodoro({ running: false, seconds: 25*60, mode: "work", sessions: 0 })}>↺ Reset</button>
              </div>
              <div style={{ fontSize: 14, color: "var(--text3)" }}>Sessions completed: <strong style={{ color: "var(--gold)" }}>{pomodoro.sessions}</strong></div>
            </div>
          )}

          {activeTool === "wordcount" && (
            <div style={{ maxWidth: 600 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 6 }}>🔤 Word & Character Counter</h2>
              <p style={{ color: "var(--text2)", fontSize: 14, marginBottom: 20 }}>Paste your essay or assignment text below.</p>
              <textarea className="form-input" rows={10} style={{ width: "100%", resize: "vertical", marginBottom: 16 }} value={wordCount} onChange={e => setWordCount(e.target.value)} placeholder="Paste your text here..." />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {[["Words", wc], ["Characters", wordCount.length], ["Sentences", wordCount.split(/[.!?]+/).filter(Boolean).length], ["Read Time", `~${Math.max(1, Math.round(wc/200))} min`]].map(([label, val]) => (
                  <div key={label} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, padding: 16, textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800 }}>{val}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTool === "grade" && (
            <div style={{ maxWidth: 400 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 6 }}>🎯 Grade Converter</h2>
              <p style={{ color: "var(--text2)", fontSize: 14, marginBottom: 24 }}>Enter your percentage mark to see what it means in South African grading terms.</p>
              <input className="form-input" type="number" min="0" max="100" value={gradeConv} onChange={e => setGradeConv(e.target.value)} placeholder="Enter percentage e.g. 68" style={{ fontSize: 18, marginBottom: 20, width: "100%" }} />
              {gradeConv && (
                <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: 24 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 42, fontWeight: 800, textAlign: "center", color: parseFloat(gradeConv) >= 75 ? "var(--green)" : parseFloat(gradeConv) >= 50 ? "var(--accent)" : "var(--red)", marginBottom: 8 }}>{gradeConv}%</div>
                  <div style={{ textAlign: "center", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{saGrade(gradeConv)}</div>
                  <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.7 }}>
                    {parseFloat(gradeConv) >= 75 ? "🏆 Excellent! You qualify for Honours or Distinction recognition at most SA universities." :
                     parseFloat(gradeConv) >= 70 ? "✅ Strong mark. Many postgraduate programmes require 70%+ for admission." :
                     parseFloat(gradeConv) >= 60 ? "👍 Good pass. Above the average for most SA university programmes." :
                     parseFloat(gradeConv) >= 50 ? "⚠️ Pass, but aim higher — many bursaries and postgrad programmes require 60–65%." :
                     "❌ Below the pass mark. Consider speaking to your lecturer or accessing student support services."}
                  </div>
                </div>
              )}
              <div style={{ marginTop: 24, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
                {[["80–100%","Distinction","var(--green)"],["70–79%","Merit","var(--accent)"],["60–69%","Pass with Credit","#A992FF"],["50–59%","Pass","var(--gold)"],["40–49%","Sub-minimum / Supplementary","var(--orange)"],["0–39%","Fail","var(--red)"]].map(([range, label, color]) => (
                  <div key={range} style={{ display: "flex", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
                    <span style={{ color: "var(--text2)" }}>{range}</span>
                    <span style={{ fontWeight: 700, color }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTool === "planner" && (
            <div style={{ maxWidth: 680 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 6 }}>📅 Study Strategies for SA Students</h2>
              <p style={{ color: "var(--text2)", fontSize: 14, marginBottom: 28 }}>Evidence-based advice that works, even with limited resources.</p>
              {[
                { icon: "🧠", title: "Spaced Repetition", desc: "Study the same content across multiple sessions spread over days. Reviewing material after 1 day, 3 days, and 7 days is proven to increase long-term retention by up to 80% versus cramming the night before." },
                { icon: "✍️", title: "Active Recall Over Re-reading", desc: "Instead of reading your notes again, close them and write down everything you remember. Use past exam papers — your university library has them. UNISA provides them online for free." },
                { icon: "📱", title: "Use Free Learning Apps", desc: "Khan Academy (free, covers maths, science, finance), Coursera (audit courses for free), YouTube (MIT OpenCourseWare, Crash Course), and Google Scholar for academic articles." },
                { icon: "👥", title: "Form a Study Group", desc: "Teaching content to others is the single most effective way to identify gaps in your own understanding. Meet once a week per subject. Keep groups to 3–5 people." },
                { icon: "😴", title: "Sleep Is Not Negotiable", desc: "Memory consolidation happens during sleep. Studying until 3am and waking at 6am impairs performance more than not studying at all. Aim for 7–8 hours before an exam." },
                { icon: "🏫", title: "Use Your Institution's Free Resources", desc: "Library access, tutoring centres, writing labs, mental health counsellors, and career centres are all free as a registered student. Most students never use them." },
                { icon: "📝", title: "Exam Planning Framework", desc: "3 weeks before: identify all topics. 2 weeks before: work through past papers topic by topic. 1 week before: do full timed past papers. 2 days before: light review only. The night before: rest." },
              ].map(tip => (
                <div key={tip.title} style={{ display: "flex", gap: 16, padding: "18px 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontSize: 28, flexShrink: 0, marginTop: 2 }}>{tip.icon}</span>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{tip.title}</div>
                    <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.7 }}>{tip.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── FREE RESOURCES ───────────────────────────────────────────────────────────

const FREEBIES = [
  { id: 1, category: "Productivity", name: "Microsoft 365 Education", emoji: "📄", value: "R350/month free", how: "Sign in at microsoft.com/en-za/education with your institutional email. Get Word, Excel, PowerPoint, Teams, and 1TB OneDrive storage for free.", tags: ["Word","Excel","PowerPoint","OneDrive","Teams"], verified: true, link: "https://www.microsoft.com/en-za/education" },
  { id: 2, category: "Development", name: "GitHub Student Developer Pack", emoji: "🐙", value: "R3,000+ in credits", how: "Apply at education.github.com/pack with your student email. Includes GitHub Pro, free domain, Canva Pro, JetBrains IDEs, DigitalOcean credits, and 100+ other tools.", tags: ["GitHub Pro","Canva Pro","JetBrains","Domain Name","Heroku"], verified: true, link: "https://education.github.com/pack" },
  { id: 3, category: "Productivity", name: "Notion Education Plan", emoji: "📓", value: "R190/month free", how: "Sign up at notion.so and verify your student email. Unlocks the full Plus plan with unlimited blocks, collaboration, and extended version history.", tags: ["Notes","Project Management","Collaboration"], verified: true, link: "https://www.notion.so/product/notion-for-education" },
  { id: 4, category: "Design", name: "Figma Education", emoji: "🎨", value: "R1,500/year free", how: "Apply at figma.com/education. Submit your student ID or enrolment letter. Unlocks unlimited projects and professional team features — used by real UX designers.", tags: ["UI/UX Design","Prototyping","Collaboration"], verified: true, link: "https://www.figma.com/education/" },
  { id: 5, category: "Development", name: "JetBrains All Products Pack", emoji: "💻", value: "R5,000/year free", how: "Apply at jetbrains.com/community/education with your institutional email. Gives you IntelliJ IDEA, PyCharm, WebStorm, and all JetBrains IDEs free annually.", tags: ["Python","Java","Web Development","Kotlin"], verified: true, link: "https://www.jetbrains.com/community/education/" },
  { id: 6, category: "Cloud", name: "Microsoft Azure for Students", emoji: "☁️", value: "$100 in credits", how: "Sign up at azure.microsoft.com/en-gb/free/students. No credit card needed. Includes $100 credit and access to 25+ free Azure services for cloud computing practice.", tags: ["Cloud","DevOps","AI","Databases"], verified: true, link: "https://azure.microsoft.com/en-gb/free/students" },
  { id: 7, category: "Learning", name: "Coursera (Audit for Free)", emoji: "🎓", value: "Thousands of courses", how: "At Coursera.org, click 'Enrol for Free' and then 'Audit the course'. You access all video lectures and readings without paying. Only pay if you want the certificate.", tags: ["Online Courses","Certificates","Coding","Business"], verified: true, link: "https://www.coursera.org" },
  { id: 8, category: "Learning", name: "Khan Academy", emoji: "🏫", value: "100% free, always", how: "Go to khanacademy.org — no student email required. Covers Maths, Physics, Chemistry, Finance, Computing and more. Fully free and excellent for catching up or going ahead.", tags: ["Maths","Science","Finance","Computing"], verified: true, link: "https://www.khanacademy.org" },
  { id: 9, category: "Design", name: "Canva Pro (via GitHub Pack)", emoji: "🖼️", value: "R240/month free", how: "Once you have the GitHub Student Developer Pack (see above), redeem Canva Pro through the pack. Alternatively, apply directly at canva.com/education if you're a verified student.", tags: ["Presentations","Posters","Social Media","CV Design"], verified: true, link: "https://www.canva.com/education/" },
  { id: 10, category: "Writing", name: "Grammarly (University Plans)", emoji: "✍️", value: "R200/month free", how: "Check if your university has a site licence at grammarly.com — many SA universities do. If not, Grammarly's free tier still catches most grammar and spelling errors.", tags: ["Grammar","Writing","Essays","Plagiarism"], verified: false, link: "https://www.grammarly.com" },
  { id: 11, category: "Research", name: "Google Scholar", emoji: "🔬", value: "Free academic articles", how: "Visit scholar.google.com and search for any academic topic. Use 'Cited by' to find related work. For full PDFs blocked by paywalls, try your university's library proxy login.", tags: ["Research","Citations","Academic Articles","Science"], verified: true, link: "https://scholar.google.com" },
  { id: 12, category: "Research", name: "Sci-Hub (Preprint Access)", emoji: "📜", value: "Millions of papers", how: "Many academic papers are freely available as preprints on arXiv.org, PubMed Central, or ResearchGate before paywalls are added. Also check your library's OpenAccess portal.", tags: ["Research","Academic Papers","Open Access"], verified: true, link: "https://arxiv.org" },
  { id: 13, category: "Cloud", name: "Google Workspace (via University)", emoji: "📧", value: "Free storage + apps", how: "Most SA universities provide Google Workspace through your institutional email — giving you Google Docs, Sheets, Slides and enhanced Drive storage. Log in with your .ac.za email at workspace.google.com.", tags: ["Google Docs","Google Drive","Email","Collaboration"], verified: true, link: "https://workspace.google.com" },
  { id: 14, category: "Development", name: "AWS Educate", emoji: "🌐", value: "$100+ in credits", how: "Apply at aws.amazon.com/education/awseducate. No credit card required. Access to AWS cloud services, labs, and courses. Great for learning cloud computing and data engineering.", tags: ["Cloud","DevOps","Machine Learning","Databases"], verified: true, link: "https://aws.amazon.com/education/awseducate/" },
  { id: 15, category: "Learning", name: "LinkedIn Learning", emoji: "💼", value: "30-day free trial", how: "Start a 30-day free trial at linkedin.com/learning. Focus on Microsoft Office, project management, data analysis, or soft skills. Complete courses during the trial and download certificates.", tags: ["Professional Skills","Software","Business","Office"], verified: true, link: "https://www.linkedin.com/learning/" },
  { id: 16, category: "Productivity", name: "Trello / Asana Free Tier", emoji: "🗂️", value: "Free forever tier", how: "Both Trello (trello.com) and Asana (asana.com) offer robust free tiers for project and task management. Use them to organise group projects, track assignments, and manage internship work.", tags: ["Project Management","To-Do Lists","Group Work"], verified: true, link: "https://trello.com" },
];

const FREEBIE_CATEGORIES = ["All", "Productivity", "Development", "Design", "Learning", "Cloud", "Research", "Writing"];

function FreebiesPage() {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = FREEBIES.filter(f => {
    if (cat !== "All" && f.category !== cat) return false;
    if (search && !f.name.toLowerCase().includes(search.toLowerCase()) && !f.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  return (
    <div className="page">
      <div className="page-header">
        <div className="section-label">Student Hub</div>
        <h1>Free Resources for Students</h1>
        <p>Unlock hundreds of rands worth of premium tools using your institutional (.ac.za) student email address</p>
      </div>

      <div style={{ background: "linear-gradient(135deg, rgba(79,142,247,0.08), rgba(123,95,255,0.08))", border: "1px solid rgba(79,142,247,0.2)", borderRadius: 0, padding: "20px 48px", display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ fontSize: 28 }}>💡</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Your .ac.za email is your most valuable student asset</div>
          <div style={{ fontSize: 13, color: "var(--text2)" }}>Every registered student at a public SA university or TVET college has an institutional email. Use it to claim these perks — most expire when you graduate, so start now.</div>
        </div>
      </div>

      <div className="filter-bar">
        {FREEBIE_CATEGORIES.map(c => (
          <button key={c} className={`filter-btn${cat === c ? " active" : ""}`} onClick={() => setCat(c)}>{c}</button>
        ))}
        <input className="filter-search" placeholder="🔍  Search tools or tags..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div style={{ padding: "32px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
          {filtered.map(f => (
            <div key={f.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: 24, transition: "all 0.2s", position: "relative", overflow: "hidden" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.transform = ""; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 32 }}>{f.emoji}</span>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15 }}>{f.name}</div>
                    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 100, background: "rgba(79,142,247,0.1)", color: "var(--accent)", fontWeight: 600 }}>{f.category}</span>
                  </div>
                </div>
                {f.verified && <span style={{ fontSize: 11, color: "var(--green)", fontWeight: 700, background: "rgba(48,217,128,0.1)", padding: "3px 8px", borderRadius: 100, border: "1px solid rgba(48,217,128,0.2)", flexShrink: 0 }}>✓ Verified</span>}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 800, color: "var(--green)", marginBottom: 12 }}>{f.value}</div>
              <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.7, marginBottom: 14 }}>{f.how}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                {f.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <a href={f.link} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "9px 16px", background: "rgba(79,142,247,0.1)", border: "1px solid rgba(79,142,247,0.25)", borderRadius: 8, color: "var(--accent)", fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(79,142,247,0.1)"; e.currentTarget.style.color = "var(--accent)"; }}>
                🔗 Claim This Freebie →
              </a>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 56, background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r)", padding: 32 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, marginBottom: 8 }}>🇿🇦 SA-Specific Resources You Should Know About</h3>
          <p style={{ color: "var(--text2)", fontSize: 14, marginBottom: 24 }}>These are specific to South African students and often overlooked.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {[
              { icon: "🏛️", title: "NSFAS ePortal", desc: "Apply for or manage your NSFAS bursary at nsfas.org.za. Many students miss out simply because they don't apply in time — the window opens in September.", link: "https://www.nsfas.org.za" },
              { icon: "📚", title: "SACE OpenLearn SA", desc: "The South African government's open educational resource portal. Free textbooks, course materials, and learning content for all levels.", link: "https://www.nwu.ac.za" },
              { icon: "🖥️", title: "Telkom e-learning Hub", desc: "Telkom offers affordable or free data bundles for students accessing .ac.za and government learning portals. Check your mobile carrier for zero-rated education sites.", link: "https://www.telkom.co.za" },
              { icon: "📖", title: "SABINET & JSTOR via Libraries", desc: "Your institutional library gives you free access to SABINET (SA journals) and JSTOR. Log in through your university library portal — no separate account needed.", link: "https://www.sabinet.co.za" },
            ].map(r => (
              <a key={r.title} href={r.link} target="_blank" rel="noopener noreferrer" style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 12, padding: 20, textDecoration: "none", color: "inherit", display: "block", transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = ""}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{r.icon}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{r.title}</div>
                <div style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6 }}>{r.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");
  const [compareList, setCompareList] = useState([]);

  return (
    <>
      <style>{styles}</style>
      <Nav page={page} setPage={setPage} compareCount={compareList.length} />
      {page === "home"         && <HomePage setPage={setPage} />}
      {page === "institutions" && <InstitutionsPage compareList={compareList} setCompareList={setCompareList} setPage={setPage} />}
      {page === "assessment"   && <AssessmentPage />}
      {page === "financial-aid"&& <FinancialAidPage />}
      {page === "compare"      && <ComparePage compareList={compareList} setCompareList={setCompareList} />}
      {page === "resume"       && <CVBuilderPage />}
      {page === "tools"        && <AcademicToolsPage />}
      {page === "freebies"     && <FreebiesPage />}
    </>
  );
}
