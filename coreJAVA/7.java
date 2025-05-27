public class TypeCasting {
    public static void main(String[] args) {
        double doubleValue = 9.78;
        int intValue = (int) doubleValue; // Explicit casting
        
        System.out.println("Double: " + doubleValue);
        System.out.println("Converted to int: " + intValue);
        
        int anotherInt = 100;
        double anotherDouble = anotherInt; // Implicit casting
        
        System.out.println("Int: " + anotherInt);
        System.out.println("Converted to double: " + anotherDouble);
    }
}