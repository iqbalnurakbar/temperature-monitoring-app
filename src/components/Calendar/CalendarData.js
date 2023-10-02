import dayjs from 'dayjs';

export const generateDate = (
  month = dayjs().month(),
  year = dayjs().year()
) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf('month');
  const lastDateOfMonth = dayjs().year(year).month(month).endOf('month');

  const arrayofDate = [];

  //prefix date
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    arrayofDate.push({ currentMonth: false, date: firstDateOfMonth.day(i) });
  }

  //current date
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayofDate.push({
      currentMonth: true,
      date: firstDateOfMonth.date(i),
      today:
        firstDateOfMonth.date(i).toDate().toDateString() ===
        dayjs().toDate().toDateString(),
    });
  }

  const remaining = 42 - arrayofDate.length;

  //remaining date
  for (
    let i = lastDateOfMonth.date() + 1;
    i <= lastDateOfMonth.date() + remaining;
    i++
  ) {
    arrayofDate.push({ currentMonth: false, date: lastDateOfMonth.date(i) });
  }
  return arrayofDate;
};

export const months = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];
