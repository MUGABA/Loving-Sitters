const CustomerBookingMockData: {
  name: string;
  description: string;
  photo: string;
  start: string;
  end: string;
  hours: number;
  rate: number;
  status: string;
}[] = [
  {
    name: 'Kelly Low',
    description: 'Most popular dog-sitter',
    photo:
      'https://pyxis.nymag.com/v1/imgs/cdd/4c7/65257dcae8272f7aff667d0bf255e5bd02-27-Jennifer-Lawrence-dog.rhorizontal.w700.jpg',
    start: '2022-2-3',
    end: '2022-2-3',
    hours: 4,
    rate: 22,
    status: 'current',
  },
  {
    name: 'Kelly Low',
    description: 'Most popular dog-sitter',
    photo:
      'https://pyxis.nymag.com/v1/imgs/cdd/4c7/65257dcae8272f7aff667d0bf255e5bd02-27-Jennifer-Lawrence-dog.rhorizontal.w700.jpg',
    start: '2022-2-3',
    end: '2022-2-3',
    hours: 5,
    rate: 21,
    status: 'current',
  },
  {
    name: 'Kelly Low',
    description: 'Most popular dog-sitter',
    photo:
      'https://pyxis.nymag.com/v1/imgs/cdd/4c7/65257dcae8272f7aff667d0bf255e5bd02-27-Jennifer-Lawrence-dog.rhorizontal.w700.jpg',
    start: '2022-2-3',
    end: '2022-2-3',
    hours: 4,
    rate: 12,
    status: 'current',
  },

  {
    name: 'Jennifer Lawrence',
    description: 'Most popular dog-sitter',
    photo:
      'https://pyxis.nymag.com/v1/imgs/cdd/4c7/65257dcae8272f7aff667d0bf255e5bd02-27-Jennifer-Lawrence-dog.rhorizontal.w700.jpg',
    start: '2022-8-26',
    end: '2022-8-26',
    hours: 7,
    rate: 22,
    status: 'past-due',
  },
  {
    name: 'Jane Doe',
    photo: 'https://lovingpaws.ca/wp-content/uploads/2019/11/dog-sitter-1.png',
    description: 'I sit dogs',
    start: '2022-9-09',
    end: '2022-9-10',
    hours: 24,
    rate: 25,
    status: 'past-due',
  },

  {
    name: 'Mark M',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcFYkvkn6EBRxJBi9YMgqzzdhI2BhJ6UWNWw&usqp=CAU',
    description: 'I would rather be a dev',
    start: '2022-1-10',
    end: '2022-1-11',
    hours: 12,
    rate: 15,
    status: 'paid',
  },
  {
    name: 'Joe J',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTogkUgsVlIXfl9zhqxShKXzxNzKCfgdg427Q&usqp=CAU',
    description: 'I walk dogs',
    start: '2022-1-10',
    end: '2022-1-10',
    hours: 9,
    rate: 29,
    status: 'paid',
  },
];

export default CustomerBookingMockData;
