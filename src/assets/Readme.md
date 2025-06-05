# Schnitzeljagd App

Dies ist eine mit [Ionic](https://ionicframework.com/) und Angular entwickelte mobile Applikation. Die App führt den Benutzer durch eine Reihe von Aufgaben ("Tasks"), die nacheinander erledigt werden muessen. Der Fortschritt und die erreichten Punkte werden am Ende gespeichert und optional an ein Google‑Formular übermittelt.

## Features

- Eingabe eines Spielernamens und Start des Spiels
- Abfragen von Kamera‑ und Standortberechtigungen
- Geolocation‑Aufgabe: zur vorgegebenen Position bewegen
- Distanz‑Aufgabe: sich eine bestimmte Strecke entfernen
- QR‑Code‑Aufgabe: QR Code mit dem Inhalt `M335@ICT-BZ` scannen
- Sensor‑Aufgabe: Gerät drehen
- Ladegerät‑Aufgabe: Stromadapter anschliessen
- WLAN‑Aufgabe: mit dem WLAN `ICT-BLJ` verbinden und wieder trennen
- Abschlussseite mit Gesamtzeit, Medaillen und Kartoffeln

## Entwicklung

1. Abhängigkeiten installieren
   ```bash
   npm install
   ```
2. App im Browser starten
   ```bash
   ionic serve
   ```
3. Android Build (optional)
   ```bash
   ionic build android
   ```

## Manueller Testplan

Die folgende Tabelle gibt einen Überblick über alle Testfälle. Jeder Testfall besteht aus mehreren Schritten, die manuell ausgeführt werden können. Nach der Durchführung können tatsächliches Ergebnis und Status ergänzt werden.

| Nr. | Testfall |
|----|--------------------------------------------------------------------------|
| 1  | **Spielstart und Namenseingabe** – Benutzer startet die App und gibt einen Namen ein. |
| 2  | **Kameraberechtigung** – Zugriff erlauben oder verweigern, App reagiert entsprechend. |
| 3  | **Standortberechtigung** – Freigabe erteilen oder ablehnen, App navigiert weiter oder zurück. |
| 4  | **Geolocation‑Aufgabe** – Zur Zielposition gehen (< 7 m) oder Countdown ablaufen lassen. |
| 5  | **Distanz‑Aufgabe** – Mindestens 10 m vom Startpunkt entfernen. |
| 6  | **QR‑Code‑Aufgabe** – QR Code mit Inhalt `M335@ICT-BZ` scannen. |
| 7  | **Sensor‑Aufgabe** – Gerät umdrehen (β > 150°). |
| 8  | **Ladegerät‑Aufgabe** – Stromadapter anschließen. |
| 9  | **WLAN‑Aufgabe und Abschluss** – Mit WLAN `ICT-BLJ` verbinden, dann trennen und Finish‑Seite prüfen. |

Weitere Details zu jedem Test (Schritte, erwartetes Ergebnis) können dem Testplan in der Projekt­dokumentation entnommen werden.

## Lizenz

Dieses Projekt dient zu Lernzwecken. Alle enthaltenen Logos und Markenzeichen gehören ihren jeweiligen Besitzern.
