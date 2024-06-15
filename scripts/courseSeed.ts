const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    // Check if the category already exists
    let category = await database.category.findUnique({
      where: { name: 'Computer Science and Engineering' },
    });

    // If the category doesn't exist, create it
    if (!category) {
      category = await database.category.create({
        data: {
          name: 'Computer Science and Engineering',
        },
      });
    }
    // Create a course
    const course = await database.course.create({
      data: {
        userId: 'cluzvz8bx0000k90en1wy8um4',
        title: 'Computer Netowrks',
        description: 'andfnpasf; by xyz.',
        imageUrl: 'https://example.com/image.jpg',
        isPublished: true,
        categoryId: category.id,
        chapters: {
          create: [
            {
              title: 'Introduction to CN ',
              description: 'Basic concepts ',
              videoUrl: 'https://example.com/video1.mp4',
              position: 1,
              isPublished: true,
              isFree: true,
              muxData: {
                create: {
                  assetId: 'asset-id-1',
                  playbackId: 'playback-id-1',
                },
              },
              userProgress: {
                create: [
                  {
                    userId: 'cluzvz8bx0000k90en1wy8um4',
                    isCompleted: true,
                  },
                  {
                    userId: 'user2',
                    isCompleted: false,
                  },
                ],
              },
            },
            {
              title: 'Advanced CN',
              description: 'Advanced topics ',
              videoUrl: 'https://example.com/video2.mp4',
              position: 2,
              isPublished: true,
              isFree: false,
              muxData: {
                create: {
                  assetId: 'asset-id-2',
                  playbackId: 'playback-id-2',
                },
              },
              userProgress: {
                create: [
                  {
                    userId: 'cluzvz8bx0000k90en1wy8um4',
                    isCompleted: false,
                  },
                  {
                    userId: 'user2',
                    isCompleted: true,
                  },
                ],
              },
            },
          ],
        },
        attachments: {
          create: [
            {
              name: 'Course Syllabus',
              url: 'https://example.com/syllabus.pdf',
            },
            {
              name: 'Example Code',
              url: 'https://example.com/code.zip',
            },
          ],
        },
      },
    });

    console.log({ category, course });
    console.log("Success");
  } catch (error) {
    console.error("Error seeding the database", error);
  } finally {
    await database.$disconnect();
  }
}

main();
