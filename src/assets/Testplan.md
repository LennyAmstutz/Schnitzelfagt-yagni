# Testplan

## Einleitung

Dieser Testplan dokumentiert neun manuelle Testfälle für die Schnitzeljagd-App. Jeder Test orientiert sich an einer Anforderung der Applikation. Die Tabelle zu jedem Test enthält Platzhalter für tatsächliche Ergebnisse und den Status nach der Durchführung. Die Reihenfolge der Tests entspricht einem kompletten Schnitzeljagd-Durchlauf.

## Testfälle

### Testfall 1: Spielstart und Namenseingabe
Anforderung: Benutzer kann einen Namen eingeben und das Spiel starten.

| ID  | Schritt                                                         | Erwartetes Ergebnis                                                                 | Tatsächliches Ergebnis | Status | Kommentar |
|----|----------------------------------------------------------------|--------------------------------------------------------------------------------------|-----------------------|--------|-----------|
| 1.1 | App starten und "Start Game" auswählen                   | Setup-Seite öffnet sich                                                           |                       |        |           |
| 1.2 | Namen eingeben und "Submit" drücken                     | Spiel startet, Name wird gespeichert, Kamera-Berechtigungsseite wird angezeigt       |                       |        |           |

### Testfall 2: Kameraberechtigung
Anforderung: App fragt nach Kamerazugriff und reagiert auf die Entscheidung.

| ID  | Schritt                                               | Erwartetes Ergebnis                                             | Tatsächliches Ergebnis | Status | Kommentar |
|----|------------------------------------------------------|----------------------------------------------------------------|-----------------------|--------|-----------|
| 2.1 | Auf "Allow access" tippen                           | Betriebssystem fragt Kameraerlaubnis ab                        |                       |        |           |
| 2.2 | Zugriff gewähren                                      | App navigiert zur Standort-Berechtigungsseite                   |                       |        |           |
| 2.3 | Zugriff verweigern                                    | App kehrt zum Home-Screen zurück                              |                       |        |           |

### Testfall 3: Standortberechtigung
Anforderung: Standortfreigabe muss erteilt werden, bevor die Geolocation-Aufgabe startet.

| ID  | Schritt                                  | Erwartetes Ergebnis                                   | Tatsächliches Ergebnis | Status | Kommentar |
|----|-----------------------------------------|------------------------------------------------------|-----------------------|--------|-----------|
| 3.1 | Auf "Allow access" tippen               | Betriebssystem fragt nach Standortzugriff             |                       |        |           |
| 3.2 | Zugriff gewähren                          | App öffnet die Geolocation-Seite                    |                       |        |           |
| 3.3 | Zugriff verweigern                      | App kehrt zum Home-Screen zurück                    |                       |        |           |

### Testfall 4: Geolocation-Aufgabe
Anforderung: Benutzer muss sich auf die vorgegebene Position zubewegen; Erfolg bei Distanz < 7 m.

| ID  | Schritt                                                              | Erwartetes Ergebnis                                                                                  | Tatsächliches Ergebnis | Status | Kommentar |
|----|---------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|-----------------------|--------|-----------|
| 4.1 | Geolocation-Seite wird angezeigt, Countdown startet                 | Timer läuft, Distanz zum Ziel wird angezeigt                                                        |                       |        |           |
| 4.2 | Zur angegebenen Position gehen (Latitude 47.027574, Longitude 8.300886) | Bei Distanz < 7 m erscheint der Success-Screen, weiter zur Distanz-Aufgabe                           |                       |        |           |
| 4.3 | Timer läuft ab, Distanz bleibt >= 7 m                              | Aufgabe gilt als übersprungen, nächste Seite wird geladen                                          |                       |        |           |

### Testfall 5: Distanz-Aufgabe
Anforderung: Mindestens 10 m vom Startpunkt entfernen, um die Aufgabe zu erfüllen.

| ID  | Schritt                                             | Erwartetes Ergebnis                                                               | Tatsächliches Ergebnis | Status | Kommentar |
|----|----------------------------------------------------|----------------------------------------------------------------------------------|-----------------------|--------|-----------|
| 5.1 | Distanz-Seite startet, Startposition wird ermittelt | "Remaining distance" zeigt 10 m                                                 |                       |        |           |
| 5.2 | Sich 10 m von der Startposition entfernen           | Bei Distanz >= 10 m erscheint der Success-Screen, weiter zum QR-Task              |                       |        |           |
| 5.3 | Countdown läuft ab, ohne dass 10 m erreicht werden | Aufgabe wird übersprungen, nächste Seite wird geladen                           |                       |        |           |

### Testfall 6: QR-Code-Aufgabe
Anforderung: Richtigen QR-Code mit Inhalt "M335@ICT-BZ" scannen.

| ID  | Schritt                                   | Erwartetes Ergebnis                                                       | Tatsächliches Ergebnis | Status | Kommentar |
|----|------------------------------------------|--------------------------------------------------------------------------|-----------------------|--------|-----------|
| 6.1 | Auf "Scan QR Code" tippen und Kamera auf den Code richten | QR-Scanner startet                                                       |                       |        |           |
| 6.2 | Code mit Inhalt "M335@ICT-BZ" scannen        | Bei korrektem Code erscheint der Success-Screen, sonst bleibt die Seite   |                       |        |           |

### Testfall 7: Sensor-Aufgabe (Gerät drehen)
Anforderung: Gerät kopfüber halten (Beta-Winkel > 150°) löst Erfolg aus.

| ID  | Schritt                 | Erwartetes Ergebnis                                                                | Tatsächliches Ergebnis | Status | Kommentar |
|----|------------------------|-----------------------------------------------------------------------------------|-----------------------|--------|-----------|
| 7.1 | Sensor-Seite zeigt Countdown | Timer läuft                                                                   |                       |        |           |
| 7.2 | Gerät langsam um 180° drehen  | Sobald |β| > 150°, erscheint der Success-Screen                                  |                       |        |           |
| 7.3 | Timer läuft ab             | Aufgabe wird übersprungen und nächste Seite geladen                           |                       |        |           |

### Testfall 8: Ladegerät-Aufgabe
Anforderung: App erkennt angeschlossenen Stromadapter.

| ID  | Schritt                                     | Erwartetes Ergebnis                                                    | Tatsächliches Ergebnis | Status | Kommentar |
|----|--------------------------------------------|-----------------------------------------------------------------------|-----------------------|--------|-----------|
| 8.1 | Auf der Charger-Seite das Ladegerät anschließen | `status.isPlugged` wird true, Success-Screen erscheint                 |                       |        |           |
| 8.2 | Timer läuft ab, ohne Anschluss                   | Aufgabe wird übersprungen und nächste Seite geladen                    |                       |        |           |

### Testfall 9: WLAN-Aufgabe und Abschluss
Anforderung: Mit WLAN "ICT-BLJ" verbinden und danach trennen. Danach wird das Ergebnis gespeichert und die Finish-Seite angezeigt.

| ID  | Schritt                           | Erwartetes Ergebnis                                                                                   | Tatsächliches Ergebnis | Status | Kommentar |
|----|----------------------------------|------------------------------------------------------------------------------------------------------|-----------------------|--------|-----------|
| 9.1 | WLAN-Seite öffnet sich, Countdown startet | Timer läuft                                                                                          |                       |        |           |
| 9.2 | Mit WLAN "ICT-BLJ" verbinden       | Meldung "✅ Mit Ziel-WLAN verbunden" im Log (optional)                                            |                       |        |           |
| 9.3 | WLAN wieder trennen             | Erfolgskriterien erfüllt: Success-Screen erscheint, App navigiert zur Finish-Seite                   |                       |        |           |
| 9.4 | Finish-Seite zeigt Ergebnis an  | Daten werden in Local Storage gespeichert und per HTTP-Post versendet                                  |                       |        |           |

