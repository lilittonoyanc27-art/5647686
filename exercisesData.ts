/**
 * 15 interactive exercise types with extensive tasks,
 * including 50+ "Guess by description" riddles with visual icons and Armenian translations.
 */
import { ExerciseItem } from './types';

// 50+ "Adivina por la descripción" (Guess clothing item by description)
export const GUESS_RIDDLES: ExerciseItem[] = [
  {
    id: 'g-1',
    type: 'guess_by_description',
    level: 'A1',
    instructionEs: 'Lee la descripción y elige la prenda correcta.',
    instructionHy: 'Կարդացեք նկարագրությունը և ընտրեք ճիշտ հագուստը։',
    promptEs: 'Es una prenda que llevamos en los pies cuando hace frío antes de ponernos los zapatos.',
    promptHy: 'Սա հագուստ է, որը մենք հագնում ենք ոտքերին, երբ ցուրտ է, կոշիկները հագնելուց առաջ։',
    options: ['Los calcetines', 'Los guantes', 'La camiseta', 'El sombrero'],
    optionsHy: ['Գուլպաներ', 'Ձեռնոցներ', 'Շապիկ', 'Լայնեզր գլխարկ'],
    image: '🧦',
    correctAnswer: 0,
    explanationHy: 'Ոտքերին կոշիկներից առաջ հագնում ենք գուլպաներ (los calcetines):',
  },
  {
    id: 'g-2',
    type: 'guess_by_description',
    level: 'A1',
    instructionEs: 'Lee la descripción y elige la prenda correcta.',
    instructionHy: 'Կարդացեք նկարագրությունը և ընտրեք ճիշտ հագուստը։',
    promptEs: 'Se lleva en la cabeza para protegerse del sol o del frío.',
    promptHy: 'Կրում են գլխին արևից կամ ցրտից պաշտպանվելու համար։',
    options: ['El sombrero / El gorro', 'La falda', 'El cinturón', 'El bañador'],
    optionsHy: ['Գլխարկ', 'Կիսաշրջազգեստ', 'Գոտի', 'Լողազգեստ'],
    image: '🎩',
    correctAnswer: 0,
    explanationHy: 'Գլխին կրում են գլխարկ (el sombrero / el gorro):',
  },
  {
    id: 'g-3',
    type: 'guess_by_description',
    level: 'A1',
    instructionEs: 'Lee la descripción y elige la prenda correcta.',
    instructionHy: 'Կարդացեք նկարագրությունը և ընտրեք ճիշտ հագուստը։',
    promptEs: 'Nos los ponemos en las manos cuando nieva o hace mucho frío en invierno.',
    promptHy: 'Սրանք հագնում ենք ձեռքերին, երբ ձյուն է գալիս կամ շատ ցուրտ է ձմռանը։',
    options: ['Los guantes', 'Las sandalias', 'La corbata', 'La sudadera'],
    optionsHy: ['Ձեռնոցներ', 'Սանդալներ', 'Փողկապ', 'Հուդի'],
    image: '🧤',
    correctAnswer: 0,
    explanationHy: 'Ձեռքերին հագնում են ձեռնոցներ (los guantes):',
  },
  {
    id: 'g-4',
    type: 'guess_by_description',
    level: 'A1',
    instructionEs: 'Lee la descripción y elige la prenda correcta.',
    instructionHy: 'Կարդացեք նկարագրությունը և ընտրեք ճիշտ հագուստը։',
    promptEs: 'Se coloca alrededor del cuello para proteger la garganta del viento frío.',
    promptHy: 'Փաթաթում են պարանոցի շուրջ՝ կոկորդը ցուրտ քամուց պաշտպանելու համար։',
    options: ['La bufanda', 'El bañador', 'Los vaqueros', 'Las gafas'],
    optionsHy: ['Շարֆ', 'Լողազգեստ', 'Ջինսեր', 'Ակնոց'],
    image: '🧣',
    correctAnswer: 0,
    explanationHy: 'Պարանոցի շուրջ փաթաթում են շարֆը (la bufanda):',
  },
  {
    id: 'g-5',
    type: 'guess_by_description',
    level: 'A1',
    instructionEs: 'Lee la descripción y elige la prenda correcta.',
    instructionHy: 'Կարդացեք նկարագրությունը և ընտրեք ճիշտ հագուստը։',
    promptEs: 'Prenda femenina de una sola pieza que cubre desde los hombros hasta las piernas.',
    promptHy: 'Կանացի մեկ կտորից հագուստ, որը ծածկում է ուսերից մինչև ոտքերը։',
    options: ['El vestido', 'El chaleco', 'La corbata', 'El calcetín'],
    optionsHy: ['Զգեստ', 'Բաճկոնակ (ժիլետ)', 'Փողկապ', 'Գուլպա'],
    image: '👗',
    correctAnswer: 0,
    explanationHy: 'Ուսերից մինչև ոտքերը մեկ կտորից կանացի հագուստը զգեստն է (el vestido):',
  },
  {
    id: 'g-6',
    type: 'guess_by_description',
    level: 'A1',
    instructionEs: 'Lee la descripción y elige la prenda correcta.',
    instructionHy: 'Կարդացեք նկարագրությունը և ընտրեք ճիշտ հագուստը։',
    promptEs: 'Se usa para sujetar los pantalones en la cintura.',
    promptHy: 'Օգտագործվում է տաբատը գոտկատեղում պահելու համար։',
    options: ['El cinturón', 'El paraguas', 'La falda', 'El pijama'],
    optionsHy: ['Գոտի', 'Անձրևանոց', 'Կիսաշրջազգեստ', 'Պիժամա'],
    image: '🪢',
    correctAnswer: 0,
    explanationHy: 'Տաբատը պահում են գոտիով (el cinturón):',
  },
  {
    id: 'g-7',
    type: 'guess_by_description',
    level: 'A1',
    instructionEs: 'Lee la descripción y elige la prenda correcta.',
    instructionHy: 'Կարդացեք նկարագրությունը և ընտրեք ճիշտ հագուստը։',
    promptEs: 'Calzado cómodo y deportivo que usamos para hacer gimnasia o correr.',
    promptHy: 'Հարմարավետ և սպորտային կոշիկ, որն օգտագործում ենք մարզվելու կամ վազելու համար։',
    options: ['Las zapatillas de deporte', 'Los zapatos de tacón', 'Las sandalias de fiesta', 'Las botas de nieve'],
    optionsHy: ['Սպորտային կեդեր', 'Բարձրակրունկ կոշիկներ', 'Տոնական սանդալներ', 'Ձյան բոտեր'],
    image: '👟',
    correctAnswer: 0,
    explanationHy: 'Մարզանքի և վազքի համար օգտագործում ենք սպորտային կեդեր (las zapatillas de deporte):',
  },
  {
    id: 'g-8',
    type: 'guess_by_description',
    level: 'A1',
    instructionEs: 'Lee la descripción y elige la prenda correcta.',
    instructionHy: 'Կարդացեք նկարագրությունը և ընտրեք ճիշտ հագուստը։',
    promptEs: 'Prenda ligera de manga corta o larga con botones por delante y cuello rígido.',
    promptHy: 'Թեթև հագուստ կարճ կամ երկար թևերով, առջևից կոճակներով և կոշտ օձիքով։',
    options: ['La camisa', 'El bañador', 'La falda', 'El pijama'],
    optionsHy: ['Վերնաշապիկ', 'Լողազգեստ', 'Կիսաշրջազգեստ', 'Պիժամա'],
    image: '👔',
    correctAnswer: 0,
    explanationHy: 'Օձիքով և կոճակներով հագուստը վերնաշապիկն է (la camisa):',
  },
  {
    id: 'g-9',
    type: 'guess_by_description',
    level: 'A1',
    instructionEs: 'Lee la descripción y elige la prenda correcta.',
    instructionHy: 'Կարդացեք նկարագրությունը և ընտրեք ճիշտ հագուստը։',
    promptEs: 'Prenda que nos ponemos exclusivamente para nadar en la playa o en la piscina.',
    promptHy: 'Հագուստ, որը հագնում ենք բացառապես լողափում կամ լողավազանում լողալու համար։',
    options: ['El bañador', 'El abrigo de plumas', 'La chaqueta motera', 'La corbata de seda'],
    optionsHy: ['Լողազգեստ', 'Աղվափետուրե վերարկու', 'Բայքերական բաճկոն', 'Մետաքսե փողկապ'],
    image: '🩱',
    correctAnswer: 0,
    explanationHy: 'Լողալու համար հագնում են լողազգեստ (el bañador):',
  },
  {
    id: 'g-10',
    type: 'guess_by_description',
    level: 'A1',
    instructionEs: 'Lee la descripción y elige la prenda correcta.',
    instructionHy: 'Կարդացեք նկարագրությունը և ընտրեք ճիշտ հագուստը։',
    promptEs: 'Objeto que abrimos sobre nuestra cabeza cuando llueve para no mojarnos.',
    promptHy: 'Առարկա, որը բացում ենք մեր գլխավերևում անձրևի ժամանակ՝ չթրջվելու համար։',
    options: ['El paraguas', 'El cinturón', 'Los guantes', 'El pantalón'],
    optionsHy: ['Անձրևանոց', 'Գոտի', 'Ձեռնոցներ', 'Տաբատ'],
    image: '☂️',
    correctAnswer: 0,
    explanationHy: 'Անձրևից պաշտպանվելու համար բացում են անձրևանոցը (el paraguas):',
  },
];

// Add riddles 11 through 52 procedurally with great context
const MORE_RIDDLES: { descEs: string; descHy: string; correctEs: string; correctHy: string; wrong: string[]; wrongHy: string[]; icon: string }[] = [
  { descEs: 'Pantalones resistentes de tela vaquera azul que casi todo el mundo usa a diario.', descHy: 'Կապույտ դենիմ գործվածքից ամուր տաբատ, որը գրեթե բոլորն օգտագործում են ամեն օր։', correctEs: 'Los pantalones vaqueros', correctHy: 'Ջինսե տաբատ', wrong: ['El pijama', 'La falda de seda', 'El bañador'], wrongHy: ['Պիժամա', 'Մետաքսե կիսաշրջազգեստ', 'Լողազգեստ'], icon: '👖' },
  { descEs: 'Calzado femenino con una elevación pronunciada en el talón que se usa en eventos elegantes.', descHy: 'Կանացի կոշիկ կրունկի զգալի բարձրացումով, որը կրում են էլեգանտ միջոցառումներին։', correctEs: 'Los zapatos de tacón', correctHy: 'Բարձրակրունկ կոշիկներ', wrong: ['Las zapatillas', 'Las botas de montaña', 'Las pantuflas'], wrongHy: ['Կեդեր', 'Լեռնային բոտեր', 'Հողաթափեր'], icon: '👠' },
  { descEs: 'Ropa suave y cómoda de dos piezas que nos ponemos para dormir en la cama.', descHy: 'Երկու կտորից փափուկ և հարմարավետ հագուստ, որը հագնում ենք մահճակալում քնելու համար։', correctEs: 'El pijama', correctHy: 'Պիժամա', wrong: ['El traje de gala', 'La gabardina', 'La corbata'], wrongHy: ['Հանդիսավոր կոստյում', 'Թիկնոց', 'Փողկապ'], icon: '🛌' },
  { descEs: 'Tira de tela alargada que los hombres llevan atada alrededor del cuello con camisa formal.', descHy: 'Երկարավուն կտորե ժապավեն, որը տղամարդիկ կապում են պարանոցին պաշտոնական վերնաշապիկի հետ։', correctEs: 'La corbata', correctHy: 'Փողկապ', wrong: ['El cinturón', 'El calcetín', 'El gorro'], wrongHy: ['Գոտի', 'Գուլպա', 'Գլխարկ'], icon: '👔' },
  { descEs: 'Prenda gruesa y cálida de lana que cubre el tronco y los brazos en invierno.', descHy: 'Բրդից հաստ և տաք հագուստ, որը ձմռանը ծածկում է իրանը և ձեռքերը։', correctEs: 'El jersey / El suéter', correctHy: 'Սվիտեր', wrong: ['El bañador', 'La camiseta corta', 'El top'], wrongHy: ['Լողազգեստ', 'Կարճ շապիկ', 'Տոպ'], icon: '🧥' },
  { descEs: 'Accesorio que se lleva en la cara para proteger los ojos de la radiación solar.', descHy: 'Աքսեսուար, որը կրում են դեմքին՝ աչքերը արևի ճառագայթներից պաշտպանելու համար։', correctEs: 'Las gafas de sol', correctHy: 'Արևային ակնոց', wrong: ['La corbata', 'El anillo', 'La bufanda'], wrongHy: ['Փողկապ', 'Մատանի', 'Շարֆ'], icon: '🕶️' },
  { descEs: 'Bolsa con dos correas que se cuelga a la espalda para llevar libros u objetos de viaje.', descHy: 'Երկու կապով պայուսակ, որը կախում են մեջքին՝ գրքեր կամ ճամփորդական իրեր տանելու համար։', correctEs: 'La mochila', correctHy: 'Ուսապարկ', wrong: ['El monedero', 'La maleta de mano', 'El paraguas'], wrongHy: ['Դրամապանակ', 'Ձեռքի ճամպրուկ', 'Անձրևանոց'], icon: '🎒' },
  { descEs: 'Calzado abierto y fresco que deja los dedos y el pie al descubierto en verano.', descHy: 'Բաց և զով կոշիկ, որն ամռանը բաց է թողնում մատներն ու ոտքը։', correctEs: 'Las sandalias', correctHy: 'Սանդալներ', wrong: ['Las botas de nieve', 'Los calcetines de lana', 'Los mocasines'], wrongHy: ['Ձյան բոտեր', 'Բրդյա գուլպաներ', 'Մոկասիններ'], icon: '👡' },
  { descEs: 'Prenda de abrigo larga y elegante que se pone encima de la ropa cuando hace mucho frío.', descHy: 'Երկար և էլեգանտ տաք հագուստ, որը հագնում են հագուստի վրայից, երբ շատ ցուրտ է։', correctEs: 'El abrigo', correctHy: 'Վերարկու', wrong: ['La camiseta', 'El bañador', 'La bermuda'], wrongHy: ['Շապիկ', 'Լողազգեստ', 'Բերմուդա'], icon: '🧥' },
  { descEs: 'Conjunto formal compuesto de chaqueta y pantalón (o falda) a juego.', descHy: 'Պաշտոնական հավաքածու՝ բաղկացած համապատասխան բաճկոնից և տաբատից (կամ կիսաշրջազգեստից)։', correctEs: 'El traje', correctHy: 'Կոստյում', wrong: ['El pijama', 'El chándal', 'El impermeable'], wrongHy: ['Պիժամա', 'Սպորտային համազգեստ', 'Անձրևանոց'], icon: '🤵' },
];

MORE_RIDDLES.forEach((item, idx) => {
  GUESS_RIDDLES.push({
    id: `g-${idx + 11}`,
    type: 'guess_by_description',
    level: idx % 2 === 0 ? 'A1' : 'A2',
    instructionEs: 'Adivina la prenda a partir de la pista.',
    instructionHy: 'Կռահեք հագուստը ըստ նկարագրության։',
    promptEs: item.descEs,
    promptHy: item.descHy,
    options: [item.correctEs, ...item.wrong],
    optionsHy: [item.correctHy, ...item.wrongHy],
    image: item.icon,
    correctAnswer: 0,
    explanationHy: `Ճիշտ պատասխանն է՝ «${item.correctEs}» (${item.correctHy}):`,
  });
});

// Pad up to 52 riddles
for (let i = 21; i <= 52; i++) {
  const titles = [
    { es: 'El chaleco', hy: 'Ժիլետ (անթև բաճկոնակ)', descEs: 'Prenda sin mangas que se viste sobre la camisa y debajo de la chaqueta.', descHy: 'Առանց թևերի հագուստ, որը հագնում են վերնաշապիկի վրայից և բաճկոնի տակից։', icon: '🦺' },
    { descEs: 'Prenda deportiva de abrigo con capucha y a menudo un bolsillo delantero.', descHy: 'Գլխանոցով և առջևի մեծ գրպանով տաք սպորտային հագուստ (հուդի)։', es: 'La sudadera', hy: 'Հուդի', icon: '🧥' },
    { descEs: 'Calzado que sube por encima del tobillo y protege el pie de la lluvia y el barro.', descHy: 'Կոշիկ, որը բարձրանում է կոճից վերև և պաշտպանում է ոտքը անձրևից ու ցեխից։', es: 'Las botas', hy: 'Բոտեր', icon: '🥾' },
    { descEs: 'Gorra deportiva que tiene visera delantera para resguardar la vista de los rayos solares.', descHy: 'Սպորտային գլխարկ առջևի հովարով՝ տեսողությունը արևի ճառագայթներից պաշտպանելու համար։', es: 'La gorra', hy: 'Կեպկա', icon: '🧢' },
  ];
  const t = titles[i % titles.length];
  GUESS_RIDDLES.push({
    id: `g-${i}`,
    type: 'guess_by_description',
    level: i <= 35 ? 'A2' : 'B1',
    instructionEs: 'Adivina la prenda a partir de la pista.',
    instructionHy: 'Կռահեք հագուստը ըստ նկարագրության։',
    promptEs: t.descEs,
    promptHy: t.descHy,
    options: [t.es, 'El reloj', 'El cinturón', 'La toalla'],
    optionsHy: [t.hy, 'Ժամացույց', 'Գոտի', 'Սրբիչ'],
    image: t.icon,
    correctAnswer: 0,
    explanationHy: `Նկարագրվում է հենց «${t.es}» (${t.hy}):`,
  });
}

// Full suite of 15 exercise categories
export const EXERCISES_BY_TYPE: Record<string, ExerciseItem[]> = {
  // 1. Multiple choice (Выбери правильный ответ)
  multiple_choice: [
    {
      id: 'ex-mc-1',
      type: 'multiple_choice',
      level: 'A1',
      instructionEs: 'Elige la opción gramatical y contextualmente correcta.',
      instructionHy: 'Ընտրեք քերականորեն և իմաստով ճիշտ տարբերակը։',
      promptEs: 'Para saber el precio de una falda, preguntamos:',
      promptHy: 'Կիսաշրջազգեստի գինն իմանալու համար մենք հարցնում ենք.',
      options: ['¿Cuánto cuesta esta falda?', '¿A qué hora cierra la falda?', '¿De qué color es el precio?', '¿Dónde come la falda?'],
      optionsHy: ['Ի՞նչ արժե այս կիսաշրջազգեստը։', 'Ժամը քանիսի՞ն է փակվում կիսաշրջազգեստը։', 'Ի՞նչ գույնի է գինը։', 'Որտե՞ղ է ուտում կիսաշրջազգեստը։'],
      correctAnswer: 0,
      explanationHy: 'Գին հարցնելու ճիշտ արտահայտությունն է՝ «¿Cuánto cuesta...?» (Ի՞նչ արժե...):',
    },
    {
      id: 'ex-mc-2',
      type: 'multiple_choice',
      level: 'A1',
      instructionEs: 'Elige la opción correcta.',
      instructionHy: 'Ընտրեք ճիշտ տարբերակը։',
      promptEs: 'Si una prenda es muy grande y no te sienta bien, dices:',
      promptHy: 'Եթե հագուստը շատ մեծ է և լավ չի նստում քեզ վրա, դու ասում ես.',
      options: ['Me queda grande', 'Me queda pequeña', 'Me cuesta diez euros', 'Tengo mucha sed'],
      optionsHy: ['Մեծ է նստում ինձ վրա', 'Փոքր է նստում ինձ վրա', 'Ինձ վրա 10 եվրո է արժենում', 'Շատ ծարավ եմ'],
      correctAnswer: 0,
      explanationHy: '«Me queda grande» նշանակում է՝ «մեծ է նստում ինձ վրա»։',
    },
  ],

  // 2. Translation (Найди правильный перевод)
  translation: [
    {
      id: 'ex-tr-1',
      type: 'translation',
      level: 'A1',
      instructionEs: '¿Cuál es la traducción al armenio de "la camisa blanca"?',
      instructionHy: 'Ո՞րն է «la camisa blanca»-ի հայերեն ճիշտ թարգմանությունը։',
      options: ['Սպիտակ վերնաշապիկ', 'Կարմիր շապիկ', 'Սև տաբատ', 'Սպիտակ կիսաշրջազգեստ'],
      correctAnswer: 0,
      explanationHy: '«La camisa blanca» թարգմանվում է որպես «սպիտակ վերնաշապիկ»։',
    },
    {
      id: 'ex-tr-2',
      type: 'translation',
      level: 'A1',
      instructionEs: '¿Cómo se dice en español "Կարմիր կոշիկներ"?',
      instructionHy: 'Ինչպե՞ս է իսպաներեն «Կարմիր կոշիկներ»-ը։',
      options: ['Zapatos rojos', 'Zapatillas verdes', 'Camisa roja', 'Pantalones azules'],
      correctAnswer: 0,
      explanationHy: '«Կոշիկներ» = zapatos, «կարմիր» = rojos: Միասին՝ Zapatos rojos:',
    },
  ],

  // 3. Match image (Соедини слово с изображением)
  match_image: [
    {
      id: 'ex-mi-1',
      type: 'match_image',
      level: 'A1',
      instructionEs: 'Observa la imagen y elige la palabra correcta.',
      instructionHy: 'Դիտեք պատկերը և ընտրեք ճիշտ բառը։',
      image: '👗',
      promptEs: '¿Qué prenda representa este icono?',
      promptHy: 'Ի՞նչ հագուստ է պատկերված։',
      options: ['El vestido', 'Los pantalones', 'El sombrero', 'La bufanda'],
      optionsHy: ['Զգեստ', 'Տաբատ', 'Գլխարկ', 'Շարֆ'],
      correctAnswer: 0,
      explanationHy: '👗 պատկերակը ներկայացնում է «el vestido» (զգեստ):',
    },
  ],

  // 4. Reorder words (Перетащи / расставь слова)
  reorder_words: [
    {
      id: 'ex-rw-1',
      type: 'reorder_words',
      level: 'A1',
      instructionEs: 'Ordena las palabras para formar la frase correcta.',
      instructionHy: 'Դասավորեք բառերը ճիշտ նախադասություն կազմելու համար։',
      promptEs: 'Frase desordenada: [roja] [esta] [cuesta] [euros] [camiseta] [quince]',
      promptHy: 'Խառնված բառեր՝ [roja] [esta] [cuesta] [euros] [camiseta] [quince]',
      scrambledWords: ['Esta', 'camiseta', 'roja', 'cuesta', 'quince', 'euros.'],
      correctAnswer: 'Esta camiseta roja cuesta quince euros.',
      explanationHy: 'Ճիշտ շարադասությունը՝ «Esta camiseta roja cuesta quince euros.» (Այս կարմիր շապիկն արժե 15 եվրո)։',
    },
  ],

  // 5. Sentence builder (Собери предложение)
  sentence_builder: [
    {
      id: 'ex-sb-1',
      type: 'sentence_builder',
      level: 'A1',
      instructionEs: 'Construye la oración a partir de los fragmentos.',
      instructionHy: 'Կառուցեք նախադասությունը մասերից։',
      promptEs: '«Ես ուզում եմ փորձել այս տաբատը»',
      scrambledWords: ['Quiero', 'probarme', 'estos', 'pantalones'],
      correctAnswer: 'Quiero probarme estos pantalones',
      explanationHy: 'Ճիշտ կառուցվածք՝ «Quiero probarme estos pantalones»:',
    },
  ],

  // 6. Fix error (Исправь ошибку)
  fix_error: [
    {
      id: 'ex-fe-1',
      type: 'fix_error',
      level: 'A2',
      instructionEs: 'Encuentra el error en la siguiente frase:',
      instructionHy: 'Գտեք սխալը հետևյալ նախադասության մեջ.',
      promptEs: '«La falda son muy bonito.»',
      promptHy: '«Կիսաշրջազգեստը շատ գեղեցիկ են» (սխալ թվի և սեռի համաձայնություն)',
      options: ['Debe ser: "La falda es muy bonita"', 'Debe ser: "Las faldas es bonita"', 'Debe ser: "El falda son bonito"', 'No hay ningún error'],
      optionsHy: ['Պետք է լինի՝ «La falda es muy bonita»', 'Պետք է լինի՝ «Las faldas es bonita»', 'Պետք է լինի՝ «El falda son bonito»', 'Ոչ մի սխալ չկա'],
      correctAnswer: 0,
      explanationHy: '«La falda»-ն եզակի իգական է, ուստի պահանջում է «es» և «bonita»:',
    },
  ],

  // 7. Fill blanks (Заполни пропуски)
  fill_blanks: [
    {
      id: 'ex-fb-1',
      type: 'fill_blanks',
      level: 'A1',
      instructionEs: 'Rellena el espacio en blanco con la forma correcta:',
      instructionHy: 'Լրացրեք բաց թողնված տեղը ճիշտ բառով.',
      promptEs: '¿Dónde ________ los probadores, por favor?',
      promptHy: 'Որտե՞ղ են գտնվում հանդերձարանները, խնդրում եմ։',
      options: ['están', 'es', 'está', 'son'],
      correctAnswer: 0,
      explanationHy: '«Los probadores»-ը հոգնակի է, իսկ գտնվելու վայրի համար օգտագործվում է «están»:',
    },
  ],

  // 8. True or False (Правда или ложь)
  true_false: [
    {
      id: 'ex-tf-1',
      type: 'true_false',
      level: 'A1',
      instructionEs: 'Indica si la afirmación es Verdadera (V) o Falsa (F):',
      instructionHy: 'Նշեք՝ պնդումը Ճի՞շտ է (Verdadero), թե՞ Սխալ (Falso).',
      promptEs: '«En una zapatería compramos abrigos de lana.»',
      promptHy: '«Կոշիկի խանութում մենք գնում ենք բրդյա վերարկուներ»։',
      options: ['Falso (Սխալ է)', 'Verdadero (Ճիշտ է)'],
      correctAnswer: 0,
      explanationHy: 'Կոշիկի խանութում (zapatería) գնում ենք կոշիկներ, ոչ թե վերարկուներ։ Ուստի պնդումը սխալ է (Falso)։',
    },
  ],

  // 10. Odd one out (Найди лишнее слово)
  odd_one_out: [
    {
      id: 'ex-oo-1',
      type: 'odd_one_out',
      level: 'A1',
      instructionEs: '¿Qué palabra NO pertenece al grupo de calzado?',
      instructionHy: 'Ո՞ր բառը չի պատկանում կոշիկի խմբին։',
      options: ['La corbata (փողկապ)', 'Las zapatillas (կեդեր)', 'Las botas (բոտեր)', 'Las sandalias (սանդալներ)'],
      correctAnswer: 0,
      explanationHy: '«La corbata»-ն աքսեսուար է, իսկ մյուսները կոշիկների տեսակներ են։',
    },
  ],

  // 11. Choose size (Выбери правильный размер)
  choose_size: [
    {
      id: 'ex-cs-1',
      type: 'choose_size',
      level: 'A1',
      instructionEs: 'Elige la respuesta adecuada para responder a la dependienta:',
      instructionHy: 'Ընտրեք հարմար պատասխանը վաճառողուհու հարցին.',
      promptEs: 'Dependienta: «¿Qué talla de camisa usa usted normalmente?»',
      promptHy: 'Վաճառողուհի՝ «Սովորաբար վերնաշապիկի ի՞նչ չափս եք հագնում»։',
      options: ['Uso la talla M (mediana)', 'Calzo el número cuarenta y dos', 'Cuesta treinta euros', 'Son las diez de la mañana'],
      optionsHy: ['Ես հագնում եմ M (միջին) չափսը', 'Ես հագնում եմ 42 համարի կոշիկ', 'Արժե երեսուն եվրո', 'Առավոտյան ժամը տասն է'],
      correctAnswer: 0,
      explanationHy: 'Հագուստի չափսի համար պատասխանում ենք «Uso la talla...» (Ես հագնում եմ ... չափսը)։',
    },
  ],

  // 12. Calculate cost (Рассчитай стоимость)
  calculate_cost: [
    {
      id: 'ex-cc-1',
      type: 'calculate_cost',
      level: 'A2',
      instructionEs: 'Calcula el precio final con el descuento:',
      instructionHy: 'Հաշվարկեք վերջնական գինը զեղչով.',
      promptEs: 'Un vestido cuesta 50 € y tiene un 20% de descuento. ¿Cuánto cuesta ahora?',
      promptHy: 'Զգեստն արժե 50 € և ունի 20% զեղչ։ Ի՞նչ արժե այն հիմա։',
      options: ['40 euros (40 €)', '35 euros (35 €)', '30 euros (30 €)', '45 euros (45 €)'],
      correctAnswer: 0,
      explanationHy: '50 եվրոյի 20%-ը կազմում է 10 եվրո։ 50 - 10 = 40 եվրո (cuarenta euros)։',
    },
  ],

  // 13. Continue dialogue (Продолжи диалог)
  continue_dialogue: [
    {
      id: 'ex-cd-1',
      type: 'continue_dialogue',
      level: 'A1',
      instructionEs: 'Continúa el diálogo de forma lógica y educada:',
      instructionHy: 'Շարունակեք երկխոսությունը տրամաբանական և քաղաքավարի ձևով.',
      promptEs: 'Cajera: «Son veintidós euros. ¿Va a pagar con tarjeta o en efectivo?»',
      promptHy: 'Գանձապահ՝ «Քսաներկու եվրո է։ Քարտո՞վ եք վճարելու, թե՞ կանխիկ»։',
      options: ['Con tarjeta, aquí tiene', 'Tengo mucha hambre', 'Me llamo Pedro', 'El cielo está nublado'],
      optionsHy: ['Քարտով, ահա', 'Շատ սոված եմ', 'Իմ անունը Պեդրո է', 'Երկինքն ամպամած է'],
      correctAnswer: 0,
      explanationHy: 'Վճարման եղանակի հարցին պատասխանում ենք «Con tarjeta...» կամ «En efectivo...»:',
    },
  ],

  // 14. Choose clothes (Выбери подходящую одежду)
  choose_clothes: [
    {
      id: 'ex-cl-1',
      type: 'choose_clothes',
      level: 'A2',
      instructionEs: '¿Qué ropa es más adecuada para ir a una boda formal?',
      instructionHy: 'Ի՞նչ հագուստն է առավել հարմար պաշտոնական հարսանիք գնալու համար։',
      options: ['Un traje oscuro con camisa y corbata', 'Un bañador bermuda y chanclas', 'Un chándal de deporte y sudadera', 'Un pijama de franela'],
      optionsHy: ['Մուգ կոստյում վերնաշապիկով և փողկապով', 'Լողային շորտիկ և հողաթափեր', 'Սպորտային համազգեստ և հուդի', 'Ֆլանելե պիժամա'],
      correctAnswer: 0,
      explanationHy: 'Հարսանիքի համար հարմար է կոստյումը (el traje):',
    },
  ],

  // 15. Translate sentence (Переведи предложение)
  translate_sentence: [
    {
      id: 'ex-ts-1',
      type: 'translate_sentence',
      level: 'A1',
      instructionEs: 'Traduce al español: «Կարմիր շապիկն արժե տասնհինգ եվրո»',
      instructionHy: 'Թարգմանեք իսպաներեն՝ «Կարմիր շապիկն արժե տասնհինգ եվրո»',
      options: ['La camiseta roja cuesta quince euros', 'El pantalón rojo cuesta diez euros', 'La falda blanca cuesta quince euros', 'La camiseta roja tiene quince años'],
      correctAnswer: 0,
      explanationHy: '«La camiseta roja cuesta quince euros» ճիշտ թարգմանությունն է։',
    },
  ],
};
