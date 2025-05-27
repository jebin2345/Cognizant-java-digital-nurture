class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}

public class AgeValidator {
    public static void validateAge(int age) throws InvalidAgeException {
        if(age < 18) {
            throw new InvalidAgeException("Age must be at least 18");
        }
        System.out.println("Age is valid");
    }
    
    public static void main(String[] args) {
        try {
            validateAge(15);
        } catch(InvalidAgeException e) {
            System.out.println(e.getMessage());
        }
    }
}