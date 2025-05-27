import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class FileWriterDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter text to write to file: ");
        String text = scanner.nextLine();
        
        try(FileWriter writer = new FileWriter("output.txt")) {
            writer.write(text);
            System.out.println("Successfully wrote to file");
        } catch(IOException e) {
            System.out.println("Error writing to file: " + e.getMessage());
        }
    }
}