import java.util.Scanner;

public class main1{
    public  static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter num1:");
        double num1=sc.nextDouble();
        System.out.println("Enter num2:");
        double num2=sc.nextDouble();
        System.out.println("choose operation(+ , - , * , / ");
        char op=sc.next().charAt(0);
        double result;
        switch (op){
            case'+':
                result=num1+num2;
                break;
            case '-': result = num1 - num2; break;
            case '*': result = num1 * num2; break;
            case '/': result = num1 / num2; break;
            default: System.out.println("Invalid operator"); return;
        }
        System.out.println("Result: " + result);
    }
}
