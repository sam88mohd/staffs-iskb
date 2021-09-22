import Head from "next/head";
import { useMemo, useState } from "react";
import styles from "../styles/Home.module.css";
import { getSheetList } from "./api/sheet";
import Hero from "../components/Hero";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Footer from "../components/Footer";
import TodayReport from "../components/TodayReport";

export const getServerSideProps = async (context) => {
  const data = await getSheetList();

  return {
    props: {
      sheets: data.slice(1, data.length),
    },
  };
};

export default function Home({ sheets }) {
  const [showModal, setShowModal] = useState(false);
  const [today, setToday] = useState(new Date());
  const [rowData, setRowData] = useState({});
  const sheetsDesc = sheets
    .map((sheet, index) => ({ ...sheet, id: index }))
    .sort((a, b) => b.id - a.id);
  const data = useMemo(() => [...sheetsDesc], []);
  const columns = useMemo(
    () => [
      {
        Header: "Date & Time",
        accessor: "timestamp",
        disableSortBy: true,
        paginateExpandedRows: true,
      },
      {
        Header: "Staff ID",
        accessor: "staffId",
        paginateExpandedRows: true,
      },
      {
        Header: "Name",
        accessor: "fullName",
        disableSortBy: true,
        paginateExpandedRows: true,
      },
      {
        Header: "Department",
        accessor: "department",
        disableSortBy: true,
        paginateExpandedRows: true,
      },
      {
        Header: "Health Issue",
        accessor: "health",
        disableSortBy: true,
        paginateExpandedRows: true,
      },
      {
        Header: "Action",
        Cell: function modelBtn({ row }) {
          if (!row.isGrouped) {
            return (
              <button onClick={(e) => handleButtonClick(e, row)}>
                More Details...
              </button>
            );
          } else {
            return null;
          }
        },
      },
    ],
    []
  );

  const handleButtonClick = (e, row) => {
    setShowModal(true);
    setRowData(row);
  };

  const todayFormat =
    ("0" + today.getDate()).slice(-2) +
    "/" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "/" +
    today.getFullYear();

  const todayStaff = sheets.filter(
    (sheet) => sheet.timestamp.slice(0, 10) === todayFormat
  );

  const todayYes = todayStaff.filter((sheet) => sheet.health === "Yes");
  const todayNo = todayStaff.filter((sheet) => sheet.health === "No");

  const staffDetails = sheets.filter(
    (sheet) =>
      (sheet.staffId === rowData?.values?.staffId &&
        sheet.fullName === rowData?.values?.fullName) ||
      sheet.staffId === rowData?.values?.staffId ||
      sheet.fullName === rowData?.values?.fullName
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Staff ISKB Daily Response</title>
        <meta
          name="description"
          content="Staff Ibis Styles Kota Bharu daily Response website"
        />
        <meta charSet="utf-8" />
        <meta name="author" content="IT ibis styles kota bharu" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/ibis.png" />
      </Head>

      <main className={styles.main}>
        <Hero sheets={sheets} />
        <div className={styles.mainContainer}>
          <TodayReport
            today={todayFormat}
            todayStaff={todayStaff}
            todayYes={todayYes}
            todayNo={todayNo}
            columns={columns}
            handleButtonClick={handleButtonClick}
          />
          <h3>Guest List</h3>
          <Table
            data={data}
            columns={columns}
            getRowProp={(row) => ({
              style: {
                color: row.values.health === "Yes" ? "#cd2026" : "#404040",
              },
            })}
          />
        </div>
      </main>
      <Footer />
      <Modal
        onClose={() => setShowModal(false)}
        show={showModal}
        title="Staff Summary"
        staffDetails={staffDetails}
      />
    </div>
  );
}
