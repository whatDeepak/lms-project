import fs from 'fs';
import csv from 'csv-parser';
import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const prisma = new PrismaClient();

// Derive the current file path and directory path
const currentFileUrl = import.meta.url;
const currentFilePath = fileURLToPath(currentFileUrl);
const currentDirPath = dirname(currentFilePath);

// Function to read emails from a CSV file
const readEmailsFromCSV = async (csvFilePath: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        const emails: string[] = [];
        fs.createReadStream(csvFilePath)
            .pipe(csv({ headers: ['email'], skipLines: 0 })) // Explicitly set headers and skip lines
            .on('data', (row) => {
                // Read email from the row and push to emails array
                if (row.email) {
                    emails.push(row.email.trim()); // Trim any whitespace
                    console.log(`Read email: ${row.email}`);
                }
            })
            .on('end', () => {
                console.log('Finished reading CSV file.');
                resolve(emails);
            })
            .on('error', (error) => {
                console.error(`Error reading CSV file: ${error.message}`);
                reject(error);
            });
    });
};

// Function to insert emails into the Teacher model
const insertEmails = async (emails: string[]) => {
    try {
        for (const email of emails) {
            await prisma.teacher.create({
                data: {
                    email,
                },
            });
            console.log(`Inserted email: ${email}`);
        }
        console.log('All emails inserted into the Teacher model.');
    } catch (error) {
        console.error('Error inserting emails:', error);
    } finally {
        await prisma.$disconnect();
    }
};

async function main() {
    try {
        // Path to the CSV file with emails
        const csvFilePath = join(currentDirPath, '..', 'app', '(protected)', 'teachers', 'teachers.csv');

        // Read the emails from the CSV file
        const emails = await readEmailsFromCSV(csvFilePath);
        console.log('Emails read from CSV:', emails);

        // Insert the emails into the Teacher model
        await insertEmails(emails);
    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        // Disconnect from the database
        await prisma.$disconnect();
    }
}

main();
