import java.util.ArrayList;
import java.util.Scanner;

public class StudentList {
    public static void main(String[] args) {
        ArrayList<String> students = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);
        
        while(true) {
            System.out.print("Enter student name (or 'quit' to stop): ");
            String name = scanner.nextLine();
            if(name.equalsIgnoreCase("quit")) break;
            students.add(name);
        }
        
        System.out.println("\nStudent List:");
        for(String student : students) {
            System.out.println(student);
        }
    }
}