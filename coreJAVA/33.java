import java.sql.*;

public class BankTransfer {
    public static void transfer(Connection conn, int fromAcc, int toAcc, double amount) throws SQLException {
        conn.setAutoCommit(false);
        
        try {
            // Debit from account
            String debitSQL = "UPDATE accounts SET balance = balance - ? WHERE id = ? AND balance >= ?";
            try(PreparedStatement debitStmt = conn.prepareStatement(debitSQL)) {
                debitStmt.setDouble(1, amount);
                debitStmt.setInt(2, fromAcc);
                debitStmt.setDouble(3, amount);
                int rowsUpdated = debitStmt.executeUpdate();
                
                if(rowsUpdated == 0) {
                    throw new SQLException("Insufficient funds or account not found");
                }
            }
            
            // Credit to account
            String creditSQL = "UPDATE accounts SET balance = balance + ? WHERE id = ?";
            try(PreparedStatement creditStmt = conn.prepareStatement(creditSQL)) {
                creditStmt.setDouble(1, amount);
                creditStmt.setInt(2, toAcc);
                creditStmt.executeUpdate();
            }
            
            conn.commit();
            System.out.println("Transfer successful");
            
        } catch(SQLException e) {
            conn.rollback();
            System.out.println("Transfer failed: " + e.getMessage());
        } finally {
            conn.setAutoCommit(true);
        }
    }
    
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/bank";
        String user = "root";
        String pass = "password";
        
        try(Connection conn = DriverManager.getConnection(url, user, pass)) {
            transfer(conn, 1001, 1002, 500.00);
        } catch(SQLException e) {
            e.printStackTrace();
        }
    }
}