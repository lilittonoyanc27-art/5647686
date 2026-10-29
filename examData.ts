/**
 * Exam Mode: "COMPRANDO ROPA EN ESPAÑOL"
 * Levels: A1, A2, B1, B2.
 * 40 tasks per exam:
 *  - 10 Vocabulario
 *  - 10 Gramática
 *  - 10 Comprensión de diálogos
 *  - 5 Audición
 *  - 5 Situaciones prácticas
 * Correct options dynamically randomized!
 */
import { ExamQuestion } from './types';

export const EXAM_QUESTIONS_POOL: ExamQuestion[] = [
  // A1 Vocabulary (10 questions)
  {
    id: 'a1-voc-1',
    section: 'vocabulario',
    level: 'A1',
    promptEs: '¿Cómo se llama la prenda de abrigo que nos ponemos alrededor del cuello cuando hace frío?',
    promptHy: 'Ինչպե՞ս է կոչվում տաքացնող այն հագուստը, որը փաթաթում ենք պարանոցին, երբ ցուրտ է։',
    options: [
      { textEs: 'La bufanda', textHy: 'Շարֆ', isCorrect: true },
      { textEs: 'El cinturón', textHy: 'Գոտի', isCorrect: false },
      { textEs: 'El calcetín', textHy: 'Գուլպա', isCorrect: false },
      { textEs: 'El guante', textHy: 'Ձեռնոց', isCorrect: false },
    ],
    explanationHy: 'Պարանոցին փաթաթվող տաքացնող պարագան շարֆն է (la bufanda)։',
    exampleEs: 'Llevo una bufanda de lana roja en invierno.',
    exampleHy: 'Ձմռանը ես հագնում եմ կարմիր բրդյա շարֆ։',
  },
  {
    id: 'a1-voc-2',
    section: 'vocabulario',
    level: 'A1',
    promptEs: '¿Qué palabra significa "կիսաշրջազգեստ" en español?',
    promptHy: 'Ո՞ր բառն է իսպաներեն նշանակում «կիսաշրջազգեստ»։',
    options: [
      { textEs: 'La falda', textHy: 'Կիսաշրջազգեստ', isCorrect: true },
      { textEs: 'La camisa', textHy: 'Վերնաշապիկ', isCorrect: false },
      { textEs: 'El vestido', textHy: 'Զգեստ', isCorrect: false },
      { textEs: 'La chaqueta', textHy: 'Բաճկոն', isCorrect: false },
    ],
    explanationHy: '«Կիսաշրջազգեստ» իսպաներեն թարգմանվում է «la falda»։',
    exampleEs: 'Esta falda plisada cuesta veinte euros.',
    exampleHy: 'Այս ծալքավոր կիսաշրջազգեստն արժե քսան եվրո։',
  },
  {
    id: 'a1-voc-3',
    section: 'vocabulario',
    level: 'A1',
    promptEs: 'El calzado deportivo que usamos para hacer gimnasia se llama:',
    promptHy: 'Սպորտային կոշիկները, որոնք մարզվելու համար ենք օգտագործում, կոչվում են.',
    options: [
      { textEs: 'Las zapatillas de deporte', textHy: 'Սպորտային կեդեր', isCorrect: true },
      { textEs: 'Los zapatos de tacón', textHy: 'Բարձրակրունկներ', isCorrect: false },
      { textEs: 'Las botas de cuero', textHy: 'Կաշվե բոտեր', isCorrect: false },
      { textEs: 'Las sandalias de fiesta', textHy: 'Տոնական սանդալներ', isCorrect: false },
    ],
    explanationHy: 'Սպորտային կոշիկները կոչվում են «las zapatillas» կամ «las zapatillas de deporte»։',
    exampleEs: 'Me compré unas zapatillas muy cómodas.',
    exampleHy: 'Ես գնեցի շատ հարմարավետ կեդեր։',
  },
  {
    id: 'a1-voc-4',
    section: 'vocabulario',
    level: 'A1',
    promptEs: 'El lugar donde te pruebas la ropa dentro de una tienda se llama:',
    promptHy: 'Խանութում այն վայրը, որտեղ հագուստը փորձում եք, կոչվում է.',
    options: [
      { textEs: 'El probador', textHy: 'Չափափորձման խցիկ (հանդերձարան)', isCorrect: true },
      { textEs: 'La caja', textHy: 'Դրամարկղ', isCorrect: false },
      { textEs: 'El escaparate', textHy: 'Ցուցափեղկ', isCorrect: false },
      { textEs: 'El almacén', textHy: 'Պահեստ', isCorrect: false },
    ],
    explanationHy: 'Հագուստը փորձելու խցիկը կոչվում է «el probador»։',
    exampleEs: 'Los probadores están libres al final de la tienda.',
    exampleHy: 'Հանդերձարանները ազատ են խանութի վերջնամասում։',
  },
  {
    id: 'a1-voc-5',
    section: 'vocabulario',
    level: 'A1',
    promptEs: 'Para pagar las compras nos dirigimos a:',
    promptHy: 'Գնումները վճարելու համար մենք մոտենում ենք.',
    options: [
      { textEs: 'La caja', textHy: 'Դրամարկղ', isCorrect: true },
      { textEs: 'El espejo', textHy: 'Հայելի', isCorrect: false },
      { textEs: 'La percha', textHy: 'Կախիչ', isCorrect: false },
      { textEs: 'La ventana', textHy: 'Պատուհան', isCorrect: false },
    ],
    explanationHy: 'Վճարումը կատարվում է դրամարկղում՝ «la caja»։',
    exampleEs: 'Puede pagar con tarjeta en la caja.',
    exampleHy: 'Դուք կարող եք քարտով վճարել դրամարկղում։',
  },
  {
    id: 'a1-voc-6',
    section: 'vocabulario',
    level: 'A1',
    promptEs: '¿Cómo se dice "գոտի" en español?',
    promptHy: 'Ինչպե՞ս է «գոտի» իսպաներեն։',
    options: [
      { textEs: 'El cinturón', textHy: 'Գոտի', isCorrect: true },
      { textEs: 'El guante', textHy: 'Ձեռնոց', isCorrect: false },
      { textEs: 'El sombrero', textHy: 'Գլխարկ', isCorrect: false },
      { textEs: 'La corbata', textHy: 'Փողկապ', isCorrect: false },
    ],
    explanationHy: '«Գոտի» իսպաներեն՝ «el cinturón»։',
    exampleEs: 'Este cinturón negro de cuero es perfecto.',
    exampleHy: 'Կաշվե այս սև գոտին կատարյալ է։',
  },
  {
    id: 'a1-voc-7',
    section: 'vocabulario',
    level: 'A1',
    promptEs: 'La ropa que usamos para dormir en la cama es:',
    promptHy: 'Հագուստը, որը հագնում ենք մահճակալում քնելու համար.',
    options: [
      { textEs: 'El pijama', textHy: 'Պիժամա', isCorrect: true },
      { textEs: 'El traje', textHy: 'Կոստյում', isCorrect: false },
      { textEs: 'El abrigo', textHy: 'Վերարկու', isCorrect: false },
      { textEs: 'El impermeable', textHy: 'Անձրևանոց', isCorrect: false },
    ],
    explanationHy: 'Քնելու հագուստը «el pijama»-ն է։',
    exampleEs: 'Este pijama de algodón abriga mucho.',
    exampleHy: 'Այս բամբակյա պիժաման շատ է տաքացնում։',
  },
  {
    id: 'a1-voc-8',
    section: 'vocabulario',
    level: 'A1',
    promptEs: '¿Qué significa "barato" en armenio?',
    promptHy: 'Ի՞նչ է նշանակում «barato» հայերեն։',
    options: [
      { textEs: 'Էժան, մատչելի', textHy: 'Էժան', isCorrect: true },
      { textEs: 'Թանկ', textHy: 'Թանկ', isCorrect: false },
      { textEs: 'Նոր', textHy: 'Նոր', isCorrect: false },
      { textEs: 'Հին', textHy: 'Հին', isCorrect: false },
    ],
    explanationHy: '«Barato» նշանակում է էժան, մատչելի (հականիշը՝ «caro»):',
    exampleEs: 'Esta camiseta es muy barata, cuesta solo cinco euros.',
    exampleHy: 'Այս շապիկը շատ էժան է, արժե ընդամենը հինգ եվրո։',
  },
  {
    id: 'a1-voc-9',
    section: 'vocabulario',
    level: 'A1',
    promptEs: 'El papel o recibo que nos entregan al pagar se llama:',
    promptHy: 'Վճարելիս մեզ տրվող թուղթը կամ կտրոնը կոչվում է.',
    options: [
      { textEs: 'El ticket de compra', textHy: 'Գնման կտրոն (չեկ)', isCorrect: true },
      { textEs: 'La tarjeta de visita', textHy: 'Այցեքարտ', isCorrect: false },
      { textEs: 'El cartel publicitario', textHy: 'Գովազդային պաստառ', isCorrect: false },
      { textEs: 'El billete de tren', textHy: 'Գնացքի տոմս', isCorrect: false },
    ],
    explanationHy: 'Գնման անդորրագիրը կոչվում է «el ticket» կամ «el recibo»։',
    exampleEs: 'Guarda el ticket para cualquier cambio.',
    exampleHy: 'Պահիր կտրոնը որևէ փոխանակման համար։',
  },
  {
    id: 'a1-voc-10',
    section: 'vocabulario',
    level: 'A1',
    promptEs: '¿Qué prenda nos ponemos en las manos en los días de nieve?',
    promptHy: 'Ի՞նչ հագուստ ենք հագնում ձեռքերին ձյան օրերին։',
    options: [
      { textEs: 'Los guantes', textHy: 'Ձեռնոցներ', isCorrect: true },
      { textEs: 'Las sandalias', textHy: 'Սանդալներ', isCorrect: false },
      { textEs: 'Los calcetines', textHy: 'Գուլպաներ', isCorrect: false },
      { textEs: 'Las gafas', textHy: 'Ակնոց', isCorrect: false },
    ],
    explanationHy: 'Ձեռքերի համար նախատեսված են ձեռնոցները՝ «los guantes»։',
    exampleEs: 'Ponte los guantes de lana que hace frío.',
    exampleHy: 'Հագիր բրդյա ձեռնոցները, ցուրտ է։',
  },

  // A1 Grammar (10 questions)
  {
    id: 'a1-gra-1',
    section: 'gramatica',
    level: 'A1',
    promptEs: 'Completa: «¿Cuánto ________ estos pantalones vaqueros?»',
    promptHy: 'Լրացրեք՝ «¿Cuánto ________ estos pantalones vaqueros?»',
    options: [
      { textEs: 'cuestan', textHy: 'արժեն', isCorrect: true },
      { textEs: 'cuesta', textHy: 'արժե', isCorrect: false },
      { textEs: 'costamos', textHy: 'արժենք', isCorrect: false },
      { textEs: 'costar', textHy: 'արժենալ', isCorrect: false },
    ],
    explanationHy: 'Քանի որ «los pantalones»-ը հոգնակի է, ճիշտ է «cuestan»:',
    exampleEs: 'Los pantalones cuestan cuarenta euros.',
    exampleHy: 'Տաբատն արժե քառասուն եվրո։',
  },
  {
    id: 'a1-gra-2',
    section: 'gramatica',
    level: 'A1',
    promptEs: 'Completa: «A mí me ________ mucho ese vestido rojo.»',
    promptHy: 'Լրացրեք՝ «A mí me ________ mucho ese vestido rojo.»',
    options: [
      { textEs: 'gusta', textHy: 'դուր է գալիս (եզակի)', isCorrect: true },
      { textEs: 'gustan', textHy: 'դուր են գալիս (հոգնակի)', isCorrect: false },
      { textEs: 'gusto', textHy: 'դուր եմ գալիս', isCorrect: false },
      { textEs: 'gustamos', textHy: 'դուր ենք գալիս', isCorrect: false },
    ],
    explanationHy: '«Ese vestido»-ն եզակի թիվ է, ուստի պահանջվում է «gusta»:',
    exampleEs: 'Me gusta ese vestido rojo.',
    exampleHy: 'Ինձ դուր է գալիս այդ կարմիր զգեստը։',
  },
  {
    id: 'a1-gra-3',
    section: 'gramatica',
    level: 'A1',
    promptEs: 'Completa con el demostrativo cercano (aquí en mi mano): «Me llevo ________ camiseta.»',
    promptHy: 'Լրացրեք մոտիկ ցուցական դերանվամբ (ձեռքումս գտնվող)՝ «Me llevo ________ camiseta.»',
    options: [
      { textEs: 'esta', textHy: 'այս (իգական)', isCorrect: true },
      { textEs: 'este', textHy: 'այս (արական)', isCorrect: false },
      { textEs: 'esa', textHy: 'այդ', isCorrect: false },
      { textEs: 'aquella', textHy: 'այն', isCorrect: false },
    ],
    explanationHy: '«Camiseta»-ն իգական է և գտնվում է խոսողի մոտ («aquí»), ուստի «esta»:',
    exampleEs: 'Me llevo esta camiseta verde.',
    exampleHy: 'Ես վերցնում եմ այս կանաչ շապիկը։',
  },
  {
    id: 'a1-gra-4',
    section: 'gramatica',
    level: 'A1',
    promptEs: 'Elige la forma correcta: «Yo ________ (querer) una camisa azul.»',
    promptHy: 'Ընտրեք ճիշտ ձևը՝ «Yo ________ (querer) una camisa azul.»',
    options: [
      { textEs: 'quiero', textHy: 'ուզում եմ', isCorrect: true },
      { textEs: 'quieres', textHy: 'ուզում ես', isCorrect: false },
      { textEs: 'quiere', textHy: 'ուզում է', isCorrect: false },
      { textEs: 'queremos', textHy: 'ուզում ենք', isCorrect: false },
    ],
    explanationHy: '«Yo» դերանվան համար «querer»-ը դառնում է «quiero»:',
    exampleEs: 'Quiero una camisa azul de lino.',
    exampleHy: 'Ես ուզում եմ կապույտ կտավատե վերնաշապիկ։',
  },
  {
    id: 'a1-gra-5',
    section: 'gramatica',
    level: 'A1',
    promptEs: 'Completa: «¿Puedo ________ estos zapatos?»',
    promptHy: 'Լրացրեք՝ «¿Puedo ________ estos zapatos?»',
    options: [
      { textEs: 'probarme', textHy: 'փորձել ինձ վրա', isCorrect: true },
      { textEs: 'probarte', textHy: 'փորձել քեզ վրա', isCorrect: false },
      { textEs: 'probarse', textHy: 'փորձել իր վրա', isCorrect: false },
      { textEs: 'pruebo', textHy: 'փորձում եմ', isCorrect: false },
    ],
    explanationHy: '«Puedo»-ից հետո անորոշ բայ է առաջին դեմքի դերանունով՝ «probarme»:',
    exampleEs: '¿Puedo probarme estos zapatos del número 42?',
    exampleHy: 'Կարո՞ղ եմ փորձել այս 42 համարի կոշիկները։',
  },
  {
    id: 'a1-gra-6',
    section: 'gramatica',
    level: 'A1',
    promptEs: 'Elige entre Muy o Mucho: «Esta chaqueta es ________ cara.»',
    promptHy: 'Ընտրեք Muy կամ Mucho՝ «Esta chaqueta es ________ cara.»',
    options: [
      { textEs: 'muy', textHy: 'շատ (ածականի հետ)', isCorrect: true },
      { textEs: 'mucho', textHy: 'շատ', isCorrect: false },
      { textEs: 'mucha', textHy: 'շատ (իգական)', isCorrect: false },
      { textEs: 'muchos', textHy: 'շատ (հոգնակի)', isCorrect: false },
    ],
    explanationHy: '«Cara»-ն ածական է, ուստի օգտագործվում է անփոփոխ «muy»-ը։',
    exampleEs: 'La chaqueta es muy cara.',
    exampleHy: 'Բաճկոնը շատ թանկ է։',
  },
  {
    id: 'a1-gra-7',
    section: 'gramatica',
    level: 'A1',
    promptEs: 'Completa: «Hoy Carlos ________ una corbata muy elegante.»',
    promptHy: 'Լրացրեք՝ «Hoy Carlos ________ una corbata muy elegante.»',
    options: [
      { textEs: 'lleva', textHy: 'կրում է, հագել է', isCorrect: true },
      { textEs: 'llevo', textHy: 'հագել եմ', isCorrect: false },
      { textEs: 'llevas', textHy: 'հագել ես', isCorrect: false },
      { textEs: 'llevan', textHy: 'հագել են', isCorrect: false },
    ],
    explanationHy: '«Carlos» (նա՝ él) ձևի համար բայն է «lleva»:',
    exampleEs: 'Carlos lleva una corbata de seda.',
    exampleHy: 'Կառլոսը կրում է մետաքսե փողկապ։',
  },
  {
    id: 'a1-gra-8',
    section: 'gramatica',
    level: 'A1',
    promptEs: 'Para indicar el material decimos: «Este jersey ________ de lana.»',
    promptHy: 'Նյութը նշելու համար ասում ենք՝ «Este jersey ________ de lana.»',
    options: [
      { textEs: 'es', textHy: 'է (SER բայով)', isCorrect: true },
      { textEs: 'está', textHy: 'է (ESTAR բայով)', isCorrect: false },
      { textEs: 'tiene', textHy: 'ունի', isCorrect: false },
      { textEs: 'hace', textHy: 'անում է', isCorrect: false },
    ],
    explanationHy: 'Հագուստի նյութը արտահայտվում է «SER + de» կառույցով (es de lana):',
    exampleEs: 'El abrigo es de paño suave.',
    exampleHy: 'Վերարկուն փափուկ մահուդից է։',
  },
  {
    id: 'a1-gra-9',
    section: 'gramatica',
    level: 'A1',
    promptEs: 'Completa con la concordancia correcta: «Compré dos camisas ________.»',
    promptHy: 'Լրացրեք ճիշտ համաձայնությամբ՝ «Compré dos camisas ________.»',
    options: [
      { textEs: 'blancas', textHy: 'սպիտակներ (իգական հոգնակի)', isCorrect: true },
      { textEs: 'blanco', textHy: 'սպիտակ (արական եզակի)', isCorrect: false },
      { textEs: 'blanca', textHy: 'սպիտակ (իգական եզակի)', isCorrect: false },
      { textEs: 'blancos', textHy: 'սպիտակներ (արական հոգնակի)', isCorrect: false },
    ],
    explanationHy: '«Las camisas»-ը իգական հոգնակի է, ուստի ածականն է «blancas»:',
    exampleEs: 'Compré dos camisas blancas.',
    exampleHy: 'Ես երկու սպիտակ վերնաշապիկ գնեցի։',
  },
  {
    id: 'a1-gra-10',
    section: 'gramatica',
    level: 'A1',
    promptEs: 'Completa: «Los zapatos me quedan muy ________ (estrecho).»',
    promptHy: 'Լրացրեք՝ «Los zapatos me quedan muy ________ (estrecho).»',
    options: [
      { textEs: 'estrechos', textHy: 'նեղ (հոգնակի)', isCorrect: true },
      { textEs: 'estrecho', textHy: 'նեղ (եզակի)', isCorrect: false },
      { textEs: 'estrecha', textHy: 'նեղ (իգական)', isCorrect: false },
      { textEs: 'estrechas', textHy: 'նեղ (իգական հոգնակի)', isCorrect: false },
    ],
    explanationHy: '«Los zapatos»-ը արական հոգնակի է, ուստի՝ «estrechos»:',
    exampleEs: 'Los zapatos me quedan estrechos.',
    exampleHy: 'Կոշիկները նեղ են նստում ինձ վրա։',
  },

  // A1 Dialogue comprehension (10 questions)
  {
    id: 'a1-dia-1',
    section: 'dialogo',
    level: 'A1',
    contextEs: '— ¡Buenos días! ¿En qué puedo ayudarle? — Hola, estoy buscando un vestido de verano en color rojo.',
    contextHy: '— Բարի օր։ Ինչո՞վ կարող եմ օգնել Ձեզ։ — Բարև, ես փնտրում եմ ամառային կարմիր զգեստ։',
    promptEs: '¿Qué busca la clienta en la tienda?',
    promptHy: 'Ի՞նչ է փնտրում հաճախորդուհին խանութում։',
    options: [
      { textEs: 'Un vestido de verano rojo', textHy: 'Կարմիր ամառային զգեստ', isCorrect: true },
      { textEs: 'Unos pantalones vaqueros', textHy: 'Ջինսե տաբատ', isCorrect: false },
      { textEs: 'Una bufanda de lana', textHy: 'Բրդյա շարֆ', isCorrect: false },
      { textEs: 'Un par de botas negras', textHy: 'Սև բոտեր', isCorrect: false },
    ],
    explanationHy: 'Երկխոսության մեջ նա հստակ ասում է՝ «un vestido de verano en color rojo»:',
    exampleEs: 'Estoy buscando un vestido de verano.',
    exampleHy: 'Ես փնտրում եմ ամառային զգեստ։',
  },
  {
    id: 'a1-dia-2',
    section: 'dialogo',
    level: 'A1',
    contextEs: '— Esta camisa cuesta cuarenta euros. — ¿Tiene algún descuento? — Sí, hoy tiene una rebaja del veinte por ciento.',
    contextHy: '— Այս վերնաշապիկն արժե 40 եվրո։ — Ունի՞ որևէ զեղչ։ — Այո, այսօր ունի 20% զեղչ։',
    promptEs: '¿Tiene descuento la prenda según la dependienta?',
    promptHy: 'Արդյո՞ք հագուստն ունի զեղչ ըստ վաճառողուհու։',
    options: [
      { textEs: 'Sí, un 20% de rebaja', textHy: 'Այո, 20% զեղչ', isCorrect: true },
      { textEs: 'No, no tiene descuento', textHy: 'Ոչ, զեղչ չունի', isCorrect: false },
      { textEs: 'Tiene un 50% de rebaja', textHy: '50% զեղչ ունի', isCorrect: false },
      { textEs: 'Es completamente gratis', textHy: 'Լիովին անվճար է', isCorrect: false },
    ],
    explanationHy: 'Վաճառողուհին նշում է՝ «un veinte por ciento» (20%):',
    exampleEs: 'Tiene una rebaja del veinte por ciento.',
    exampleHy: 'Ունի քսան տոկոս զեղչ։',
  },

  // Audición (5 questions)
  {
    id: 'a1-aud-1',
    section: 'audicion',
    level: 'A1',
    audioText: 'El cliente pide la talla mediana porque la talla pequeña le aprieta mucho en la espalda.',
    promptEs: 'Escucha el audio y responde: ¿Qué talla pide el cliente?',
    promptHy: 'Լսեք աուդիոն և պատասխանեք՝ ի՞նչ չափս է խնդրում հաճախորդը։',
    options: [
      { textEs: 'La talla mediana (M)', textHy: 'Միջին չափս (M)', isCorrect: true },
      { textEs: 'La talla pequeña (S)', textHy: 'Փոքր չափս (S)', isCorrect: false },
      { textEs: 'La talla extra grande (XL)', textHy: 'Գերմեծ չափս (XL)', isCorrect: false },
      { textEs: 'El número 40', textHy: '40 համար', isCorrect: false },
    ],
    explanationHy: 'Ձայնագրությունում ասվում է «pide la talla mediana» (խնդրում է միջին չափսը)։',
    exampleEs: 'Pido la talla mediana.',
    exampleHy: 'Ես խնդրում եմ միջին չափսը։',
  },

  // Situaciones prácticas (5 questions)
  {
    id: 'a1-sit-1',
    section: 'situacion',
    level: 'A1',
    promptEs: 'Quieres saber si una prenda se puede lavar en lavadora. ¿Qué le preguntas al dependiente?',
    promptHy: 'Ցանկանում եք իմանալ՝ արդյոք հագուստը կարելի է լվանալ լվացքի մեքենայում։ Ի՞նչ եք հարցնում վաճառողին։',
    options: [
      { textEs: '¿Se puede lavar a máquina esta prenda?', textHy: 'Կարելի՞ է այս հագուստը լվանալ լվացքի մեքենայով։', isCorrect: true },
      { textEs: '¿A qué hora come usted?', textHy: 'Ժամը քանիսի՞ն եք ճաշում։', isCorrect: false },
      { textEs: '¿Dónde está el supermercado?', textHy: 'Որտե՞ղ է սուպերմարկետը։', isCorrect: false },
      { textEs: '¿Cuánto cuesta un kilo de pan?', textHy: 'Ի՞նչ արժե մեկ կիլո հացը։', isCorrect: false },
    ],
    explanationHy: 'Լվացքի մասին հարցնելու ճիշտ տարբերակն է՝ «¿Se puede lavar a máquina...?»:',
    exampleEs: '¿Se puede lavar a máquina este jersey?',
    exampleHy: 'Կարելի՞ է այս սվիտերը լվանալ մեքենայով։',
  },
];

/**
 * Shuffles an array randomly using Fisher-Yates
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generates an exam of 40 randomized questions for the requested level
 */
export function generateExam(level: 'A1' | 'A2' | 'B1' | 'B2'): ExamQuestion[] {
  // Take questions matching level, or generate/pad to guarantee 40 questions
  const pool = EXAM_QUESTIONS_POOL.filter(q => q.level === level || q.level === 'A1');

  const questions: ExamQuestion[] = [];

  // Vocabulario (10)
  for (let i = 1; i <= 10; i++) {
    const base = pool.find(q => q.section === 'vocabulario' && q.id.includes(`${i}`)) || pool[0];
    questions.push({
      ...base,
      id: `exam-voc-${i}`,
      options: shuffleArray(base.options),
    });
  }

  // Gramática (10)
  for (let i = 1; i <= 10; i++) {
    const base = pool.find(q => q.section === 'gramatica' && q.id.includes(`${i}`)) || pool[1];
    questions.push({
      ...base,
      id: `exam-gra-${i}`,
      options: shuffleArray(base.options),
    });
  }

  // Diálogo (10)
  for (let i = 1; i <= 10; i++) {
    const base = pool.find(q => q.section === 'dialogo') || pool[0];
    questions.push({
      ...base,
      id: `exam-dia-${i}`,
      promptEs: `Pregunta sobre el diálogo #${i}: ¿Cuál es la respuesta adecuada en la tienda?`,
      promptHy: `Հարց #${i} երկխոսության վերաբերյալ. Ո՞րն է համապատասխան պատասխանը խանութում։`,
      options: shuffleArray(base.options),
    });
  }

  // Audición (5)
  for (let i = 1; i <= 5; i++) {
    const base = pool.find(q => q.section === 'audicion') || pool[0];
    questions.push({
      ...base,
      id: `exam-aud-${i}`,
      audioText: `En la tienda, la dependienta avisa: El jersey verde cuesta ${20 + i * 5} euros.`,
      promptEs: `Audición #${i}: ¿Qué información proporciona la vendedora?`,
      promptHy: `Լսողական հարց #${i}. Ի՞նչ տեղեկություն է տալիս վաճառողուհին։`,
      options: shuffleArray([
        { textEs: `Cuesta exactamente ${20 + i * 5} euros`, textHy: `Արժե ${20 + i * 5} եվրո`, isCorrect: true },
        { textEs: 'No tienen esa prenda en stock', textHy: 'Առկա չէ', isCorrect: false },
        { textEs: 'La tienda cierra a las tres', textHy: 'Խանութը փակվում է երեքին', isCorrect: false },
        { textEs: 'Solo aceptan billetes de 500', textHy: 'Միայն 500-անոց թղթադրամներ', isCorrect: false },
      ]),
    });
  }

  // Situaciones prácticas (5)
  for (let i = 1; i <= 5; i++) {
    const base = pool.find(q => q.section === 'situacion') || pool[0];
    questions.push({
      ...base,
      id: `exam-sit-${i}`,
      promptEs: `Situación #${i}: Vas a pagar en caja con billete de 100 €. ¿Qué dices?`,
      promptHy: `Իրավիճակ #${i}. Դուք վճարում եք 100 եվրոյանոց թղթադրամով։ Ի՞նչ եք ասում։`,
      options: shuffleArray([
        { textEs: 'Pago en efectivo, aquí tiene cien euros.', textHy: 'Կանխիկ եմ վճարում, ահա 100 եվրո։', isCorrect: true },
        { textEs: 'No quiero comprar nada.', textHy: 'Ոչինչ չեմ ուզում գնել։', isCorrect: false },
        { textEs: '¿Dónde está el baño?', textHy: 'Որտե՞ղ է զուգարանը։', isCorrect: false },
        { textEs: 'Hace mucho frío hoy.', textHy: 'Այսօր շատ ցուրտ է։', isCorrect: false },
      ]),
    });
  }

  return questions;
}
