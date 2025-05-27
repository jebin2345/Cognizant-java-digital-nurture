import java.sql.*;
import java.util.Scanner;

public class StudentDAO {
    private Connection conn;
    
    public StudentDAO(String url, String user, String pass) throws SQLException {
        this.conn = DriverManager.getConnection(url, user, pass);
    }
    
    public void insertStudent(int id, String name) throws SQLException {
        String sql = "INSERT INTO students(id, name) VALUES(?, ?)";
        try(PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            pstmt.setString(2, name);
            pstmt.executeUpdate();
        }
    }
    
    public void updateStudent(int id, String newName) throws SQLException {
        String sql = "UPDATE students SET name = ? WHERE id = ?";
        try(PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, newName);
            pstmt.setInt(2, id);
            pstmt.executeUpdate();
        }
    }
    
    public static void main(String[] args) {
        try {
            StudentDAO dao = new StudentDAO("jdbc:mysql://localhost:3306/school", "root", "password");
            
            // Insert example
            dao.insertStudent(101, "Alice");
            
            // Update example
            dao.updateStudent(101, "Alice Smith");
            
        } catch(SQLException e) {
            e.printStackTrace();
        }
    }
}