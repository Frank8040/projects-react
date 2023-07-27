/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { PdfContent } from "../exports/Pdf";

interface ListProps {
  data: any[];
  columns: { field: string; header: string; }[];
  onClick: (id: number) => void;
  onEdit: (id: number) => void;
  isCategory: boolean;
}

const List = ({ data, columns, onClick, onEdit }: ListProps) => {
  const handleExcelDownload = () => {
    const table = document.getElementById("table-to-export");
    if (table) {
      const worksheet = XLSX.utils.table_to_sheet(table);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "users.xlsx");
    }
  };

  const excludeIdField = (column: { field: string; header: string; }) => column.field !== 'id';

  return (
    <>
      <table style={{ margin: "10px" }} id="table-to-export">
        <thead>
          <tr
            style={{ display: "grid", gridTemplateColumns: "repeat(5, 150px)" }}
          >
            {columns.filter(excludeIdField).map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 150px)",
                alignItems: "center"
              }}
            >
              {columns.filter(excludeIdField).map((column, index) => (
                <td key={index}>{item[column.field]}</td>
              ))}
              <td>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={() => onEdit(item.id)}><i className="pi pi-user-edit" style={{ fontSize: '1.5rem' }}></i></button>
                  <button onClick={() => onClick(item.id)}><i className="pi pi-trash" style={{ fontSize: '1.5rem' }}></i></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <PDFDownloadLink
          document={<PdfContent users={data} />}
          fileName="users.pdf"
        >
          {({ loading }) =>
            loading ? "Cargando..." : <button>Descargar como PDF</button>
          }
        </PDFDownloadLink>
        <CSVLink data={data} filename={"data.csv"}>
          <button>Descargar como CSV</button>
        </CSVLink>
        <button onClick={handleExcelDownload}>Descargar como XLSX</button>
      </div>
    </>
  );
};

export default List;
