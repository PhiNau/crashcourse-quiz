# Vom Gatter zur CPU – Quiz

Interaktives Quiz für die Q2 (Informatik, NRW) zu *Crash Course Computer Science*, Folgen 5–8.
Es dient als Vorbereitung auf den Johnny-Modellrechner.

| Folge | Thema | Fragen |
|---|---|---|
| 5 | ALU: Halb-/Volladdierer, Überlauf, Flags | 15 |
| 6 | Latches, Register, RAM-Matrix, Multiplexer | 15 |
| 7 | CPU: Fetch-Decode-Execute, Steuerwerk, Takt | 15 |
| 8 | Befehle, Sprünge, Schleifen, Befehlslänge | 15 |
| Mix | 15 zufällige Fragen aus allen Folgen | 15 |

Fragetypen: Einfachauswahl, Mehrfachauswahl, Wahr/Falsch, Zuordnung, Reihenfolge und Zahleneingabe.
Nach jeder Antwort erscheint eine Erklärung. Am Ende sehen die Schüler:innen eine Auswertung mit Name, Datum und Uhrzeit, die sie als Screenshot oder PDF abgeben können.

## Dateien

- `index.html`: die Seite
- `questions.js`: **alle Fragen**. Hier kannst du Fragen ändern oder ergänzen (Format steht oben in der Datei).
- `app.js`: die Quiz-Logik
- `style.css`: das Aussehen (mit Hell- und Dunkelmodus)

## Lokal ansehen

```bash
python -m http.server 8000
```

Danach `http://localhost:8000` im Browser öffnen.

## Veröffentlichen mit GitHub Pages

1. Ein öffentliches Repository anlegen und diese Dateien hochladen.
2. Im Repository: **Settings → Pages → Branch: `main`, Ordner `/ (root)` → Save**.
3. Nach ca. 1 Minute ist das Quiz unter `https://<benutzername>.github.io/<repo-name>/` erreichbar.

## Hinweise

- Die Seite ist rein statisch, deshalb gibt es keine zentrale Auswertung. Ergebnisse werden per Screenshot oder PDF („Drucken“) abgegeben.
- Die Lösungen stehen in `questions.js`. Wer sich mit den Entwicklerwerkzeugen des Browsers auskennt, kann sie also finden.
- Die Videos stammen von Crash Course (PBS Digital Studios). Die Fragen wurden eigens formuliert, Transkripte sind nicht enthalten.
