import java.net.*;
import java.io.*;

public class ChatServer {
    public static void main(String[] args) throws IOException {
        try(ServerSocket serverSocket = new ServerSocket(12345)) {
            System.out.println("Server started. Waiting for client...");
            
            try(Socket clientSocket = serverSocket.accept();
                PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);
                BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()))) {
                
                System.out.println("Client connected");
                String inputLine;
                while((inputLine = in.readLine()) != null) {
                    System.out.println("Client: " + inputLine);
                    out.println("Server received: " + inputLine);
                }
            }
        }
    }
}
import java.net.*;
import java.io.*;
import java.util.Scanner;

public class ChatClient {
    public static void main(String[] args) throws IOException {
        try(Socket socket = new Socket("localhost", 12345);
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            Scanner scanner = new Scanner(System.in)) {
            
            System.out.println("Connected to server. Type 'exit' to quit");
            
            String userInput;
            while(true) {
                System.out.print("> ");
                userInput = scanner.nextLine();
                if(userInput.equalsIgnoreCase("exit")) break;
                
                out.println(userInput);
                System.out.println("Server: " + in.readLine());
            }
        }
    }
}