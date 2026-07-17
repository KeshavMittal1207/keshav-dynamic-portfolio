import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';

const db_host = import.meta.env.VITE_DB_HOST;
const db_user = import.meta.env.VITE_DB_USEE;
const db_pass = import.meta.env.VITE_DB_PASSWORD;
const db_database = import.meta.env.VITE_DB_DATABASE;

// Connection string to MySQL
const connection = await mysql.createConnection({
  host: '${db_host}',
  user: '${db_user}',
  password: '${db_pass}',
  database: '${db_database}'
});

// Helper to convert snake_case to camelCase
function snakeToCamel(obj) {
  if (Array.isArray(obj)) {
    return obj.map(v => snakeToCamel(v));
  } else if (obj !== null && obj !== undefined && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      result[camelKey] = snakeToCamel(obj[key]);
      return result;
    }, {});
  }
  return obj;
}

async function fetchPortfolioData() {
  let connection;

  try {
    console.log('Connecting to MySQL database...');

    connection = await mysql.createConnection(dbConfig);

    console.log('Connected successfully!');

    // Fetch Profile Settings
    console.log('Fetching profile_settings...');
    const [profileRows] = await connection.execute(
      'SELECT * FROM profile_settings ORDER BY id DESC LIMIT 1'
    );
    const profile = profileRows.length
      ? snakeToCamel(profileRows[0])
      : null;

    // Fetch Skills
    console.log('Fetching skills...');
    const [skillsRows] = await connection.execute(
      'SELECT * FROM skills ORDER BY id ASC'
    );
    const skills = snakeToCamel(skillsRows);

    // Fetch Projects
    console.log('Fetching projects...');
    const [projectsRows] = await connection.execute(
      'SELECT * FROM projects ORDER BY id DESC'
    );
    const projects = snakeToCamel(projectsRows);

    // Fetch Achievements
    console.log('Fetching achievements...');
    const [achievementsRows] = await connection.execute(
      'SELECT * FROM achievements ORDER BY id DESC'
    );
    const achievements = snakeToCamel(achievementsRows);

    // Fetch Certifications
    console.log('Fetching certifications...');
    const [certificationsRows] = await connection.execute(
      'SELECT * FROM certifications ORDER BY id DESC'
    );
    const certifications = snakeToCamel(certificationsRows);

    // Fetch Internships
    console.log('Fetching internships...');
    const [internshipsRows] = await connection.execute(
      'SELECT * FROM internships ORDER BY id DESC'
    );
    const internships = snakeToCamel(internshipsRows);

    // Assemble data
    const portfolioDetails = {
      profile,
      skills,
      projects,
      achievements,
      certifications,
      internships,
    };

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const targetDir = path.join(__dirname, '..', 'src', 'data');

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const targetFile = path.join(targetDir, 'portfolio-static.json');

    fs.writeFileSync(
      targetFile,
      JSON.stringify(portfolioDetails, null, 2),
      'utf-8'
    );

    console.log(`Successfully fetched database data and wrote to ${targetFile}!`);
  } catch (error) {
    console.error('Error fetching data from database:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

fetchPortfolioData();
