import java.util.Scanner;

public class Factorial {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a non-negative integer: ");
        int n = scanner.nextInt();
        
        long factorial = 1;
        for(int i = 1; i <= n; i++) {
            factorial *= i;
        }
        
        System.out.println(n + "! = " + factorial);
    }
}
