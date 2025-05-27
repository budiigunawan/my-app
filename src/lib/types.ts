export type ProfileData = {
  id: string;
  salutation: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  postalCode: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  spouseSalutation: string;
  spouseFirstName: string;
  spouseLastName: string;
  hobbies: string[];
  sports: string[];
  musics: string[];
  movies: string[];
  userId: string;
  user: {
    email: string;
    username: string;
  };
};

export const profileDataDefaultValue = {
  id: '',
  salutation: '',
  firstName: '',
  lastName: '',
  address: '',
  country: '',
  postalCode: '',
  dateOfBirth: '',
  gender: '',
  maritalStatus: '',
  spouseSalutation: '',
  spouseFirstName: '',
  spouseLastName: '',
  hobbies: [],
  sports: [],
  musics: [],
  movies: [],
  userId: '',
  user: {
    email: '',
    username: '',
  },
};
