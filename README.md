# UniGuide 🎓

UniGuide is a comprehensive web application designed to help South African students navigate their higher educational journey. Built with Next.js 14 and Prisma, it provides tools to discover institutions, find funding opportunities, build a CV, and take career assessments.

## ✨ Features

- **🏛️ Institution Directory**: Explore universities and colleges with detailed information on tuition, APS requirements, acceptance rates, and admission dates.
- **💰 Bursary Finder**: Discover available bursaries filtered by fields of study, types, criteria, and deadlines.
- **📝 CV Builder**: Create and save a professional CV using structured templates. Generates PDF CVs seamlessly.
- **🧠 Career Assessments**: Take integrated assessments to discover career paths tailored to your strengths.
- **📚 Student Resources**: Access a curated library of essential resources and guides for students.

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (React 18)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database Engine:** SQLite (configured natively for portable development)
- **PDF Generation:** `html2canvas` & `jspdf`

## 🚀 Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nateXza/UniGuide.git
   cd UniGuide
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the environment variables**
   Create a `.env` file in the root directory and add your database URL. (For SQLite, it usually looks like this:)
   ```env
   DATABASE_URL="file:./dev.db"
   ```

4. **Initialize the Database**
   Push the schema to your database and generate the Prisma Client:
   ```bash
   npm run db:push
   npm run postinstall
   ```

5. **Seed the Database (Optional)**
   If you have initial data configured in `prisma/seed.js`, you can populate your database:
   ```bash
   npm run db:seed
   ```

6. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev` - Starts the development server with Next.js fast refresh.
- `npm run build` - Generates the Prisma client and builds the application for production.
- `npm run start` - Starts the production Next.js server (must run build first).
- `npm run lint` - Lints the codebase to ensure code quality.
- `npm run db:push` - Pushes the Prisma schema state to the database.
- `npm run db:seed` - Executes the seed script to populate the database with initial data.
- `npm run db:studio` - Starts Prisma Studio, a visual editor for the database on `localhost:5555`.

## 🗄️ Database Structure

The application's data is managed via Prisma with the following core models:
- **Institution**: Details about universities/colleges.
- **Bursary**: Financial aid, scholarships, and bursaries.
- **AssessmentResult**: User's saved career assessment outcomes.
- **SavedCV**: User's generated CV data.
- **Resource**: Helpful links, tools, and guides for students.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details. (If applicable)
