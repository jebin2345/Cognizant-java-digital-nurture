import java.util.Scanner;
import java.util.Random;

public class GuessingGame {
    public static void main(String[] args) {
        Random random = new Random();
        int target = random.nextInt(100) + 1;
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Guess a number between 1 and 100");
        
        int guess;
        do {
            System.out.print("Enter your guess: ");
            guess = scanner.nextInt();
            
            if(guess < target) System.out.println("Too low!");
            else if(guess > target) System.out.println("Too high!");
        } while(guess != target);
        
        System.out.println("Correct! The number was " + target);
    }
}