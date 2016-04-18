# Zadanie 1. Obsluga formularzy node sass gulp

Czas realizacji: 10h

Należy napisać:

 - gulpfile 
   - uruchamiający serwer
   - kompilujący plik styles.sass do static/css/styles.css
   - sprawdzający modyfikację plików js, sass i restartujący serwer/rekompilujący pliki sass
   - restartujący stronę w przeglądarce po zmianie plików
 - plik aplikacji server.js 
   - działający na porcie 3000
   - serwujący pliki html, png i css z folderu static
   - wystawiający endpoint /upload-form-endpoint
     - przyjmujący żądanie POST z formularza w pliku index.html zawierające adres email, checkbox 'zgadzam się' i input uploadujący obrazek PNG
     - checkbox musi być zaznaczony jeśli - nie jest przekierowanie na failure.html
     - wysyłany plik musi być poprawnym obrazkiem PNG, należy go zapisać jako static/uploads/image.png
     - jeśli podany email lub obrazek nie jest poprawny przekierowujący na failure.html
     - jeśli podany email i obrazek jest poprawny przekierowujący na success.html
     - endpoint ma robić przekierowanie http 302

Nie wolno zmieniać (chyba, że są w nich błędy, których nie zauważyłem):

 - struktury katalogów
 - plików html
 - plików sass (zmiany tylko po to, zeby sprawdzić czy plik jest rekompilowany przez live reload)

Należy wykorzystać:

 - gulp
 - node
 - express
 - libsass
 - browser-sync
