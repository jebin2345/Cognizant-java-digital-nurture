import java.util.HashMap;
import java.util.Scanner;

public class StudentMap {
    public static void main(String[] args) {
        HashMap<Integer, String> studentMap = new HashMap<>();
        Scanner scanner = new Scanner(System.in);
        
        while(true) {
            System.out.print("Enter student ID (or 0 to stop): ");
            int id = scanner.nextInt();
            if(id == 0) break;
            scanner.nextLine(); // consume newline
            
            System.out.print("Enter student name: ");
            String name = scanner.nextLine();
            
            studentMap.put(id, name);
        }
        
        System.out.print("\nEnter ID to lookup: ");
        int lookupId = scanner.nextInt();
        String studentName = studentMap.get(lookupId);
        
        if(studentName != null) {
            System.out.println("Student: " + studentName);
        } else {
            System.out.println("Student not found");
        }
    }
}