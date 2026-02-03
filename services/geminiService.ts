import { GroundingSource } from "../types";

// Static database of myths and sources (Simulated 'Internet')
// Updated with verified, authoritative sources (Voedingscentrum, Thuisarts, Milieu Centraal, etc.)
const STATIC_RESEARCH_DATA: Record<string, { summary: string; sources: GroundingSource[] }> = {
  'Van light-frisdrank word je dik': {
    summary: "Veel mensen denken dat light-frisdrank dik maakt omdat de zoetstoffen je lichaam voor de gek zouden houden en je meer honger krijgt. Wetenschappers hebben hier echter geen overtuigend bewijs voor gevonden. Omdat light-frisdrank geen suiker en nauwelijks calorieën bevat, is het een betere keuze voor je gewicht dan gewone frisdrank. Water blijft natuurlijk de allerbeste keuze.",
    sources: [
      { title: "Voedingscentrum: Zoetstoffen (Encyclopedie)", url: "https://www.voedingscentrum.nl/encyclopedie/zoetstoffen.aspx", snippet: "Alles over veiligheid en gebruik van zoetstoffen." },
      { title: "Diabetes Fonds: Zoetstoffen en diabetes", url: "https://www.diabetesfonds.nl/over-diabetes/eten-met-diabetes/koolhydraten-en-suiker/zoetstoffen", snippet: "Invloed van zoetstoffen op je bloedsuiker." },
      { title: "KWF: Aspartaam en kanker", url: "https://www.kwf.nl/kanker-voorkomen/voeding/aspartaam", snippet: "Is aspartaam veilig? Het KWF legt uit." },
      { title: "Consumentenbond: Feiten en fabels over light", url: "https://www.consumentenbond.nl/gezond-eten/zoetstoffen", snippet: "Onafhankelijke test en informatie." }
    ]
  },
  'Een detox-kuur reinigt je lichaam': {
    summary: "Detox-kuren (ontgiften) met sapjes of thee zijn enorm populair op social media. Het idee is dat je lichaam vol afvalstoffen zit die je moet wegspoelen. De medische wetenschap zegt echter dat dit onzin is: je lever en nieren zijn de beste 'detox-machines' die er bestaan. Ze werken 24/7 om je lichaam schoon te houden. Dure sapkuren zijn daarvoor niet nodig.",
    sources: [
      { title: "MLDS: Lever en detoxen", url: "https://www.mlds.nl/nieuws/waarom-een-detox-dieet-volstrekt-onnodig-is/", snippet: "Maag Lever Darm Stichting over detoxen." },
      { title: "Voedingscentrum: Afvalstoffen in het lichaam", url: "https://www.voedingscentrum.nl/encyclopedie/afvalstoffen-in-het-lichaam.aspx", snippet: "Hoe reinigt je lichaam zichzelf?" },
      { title: "NPO Kennis: Waarom een detox-kuur niet werkt", url: "https://npokennis.nl/longread/7636/waarom-een-detox-kuur-niet-werkt", snippet: "Video en uitleg over de zin en onzin." },
      { title: "Radar: De onzin van detoxen", url: "https://radar.avrotros.nl/artikel/de-zin-en-onzin-van-detoxen-51120", snippet: "Kritisch consumentenprogramma over sapkuren." }
    ]
  },
  'Na 8 uur \'s avonds eten is ongezond': {
    summary: "Je hoort vaak dat je na 20:00 uur niet meer mag eten omdat het direct in vet wordt omgezet. Dit is een fabel. Je spijsvertering stopt niet als de klok 8 uur slaat. Wat wel telt, is wát je eet en hoeveel je over de hele dag binnenkrijgt. Het probleem is vaak dat avondsnacks (chips, chocola) ongezonder zijn dan maaltijden overdag.",
    sources: [
      { title: "Voedingscentrum: Energiebalans", url: "https://www.voedingscentrum.nl/encyclopedie/energiebalans.aspx", snippet: "Hoe werkt aankomen en afvallen echt?" },
      { title: "Gezondheidsnet: De biologische klok", url: "https://www.gezondheidsnet.nl/overgewicht-en-afvallen/dik-door-eten-na-acht-uur", snippet: "Heeft het tijdstip invloed op je gewicht?" },
      { title: "Consumentenbond: 10 Fabels over afvallen", url: "https://www.consumentenbond.nl/dieet/10-fabels-over-afvallen", snippet: "Veelvoorkomende misverstanden gecheckt." },
      { title: "AD: 's Avonds eten maakt dik?", url: "https://www.ad.nl/koken-en-eten/checkt-van-s-avonds-eten-word-je-dik~a6435986/", snippet: "Factcheck in het nieuws." }
    ]
  },
  'Van chocolade krijg je puistjes': {
    summary: "Veel jongeren denken dat elke reep chocola zorgt voor een uitbraak van puistjes (acne). Wetenschappelijk is dit verband nooit hard aangetoond voor cacao. Wel kan voeding met veel snelle suikers en zuivel bij sommige mensen acne verergeren. Het ligt dus waarschijnlijk meer aan de suiker in de reep dan aan de chocola zelf.",
    sources: [
      { title: "Thuisarts.nl: Acne en voeding", url: "https://www.thuisarts.nl/acne/ik-heb-last-van-puistjes-acne", snippet: "Betrouwbaar medisch advies van huisartsen." },
      { title: "Huidfonds: Huid en voeding", url: "https://huidfonds.nl/huid-en-voeding/", snippet: "Wat zegt de huidstichting?" },
      { title: "Radboud UMC: Fabels over acne", url: "https://www.radboudumc.nl/patientenzorg/aandoeningen/acne/fabels-over-acne", snippet: "Informatie uit het ziekenhuis." },
      { title: "Quest: Puistjes en chocolade", url: "https://www.quest.nl/mens/gezondheid/a25667891/puistjes-chocolade/", snippet: "Wetenschappelijke kijk op puistjes." }
    ]
  },
  'Vetten zijn altijd slecht voor je': {
    summary: "Vet heeft een slechte naam, maar je lichaam kan niet zonder. Vetten leveren energie en vitamines (A, D, E). Het is belangrijk om onderscheid te maken: verzadigde vetten (vaak in snacks en vet vlees) zijn minder goed, maar onverzadigde vetten (in noten, vette vis, avocado) zijn juist essentieel voor je hersenen en hart.",
    sources: [
      { title: "Voedingscentrum: Vetten (Encyclopedie)", url: "https://www.voedingscentrum.nl/encyclopedie/vetten.aspx", snippet: "Alles over onverzadigd en verzadigd vet." },
      { title: "Hartstichting: Gezond eten met vetten", url: "https://www.hartstichting.nl/gezond-leven/gezond-eten/vetten", snippet: "Welke vetten zijn goed voor je hart?" },
      { title: "MLDS: Vetvertering", url: "https://www.mlds.nl/gezonde-buik/voeding/vetten/", snippet: "Hoe verteert je lichaam vet?" },
      { title: "SchoolTV: Vet als brandstof", url: "https://schooltv.nl/video/waarom-hebben-we-vet-nodig-vet-is-een-brandstof/", snippet: "Video uitleg voor scholieren." }
    ]
  },
  'Biologisch eten is altijd gezonder': {
    summary: "Biologisch eten is beter voor het milieu en dierenwelzijn, omdat er geen chemische bestrijdingsmiddelen worden gebruikt. Maar is het gezonder voor jou? Onderzoeken laten zien dat er qua vitamines nauwelijks verschil is tussen een biologische appel en een gewone appel. 'Biologisch' betekent dus vooral 'duurzaam', niet per se 'gezonder'.",
    sources: [
      { title: "Milieu Centraal: Biologisch eten", url: "https://www.milieucentraal.nl/eten-en-drinken/milieubewust-eten/biologisch/", snippet: "Duurzaamheid en gezondheid vergeleken." },
      { title: "Voedingscentrum: Biologisch (Encyclopedie)", url: "https://www.voedingscentrum.nl/encyclopedie/biologisch.aspx", snippet: "Wat betekent het keurmerk precies?" },
      { title: "WUR: Dossier Biologisch", url: "https://www.wur.nl/nl/Dossiers/dossier/Biologische-landbouw-en-voeding.htm", snippet: "Onderzoek van Wageningen University." },
      { title: "Consumentenbond: Wat is biologisch?", url: "https://www.consumentenbond.nl/gezond-eten/biologisch-eten", snippet: "Uitleg voor consumenten." }
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