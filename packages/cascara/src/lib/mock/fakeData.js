import faker from 'faker';

faker.seed(1);

export const generateFakeEmployees = (qty) =>
  new Array(qty).fill(null).map((e, i) => {
    // So we never have collisions, we have to start at 2 instead of 1
    faker.seed(i++ + 1);

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    return (e = {
      active: faker.random.boolean(),
      country: faker.random.arrayElement(['USA', 'Brazil', 'Argentina']),
      eid: faker.random.uuid(),
      email: faker.internet.email(firstName, lastName, 'espressive.com'),
      employeeNumber: faker.random.number(),
      fullName: `${firstName} ${lastName}`,
      homePhone: faker.phone.phoneNumber(),
      officePhone: faker.phone.phoneNumber(),
      title: faker.name.jobTitle(),
    });
  });

export const generateFakeInteractions = (qty) =>
  new Array(qty).fill(null).map((e, i) => {
    // So we never have collisions, we have to start at 2 instead of 1
    faker.seed(i++ + 1);

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    const phrase = faker.lorem.sentence(6);
    const phraseWords = phrase.split(' ');
    const matchedIntent = `${phraseWords[3]} ${phraseWords[5]}`;
    const safeDate = `${faker.date.future().toLocaleString().split(',')[0]}`;

    return (e = {
      created: safeDate,
      deflected: faker.random.boolean(),
      eid: faker.random.uuid(),
      matchedIntent,
      phrase: faker.lorem.sentence(5),
      response: faker.random.boolean(),
      user: `${firstName} ${lastName}`,
    });
  });
