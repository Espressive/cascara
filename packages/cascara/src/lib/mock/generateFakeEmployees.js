import faker from 'faker';

faker.seed(1);

export const generateFakeEmployees = (qty) =>
  new Array(qty).fill(null).map((e, i) => {
    // So we never have collisions, we have to start at 2 instead of 1
    faker.seed(i++ + 1);
    return (e = {
      avatar: faker.image.avatar(),
      country: faker.address.countryCode(),
      date: faker.date.past(),
      department: faker.name.jobArea(),
      eid: faker.random.uuid(),
      fullName: faker.fake('{{name.lastName}} {{name.firstName}}'),
      homePhone: faker.phone.phoneNumber(),
      nickname: faker.name.firstName(),
      officePhone: faker.phone.phoneNumber(),
      title: faker.name.jobTitle(),
    });
  });
