import java.lang.reflect.Method;

public class ReflectionDemo {
    public static void main(String[] args) throws Exception {
        Class<?> clazz = Class.forName("java.util.ArrayList");
        
        System.out.println("Methods of ArrayList:");
        for(Method method : clazz.getDeclaredMethods()) {
            System.out.println(method.getName());
        }
        
        // Create instance and invoke method
        Object list = clazz.getDeclaredConstructor().newInstance();
        Method addMethod = clazz.getMethod("add", Object.class);
        addMethod.invoke(list, "Hello");
        
        System.out.println("List contents: " + list);
    }
}