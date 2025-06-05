# Schnitzelfagt-yagni

## 📋 Projektbeschreibung

„Schnitzelfagt-yagni“ ist eine mobile Anwendung, die es Benutzern ermöglicht, an interaktiven Schnitzeljagden teilzunehmen. Die App wurde mit Angular und Ionic entwickelt und nutzt Capacitor für den plattformübergreifenden Einsatz. Ziel ist es, ein unterhaltsames und benutzerfreundliches Erlebnis zu bieten, bei dem Benutzer verschiedene Aufgaben lösen, um Fortschritte zu erzielen.

## 🧪 Testplan (Modul M335)

### Einleitung

Das Projekt „Schnitzelfagt-yagni“ ist nahezu abgeschlossen. Zur Sicherstellung der Funktionalität und Qualität werden manuelle Abnahmetests durchgeführt. Diese Tests basieren auf den definierten Anforderungen und decken verschiedene Nutzungsszenarien ab.

---

### Testfall 1: Registrierung eines neuen Benutzers

**Anforderung:** Ein Benutzer kann sich erfolgreich registrieren, wenn alle erforderlichen Felder korrekt ausgefüllt sind.

| ID | Schritt                                                                 | Erwartetes Ergebnis                             | Tatsächliches Ergebnis | Status | Kommentar |
|----|-------------------------------------------------------------------------|-------------------------------------------------|------------------------|--------|-----------|
| 1  | App starten und „Registrieren“ auswählen                                | Registrierungsformular wird angezeigt           |                        |        |           |
| 2  | Gültige E-Mail, Benutzernamen und Passwort eingeben                     | Eingaben werden akzeptiert                      |                        |        |           |
| 3  | Auf „Registrieren“ klicken                                              | Benutzerkonto wird erstellt und Benutzer wird eingeloggt |                        |        |           |
| 4  | Weiterleitung zur Startseite                                            | Startseite wird angezeigt                       |                        |        |           |

---

### Testfall 2: Registrierung mit ungültiger E-Mail

**Anforderung:** Das System validiert die E-Mail-Adresse während der Registrierung.

| ID | Schritt                                                                 | Erwartetes Ergebnis                             | Tatsächliches Ergebnis | Status | Kommentar |
|----|-------------------------------------------------------------------------|-------------------------------------------------|------------------------|--------|-----------|
| 1  | App starten und „Registrieren“ auswählen                                | Registrierungsformular wird angezeigt           |                        |        |           |
| 2  | Ungültige E-Mail (z. B. „user@“) eingeben                               | Fehlermeldung wird angezeigt                    |                        |        |           |
| 3  | Auf „Registrieren“ klicken                                              | Registrierung wird verhindert                   |                        |        |           |

---

### Testfall 3: Anmeldung mit gültigen Zugangsdaten

**Anforderung:** Ein registrierter Benutzer kann sich mit korrekten Zugangsdaten anmelden.

| ID | Schritt                                                                 | Erwartetes Ergebnis                             | Tatsächliches Ergebnis | Status | Kommentar |
|----|-------------------------------------------------------------------------|-------------------------------------------------|------------------------|--------|-----------|
| 1  | App starten und „Anmelden“ auswählen                                    | Anmeldeformular wird angezeigt                  |                        |        |           |
| 2  | Gültige E-Mail und Passwort eingeben                                    | Eingaben werden akzeptiert                      |                        |        |           |
| 3  | Auf „Anmelden“ klicken                                                  | Benutzer wird eingeloggt und zur Startseite weitergeleitet |                        |        |           |

---

### Testfall 4: Anmeldung mit falschem Passwort

**Anforderung:** Das System verhindert die Anmeldung mit falschen Zugangsdaten.

| ID | Schritt                                                                 | Erwartetes Ergebnis                             | Tatsächliches Ergebnis | Status | Kommentar |
|----|-------------------------------------------------------------------------|-------------------------------------------------|------------------------|--------|-----------|
| 1  | App starten und „Anmelden“ auswählen                                    | Anmeldeformular wird angezeigt                  |                        |        |           |
| 2  | Gültige E-Mail und falsches Passwort eingeben                           | Fehlermeldung wird angezeigt                    |                        |        |           |
| 3  | Auf „Anmelden“ klicken                                                  | Anmeldung wird verhindert                       |                        |        |           |

---

### Testfall 5: Starten einer Schnitzeljagd

**Anforderung:** Ein angemeldeter Benutzer kann eine Schnitzeljagd starten.

| ID | Schritt                                                                 | Erwartetes Ergebnis                             | Tatsächliches Ergebnis | Status | Kommentar |
|----|-------------------------------------------------------------------------|-------------------------------------------------|------------------------|--------|-----------|
| 1  | Als angemeldeter Benutzer die App öffnen                                | Startseite wird angezeigt                       |                        |        |           |
| 2  | Auf „Schnitzeljagd starten“ klicken                                     | Liste verfügbarer Schnitzeljagden wird angezeigt |                        |        |           |
| 3  | Eine Schnitzeljagd auswählen und starten                                | Erste Aufgabe der Schnitzeljagd wird angezeigt  |                        |        |           |

---

### Testfall 6: Beenden einer Schnitzeljagd

**Anforderung:** Ein Benutzer kann eine laufende Schnitzeljagd beenden.

| ID | Schritt                                                                 | Erwartetes Ergebnis                             | Tatsächliches Ergebnis | Status | Kommentar |
|----|-------------------------------------------------------------------------|-------------------------------------------------|------------------------|--------|-----------|
| 1  | Während einer laufenden Schnitzeljagd die Option „Beenden“ auswählen    | Bestätigungsdialog wird angezeigt               |                        |        |           |
| 2  | Beenden bestätigen                                                      | Schnitzeljagd wird beendet und zur Startseite zurückgeleitet |                        |        |           |

---

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Weitere Informationen findest du in der Datei [LICENSE](LICENSE).

## 👤 Autor

- **Lenny Amstutz** – [GitHub-Profil](https://github.com/LennyAmstutz)

---


