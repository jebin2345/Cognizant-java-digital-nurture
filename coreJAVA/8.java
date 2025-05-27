public class OperatorPrecedence {
    public static void main(String[] args) {
        int result1 = 10 + 5 * 2; // Multiplication before addition
        int result2 = (10 + 5) * 2; // Parentheses change order
        
        System.out.println("10 + 5 * 2 = " + result1);
        System.out.println("(10 + 5) * 2 = " + result2);
    }
}