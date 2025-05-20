import { PrismaClient } from '../generated/prisma/client';

const prisma = new PrismaClient();

const dogsImages = [
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747706736/pet_images/rsqm6zvxzzv34reyihjj.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747706738/pet_images/ac1wozfyqsjkcx1zyeqi.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747706738/pet_images/oaj4v9dm5dtlej0navd4.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747706738/pet_images/l557ziipblfzq6zwlv08.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747706738/pet_images/ygzx52cjlofzu3ec1fmq.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747706738/pet_images/nnvnw8ylwlzvqy1ceyo6.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747706837/pet_images/jsihjzbhuqs46oftnklg.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747706839/pet_images/kb3y6kgfm8zgx6fnwzv0.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747706836/pet_images/xh6posgxaddvgqcsx7cp.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747706837/pet_images/tskmmuzxyrxa3affxwrr.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747706837/pet_images/igmlirw3jisbdfwvjg0k.jpg',
];

const catImages = [
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747707167/pet_images/vglczq6ayyvn539nxt1w.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747707170/pet_images/h1smmavwmf9dj5eqw7mr.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747707170/pet_images/aobxzxf4tuqf8ca7wiry.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747707170/pet_images/th4vevb1supesskgnjjl.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747707169/pet_images/wxima7ymf4ezrpsu3rqb.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747707219/pet_images/kvupakkykp7xcaogm36d.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747707226/pet_images/ng22bekbih7fe3fmzrfz.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747707220/pet_images/liauenqrumapocfgqn8g.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747707224/pet_images/pd7cpntr4groxa8xh5xn.jpg',
];

const rabitImages = [
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747707358/pet_images/ss6qaeklbdawgpjq8tna.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747707363/pet_images/hwqh9mgtir5iliqxszj3.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747707370/pet_images/dtl6masz7ftluxuqzs8b.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747707361/pet_images/ir5mju4qjoxzqa4frblc.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747707366/pet_images/fpwpihrrgzwyznch29ux.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747707368/pet_images/dftefowwl5h0bkgvrogg.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747707357/pet_images/vnto6rxf2gs8oslse0t1.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747707358/pet_images/ilcl3yqydsyrbdohxksa.jpg',
  'https://res.cloudinary.com/dl9ibkuyg/image/upload/v1747707358/pet_images/ilgo051xwqspkjmkvlul.jpg',
];

async function main() {
  // Fetch users created by seed.ts
  const alice = await prisma.user.findUnique({
    where: { email: 'alice.johnson@example.com' },
  });
  const bob = await prisma.user.findUnique({
    where: { email: 'bob.smith@example.com' },
  });
  const charlie = await prisma.user.findUnique({
    where: { email: 'charlie.brown@example.com' },
  });

  if (!alice || !bob || !charlie) {
    console.error(
      'Seed users (Alice, Bob, Charlie) not found. Please run the user seed script (prisma/seed.ts) first, or ensure these users exist in the database.',
    );
    process.exit(1);
  }

  const actualUserIds = [alice.id, bob.id, charlie.id];

  const petsData = [
    // Cats
    {
      name: 'Whiskers',
      species: 'Cat',
      breed: 'Siamese',
      age: 2,
      profile: { description: 'A very playful cat.' },
      gender: 'Male',
      images: [catImages[0], catImages[1], catImages[2], catImages[3]],
      videos: [],
      ownerId: actualUserIds[0], // Alice
    },
    {
      name: 'Luna',
      species: 'Cat',
      breed: 'Persian',
      age: 3,
      profile: { description: 'Loves to nap.' },
      gender: 'Female',
      images: [catImages[4], catImages[5], catImages[6], catImages[7]],
      videos: [],
      ownerId: actualUserIds[1], // Bob
    },
    // Rabbits
    {
      name: 'Bunny',
      species: 'Rabbit',
      breed: 'Dutch',
      age: 1,
      profile: { description: 'Very energetic.' },
      gender: 'Male',
      images: [rabitImages[0], rabitImages[1], rabitImages[2], rabitImages[3]],
      videos: [],
      ownerId: actualUserIds[2], // Charlie
    },
    {
      name: 'Thumper',
      species: 'Rabbit',
      breed: 'Rex',
      age: 2,
      profile: { description: 'Likes carrots.' },
      gender: 'Female',
      images: [rabitImages[3], rabitImages[4], rabitImages[5], rabitImages[6]],
      videos: [],
      ownerId: actualUserIds[0], // Alice
    },
    // Dogs
    {
      name: 'Buddy',
      species: 'Dog',
      breed: 'Golden Retriever',
      age: 4,
      profile: { description: 'Friendly and loyal.' },
      gender: 'Male',
      images: [dogsImages[0], dogsImages[1], dogsImages[2], dogsImages[3]],
      videos: [],
      ownerId: actualUserIds[1], // Bob
    },
    {
      name: 'Lucy',
      species: 'Dog',
      breed: 'Labrador',
      age: 5,
      profile: { description: 'Loves to play fetch.' },
      gender: 'Female',
      images: [dogsImages[4], dogsImages[5], dogsImages[6], dogsImages[7]],
      videos: [],
      ownerId: actualUserIds[2], // Charlie
    },
    // Additional Cats
    {
      name: 'Oliver',
      species: 'Cat',
      breed: 'British Shorthair',
      age: 1,
      profile: { description: 'Curious and affectionate.' },
      gender: 'Male',
      images: [catImages[7], catImages[8], catImages[0], catImages[1]],
      videos: [],
      ownerId: actualUserIds[0], // Alice
    },
    {
      name: 'Chloe',
      species: 'Cat',
      breed: 'Ragdoll',
      age: 4,
      profile: { description: 'Gentle and loves cuddles.' },
      gender: 'Female',
      images: [
        catImages[0],
        catImages[1],
        catImages[2],
        catImages[3],
        catImages[4],
      ],
      videos: [],
      ownerId: actualUserIds[1], // Bob
    },
    // Additional Rabbits
    {
      name: 'Coco',
      species: 'Rabbit',
      breed: 'Lionhead',
      age: 2,
      profile: { description: 'Fluffy and playful.' },
      gender: 'Female',
      images: [rabitImages[7], rabitImages[8], rabitImages[0], rabitImages[1]],
      videos: [],
      ownerId: actualUserIds[2], // Charlie
    },
    {
      name: 'Leo',
      species: 'Rabbit',
      breed: 'Flemish Giant',
      age: 3,
      profile: { description: 'Large and docile.' },
      gender: 'Male',
      images: [
        rabitImages[0],
        rabitImages[1],
        rabitImages[2],
        rabitImages[3],
        rabitImages[4],
      ],
      videos: [],
      ownerId: actualUserIds[0], // Alice
    },
    // Additional Dogs
    {
      name: 'Max',
      species: 'Dog',
      breed: 'German Shepherd',
      age: 6,
      profile: { description: 'Intelligent and protective.' },
      gender: 'Male',
      images: [dogsImages[7], dogsImages[8], dogsImages[9], dogsImages[0]],
      videos: [],
      ownerId: actualUserIds[1], // Bob
    },
    {
      name: 'Bella',
      species: 'Dog',
      breed: 'Poodle',
      age: 2,
      profile: { description: 'Elegant and smart.' },
      gender: 'Female',
      images: [
        dogsImages[10],
        dogsImages[0],
        dogsImages[1],
        dogsImages[2],
        dogsImages[3],
      ],
      videos: [],
      ownerId: actualUserIds[2], // Charlie
    },
    {
      name: 'Rocky',
      species: 'Dog',
      breed: 'Boxer',
      age: 3,
      profile: { description: 'Energetic and playful.' },
      gender: 'Male',
      images: [
        dogsImages[1],
        dogsImages[2],
        dogsImages[3],
        dogsImages[4],
        dogsImages[5],
      ],
      videos: [],
      ownerId: actualUserIds[0], // Alice
    },
    // Mixed Species
    {
      name: 'Milo',
      species: 'Cat',
      breed: 'Maine Coon',
      age: 5,
      profile: { description: 'Gentle giant.' },
      gender: 'Male',
      images: [catImages[2], catImages[3], catImages[4], catImages[5]],
      videos: [],
      ownerId: actualUserIds[1], // Bob
    },
    {
      name: 'Daisy',
      species: 'Dog',
      breed: 'Beagle',
      age: 1,
      profile: { description: 'Curious and friendly.' },
      gender: 'Female',
      images: [
        dogsImages[3],
        dogsImages[4],
        dogsImages[5],
        dogsImages[6],
        dogsImages[7],
      ],
      videos: [],
      ownerId: actualUserIds[2], // Charlie
    },
    {
      name: 'Hazel',
      species: 'Rabbit',
      breed: 'Mini Lop',
      age: 1,
      profile: { description: 'Sweet and shy.' },
      gender: 'Female',
      images: [rabitImages[2], rabitImages[3], rabitImages[4], rabitImages[5]],
      videos: [],
      ownerId: actualUserIds[0], // Alice
    },
  ];

  for (const petData of petsData) {
    await prisma.pet.create({
      data: petData,
    });
  }

  console.log('Dummy pets created.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
