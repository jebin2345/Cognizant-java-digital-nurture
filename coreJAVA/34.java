module com.utils {
    exports com.utils;
}

// module-info.java for com.greetings
module com.greetings {
    requires com.utils;
}

// com.utils/Calculator.java
package com.utils;
public class Calculator {
    public static int add(int a, int b) { return a + b; }
}

// com.greetings/Main.java
package com.greetings;
import com.utils.Calculator;

public class Main {
    public static void main(String[] args) {
        System.out.println("Sum: " + Calculator.add(5, 3));
    }
}