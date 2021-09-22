import { google } from "googleapis";

export const getSheetList = async () => {
  try {
    const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEET_CLIENT_EMAIL,
      null,
      (process.env.GOOGLE_SHEET_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
      target
    );

    const sheets = google.sheets({ version: "v4", auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Form responses 1",
    });

    const rows = response.data.values;
    if (rows.length) {
      return rows.map((row) => ({
        timestamp: row[0],
        fullName: row[1],
        staffId: row[2],
        department: row[3],
        health: row[4],
        details: row[5] || null,
      }));
    }
  } catch (err) {
    console.log(err);
  }
  return [];
};
