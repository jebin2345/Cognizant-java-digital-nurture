public class Car {
    private String make;
    private String model;
    private int year;
    
    public Car(String make, String model, int year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    
    public void displayDetails() {
        System.out.println(year + " " + make + " " + model);
    }
    
    public static void main(String[] args) {
        Car myCar = new Car("Toyota", "Camry", 2022);
        myCar.displayDetails();
    }
}