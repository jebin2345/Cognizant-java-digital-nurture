interface Playable {
    void play();
}

class Guitar implements Playable {
    @Override
    public void play() {
        System.out.println("Playing guitar chords");
    }
}

class Piano implements Playable {
    @Override
    public void play() {
        System.out.println("Playing piano keys");
    }
}

public class InterfaceDemo {
    public static void main(String[] args) {
        Playable guitar = new Guitar();
        Playable piano = new Piano();
        
        guitar.play();
        piano.play();
    }
}
