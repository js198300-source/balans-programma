  import React, { useMemo, useState } from "react";
  import { motion } from "framer-motion";
  import { ShoppingCart, Clock, ShieldCheck, NotebookPen, Download, FileDown, Check, Timer, ChevronRight, BookOpen, Salad, Dumbbell, HeartPulse } from "lucide-react";
  import { Button } from "./components/ui/button.jsx";
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card.jsx";
  import { Input } from "./components/ui/input.jsx";
  import { Textarea } from "./components/ui/textarea.jsx";
  import { Label } from "./components/ui/label.jsx";
  import { Switch } from "./components/ui/switch.jsx";
  import { Badge } from "./components/ui/badge.jsx";

   const STRIPE_PAYMENT_LINK = "https://betaalverzoek.rabobank.nl/betaalverzoek/?id=iqwCbYDfRdGHGguxGU3srQ";

  const program = {
    title: "Meer Balans met Gezonde Voeding & Intermittent Fasting (18:6)",
    tagline: "Energie, focus en rust – zonder ingewikkelde regels.",
    price: "29,95",
    oldPrice: "79",
    currency: "€",
    images: {
      hero: "https://images.unsplash.com/photo-1514894780887-121968d00567?q=80&w=1600&auto=format&fit=crop",
      food: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
      movement: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
      calm: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    },
    whatsIncluded: [
      "Volledig 4-weeks programma",
      "Dagelijkse planning voor 18:6 vasten",
      "Weekmenu's + boodschappenlijsten",
      "10 snelle recepten",
      "Beweeg- en herstelschema (thuis zonder materiaal)",
      "Printbaar & digitaal invuldagboek"
    ],
  };

  const modules = [
    { id: 1, title: "Fundament: Balans & Bewustwording", notes: "Veiligheid: niet geschikt bij zwangerschap/borstvoeding, eetstoornissen, ongecontroleerde diabetes, of op advies arts/diëtist.", goals: ["In kaart brengen van werk-privé-zelfzorg","Intro tot 18:6 vasten: voordelen, veiligheid, opbouw","Stress-signalen herkennen + micro-herstelmomenten"], exercises: ["Balansscan (10-min vragenlijst)","12-uur vasten oefendag + reflectie","Ademhaling 4-6 (5 min) 2× per dag"] },
    { id: 2, title: "Voeding & 6-uurs Eetvenster", notes: "Focus op onbewerkte voeding, 30–40g eiwit per hoofdmaaltijd, 6–10 porties groente/fruit p/d.", goals: ["Eiwit- en vezelrijk eten voor verzadiging","Samenstellen van maaltijden binnen 6 uur","Slim snacken, suikerpieken vermijden"], exercises: ["Maak je persoonlijke 6-uurs menukaart","Kook 2 recepten uit de lijst","Voorraadkast-check (vervang ultra-bewerkte producten)"] },
    { id: 3, title: "Vasten in de Praktijk", notes: "Train nuchter? Licht bewegen kan. Kracht liefst aan begin eetvenster.", goals: ["Dagstructuur met werk/sport en vasten","Honger vs. gewoonte herkennen","Drinken tijdens vasten (water, thee, zwarte koffie)"], exercises: ["3 dagen 18:6 met dagboek","Koffie/zoetdrang strategie","Vasten-buddy: korte check-in per dag"] },
    { id: 4, title: "Duurzame Leefstijl: Slaap, Beweging, Mindset", notes: "Flexibiliteit: sociale events mogen – pak ritme de volgende dag op.", goals: ["Slaap 7–9 uur, ritme en avondroutine","2–3× p/w kracht, dagelijks 7–10k stappen","Mindset: journaling, dankbaarheid, grenzen stellen"], exercises: ["Slaaphygiëne-checklist","3× dankbaarheidsjournal per week","Weekplanning met blokken voor rust en sport"] },
  ];

  const weekPlan = [
    { week: 1, focus: "Opbouw & gewenning", fasting: "14–16 uur vasten → enkele dagen 18:6", actions: ["Balansscan invullen","2 recepten koken","Dagelijks 20–30 min wandelen"] },
    { week: 2, focus: "Volledig 18:6 + eiwitrijk eten", fasting: "18 uur vasten, eetvenster 12:00–18:00", actions: ["3× lichte krachttraining (20–30 min)","Min. 6 porties groente/fruit per dag","Mindset: 5 min adem/meditatie"] },
    { week: 3, focus: "Finetunen & honger-management", fasting: "18:6 stabiel, timing rond training", actions: ["Eet bewust: langzaam, 80% vol","Vaste slaaptijden + schermvrij 60 min","Dagboek evaluatie midden-week"] },
    { week: 4, focus: "Duurzaam maken & sociale balans", fasting: "18:6 met 1 flexdag indien gewenst", actions: ["Plan volgende 4 weken","Check-in met buddy/coach","Reflectie en successen vieren"] },
  ];

  const menus = {
    window: "12:00–18:00 (voorbeeld)",
    meals: [
      { time: "12:00", title: "Maaltijd 1 (start)", ideas: ["Groente-omelet + volkoren wrap + salade","Griekse yoghurt, bessen, noten, zaden","Salade bowl: kip/tempeh, quinoa, veel groente"] },
      { time: "15:00", title: "Tussendoor", ideas: ["Handje noten + stuk fruit","Hüttenkäse met komkommer en tomaat","Volkoren crackers met hummus"] },
      { time: "17:30", title: "Maaltijd 2 (licht diner)", ideas: ["Zalm of linzen + geroosterde groenten + aardappel","Kip uit de oven + couscous + salade","Tofu roerbak + zilvervliesrijst + paksoi"] },
    ],
  };

  const recipes = [
    { name: "Groene Proteïne-omelet", time: "10 min", kcal: 420, steps: ["Klop 3 eieren met peper/zout","Bak met spinazie, doperwten en ui","Serveer met volkoren wrap en salsa"] },
    { name: "Kip Quinoa Powerbowl", time: "25 min", kcal: 550, steps: ["Kook quinoa, bak kipfilet","Voeg paprika, komkommer, rucola toe","Dressing: olijfolie + citroen + mosterd"] },
    { name: "Tofu Roerbak", time: "20 min", kcal: 480, steps: ["Pers tofu, bak goudbruin","Roerbak paksoi, paprika, knoflook, gember","Saus: sojasaus + limoen + sesam"] },
    { name: "Zalm & Geroosterde Groenten", time: "30 min", kcal: 520, steps: ["Oven 200°C, groenten roosteren 20 min","Zalm 10–12 min meebakken","Afmaken met citroen en dille"] },
    { name: "Linzenstoof", time: "35 min", kcal: 500, steps: ["Fruit ui/knoflook, voeg wortel/selderij toe","Kruiden en tomatenblokjes + linzen toevoegen","Sudderen tot zacht, serveren met rijst"] },
  ];

  const groceries = [
    "Eieren, kip, zalm, tofu, linzen",
    "Griekse yoghurt, hüttenkäse",
    "Volkoren wraps, quinoa, zilvervliesrijst, couscous",
    "Spinazie, paksoi, paprika, komkommer, tomaat, ui, knoflook",
    "Aardappel/zoete aardappel",
    "Bessen, appels, citroen",
    "Olijfolie, noten, zaden, hummus",
    "Kruiden: peper, zout, gember, dille, mosterd, sojasaus",
  ];

  const movement = [
    { day: "Ma", plan: "Wandelen 30–45 min + core 10 min" },
    { day: "Di", plan: "Kracht (hele lichaam) 25 min – aan begin eetvenster" },
    { day: "Wo", plan: "Wandelen 30 min + mobiliteit 10 min" },
    { day: "Do", plan: "Kracht 25–30 min" },
    { day: "Vr", plan: "Stappen 8–10k, rustig tempo" },
    { day: "Za", plan: "Optioneel sportmoment (fietsen/zwemmen)" },
    { day: "Zo", plan: "Herstel: rekken + 20 min natuurwandeling" },
  ];

  const weekMenus = [
    { week: 1, theme: "Start met Simpel & Vers", days: [
      { d: "Ma", m1: "Yoghurt + bessen + zaden", m2: "Kipfilet, gegrilde groente, quinoa", snack: "Appel + noten" },
      { d: "Di", m1: "Groene omelet + salade", m2: "Zalm uit de oven + broccoli + aardappel", snack: "Peer" },
      { d: "Wo", m1: "Salade bowl kip + avocado", m2: "Kabeljauw + wortel/boon roerbak", snack: "Banaan" },
      { d: "Do", m1: "Hüttenkäse + komkommer + tomaat", m2: "Kip wraps + paprika + sla", snack: "Druiven" },
      { d: "Vr", m1: "Tonijnsalade + volkoren crackers", m2: "Zalm-bowl + paksoi + rijst", snack: "Kiwi" },
      { d: "Za", m1: "Omelet + champignons + spinazie", m2: "Kip uit oven + groente traybake", snack: "Bessen" },
      { d: "Zo", m1: "Yoghurt + fruit salade", m2: "Vissoep met veel groente", snack: "Sinaasappel" },
    ]},
    { week: 2, theme: "Meer Variatie", days: [
      { d: "Ma", m1: "Smoothiebowl (spinazie+bessen)", m2: "Kip quinoa bowl + groente", snack: "Appel" },
      { d: "Di", m1: "Salade met makreel + bonen", m2: "Zalm + zoete aardappel + courgette", snack: "Mandarijn" },
      { d: "Wo", m1: "Omelet + tomaat + feta", m2: "Kip saté (mager) + komkommer", snack: "Aardbeien" },
      { d: "Do", m1: "Yoghurt + kiwi + walnoten", m2: "Kabeljauw + bloemkoolrijst", snack: "Peer" },
      { d: "Vr", m1: "Tonijn + avocado salade", m2: "Zalm teriyaki + paksoi", snack: "Banaan" },
      { d: "Za", m1: "Hüttenkäse bowl + fruit", m2: "Kip fajita bowl + paprika", snack: "Druiven" },
      { d: "Zo", m1: "Eiersalade + volkoren toast", m2: "Visstoof met tomaat & olijven", snack: "Bessen" },
    ]},
    { week: 3, theme: "Licht & Fris", days: [
      { d: "Ma", m1: "Yoghurt + frambozen + chia", m2: "Kip caprese salade", snack: "Appel" },
      { d: "Di", m1: "Groente omelet + pesto", m2: "Zalm + citroen + asperges", snack: "Sinaasappel" },
      { d: "Wo", m1: "Kip Caesar (light)", m2: "Kabeljauw + tomatensalsa", snack: "Aardbeien" },
      { d: "Do", m1: "Skyr + blauwe bessen", m2: "Kip curry (licht) + bloemkool", snack: "Peer" },
      { d: "Vr", m1: "Tonijn niçoise (snelle versie)", m2: "Zalm bowl + komkommer + rijst", snack: "Kiwi" },
      { d: "Za", m1: "Omelet rol met groente", m2: "Kip uit oven + mediterrane groente", snack: "Bessen" },
      { d: "Zo", m1: "Hüttenkäse + fruitmix", m2: "Vispakketjes (courgette/paprika)", snack: "Mandarijn" },
    ]},
    { week: 4, theme: "Duurzaam & Praktisch", days: [
      { d: "Ma", m1: "Skyr + appel + kaneel", m2: "Kip bowl + bonen + maïs", snack: "Druiven" },
      { d: "Di", m1: "Salade met zalm + avocado", m2: "Kabeljauw + spinazie + aardappel", snack: "Banaan" },
      { d: "Wo", m1: "Omelet + groente restjes", m2: "Kip wraps + koolsalade", snack: "Appel" },
      { d: "Do", m1: "Yoghurt + perzik + noten", m2: "Zalmfilet + groene groente mix", snack: "Kiwi" },
      { d: "Vr", m1: "Tonijnsalade + volkoren toast", m2: "Kip traybake + wortel/paprika", snack: "Bessen" },
      { d: "Za", m1: "Hüttenkäse + ananas", m2: "Vis taco bowl (licht)", snack: "Mandarijn" },
      { d: "Zo", m1: "Smoothiebowl", m2: "Mediterrane visschotel + salade", snack: "Peer" },
    ]},
  ];

  function Section({ children, className = "" }) {
    return <section className={`container ${className}`}>{children}</section>;
  }

  function Hero() {
    return (
      <div className="relative overflow-hidden">
        <img src={program.images.hero} alt="Gezonde leefstijl" className="absolute inset-0 w-full h-full object-cover opacity-30"/>
        <div className="relative bg-gradient-to-br from-emerald-50/70 via-white/80 to-sky-50/70">
          <Section className="py-16 sm:py-24">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <Badge className="mb-4 text-sm px-3 py-1" variant="secondary">Nieuw: 4-weeks balansprogramma</Badge>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{program.title}</h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">{program.tagline} – met een helder 18:6 schema, weekmenu's, beweegplan en een praktisch invuldagboek.</p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <a href="#kopen"><Button size="lg" className="rounded-2xl"><ShoppingCart className="w-5 h-5 mr-2"/>Koop nu – {program.currency}<span className="line-through text-gray-400 mr-2 ml-1">{program.oldPrice}</span><span className="text-green-700 font-bold">{program.price}</span></Button></a>
                <a href="#programma"><Button size="lg" variant="outline" className="rounded-2xl"><BookOpen className="w-5 h-5 mr-2"/>Bekijk programma</Button></a>
              </div>
              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2"><Clock className="w-4 h-4"/> Direct toegang</div>
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> Voorwaarden van toepassing</div>
              </div>
            </motion.div>
          </Section>
        </div>
      </div>
    );
  }

  function FeatureImageRow() {
    return (
      <Section className="py-10">
        <div className="grid md:grid-cols-3 gap-6">
          <img src={program.images.food} alt="Gezonde voeding" className="rounded-2xl shadow"/>
          <img src={program.images.movement} alt="Beweging" className="rounded-2xl shadow"/>
          <img src={program.images.calm} alt="Ontspanning" className="rounded-2xl shadow"/>
        </div>
      </Section>
    );
  }

  function FeatureGrid() {
    const features = [
      { icon: Timer, title: "18:6 Vasten", desc: "Eenvoudig ritme voor focus en vetverbranding." },
      { icon: Salad, title: "Gezonde Voeding", desc: "Eiwit, vezels en volwaardige producten." },
      { icon: Dumbbell, title: "Beweegplan", desc: "Korte, effectieve sessies + dagelijkse stappen." },
      { icon: HeartPulse, title: "Herstel & Slaap", desc: "Ritme, avondroutine en mentale rust." },
    ];
    return (
      <Section className="py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <Card className="rounded-2xl" key={i}>
              <CardHeader>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-2">
                  <f.icon className="w-6 h-6"/>
                </div>
                <CardTitle>{f.title}</CardTitle>
                <CardDescription>{f.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>
    );
  }

  function ProgramSection() {
    return (
      <Section className="py-16" id="programma">
        <h2 className="text-3xl font-bold mb-6">Programma-overzicht</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          {modules.map((m) => (
            <Card className="rounded-2xl" key={m.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ChevronRight className="w-5 h-5"/>{m.title}</CardTitle>
                <CardDescription>{m.notes}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-3">
                  <h4 className="font-semibold mb-2">Doelen</h4>
                  <ul className="space-y-1 list-disc pl-5">
                    {m.goals.map((g, i) => (<li key={i}>{g}</li>))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Oefeningen</h4>
                  <ul className="space-y-1 list-disc pl-5">
                    {m.exercises.map((e, i) => (<li key={i}>{e}</li>))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    );
  }

  function WeekPlan() {
    return (
      <Section className="py-12">
        <h3 className="text-2xl font-bold mb-4">4-weeks Plan</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {weekPlan.map((w) => (
            <Card className="rounded-2xl" key={w.week}>
              <CardHeader>
                <CardTitle>Week {w.week}: {w.focus}</CardTitle>
                <CardDescription>Vasten: {w.fasting}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  {w.actions.map((a, i) => (<li key={i}>{a}</li>))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    );
  }

  function MenuSection() {
    return (
      <Section className="py-12">
        <h3 className="text-2xl font-bold mb-2">Voorbeeld eetvenster: {menus.window}</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {menus.meals.map((m, i) => (
            <Card className="rounded-2xl" key={i}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock className="w-4 h-4"/>{m.time} – {m.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  {m.ideas.map((idea, idx) => (<li key={idx}>{idea}</li>))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    );
  }

  function Recipes() {
    return (
      <Section className="py-12">
        <h3 className="text-2xl font-bold mb-4">Snelle Recepten</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((r, i) => (
            <Card className="rounded-2xl" key={i}>
              <CardHeader>
                <CardTitle>{r.name}</CardTitle>
                <CardDescription>{r.time} • ~{r.kcal} kcal</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-1">
                  {r.steps.map((s, idx) => (<li key={idx}>{s}</li>))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    );
  }

  function Groceries() {
    return (
      <Section className="py-12">
        <h3 className="text-2xl font-bold mb-2">Boodschappenlijst (basis)</h3>
        <Card className="rounded-2xl">
          <CardContent className="pt-6">
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 list-disc pl-5">
              {groceries.map((g, i) => (<li key={i}>{g}</li>))}
            </ul>
          </CardContent>
        </Card>
      </Section>
    );
  }

  function Movement() {
    return (
      <Section className="py-12">
        <h3 className="text-2xl font-bold mb-2">Beweeg- & Herstelschema</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movement.map((d, i) => (
            <Card className="rounded-2xl" key={i}>
              <CardHeader><CardTitle>{d.day}</CardTitle></CardHeader>
              <CardContent><p>{d.plan}</p></CardContent>
            </Card>
          ))}
        </div>
      </Section>
    );
  }

  function WeekMenus() {
    return (
      <Section className="py-16" id="weekmenus">
        <h3 className="text-2xl font-bold mb-4">Weekmenu's (groente • kip • vis • fruit)</h3>
        <div className="space-y-6">
          {weekMenus.map((w) => (
            <Card className="rounded-2xl" key={w.week}>
              <CardHeader>
                <CardTitle>Week {w.week} — {w.theme}</CardTitle>
                <CardDescription>Alle opties passen binnen een 6-uurs eetvenster. Varieer naar smaak.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {w.days.map((d, i) => (
                    <div key={i} className="border rounded-xl p-3">
                      <div className="font-semibold mb-2">{d.d}</div>
                      <ul className="text-sm space-y-1">
                        <li><span className="font-medium">Maaltijd 1:</span> {d.m1}</li>
                        <li><span className="font-medium">Tussendoor:</span> {d.snack}</li>
                        <li><span className="font-medium">Maaltijd 2:</span> {d.m2}</li>
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    );
  }

  function Diary() {
    const [date, setDate] = useState("");
    const [sleep, setSleep] = useState("");
    const [fastStart, setFastStart] = useState("18:00");
    const [fastEnd, setFastEnd] = useState("12:00");
    const [firstMeal, setFirstMeal] = useState("");
    const [secondMeal, setSecondMeal] = useState("");
    const [snack, setSnack] = useState("");
    const [water, setWater] = useState("");
    const [mood, setMood] = useState("");
    const [energy, setEnergy] = useState("");
    const [steps, setSteps] = useState("");
    const [notes, setNotes] = useState("");

    const csv = useMemo(() => {
      const headers = ["Datum","Slaap(uur)","Vasten start","Vasten eind","Maaltijd 1","Tussendoor","Maaltijd 2","Water(L)","Stemming(1-10)","Energie(1-10)","Stappen","Notities"];
      const row = [date,sleep,fastStart,fastEnd,firstMeal,snack,secondMeal,water,mood,energy,steps,notes].map((x) => `"${(x||"").replaceAll('"','\"')}"`).join(",");
      return `${headers.join(",")}
${row}`;
    }, [date, sleep, fastStart, fastEnd, firstMeal, snack, secondMeal, water, mood, energy, steps, notes]);

    const downloadCSV = () => {
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `dagboek_${date || "vandaag"}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    };

    return (
      <Section className="py-16" id="dagboek">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><NotebookPen className="w-5 h-5"/> Invul Dagboek (printbaar & download .csv)</h3>
        <Card className="rounded-2xl">
          <CardContent className="pt-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <Label>Datum</Label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Vasten start</Label>
                  <Input type="time" value={fastStart} onChange={(e) => setFastStart(e.target.value)} />
                </div>
                <div>
                  <Label>Vasten eind</Label>
                  <Input type="time" value={fastEnd} onChange={(e) => setFastEnd(e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Slaap (uren)</Label>
                <Input placeholder="bv. 7.5" value={sleep} onChange={(e) => setSleep(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Stemming (1–10)</Label>
                  <Input value={mood} onChange={(e) => setMood(e.target.value)} />
                </div>
                <div>
                  <Label>Energie (1–10)</Label>
                  <Input value={energy} onChange={(e) => setEnergy(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <Label>Maaltijd 1</Label>
                <Textarea rows={2} value={firstMeal} onChange={(e) => setFirstMeal(e.target.value)} placeholder="Wat at je? Hoeveel eiwit/vezels?" />
              </div>
              <div>
                <Label>Tussendoor</Label>
                <Textarea rows={2} value={snack} onChange={(e) => setSnack(e.target.value)} placeholder="Snack(s), timing, effect op honger" />
              </div>
              <div>
                <Label>Maaltijd 2</Label>
                <Textarea rows={2} value={secondMeal} onChange={(e) => setSecondMeal(e.target.value)} placeholder="Licht diner, groente + eiwit + gezonde vetten" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label>Water (L)</Label>
                  <Input value={water} onChange={(e) => setWater(e.target.value)} />
                </div>
                <div>
                  <Label>Stappen</Label>
                  <Input value={steps} onChange={(e) => setSteps(e.target.value)} />
                </div>
                <div className="flex items-end">
                  <Button className="w-full" variant="outline" onClick={() => window.print()}><FileDown className="w-4 h-4 mr-2"/>Print/PDF</Button>
                </div>
              </div>
              <div>
                <Label>Notities</Label>
                <Textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Honger-schaal, triggers, successen" />
              </div>
              <div className="flex gap-3">
                <Button onClick={downloadCSV}><Download className="w-4 h-4 mr-2"/>Download dagboek (.csv)</Button>
                <Button variant="secondary" onClick={() => { setDate(""); setSleep(""); setFastStart("18:00"); setFastEnd("12:00"); setFirstMeal(""); setSecondMeal(""); setSnack(""); setWater(""); setMood(""); setEnergy(""); setSteps(""); setNotes(""); }}>Reset</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>
    );
  }

  function Kopen() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [tos, setTos] = useState(false);

    const handleCheckout = () => {
      if (!email || !name || !tos) {
        alert("Vul je naam, e-mail in en accepteer de voorwaarden en disclaimer.");
        return;
      }
      window.location.href = STRIPE_PAYMENT_LINK;
    };

    return (
      <Section className="py-16" id="kopen">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Card className="rounded-2xl order-2 lg:order-1">
            <CardHeader>
              <CardTitle>Wat je krijgt</CardTitle>
              <CardDescription>Directe toegang tot alle modules en downloads.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {program.whatsIncluded.map((x, i) => (<li key={i} className="flex gap-2 items-start"><Check className="w-5 h-5 mt-0.5"/> {x}</li>))}
              </ul>
            </CardContent>
          </Card>
          <Card className="rounded-2xl order-1 lg:order-2">
            <CardHeader>
              <CardTitle className="text-2xl">Koop het programma</CardTitle>
              <CardDescription className="text-lg">
                <span className="line-through text-gray-400 mr-2">{program.currency}{program.oldPrice}</span>
                <span className="text-green-600 font-bold">{program.currency}{program.price}</span> — eenmalige betaling
                <span className="ml-2 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">Actie</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Naam</Label>
                <Input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Voor- en achternaam"/>
              </div>
              <div>
                <Label>E-mail</Label>
                <Input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="jij@voorbeeld.nl"/>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={tos} onCheckedChange={setTos}/>
                <span className="text-sm text-slate-600">Ik heb de <a href="#voorwaarden" className="underline">voorwaarden & disclaimer</a> gelezen en ga hiermee akkoord.</span>
              </div>
              <Button className="w-full rounded-2xl" size="lg" onClick={handleCheckout}><ShoppingCart className="w-5 h-5 mr-2"/>Afrekenen</Button>
              <p className="text-xs text-slate-500">Vervang de betaallink in de code door jouw echte Stripe/PayPal link.</p>
            </CardContent>
          </Card>
        </div>
      </Section>
    );
  }

  function Legal() {
    const year = new Date().getFullYear();
    return (
      <Section className="py-16" id="voorwaarden">
        <h3 className="text-2xl font-bold mb-4">Voorwaarden & Disclaimer</h3>
        <Card className="rounded-2xl">
          <CardContent className="pt-6 space-y-4 text-sm text-slate-600">
            <p>Deelname aan dit programma is volledig <strong>vrijwillig</strong> en op eigen verantwoordelijkheid. Het volgen van dit programma is nooit verplicht en kan op elk moment worden gestopt.</p>
            <p>Dit programma biedt uitsluitend <strong>educatieve en informatieve inhoud</strong>. Het is nadrukkelijk <strong>geen medisch advies</strong> en vervangt geen consult bij een arts, diëtist of andere zorgprofessional.</p>
            <p>De auteur en aanbieder van dit programma (© {year} Jeffrey van Soeren) is <strong>niet aansprakelijk</strong> voor eventuele gevolgen, klachten, schade of letsel voortvloeiend uit het volgen van dit programma.</p>
            <p>Raadpleeg altijd je (huis)arts of specialist vóórdat je veranderingen aanbrengt in je voedingspatroon, leefstijl of trainingsroutine, zeker bij bestaande medische aandoeningen of het gebruik van medicatie.</p>
            <p>Door deelname aan dit programma ga je akkoord met deze voorwaarden en erken je dat het gebruik volledig op <strong>eigen risico</strong> plaatsvindt.</p>
            <p>© {year} Jeffrey van Soeren. Alle content, tekst, lay-out en downloads vallen onder het auteursrecht. Gebruik zonder schriftelijke toestemming is niet toegestaan.</p>
          </CardContent>
        </Card>
      </Section>
    );
  }

  function Footer() {
    const year = new Date().getFullYear();
    return (
      <footer className="border-t">
        <Section className="py-8 text-sm text-slate-600 flex flex-col sm:flex-row gap-3 justify-between">
          <div>© {year} Jeffrey van Soeren. Alle rechten voorbehouden.</div>
          <div className="flex gap-4">
            <a href="#weekmenus" className="underline">Weekmenu's</a>
            <a href="#voorwaarden" className="underline">Voorwaarden</a>
            <a href="#kopen" className="underline">Kopen</a>
          </div>
        </Section>
      </footer>
    );
  }

  export default function App() {
    return (
      <div className="font-sans">
        <Hero/>
        <FeatureImageRow/>
        <FeatureGrid/>
        <ProgramSection/>
        <WeekPlan/>
        <MenuSection/>
        <WeekMenus/>
        <Recipes/>
        <Groceries/>
        <Movement/>
        <Diary/>
        <Kopen/>
        <Legal/>
        <Footer/>
      </div>
    );
  }
