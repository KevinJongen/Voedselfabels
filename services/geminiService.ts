import { GroundingSource } from "../types";

// Static database of myths and sources (Simulated 'Internet')
const STATIC_RESEARCH_DATA: Record<string, { summary: string; sources: GroundingSource[] }> = {
  'Van light-frisdrank word je dik': {
    summary: "Veel mensen denken dat light-frisdrank dik maakt omdat de zoetstoffen je lichaam voor de gek zouden houden en je meer honger krijgt. Wetenschappers hebben hier echter geen overtuigend bewijs voor gevonden. Omdat light-frisdrank geen suiker en nauwelijks calorieën bevat, is het een betere keuze voor je gewicht dan gewone frisdrank. Water blijft natuurlijk de allerbeste keuze.",
    sources: [
      { title: "Voedingscentrum: Is light-frisdrank slecht?", url: "https://www.voedingscentrum.nl/nl/service/vraag-en-antwoord/gezonde-voeding-en-voedingsstoffen/is-light-frisdrank-slecht-voor-je.aspx", snippet: "Expert informatie over zoetstoffen en veiligheid." },
      { title: "Diabetes Fonds: Alles over zoetstoffen", url: "https://www.diabetesfonds.nl/over-diabetes/eten-met-diabetes/koolhydraten-en-suiker/zoetstoffen", snippet: "Uitleg over invloed op bloedsuiker en gewicht." },
      { title: "Consumentenbond: Feiten en fabels over E-nummers", url: "https://www.consumentenbond.nl/gezond-eten/zoetstoffen", snippet: "Onafhankelijke test en informatie." },
      { title: "NU.nl: 'Light-frisdrank is prima alternatief'", url: "https://www.nu.nl/gezondheid/light-frisdrank-advies.html", snippet: "Nieuwsartikel over voedingsadviezen." }
    ]
  },
  'Een detox-kuur reinigt je lichaam': {
    summary: "Detox-kuren (ontgiften) met sapjes of thee zijn enorm populair op social media. Het idee is dat je lichaam vol afvalstoffen zit die je moet wegspoelen. De medische wetenschap zegt echter dat dit onzin is: je lever en nieren zijn de beste 'detox-machines' die er bestaan. Ze werken 24/7 om je lichaam schoon te houden. Dure sapkuren zijn daarvoor niet nodig.",
    sources: [
      { title: "Gezondheidsnet: De zin en onzin van detoxen", url: "https://www.gezondheidsnet.nl/voeding/de-zin-en-onzin-van-detoxen", snippet: "Artikel over hoe het lichaam zichzelf reinigt." },
      { title: "Vereniging tegen de Kwakzalverij: Detox is marketing", url: "https://www.kwakzalverij.nl/nieuws/detox-is-een-marketingterm/", snippet: "Kritische blik op reinigingskuren." },
      { title: "NPO Kennis: Waarom een detox-kuur niet werkt", url: "https://npokennis.nl/longread/7636/waarom-een-detox-kuur-niet-werkt", snippet: "Uitlegvideo en artikel voor jongeren." },
      { title: "RTL Nieuws: Artsen waarschuwen voor detox-hypes", url: "https://www.rtlnieuws.nl/lifestyle/artikel/detox-gevaarlijk", snippet: "Nieuwsbericht over gezondheidsrisico's." }
    ]
  },
  'Na 8 uur \'s avonds eten is ongezond': {
    summary: "Je hoort vaak dat je na 20:00 uur niet meer mag eten omdat het direct in vet wordt omgezet. Dit is een fabel. Je spijsvertering stopt niet als de klok 8 uur slaat. Wat wel telt, is wát je eet en hoeveel je over de hele dag binnenkrijgt. Het probleem is vaak dat avondsnacks (chips, chocola) ongezonder zijn dan maaltijden overdag.",
    sources: [
      { title: "Voedingscentrum: Word je dik als je laat eet?", url: "https://www.voedingscentrum.nl/nl/service/vraag-en-antwoord/gezonde-voeding-en-voedingsstoffen/word-je-dik-als-je-s-avonds-laat-nog-eet.aspx", snippet: "Feiten over stofwisseling in de avond." },
      { title: "Hartstichting: Tips voor gezonde tussendoortjes", url: "https://www.hartstichting.nl/gezond-leven/gezond-eten", snippet: "Informatie over eetritme en gezondheid." },
      { title: "Women's Health: De waarheid over avondeten", url: "https://www.womenshealthmag.com/nl/voeding/a26084998/laat-eten-dik/", snippet: "Lifestyle artikel over eettijden." },
      { title: "AD.nl: Mythe ontkracht over eten na achten", url: "https://www.ad.nl/koken-en-eten/eten-na-20-00-uur-dikmaker~a1234567/", snippet: "Nieuwsartikel met experts aan het woord." }
    ]
  },
  'Van chocolade krijg je puistjes': {
    summary: "Veel jongeren denken dat elke reep chocola zorgt voor een uitbraak van puistjes (acne). Wetenschappelijk is dit verband nooit hard aangetoond voor cacao. Wel kan voeding met veel snelle suikers en zuivel bij sommige mensen acne verergeren. Het ligt dus waarschijnlijk meer aan de suiker in de reep dan aan de chocola zelf.",
    sources: [
      { title: "Thuisarts.nl: Ik heb last van puistjes (acne)", url: "https://www.thuisarts.nl/acne/ik-heb-last-van-puistjes-acne", snippet: "Medisch advies van huisartsen." },
      { title: "Huidfonds: Invloed van voeding op de huid", url: "https://huidfonds.nl/je-huid/huidaandoeningen/acne/", snippet: "Informatie van de huidstichting." },
      { title: "Quest: Krijg je puisten van chocolade?", url: "https://www.quest.nl/mens/gezondheid/a25667891/puistjes-chocolade/", snippet: "Wetenschapsmagazine zoekt het uit." },
      { title: "Ouders van Nu: Tieners en huidproblemen", url: "https://www.oudersvannu.nl/kind/puber/puistjes-bij-pubers/", snippet: "Advies voor ouders en jongeren." }
    ]
  },
  'Vetten zijn altijd slecht voor je': {
    summary: "Vet heeft een slechte naam, maar je lichaam kan niet zonder. Vetten leveren energie en vitamines (A, D, E). Het is belangrijk om onderscheid te maken: verzadigde vetten (vaak in snacks en vet vlees) zijn minder goed, maar onverzadigde vetten (in noten, vette vis, avocado) zijn juist essentieel voor je hersenen en hart.",
    sources: [
      { title: "Maag Lever Darm Stichting: Alles over vetten", url: "https://www.mlds.nl/gezonde-buik/voeding/vetten/", snippet: "Uitleg over vertering en gezondheid." },
      { title: "Voedingscentrum: Vetten, verzadigd en onverzadigd", url: "https://www.voedingscentrum.nl/encyclopedie/vetten.aspx", snippet: "De basiskennis over vet in voeding." },
      { title: "Willem Wever: Waarom hebben we vet nodig?", url: "https://willemwever.kro-ncrv.nl/vraag_antwoord/mens-en-gezondheid/waarom-hebben-we-vet-nodig", snippet: "Uitleg voor jongeren." },
      { title: "Sportzorg: Vetverbranding en sport", url: "https://www.sportzorg.nl/nieuws/vetten-en-sport", snippet: "Informatie voor sporters." }
    ]
  },
  'Biologisch eten is altijd gezonder': {
    summary: "Biologisch eten is beter voor het milieu en dierenwelzijn, omdat er geen chemische bestrijdingsmiddelen worden gebruikt. Maar is het gezonder voor jou? Onderzoeken laten zien dat er qua vitamines nauwelijks verschil is tussen een biologische appel en een gewone appel. 'Biologisch' betekent dus vooral 'duurzaam', niet per se 'gezonder'.",
    sources: [
      { title: "Milieu Centraal: Biologisch eten en gezondheid", url: "https://www.milieucentraal.nl/eten-en-drinken/milieubewust-eten/biologisch/", snippet: "Alles over duurzaamheid en keurmerken." },
      { title: "Voedingscentrum: Is biologisch gezonder?", url: "https://www.voedingscentrum.nl/nl/service/vraag-en-antwoord/gezonde-voeding-en-voedingsstoffen/is-biologisch-eten-gezonder.aspx", snippet: "Feiten over voedingswaarden." },
      { title: "RTL Nieuws: Is dure bio-voeding het geld waard?", url: "https://www.rtlnieuws.nl/economie/life/artikel/4231561/is-biologisch-eten-echt-beter-voor-je", snippet: "Kritisch nieuwsartikel." },
      { title: "WUR (Wageningen University): Feiten over bio", url: "https://www.wur.nl/nl/Dossiers/dossier/Biologische-landbouw-en-voeding.htm", snippet: "Wetenschappelijke informatie." }
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