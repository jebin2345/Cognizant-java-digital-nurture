class MyThread extends Thread {
    private String message;
    
    public MyThread(String message) {
        this.message = message;
    }
    
    @Override
    public void run() {
        for(int i = 0; i < 5; i++) {
            System.out.println(message + " " + i);
            try {
                Thread.sleep(500);
            } catch(InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

public class ThreadDemo {
    public static void main(String[] args) {
        MyThread thread1 = new MyThread("Thread 1");
        MyThread thread2 = new MyThread("Thread 2");
        
        thread1.start();
        thread2.start();
    }
}