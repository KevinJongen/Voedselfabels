import { GroundingSource } from "../types";

// Static database of myths and sources (Simulated 'Internet')
// Updated with verified, authoritative sources (Voedingscentrum, Thuisarts, Milieu Centraal, etc.)
const STATIC_RESEARCH_DATA: Record<string, { summary: string; sources: GroundingSource[] }> = {
  'Van light-frisdrank word je dik': {
    summary: "Veel mensen denken dat light-frisdrank dik maakt omdat de zoetstoffen je lichaam voor de gek zouden houden en je meer honger krijgt. Wetenschappers hebben hier echter geen overtuigend bewijs voor gevonden. Omdat light-frisdrank geen suiker en nauwelijks calorieën bevat, is het een betere keuze voor je gewicht dan gewone frisdrank. Water blijft natuurlijk de allerbeste keuze.",
    sources: [
      { title: "Voedingscentrum: Is light-frisdrank slecht?", url: "https://www.voedingscentrum.nl/nl/service/vraag-en-antwoord/gezonde-voeding-en-voedingsstoffen/is-light-frisdrank-slecht-voor-je.aspx", snippet: "Expert informatie over zoetstoffen en veiligheid." },
      { title: "Diabetes Fonds: Alles over zoetstoffen", url: "https://www.diabetesfonds.nl/over-diabetes/eten-met-diabetes/koolhydraten-en-suiker/zoetstoffen", snippet: "Uitleg over invloed op bloedsuiker en gewicht." },
      { title: "KWF Kankerbestrijding: Aspartaam en gezondheid", url: "https://www.kwf.nl/kanker-voorkomen/voeding/aspartaam", snippet: "Onafhankelijke informatie over veiligheid van zoetstoffen." },
      { title: "Consumentenbond: Feiten en fabels over light", url: "https://www.consumentenbond.nl/gezond-eten/zoetstoffen", snippet: "Onafhankelijke test en informatie over E-nummers." }
    ]
  },
  'Een detox-kuur reinigt je lichaam': {
    summary: "Detox-kuren (ontgiften) met sapjes of thee zijn enorm populair op social media. Het idee is dat je lichaam vol afvalstoffen zit die je moet wegspoelen. De medische wetenschap zegt echter dat dit onzin is: je lever en nieren zijn de beste 'detox-machines' die er bestaan. Ze werken 24/7 om je lichaam schoon te houden. Dure sapkuren zijn daarvoor niet nodig.",
    sources: [
      { title: "Maag Lever Darm Stichting: Werkt een detox?", url: "https://www.mlds.nl/nieuws/waarom-een-detox-dieet-volstrekt-onnodig-is/", snippet: "Experts over de werking van de lever." },
      { title: "Voedingscentrum: Bestaan afvalstoffen?", url: "https://www.voedingscentrum.nl/encyclopedie/afvalstoffen-in-het-lichaam.aspx", snippet: "Uitleg over hoe je lichaam zichzelf reinigt." },
      { title: "NPO Kennis: Waarom een detox-kuur niet werkt", url: "https://npokennis.nl/longread/7636/waarom-een-detox-kuur-niet-werkt", snippet: "Duidelijke uitlegvideo en artikel." },
      { title: "Radar (Avrotros): De zin en onzin van detoxen", url: "https://radar.avrotros.nl/artikel/de-zin-en-onzin-van-detoxen-51120", snippet: "Kritische blik op dure sapkuren." }
    ]
  },
  'Na 8 uur \'s avonds eten is ongezond': {
    summary: "Je hoort vaak dat je na 20:00 uur niet meer mag eten omdat het direct in vet wordt omgezet. Dit is een fabel. Je spijsvertering stopt niet als de klok 8 uur slaat. Wat wel telt, is wát je eet en hoeveel je over de hele dag binnenkrijgt. Het probleem is vaak dat avondsnacks (chips, chocola) ongezonder zijn dan maaltijden overdag.",
    sources: [
      { title: "Voedingscentrum: Word je dik van laat eten?", url: "https://www.voedingscentrum.nl/nl/service/vraag-en-antwoord/afvallen-en-gewicht/word-je-dik-als-je-s-avonds-laat-nog-eet.aspx", snippet: "Feiten over stofwisseling in de avond." },
      { title: "Gezondheidsnet: De biologische klok en eten", url: "https://www.gezondheidsnet.nl/overgewicht-en-afvallen/dik-door-eten-na-acht-uur", snippet: "Artikel over eetritme." },
      { title: "Consumentenbond: 10 Fabels over afvallen", url: "https://www.consumentenbond.nl/dieet/10-fabels-over-afvallen", snippet: "Factcheck over eettijden." },
      { title: "AD.nl (Checkt): 's Avonds eten maakt dik?", url: "https://www.ad.nl/koken-en-eten/checkt-van-s-avonds-eten-word-je-dik~a6435986/", snippet: "Nieuwsartikel met experts aan het woord." }
    ]
  },
  'Van chocolade krijg je puistjes': {
    summary: "Veel jongeren denken dat elke reep chocola zorgt voor een uitbraak van puistjes (acne). Wetenschappelijk is dit verband nooit hard aangetoond voor cacao. Wel kan voeding met veel snelle suikers en zuivel bij sommige mensen acne verergeren. Het ligt dus waarschijnlijk meer aan de suiker in de reep dan aan de chocola zelf.",
    sources: [
      { title: "Thuisarts.nl: Ik heb last van puistjes (acne)", url: "https://www.thuisarts.nl/acne/ik-heb-last-van-puistjes-acne", snippet: "Hét medische advies van huisartsen." },
      { title: "Huidfonds: Invloed van voeding op de huid", url: "https://huidfonds.nl/huid-en-voeding/", snippet: "Informatie van de huidstichting." },
      { title: "Radboud UMC: Fabels over acne", url: "https://www.radboudumc.nl/patientenzorg/aandoeningen/acne/fabels-over-acne", snippet: "Academisch ziekenhuis over huidziekten." },
      { title: "Quest: Krijg je puisten van chocolade?", url: "https://www.quest.nl/mens/gezondheid/a25667891/puistjes-chocolade/", snippet: "Wetenschapsmagazine zoekt het uit." }
    ]
  },
  'Vetten zijn altijd slecht voor je': {
    summary: "Vet heeft een slechte naam, maar je lichaam kan niet zonder. Vetten leveren energie en vitamines (A, D, E). Het is belangrijk om onderscheid te maken: verzadigde vetten (vaak in snacks en vet vlees) zijn minder goed, maar onverzadigde vetten (in noten, vette vis, avocado) zijn juist essentieel voor je hersenen en hart.",
    sources: [
      { title: "Voedingscentrum: Vetten, verzadigd en onverzadigd", url: "https://www.voedingscentrum.nl/encyclopedie/vetten.aspx", snippet: "De basiskennis over vet in voeding." },
      { title: "Hartstichting: Eet onverzadigd vet", url: "https://www.hartstichting.nl/gezond-leven/gezond-eten/vetten", snippet: "Informatie over vet en het hart." },
      { title: "Maag Lever Darm Stichting: Voeding en vet", url: "https://www.mlds.nl/gezonde-buik/voeding/vetten/", snippet: "Uitleg over vertering." },
      { title: "SchoolTV: Waarom hebben we vet nodig?", url: "https://schooltv.nl/video/waarom-hebben-we-vet-nodig-vet-is-een-brandstof/", snippet: "Duidelijke uitlegvideo." }
    ]
  },
  'Biologisch eten is altijd gezonder': {
    summary: "Biologisch eten is beter voor het milieu en dierenwelzijn, omdat er geen chemische bestrijdingsmiddelen worden gebruikt. Maar is het gezonder voor jou? Onderzoeken laten zien dat er qua vitamines nauwelijks verschil is tussen een biologische appel en een gewone appel. 'Biologisch' betekent dus vooral 'duurzaam', niet per se 'gezonder'.",
    sources: [
      { title: "Milieu Centraal: Is biologisch gezonder?", url: "https://www.milieucentraal.nl/eten-en-drinken/milieubewust-eten/biologisch/", snippet: "Alles over duurzaamheid en gezondheid." },
      { title: "Voedingscentrum: Biologisch", url: "https://www.voedingscentrum.nl/encyclopedie/biologisch.aspx", snippet: "Feiten over voedingswaarden en keurmerken." },
      { title: "WUR (Wageningen University): Feiten over bio", url: "https://www.wur.nl/nl/Dossiers/dossier/Biologische-landbouw-en-voeding.htm", snippet: "Wetenschappelijke dossiers." },
      { title: "Consumentenbond: Wat is biologisch?", url: "https://www.consumentenbond.nl/gezond-eten/biologisch-eten", snippet: "Consumenteninformatie." }
    ]
  }
};

export const searchMythTopic = async (topic: string): Promise<{ summary: string; sources: GroundingSource[] }> => {
  // Simulate network delay for a realistic 'loading' feel
  await new Promise(resolve => setTimeout(resolve, 800));

  const data = STATIC_RESEARCH_DATA[topic];
  
  if (data) {
    return data;
  }

  // Fallback if topic is not found
  return {
    summary: "Er is informatie beschikbaar over dit onderwerp, maar het systeem kon de specifieke fiche niet laden.",
    sources: []
  };
};