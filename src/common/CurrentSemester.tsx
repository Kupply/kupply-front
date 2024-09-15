// Get the current year and semester dynamically
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

// Determine the current semester based on the month (Feb-Jul -> Semester 1, Aug-Jan -> Semester 2)
const currentSemester = currentMonth >= 2 && currentMonth <= 7 ? '1' : '2';

// Dynamically assign the current semester with the year
export const currentSemesterKey = `${currentYear}-${currentSemester}`;
