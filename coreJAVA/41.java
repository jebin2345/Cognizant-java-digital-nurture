import java.util.concurrent.*;
import java.util.*;

public class ExecutorServiceDemo {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(3);
        List<Future<Integer>> futures = new ArrayList<>();
        
        for(int i = 0; i < 5; i++) {
            int taskId = i;
            futures.add(executor.submit(() -> {
                Thread.sleep(1000);
                return taskId * taskId;
            }));
        }
        
        for(Future<Integer> future : futures) {
            System.out.println("Result: " + future.get());
        }
        
        executor.shutdown();
    }
}