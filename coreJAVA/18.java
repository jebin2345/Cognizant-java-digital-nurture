class Animal {
    public void makeSound() {
        System.out.println("Some sound");
    }
}

class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Bark");
    }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        Animal animal = new Animal();
        Dog dog = new Dog();
        
        animal.makeSound();
        dog.makeSound();
    }
}