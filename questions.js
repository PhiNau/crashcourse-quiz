// Fragen zu Crash Course Computer Science, Folgen 5–8.
// Fragetypen:
//   single : eine richtige Antwort       -> answer: Index in options
//   multi  : mehrere richtige Antworten  -> answer: [Indizes]
//   tf     : Wahr/Falsch                 -> answer: true | false
//   match  : Zuordnung                   -> pairs: [[links, rechts], ...]
//   order  : Reihenfolge                 -> items: in richtiger Reihenfolge
//   number : Eingabe                     -> answer: ["akzeptierte", "Eingaben"]
// noMix: true  -> Frage baut auf der vorigen auf und kommt im gemischten Test nicht vor.
// Ein <code>…</code> im Text wird als Code dargestellt.

const EPISODES = [
  {
    id: "05",
    title: "Folge 5: Die ALU",
    original: "How Computers Calculate – the ALU",
    youtube: "https://www.youtube.com/watch?v=1I5ZMmrOfnA",
    glossary: [
      ["Arithmetic Logic Unit (ALU)", "Rechenwerk"],
      ["half adder / full adder", "Halbaddierer / Volladdierer"],
      ["carry (bit)", "Übertrag(sbit)"],
      ["ripple carry adder", "Ripple-Carry-Addierer"],
      ["overflow", "Überlauf"],
      ["flag", "Statusbit, Flag"],
      ["operation code (opcode)", "Befehlscode"]
    ],
    questions: [
      {
        type: "single",
        q: "Welche Aufgabe hat die ALU (Arithmetic and Logic Unit) in einem Computer?",
        options: [
          "Sie führt Rechen- und Logikoperationen mit Binärzahlen aus.",
          "Sie speichert Programme dauerhaft, auch ohne Strom.",
          "Sie erzeugt das Taktsignal für den Prozessor.",
          "Sie verbindet den Computer mit dem Internet."
        ],
        answer: 0,
        explain: "Die ALU ist das „mathematische Gehirn“: Die <b>Arithmetik</b>einheit rechnet (z. B. Addition, Subtraktion), die <b>Logik</b>einheit führt logische Operationen und Tests aus."
      },
      {
        type: "single",
        q: "Was war 1970 das Besondere an der ALU <b>Intel 74181</b>?",
        options: [
          "Sie war die erste vollständige ALU auf einem einzigen Chip.",
          "Sie konnte als erste ALU multiplizieren und dividieren.",
          "Sie war die erste 64-Bit-ALU.",
          "Sie war die erste ALU, die ganz ohne Logikgatter auskam."
        ],
        answer: 0,
        explain: "Der 74181 war die erste komplette ALU auf einem Chip. Er arbeitete mit 4-Bit-Eingaben, bestand aus etwa 70 Logikgattern und konnte <i>nicht</i> multiplizieren oder dividieren."
      },
      {
        type: "match",
        q: "Ordne jedem Teil der Schaltung das passende Logikgatter zu.",
        pairs: [
          ["Summenbit des Halbaddierers", "XOR"],
          ["Übertragsbit (Carry) des Halbaddierers", "AND"],
          ["Zusammenfassen der beiden Überträge im Volladdierer", "OR"],
          ["Letzter Schritt des Null-Tests (Ergebnis umkehren)", "NOT"]
        ],
        explain: "Summe: XOR (genau ein Eingang ist 1). Übertrag: AND (nur bei 1 + 1). Im Volladdierer prüft ein OR, ob einer der beiden Halbaddierer einen Übertrag hatte. Der Null-Test prüft mit ORs, ob irgendein Bit 1 ist, und dreht das Ergebnis am Ende mit NOT um."
      },
      {
        type: "single",
        q: "Ein Halbaddierer berechnet <code>1 + 1</code>. Was liegt an seinen beiden Ausgängen an?",
        options: [
          "Summe = 0, Übertrag = 1",
          "Summe = 1, Übertrag = 1",
          "Summe = 1, Übertrag = 0",
          "Summe = 2, Übertrag = 0"
        ],
        answer: 0,
        explain: "1 + 1 = 2, binär <code>10</code>. Die Ziffer 2 gibt es im Binärsystem nicht, also ist das Summenbit 0 und die 1 wird als Übertrag in die nächste Stelle weitergegeben."
      },
      {
        type: "single",
        q: "Warum braucht man für die zweite und alle weiteren Stellen einer Addition einen <b>Volladdierer</b> statt eines Halbaddierers?",
        options: [
          "Weil dort drei Bits addiert werden müssen: A, B und der Übertrag der vorherigen Stelle.",
          "Weil der Volladdierer zusätzlich multiplizieren kann.",
          "Weil Halbaddierer nur für negative Zahlen funktionieren.",
          "Weil der Volladdierer vier Ausgänge hat."
        ],
        answer: 0,
        explain: "Ab der zweiten Stelle kann ein Übertrag aus der vorherigen Stelle hinzukommen. Der Volladdierer hat deshalb drei Eingänge (A, B, C). Er besteht aus zwei Halbaddierern und einem OR-Gatter und hat weiterhin nur zwei Ausgänge: Summe und Übertrag."
      },
      {
        type: "single",
        q: "Woher hat der <b>Ripple-Carry-Addierer</b> seinen Namen?",
        options: [
          "Der Übertrag „plätschert“ von einem Volladdierer zum nächsten durch die Kette.",
          "Er wurde von einem Ingenieur namens Ripple erfunden.",
          "Er addiert nur Zahlen, die keinen Übertrag erzeugen.",
          "Er arbeitet mit Wellen statt mit elektrischem Strom."
        ],
        answer: 0,
        explain: "„to ripple“ heißt „sich wellenartig ausbreiten“. Der Übertrag jeder Stelle wird an den nächsten Volladdierer weitergereicht, bis alle 8 Bits addiert sind."
      },
      {
        type: "single",
        q: "Wann entsteht bei einem 8-Bit-Addierer ein <b>Überlauf</b> (Overflow)?",
        options: [
          "Wenn das Ergebnis zu groß ist, um mit 8 Bit dargestellt zu werden.",
          "Wenn beide Summanden 0 sind.",
          "Wenn das Ergebnis eine gerade Zahl ist.",
          "Wenn der Addierer zu heiß wird."
        ],
        answer: 0,
        explain: "Gibt der letzte Volladdierer einen Übertrag in ein „9. Bit“ ab, passt das Ergebnis nicht mehr in 8 Bit. Das kann zu Fehlern führen, wie beim berühmten Level 256 in Pac-Man."
      },
      {
        type: "number",
        q: "Pac-Man speicherte das aktuelle Level mit 8 Bit. Welches ist die größte Zahl, die man mit 8 Bit (ohne Vorzeichen) darstellen kann?",
        answer: ["255"],
        explain: "<code>11111111</code> = 255. Ab Level 256 lief der Zähler über, und das Level war voller Fehler und nicht mehr zu schaffen."
      },
      {
        type: "tf",
        q: "Moderne Computer verwenden meist einen <b>Carry-Look-Ahead-Addierer</b>. Er ist schneller als der Ripple-Carry-Addierer, berechnet aber dasselbe Ergebnis.",
        answer: true,
        explain: "Richtig. Beim Ripple-Carry-Addierer muss jeder Übertrag erst durch die ganze Kette laufen. Das dauert nur Milliardstel Sekunden, ist für schnelle Computer aber trotzdem zu langsam."
      },
      {
        type: "single",
        q: "Eine einfache ALU hat keine Schaltung zum Multiplizieren. Wie berechnet ein einfacher Prozessor (z. B. in einer Mikrowelle) <code>12 · 5</code>?",
        options: [
          "Durch wiederholte Addition: 12 wird fünfmal addiert.",
          "Gar nicht, das Ergebnis wird aus einer Tabelle im Internet geladen.",
          "Durch eine einzige Subtraktion.",
          "Indem er die Zahlen in Dezimalzahlen umwandelt."
        ],
        answer: 0,
        explain: "Multiplikation lässt sich als wiederholte Addition ausführen, hier mit 5 Durchläufen durch die ALU. Das ist langsam, funktioniert aber. Teurere Prozessoren haben eigene, aufwendige Multiplizierschaltungen."
      },
      {
        type: "multi",
        q: "Welche Aufgaben übernimmt die <b>Logikeinheit</b> der ALU? <i>(mehrere Antworten möglich)</i>",
        options: [
          "Logische Operationen wie AND, OR und NOT",
          "Testen, ob eine Zahl negativ ist",
          "Testen, ob ein Ergebnis gleich 0 ist",
          "Zwei Zahlen addieren",
          "Daten dauerhaft speichern"
        ],
        answer: [0, 1, 2],
        explain: "Die Logikeinheit führt logische Operationen und einfache Tests (negativ? null?) aus. Addieren gehört zur <i>Arithmetik</i>einheit. Speichern ist gar keine Aufgabe der ALU."
      },
      {
        type: "single",
        q: "Neben den Eingaben A und B bekommt die ALU noch einen 4-Bit-<b>Operationscode</b>. Wozu dient er?",
        options: [
          "Er legt fest, welche Operation die ALU ausführen soll, z. B. Addieren oder Subtrahieren.",
          "Er gibt an, an welcher Speicheradresse das Ergebnis landet.",
          "Er enthält das Ergebnis der letzten Rechnung.",
          "Er legt die Taktfrequenz der ALU fest."
        ],
        answer: 0,
        explain: "Im Beispiel könnte <code>1000</code> „addieren“ und <code>1100</code> „subtrahieren“ bedeuten. Der Operationscode stellt die ALU also auf die gewünschte Operation ein."
      },
      {
        type: "match",
        q: "Die ALU gibt neben dem Ergebnis auch <b>Flags</b> aus. Ordne zu.",
        pairs: [
          ["Zero-Flag", "Das Ergebnis ist 0"],
          ["Negative-Flag", "Das Ergebnis ist kleiner als 0"],
          ["Overflow-Flag", "Das Ergebnis passt nicht in die verfügbaren Bits"]
        ],
        explain: "Flags sind 1-Bit-Ausgänge, die einen Zustand melden. Diese drei Flags gibt es praktisch in jeder ALU. Später nutzen bedingte Sprungbefehle sie, z. B. JUMP_NEGATIVE."
      },
      {
        type: "single",
        q: "Wie kann man mit der ALU prüfen, ob <b>A kleiner als B</b> ist?",
        options: [
          "Man berechnet A − B und prüft, ob das Negative-Flag gesetzt ist.",
          "Man berechnet A + B und prüft, ob das Overflow-Flag gesetzt ist.",
          "Man berechnet A AND B und prüft, ob das Ergebnis 1 ist.",
          "Das geht mit einer ALU nicht."
        ],
        answer: 0,
        explain: "Ist A − B negativ, dann ist A kleiner als B. Entsprechend zeigt das Zero-Flag nach A − B an, ob A und B gleich sind."
      },
      {
        type: "number",
        q: "Addiere die 4-Bit-Zahlen <code>0110</code> und <code>0111</code> im Binärsystem. Gib das Ergebnis als 4-stellige Binärzahl ein.",
        answer: ["1101"],
        binary: true,
        explain: "6 + 7 = 13, binär <code>1101</code>. Das Ergebnis passt noch in 4 Bit, es gibt also keinen Überlauf."
      }
    ]
  },

  {
    id: "06",
    title: "Folge 6: Register und RAM",
    original: "Registers and RAM",
    youtube: "https://www.youtube.com/watch?v=fpnE6UAfbtU",
    glossary: [
      ["latch", "Latch (Speicherglied für 1 Bit)"],
      ["set / reset", "setzen / zurücksetzen"],
      ["write enable", "Schreibfreigabe"],
      ["register", "Register"],
      ["address", "Adresse"],
      ["multiplexer", "Multiplexer"],
      ["Random-Access Memory (RAM)", "Arbeitsspeicher mit wahlfreiem Zugriff"]
    ],
    questions: [
      {
        type: "single",
        q: "Warum geht der Spielstand verloren, wenn jemand während des Spiels das Stromkabel herauszieht?",
        options: [
          "Weil er im RAM liegt, der seinen Inhalt nur behält, solange Strom fließt.",
          "Weil die ALU bei Stromausfall alle Zahlen auf 0 setzt.",
          "Weil die Festplatte bei Stromausfall gelöscht wird.",
          "Weil der Takt stehen bleibt und dabei Daten verloren gehen."
        ],
        answer: 0,
        explain: "RAM ist ein <b>flüchtiger</b> Speicher. Persistenter Speicher (z. B. eine SSD) behält seine Daten dagegen auch ohne Strom."
      },
      {
        type: "single",
        q: "Man führt den Ausgang eines <b>OR-Gatters</b> auf einen seiner Eingänge zurück. Was passiert, nachdem der andere Eingang A einmal auf 1 gesetzt wurde?",
        options: [
          "Der Ausgang bleibt dauerhaft 1, auch wenn A wieder 0 wird.",
          "Der Ausgang springt sofort wieder auf 0, wenn A 0 wird.",
          "Der Ausgang wechselt ständig zwischen 0 und 1.",
          "Das Gatter wird zerstört."
        ],
        answer: 0,
        explain: "1 OR 1 = 1: Die zurückgeführte 1 hält sich selbst. Die Schaltung „merkt“ sich also eine 1, kann aber nie wieder auf 0 zurückgesetzt werden. Beim AND-Gatter mit Rückkopplung ist es genau umgekehrt."
      },
      {
        type: "match",
        q: "Ordne beim <b>AND-OR-Latch</b> den Eingangskombinationen das Verhalten zu.",
        pairs: [
          ["Set = 1, Reset = 0", "Ausgang wird 1"],
          ["Set = 0, Reset = 1", "Ausgang wird 0"],
          ["Set = 0, Reset = 0", "Der zuletzt gespeicherte Wert bleibt erhalten"]
        ],
        explain: "Das AND-OR-Latch kombiniert die beiden Rückkopplungsschaltungen. Mit Set schreibt man eine 1, mit Reset eine 0. Sind beide Eingänge 0, „hält“ (latch) es den Wert. So speichert es genau 1 Bit."
      },
      {
        type: "tf",
        q: "Daten in einen Speicher hineinzuschreiben nennt man <b>Lesen</b>, Daten herauszuholen nennt man <b>Schreiben</b>.",
        answer: false,
        explain: "Genau umgekehrt: Hineinbringen heißt <b>Schreiben</b> (write), Herausholen heißt <b>Lesen</b> (read)."
      },
      {
        type: "single",
        q: "Bei einem <b>Gated Latch</b> ist die Write-Enable-Leitung 0. Jetzt wechselt die Datenleitung von 0 auf 1. Was passiert?",
        options: [
          "Nichts, der gespeicherte Wert bleibt unverändert.",
          "Der Ausgang wird sofort 1.",
          "Der Ausgang wird 0.",
          "Das Latch speichert beide Werte gleichzeitig."
        ],
        answer: 0,
        explain: "Solange Write Enable 0 ist, ist das „Tor“ (gate) geschlossen und der Speicher gesperrt. Erst wenn Write Enable 1 ist, wird der Wert der Datenleitung übernommen."
      },
      {
        type: "single",
        q: "Was ist ein <b>Register</b>?",
        options: [
          "Eine Gruppe von Latches, die zusammen eine Zahl speichern, z. B. 8 Latches für eine 8-Bit-Zahl.",
          "Eine Liste aller Programme auf einem Computer.",
          "Ein einzelnes Logikgatter mit Rückkopplung.",
          "Ein anderes Wort für die Festplatte."
        ],
        answer: 0,
        explain: "Mehrere Latches nebeneinander bilden ein Register. Die Anzahl der Bits heißt <b>Breite</b> des Registers. Früher waren Register 8 Bit breit, heute sind es oft 64 Bit."
      },
      {
        type: "number",
        q: "Ein 64-Bit-Register besteht aus 64 nebeneinanderliegenden Latches. Jedes Latch hat eine eigene Daten- und Ausgangsleitung, alle teilen sich eine Enable-Leitung. Wie viele Leitungen braucht man insgesamt?",
        answer: ["129"],
        explain: "64 Datenleitungen + 64 Ausgangsleitungen + 1 gemeinsame Enable-Leitung = <b>129</b>. Bei vielen Bits wird das unpraktisch, daher die Matrix-Anordnung."
      },
      {
        type: "single",
        q: "256 Bits werden als <b>16×16-Matrix</b> angeordnet. Wie viele Leitungen braucht man dann insgesamt?",
        options: ["35", "129", "256", "513"],
        answer: 0,
        explain: "16 Zeilen- + 16 Spaltenleitungen + 1 Datenleitung + 1 Write-Enable + 1 Read-Enable = <b>35</b>. Ohne Matrix wären es 513 Leitungen."
      },
      {
        type: "single",
        q: "Wann wird in der Matrix ein bestimmtes Latch beschrieben?",
        options: [
          "Wenn seine Zeilenleitung UND seine Spaltenleitung UND die Write-Enable-Leitung 1 sind.",
          "Wenn seine Zeilenleitung ODER seine Spaltenleitung 1 ist.",
          "Immer, wenn auf der Datenleitung eine 1 anliegt.",
          "Wenn alle Zeilenleitungen gleichzeitig 1 sind."
        ],
        answer: 0,
        explain: "Ein AND-Gatter an jeder Kreuzung sorgt dafür, dass immer nur genau ein Latch freigegeben ist. Deshalb reicht eine gemeinsame Datenleitung für alle."
      },
      {
        type: "single",
        q: "Ein Latch liegt in <b>Zeile 12</b> und <b>Spalte 8</b>. Zeile und Spalte werden jeweils mit 4 Bit angegeben. Wie lautet die 8-Bit-Adresse?",
        options: [
          "<code>1100 1000</code>",
          "<code>1000 1100</code>",
          "<code>0110 0100</code>",
          "<code>1100 0010</code>"
        ],
        answer: 0,
        explain: "12 = <code>1100</code> und 8 = <code>1000</code>. Zuerst kommt die Zeile, dann die Spalte: <code>11001000</code>."
      },
      {
        type: "single",
        q: "Welche Aufgabe hat der <b>Multiplexer</b> im Speicher?",
        options: [
          "Er wandelt eine Binärzahl (z. B. 4 Bit) in die Auswahl genau einer Leitung um (eine von 16).",
          "Er multipliziert zwei Zahlen miteinander.",
          "Er verstärkt das Signal auf der Datenleitung.",
          "Er löscht den gesamten Speicher."
        ],
        answer: 0,
        explain: "Ein 1-zu-16-Multiplexer bekommt eine 4-Bit-Zahl und aktiviert die passende Zeile bzw. Spalte: <code>0000</code> die erste, <code>0001</code> die zweite usw. Man braucht je einen für Zeilen und Spalten."
      },
      {
        type: "single",
        q: "Wie wird aus 256-Bit-Speicherbausteinen ein Speicher, der an 256 Adressen jeweils <b>ein ganzes Byte</b> speichert?",
        options: [
          "Man setzt 8 Bausteine nebeneinander, gibt allen dieselbe Adresse, und jeder speichert ein Bit des Bytes.",
          "Man schaltet 256 Bausteine hintereinander.",
          "Man verdoppelt die Taktfrequenz.",
          "Man speichert jedes Byte achtmal im selben Baustein."
        ],
        answer: 0,
        explain: "Wie beim Register: 8 Bausteine nebeneinander, dieselbe Adresse an alle, und jeder Baustein steuert ein Bit bei. So entstehen 256 Adressen mit je 8 Bit."
      },
      {
        type: "single",
        q: "Warum heißt dieser Speicher <b>Random-Access Memory</b>?",
        options: [
          "Weil man jederzeit und in beliebiger Reihenfolge direkt auf jede Speicherstelle zugreifen kann.",
          "Weil die Daten zufällig verteilt abgespeichert werden.",
          "Weil der Speicher zufällig Fehler produziert.",
          "Weil man die Speicherstellen nur nacheinander lesen kann."
        ],
        answer: 0,
        explain: "„Random access“ bedeutet <b>wahlfreier Zugriff</b>: Über die Adresse kann man jede Stelle sofort ansprechen, ohne die anderen vorher zu durchlaufen."
      },
      {
        type: "number",
        q: "Ein Speicher hat <b>16 Speicherzellen</b>. Wie viele Bit braucht eine Adresse mindestens, damit jede Zelle eine eigene Adresse bekommt?",
        answer: ["4"],
        explain: "Mit 4 Bit lassen sich 2⁴ = 16 verschiedene Adressen (0 bis 15) darstellen. Genau so einen Speicher verwendet die Beispiel-CPU in Folge 7."
      },
      {
        type: "multi",
        q: "Welche Aussagen über Speicher sind richtig? <i>(mehrere Antworten möglich)</i>",
        options: [
          "Im Video wurde SRAM gebaut, das die Bits in Latches speichert.",
          "Andere Speicherarten wie DRAM oder Flash speichern Bits mit anderen Schaltungen, z. B. mit Kondensatoren.",
          "Alle diese Speichertechniken ordnen Speicherzellen in verschachtelten Matrizen an.",
          "RAM ist mit dem Langzeitgedächtnis des Menschen vergleichbar."
        ],
        answer: [0, 1, 2],
        explain: "RAM ist eher wie das <b>Kurzzeit- bzw. Arbeitsgedächtnis</b>. Alle Speicherarten beruhen darauf, kleine Speicherbausteine immer wieder zu größeren Einheiten zusammenzupacken (Abstraktion!)."
      }
    ]
  },

  {
    id: "07",
    title: "Folge 7: Die CPU",
    original: "The Central Processing Unit (CPU)",
    youtube: "https://www.youtube.com/watch?v=FZGugFqdr60",
    glossary: [
      ["instruction", "Befehl"],
      ["instruction address register", "Befehlszähler / Programmzähler"],
      ["instruction register", "Befehlsregister"],
      ["control unit", "Steuerwerk"],
      ["fetch / decode / execute", "holen / dekodieren / ausführen"],
      ["clock (speed)", "Takt(frequenz)"],
      ["microarchitecture", "Mikroarchitektur"]
    ],
    questions: [
      {
        type: "single",
        q: "Was ist die Aufgabe der CPU?",
        options: [
          "Programme ausführen, die aus einer Folge einzelner Befehle (Instructions) bestehen.",
          "Daten dauerhaft speichern, wenn der Computer ausgeschaltet ist.",
          "Das Bild auf dem Monitor darstellen.",
          "Strom für die anderen Bauteile bereitstellen."
        ],
        answer: 0,
        explain: "Ein Programm ist eine Folge von Befehlen. Die CPU arbeitet sie ab: Rechenbefehle gibt sie an die ALU, Speicherbefehle führt sie über den RAM aus."
      },
      {
        type: "single",
        q: "Wie ist ein 8-Bit-Befehl in der Beispiel-CPU aufgebaut?",
        options: [
          "Die ersten 4 Bits sind der Opcode, die letzten 4 Bits geben eine Speicheradresse oder Register an.",
          "Alle 8 Bits sind der Opcode.",
          "Die ersten 4 Bits sind die Adresse, die letzten 4 Bits das Ergebnis.",
          "Jedes Bit steht für einen eigenen Befehl."
        ],
        answer: 0,
        explain: "Opcode (was soll getan werden?) und Operand (womit bzw. wo?). Beim Johnny-Simulator ist das genauso: Ein Befehl besteht dort aus Opcode und Adresse."
      },
      {
        type: "match",
        q: "Ordne die Bestandteile der Beispiel-CPU ihrer Aufgabe zu.",
        pairs: [
          ["Instruction Address Register (Befehlszähler)", "Speichert die Adresse des aktuellen Befehls"],
          ["Instruction Register (Befehlsregister)", "Speichert den aktuellen Befehl selbst"],
          ["Register A bis D", "Speichern Werte vorübergehend zum Rechnen"],
          ["RAM", "Enthält das Programm und die Daten"]
        ],
        explain: "Befehlszähler = <i>wo</i> stehe ich im Programm? Befehlsregister = <i>was</i> soll ich gerade tun? Diese Unterscheidung brauchst du später auch beim Johnny-Simulator."
      },
      {
        type: "order",
        q: "Bringe die Schritte eines Befehlszyklus in die richtige Reihenfolge.",
        items: [
          "Der RAM liefert den Inhalt der Adresse, die im Befehlszähler steht.",
          "Dieser Wert wird ins Befehlsregister kopiert.",
          "Das Steuerwerk dekodiert den Opcode.",
          "Das Steuerwerk führt den Befehl aus (z. B. Wert in Register A laden).",
          "Der Befehlszähler wird um 1 erhöht."
        ],
        explain: "<b>Fetch</b> (holen: Schritte 1–2), <b>Decode</b> (dekodieren: Schritt 3), <b>Execute</b> (ausführen: Schritte 4–5). Danach beginnt der Zyklus mit dem nächsten Befehl von vorn."
      },
      {
        type: "single",
        q: "Im Befehlsregister steht <code>0010 1110</code>. Der Opcode <code>0010</code> bedeutet LOAD_A. Was macht dieser Befehl?",
        options: [
          "Er lädt den Wert aus Speicheradresse 14 in Register A.",
          "Er speichert Register A an Adresse 14.",
          "Er lädt die Zahl 2 in Register A.",
          "Er addiert 14 zu Register A."
        ],
        answer: 0,
        explain: "<code>1110</code> = 14. LOAD_A 14 holt den Wert aus RAM-Adresse 14 (im Beispiel die 3) und schreibt ihn in Register A."
      },
      {
        type: "single",
        q: "Welche Aufgabe hat das <b>Steuerwerk</b> (Control Unit)?",
        options: [
          "Es dekodiert die Befehle und steuert die übrigen Bauteile der CPU, wie ein Dirigent im Orchester.",
          "Es führt alle Rechnungen selbst aus.",
          "Es speichert alle Programme.",
          "Es erzeugt die elektrische Spannung für die CPU."
        ],
        answer: 0,
        explain: "Das Steuerwerk erkennt den Befehl und schaltet z. B. die Read-/Write-Enable-Leitungen von RAM und Registern oder stellt die ALU auf die richtige Operation ein. Gerechnet wird in der ALU."
      },
      {
        type: "tf",
        q: "Das Steuerwerk ist, wie alle anderen Bauteile im Video, aus <b>Logikgattern</b> aufgebaut.",
        answer: true,
        explain: "Richtig. Ob z. B. der Opcode <code>0010</code> (LOAD_A) vorliegt, prüft eine kleine Schaltung aus wenigen Logikgattern."
      },
      {
        type: "single",
        q: "Beim Ausführen von LOAD_A sind die Datenleitungen des RAM mit <b>allen vier</b> Registern verbunden. Warum landet der Wert trotzdem nur in Register A?",
        options: [
          "Das Steuerwerk aktiviert nur die Write-Enable-Leitung von Register A.",
          "Register B, C und D sind während LOAD_A ausgeschaltet.",
          "Register A liegt am nächsten am RAM.",
          "Der Wert wird in alle vier Register geschrieben und danach wieder gelöscht."
        ],
        answer: 0,
        explain: "Hier kommt die Write-Enable-Leitung aus Folge 6 zum Einsatz: Nur das freigegebene Register übernimmt den Wert auf der Datenleitung."
      },
      {
        type: "single",
        q: "Der Befehl <code>1000 01 00</code> ist ein ADD. Die zwei 2-Bit-Gruppen wählen Register aus (<code>00</code> = A, <code>01</code> = B). Was passiert?",
        options: [
          "Register B wird zu Register A addiert, das Ergebnis steht danach in Register A.",
          "Register A wird zu Register B addiert, das Ergebnis steht in Register B.",
          "Die Zahlen 1 und 0 werden addiert.",
          "Der Wert aus Speicheradresse 4 wird addiert."
        ],
        answer: 0,
        explain: "Mit 2 Bit lassen sich 4 Register auswählen. <code>01</code> = B, <code>00</code> = A, also „ADD B A“. Das Ergebnis landet im zweiten genannten Register, hier A."
      },
      {
        type: "single",
        q: "Warum schreibt die ALU das Ergebnis einer Addition nicht <b>direkt</b> in Register A zurück?",
        options: [
          "Der neue Wert würde sofort wieder in die ALU fließen und immer weiter aufaddiert werden.",
          "Register A ist schreibgeschützt.",
          "Die ALU hat keinen Ausgang.",
          "Das Ergebnis muss zuerst in den RAM geschrieben werden."
        ],
        answer: 0,
        explain: "Das Steuerwerk speichert das Ergebnis deshalb kurz in einem internen Register, schaltet die ALU ab und schreibt den Wert erst dann ins Zielregister."
      },
      {
        type: "number",
        q: "Das Beispielprogramm lädt <b>3</b> in Register A und <b>14</b> in Register B und führt dann ADD B A aus. Welcher Wert (dezimal) steht danach in Register A?",
        answer: ["17"],
        explain: "3 + 14 = 17, binär <code>00010001</code>. Danach speichert STORE_A 13 diesen Wert an Adresse 13."
      },
      {
        type: "single",
        q: "Was passiert beim Befehl <b>STORE_A 13</b>?",
        options: [
          "Der RAM wird an Adresse 13 zum Schreiben freigegeben, Register A zum Lesen. Der Wert aus A wird über die Datenleitung gespeichert.",
          "Der Wert aus Adresse 13 wird in Register A geladen.",
          "Die Zahl 13 wird in Register A geschrieben.",
          "Das Programm springt zu Adresse 13."
        ],
        answer: 0,
        explain: "STORE ist das Gegenstück zu LOAD: Diesmal wird der RAM <i>write-enabled</i> und das Register <i>read-enabled</i>."
      },
      {
        type: "single",
        q: "Welche Aufgabe hat der <b>Takt</b> (Clock)?",
        options: [
          "Er gibt in regelmäßigen Abständen ein Signal, mit dem das Steuerwerk den nächsten Schritt auslöst.",
          "Er zeigt die aktuelle Uhrzeit an.",
          "Er zählt, wie viele Programme gestartet wurden.",
          "Er speichert den aktuellen Befehl."
        ],
        answer: 0,
        explain: "Wie ein Metronom oder der Trommler auf einer Galeere hält der Takt alles im Gleichschritt. Seine Frequenz wird in Hertz gemessen."
      },
      {
        type: "multi",
        q: "Welche Aussagen über die Taktfrequenz sind richtig? <i>(mehrere Antworten möglich)</i>",
        options: [
          "1 Gigahertz bedeutet eine Milliarde Takte pro Sekunde.",
          "Zu starkes Übertakten (Overclocking) kann die CPU überhitzen oder zu falschen Ergebnissen führen.",
          "Heruntertakten (Underclocking) spart Energie, z. B. bei Laptops und Smartphones.",
          "Der Intel 4004 von 1971 hatte bereits 740 Megahertz."
        ],
        answer: [0, 1, 2],
        explain: "Der Intel 4004 hatte 740 <b>Kilo</b>hertz, also 740.000 Takte pro Sekunde. Moderne CPUs passen ihre Frequenz je nach Bedarf an (<i>dynamic frequency scaling</i>)."
      },
      {
        type: "single",
        q: "Wo liegt der RAM im Modell aus dem Video, und wie kommuniziert er mit der CPU?",
        options: [
          "Außerhalb der CPU, verbunden über Adress-, Daten- und Enable-Leitungen.",
          "Innerhalb der ALU, ohne eigene Leitungen.",
          "Im Steuerwerk, als Teil des Befehlsregisters.",
          "Der RAM ist nicht mit der CPU verbunden."
        ],
        answer: 0,
        explain: "CPU und Speicher sind getrennte Bauteile, die über Leitungen (Busse) verbunden sind. Das ist typisch für die <b>Von-Neumann-Architektur</b>, und auch beim Johnny-Simulator siehst du Adress- und Datenbus."
      }
    ]
  },

  {
    id: "08",
    title: "Folge 8: Befehle und Programme",
    original: "Instructions & Programs",
    youtube: "https://www.youtube.com/watch?v=zltgXvg6r3k",
    glossary: [
      ["instruction set", "Befehlssatz"],
      ["jump / conditional jump", "Sprung / bedingter Sprung"],
      ["halt", "anhalten (Programmende)"],
      ["infinite loop", "Endlosschleife"],
      ["instruction length", "Befehlslänge"],
      ["immediate value", "Direktwert (steht direkt hinter dem Befehl)"]
    ],
    questions: [
      {
        type: "single",
        q: "Was macht eine CPU laut Video so mächtig?",
        options: [
          "Sie ist programmierbar: Eine andere Befehlsfolge lässt sie eine andere Aufgabe erledigen.",
          "Sie hat für jede Aufgabe eine eigene, fest eingebaute Schaltung.",
          "Sie ist besonders klein.",
          "Sie kann ohne Speicher arbeiten."
        ],
        answer: 0,
        explain: "Die Hardware bleibt gleich, nur die Software (die Befehlsfolge im Speicher) ändert sich. Software ist viel leichter zu ändern als Hardware."
      },
      {
        type: "single",
        q: "Statt <code>0010 1110</code> schreibt man <code>LOAD_A 14</code>. Was ist der Unterschied?",
        options: [
          "Es ist derselbe Befehl, nur für Menschen lesbarer geschrieben.",
          "LOAD_A 14 ist ein anderer, schnellerer Befehl.",
          "LOAD_A 14 versteht die CPU direkt, die Binärzahl nicht.",
          "Die Binärzahl ist ein Datum, LOAD_A 14 ein Befehl."
        ],
        answer: 0,
        explain: "Im Speicher stehen nur Binärzahlen. Kurzbezeichnungen wie LOAD_A (<i>Mnemonics</i>) helfen nur uns Menschen beim Lesen. Johnny zeigt die Befehle ebenfalls so an, z. B. TAKE oder ADD."
      },
      {
        type: "single",
        q: "Bei <code>ADD B A</code> werden zwei Register addiert. Wo wird das Ergebnis gespeichert?",
        options: [
          "In Register A, dem zweiten genannten Register.",
          "In Register B, dem ersten genannten Register.",
          "An Speicheradresse 13.",
          "Das Ergebnis wird nicht gespeichert."
        ],
        answer: 0,
        explain: "Die Reihenfolge ist wichtig: Das Ergebnis landet im zweiten Register."
      },
      {
        type: "single",
        q: "Wie wird ein <code>JUMP</code>-Befehl in der CPU umgesetzt?",
        options: [
          "Die Zieladresse wird in den Befehlszähler geschrieben und überschreibt dessen bisherigen Wert.",
          "Die CPU startet neu.",
          "Der Inhalt des RAM wird verschoben.",
          "Die ALU addiert die Zieladresse zu Register A."
        ],
        answer: 0,
        explain: "Beim nächsten Fetch wird dann der Befehl an der neuen Adresse geholt statt des nächsten in der Reihe. Bei Johnny heißt dieser Befehl JMP."
      },
      {
        type: "single",
        q: "Wann springt <code>JUMP_NEGATIVE</code>?",
        options: [
          "Nur wenn das Negative-Flag der ALU gesetzt ist, also das letzte Rechenergebnis negativ war.",
          "Immer.",
          "Nur wenn die Zieladresse negativ ist.",
          "Nur wenn Register A gleich 0 ist."
        ],
        answer: 0,
        explain: "Ein <b>bedingter Sprung</b>. Ist das letzte Ergebnis 0 oder positiv, macht die CPU einfach mit dem nächsten Befehl weiter. Hier kommen die Flags aus Folge 5 zum Einsatz."
      },
      {
        type: "single",
        q: "Was passiert ohne <code>HALT</code> am Programmende?",
        options: [
          "Die CPU liest die folgenden Speicherinhalte (z. B. Nullen oder Daten) als Befehle und stürzt ab.",
          "Die CPU hält automatisch nach dem letzten Befehl an.",
          "Das Programm startet automatisch neu.",
          "Nichts, HALT ist nur ein Kommentar."
        ],
        answer: 0,
        explain: "Die CPU kann nicht von selbst erkennen, wo das Programm aufhört. Im Beispiel gibt es keinen Befehl mit Opcode 0, also würde der Computer abstürzen."
      },
      {
        type: "tf",
        q: "In der Beispiel-CPU liegen Befehle und Daten im <b>selben Speicher</b>. Grundsätzlich unterscheiden sie sich nicht, beides sind Binärzahlen.",
        answer: true,
        explain: "Richtig. Das ist ein Kernmerkmal der <b>Von-Neumann-Architektur</b>: ein gemeinsamer Speicher für Programm und Daten. Johnny ist genauso aufgebaut."
      },
      {
        type: "number",
        q: "Programm: <code>0: LOAD_A 14</code>, <code>1: LOAD_B 15</code>, <code>2: ADD B A</code>, <code>3: STORE_A 13</code>, <code>4: JUMP 2</code>. An Adresse 14 und 15 steht jeweils eine <b>1</b>. Welchen Wert hat Register A, nachdem <code>ADD B A</code> zum <b>dritten</b> Mal ausgeführt wurde?",
        answer: ["4"],
        explain: "A = 1, B = 1. 1. ADD: A = 2, 2. ADD: A = 3, 3. ADD: A = 4. Bei jedem Durchlauf kommt 1 dazu, das Programm zählt also hoch."
      },
      {
        type: "single",
        noMix: true,
        q: "Warum erreicht das Programm aus der vorigen Frage niemals ein HALT?",
        options: [
          "Der unbedingte JUMP 2 wird jedes Mal ausgeführt. Es entsteht eine Endlosschleife.",
          "Weil Register A zu groß wird.",
          "Weil STORE_A das HALT überschreibt.",
          "Weil die CPU zu langsam ist."
        ],
        answer: 0,
        explain: "Um eine Schleife verlassen zu können, braucht man einen <b>bedingten Sprung</b> wie JUMP_NEGATIVE, JUMP_IF_EQUAL oder JUMP_IF_GREATER."
      },
      {
        type: "number",
        q: "Programm: <code>0: LOAD_A 14</code>, <code>1: LOAD_B 15</code>, <code>2: SUB B A</code>, <code>3: JUMP_NEG 5</code>, <code>4: JUMP 2</code>, <code>5: ADD B A</code>, <code>6: STORE_A 13</code>, <code>7: HALT</code>. An Adresse 14 steht <b>11</b>, an Adresse 15 steht <b>5</b>. Welcher Wert steht am Ende an Adresse 13?",
        answer: ["1"],
        explain: "11 − 5 = 6 → 6 − 5 = 1 → 1 − 5 = −4 (Negative-Flag gesetzt, Sprung zu 5) → −4 + 5 = <b>1</b> wird an Adresse 13 gespeichert."
      },
      {
        type: "number",
        noMix: true,
        q: "Das Programm aus der vorigen Frage ist 8 Befehle lang (Adressen 0 bis 7). Wie viele Befehle führt die CPU insgesamt aus, bis sie bei HALT anhält? (HALT mitgezählt)",
        answer: ["13"],
        explain: "LOAD_A, LOAD_B (2) + 1. Runde SUB, JUMP_NEG, JUMP (3) + 2. Runde SUB, JUMP_NEG, JUMP (3) + 3. Runde SUB, JUMP_NEG (2) + ADD, STORE_A, HALT (3) = <b>13</b>. Die Schleife wurde zweimal vollständig durchlaufen."
      },
      {
        type: "single",
        noMix: true,
        q: "Was berechnet dieses Programm?",
        options: [
          "Den Rest der Division 11 : 5",
          "Das Produkt 11 · 5",
          "Die Summe 11 + 5",
          "Die Differenz 11 − 5"
        ],
        answer: 0,
        explain: "11 : 5 = 2 Rest <b>1</b>. Die ALU kann gar nicht dividieren, erst die <b>Software</b> macht die Division möglich. Mit einem zusätzlichen Zähler könnte man auch das Ergebnis 2 (die Anzahl der Schleifendurchläufe) speichern."
      },
      {
        type: "number",
        q: "In der Beispiel-CPU ist der Opcode 4 Bit lang. Wie viele verschiedene Befehle kann diese CPU höchstens haben?",
        answer: ["16"],
        explain: "2⁴ = 16 Kombinationen, also höchstens 16 verschiedene Befehle."
      },
      {
        type: "single",
        q: "Warum kann die Beispiel-CPU <b>nicht</b> zu Adresse 17 springen?",
        options: [
          "Die Adresse steht in nur 4 Bit, und mit 4 Bit kann man höchstens die Zahl 15 darstellen.",
          "Weil Sprünge nur rückwärts erlaubt sind.",
          "Weil Adresse 17 für Daten reserviert ist.",
          "Weil 17 eine Primzahl ist."
        ],
        answer: 0,
        explain: "4 Bit reichen für 16 Adressen (0 bis 15). Deshalb verwenden echte CPUs längere Befehle oder variable Befehlslängen."
      },
      {
        type: "match",
        q: "Ordne zu.",
        pairs: [
          ["Längere Befehle (32 oder 64 Bit)", "Mehr Platz für Opcode und Adresse in jedem Befehl"],
          ["Variable Befehlslänge", "Die Adresse steht als Direktwert (immediate value) hinter dem Befehl"],
          ["Intel 4004 (1971)", "Erste CPU auf einem einzigen Chip, 46 Befehle"],
          ["Moderne CPU wie der Intel Core i7", "Tausende Befehle und Befehlsvarianten, 1 bis 15 Byte lang"]
        ],
        explain: "Die ersten beiden Zeilen sind die zwei Lösungsansätze aus dem Video. Bei variabler Befehlslänge weiß die CPU z. B. bei JUMP, dass sie die Zieladresse direkt hinter dem Befehl noch zusätzlich holen muss."
      }
    ]
  }
];
