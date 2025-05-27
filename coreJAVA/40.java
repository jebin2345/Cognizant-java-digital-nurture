public class VirtualThreadDemo {
    public static void main(String[] args) throws InterruptedException {
        long start = System.currentTimeMillis();
        
        for(int i = 0; i < 100_000; i++) {
            Thread.startVirtualThread(() -> {
                try {
                    Thread.sleep(100);
                } catch(InterruptedException e) {
                    e.printStackTrace();
                }
            });
        }
        
        long duration = System.currentTimeMillis() - start;
        System.out.println("Started 100,000 virtual threads in " + duration + "ms");
    }
}