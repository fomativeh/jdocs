export const formatDate = (inputDate: string): string => {
    // Parse the input date string into a Date object
    const date = new Date(inputDate);

    // Get the year, month, and day components
    const year = date.getFullYear() % 100; // Get the last two digits of the year
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const day = date.getDate();

    // Create formatted strings with leading zeros if needed
    const formattedYear = year < 10 ? `0${year}` : year;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    // Concatenate the components into the "DD/MM/YY" format
    const formattedDate = `${formattedDay}/${formattedMonth}/${formattedYear}`;

    return formattedDate;
}