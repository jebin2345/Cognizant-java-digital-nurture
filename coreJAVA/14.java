import java.util.Scanner;

public class ArrayStats {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter number of elements: ");
        int n = scanner.nextInt();
        
        double[] numbers = new double[n];
        System.out.println("Enter " + n + " numbers:");
        
        double sum = 0;
        for(int i = 0; i < n; i++) {
            numbers[i] = scanner.nextDouble();
            sum += numbers[i];
        }
        
        double average = sum / n;
        System.out.println("Sum: " + sum);
        System.out.println("Average: " + average);
    }
}