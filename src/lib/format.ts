const MONTHS = ["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentyabr","oktyabr","noyabr","dekabr"];
const DAYS = ["yakshanba","dushanba","seshanba","chorshanba","payshanba","juma","shanba"];
export const formatDate = (d: Date): string => isNaN(d.getTime()) ? "" : `${d.getDate()}-${MONTHS[d.getMonth()]}, ${d.getFullYear()} (${DAYS[d.getDay()]})`;
