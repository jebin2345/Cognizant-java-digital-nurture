import java.util.Scanner;

public class Division {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter two integers: ");
        int a = scanner.nextInt();
        int b = scanner.nextInt();
        
        try {
            int result = a / b;
            System.out.println("Result: " + result);
        } catch(ArithmeticException e) {
            System.out.println("Error: Division by zero");
        }
    }
}