export const PROFILES_TAKE_LIMIT = 5;
export const MESSAGES_TAKE_LIMIT = 15;
export const TUTOR_ORDER_TAKE_LIMIT = 5;
export const BUDDIES_TAKE_LIMIT = 1;
export const BUDDIES_REQUESTS_TAKE_LIMIT = 2;
// export enum Purposes {
//   Degree = "Degree",
//   Course = "Course",
//   Habit = "Habit",
//   Competition = "Competition",
//   Study = "Study",
//   THPT = "National high school exam",
//   Skill = "Skill",
//   Friends = "Friends",
//   Others = "Others",
// }

export const Purposes = {
  Degree: {
    name: "Degree",
    description: "I want a degree",
    purpose_types: [
      {
        name: "IELTS",
        description: "",
      },
      {
        name: "GMAT",
        description: "",
      },
      {
        name: "HSK",
        description: "",
      },
      {
        name: "TOPIK",
        description: "",
      },
      {
        name: "TOEIC",
        description: "",
      },
    ],
  },
  Courses: {
    name: "Courses",
    description: "",
    purpose_types: [
      {
        name: "LinkedIn",
        description: "",
      },
      {
        name: "Coursera",
        description: "",
      },
      {
        name: "Edumall",
        description: "",
      },
      {
        name: "Hocmai",
        description: "",
      },
    ],
  },
  Habit: {
    name: "Habit",
    description: "",
    purpose_types: [
      {
        name: "Guitar",
        description: "",
      },
      {
        name: "Book",
        description: "",
      },
      {
        name: "Draw",
        description: "",
      },
      {
        name: "Photography",
        description: "",
      },
      {
        name: "Yoga",
        description: "",
      },
      {
        name: "Gym",
        description: "",
      },
      {
        name: "Piano",
        description: "",
      },
    ],
  },
  Competition: {
    name: "Competition",
    description: "",
    purpose_types: [
      {
        name: "Management Trainee",
        description: "",
      },
    ],
  },
  Study: {
    name: "Study",
    description: "",
    purpose_types: [
      {
        name: "Math",
        description: "",
      },
    ],
  },

  Skills: {
    name: "Skills",
    description: "",
    purpose_types: [
      {
        name: "Data Analytics",
        description: "",
      },
    ],
  },
  Others: {
    name: "Others",
    description: "",
  },
};
