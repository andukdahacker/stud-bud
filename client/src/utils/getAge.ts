export const getAge = (birdthday: any) => {
  const today = new Date();

  const today_year = today.getFullYear();

  const today_month = today.getMonth();
  const today_day = today.getDay();
  const birthdate = new Date(birdthday);

  const birthday_year = birthdate.getFullYear();
  const birthday_month = birthdate.getMonth();
  const birthday_day = birthdate.getDay();
  let age = today_year - birthday_year;

  if (today_month < birthday_month + 1) {
    age--;
  }

  if (birthday_month + 1 == today_month && today_day < birthday_day) {
    age--;
  }
  return age;
};
