import java.util.Scanner;

public class PalindromeChecker {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a string: ");
        String input = scanner.nextLine();
        
        String clean = input.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        String reversed = new StringBuilder(clean).reverse().toString();
        
        boolean isPalindrome = clean.equals(reversed);
        System.out.println(input + " is " + (isPalindrome ? "" : "not ") + "a palindrome");
    }
}