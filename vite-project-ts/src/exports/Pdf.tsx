import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { User } from "../interfaces/User";

interface Props {
  users: User[];
}

export const PdfContent = ({ users }: Props) => {

  const styles = StyleSheet.create({
    page: {
      padding: 40,
    },
    table: {
      display: "flex",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#000",
      marginBottom: 10,
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#000",
    },
    tableCell: {
      flex: 1,
      fontSize: 12,
      padding: 6,
      textAlign: "center",
    },
  });

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.table}>
          {/* Encabezado de la tabla */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Nombre</Text>
            <Text style={styles.tableCell}>Apellidos</Text>
            <Text style={styles.tableCell}>País</Text>
          </View>

          {/* Filas de la tabla */}
          {users.map((user) => (
            <View key={user.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{user.nombre}</Text>
              <Text style={styles.tableCell}>{user.apellidos}</Text>
              <Text style={styles.tableCell}>{user.pais}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};