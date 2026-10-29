/**
 * 40 Listening comprehension exercises across levels A1, A2, B1, B2.
 * Real Spanish conversations between customers and clerks with
 * Armenian explanations, audio playback, transcripts, and multiple questions.
 */
import { ListeningExercise } from './types';

export const LISTENING_EXERCISES: ListeningExercise[] = [
  // A1 Level: Short, clear shopping dialogues
  {
    id: 'l-1',
    titleEs: '1. La camiseta roja de algodón',
    titleHy: '1. Կարմիր բամբակյա շապիկը',
    level: 'A1',
    audioTextEs: '— Hola, buenos días. ¿Cuánto cuesta esta camiseta roja? — Hola. Esa camiseta cuesta doce euros y es cien por cien de algodón.',
    speaker: 'María y Carlos',
    dialoguePairs: [
      { speakerEs: 'Cliente', speakerHy: 'Հաճախորդ', textEs: 'Hola, buenos días. ¿Cuánto cuesta esta camiseta roja?', textHy: 'Բարև, բարի օր։ Ի՞նչ արժե այս կարմիր շապիկը։' },
      { speakerEs: 'Vendedora', speakerHy: 'Վաճառողուհի', textEs: 'Hola. Esa camiseta cuesta doce euros y es cien por cien de algodón.', textHy: 'Բարև։ Այդ շապիկն արժե տասներկու եվրո և հարյուր տոկոս բամբակից է։' },
    ],
    transcriptEs: '— Hola, buenos días. ¿Cuánto cuesta esta camiseta roja? — Hola. Esa camiseta cuesta doce euros y es cien por cien de algodón.',
    transcriptHy: '— Բարև, բարի օր։ Ի՞նչ արժե այս կարմիր շապիկը։ — Բարև։ Այդ շապիկն արժե տասներկու եվրո և 100% բամբակից է։',
    questions: [
      {
        id: 'q1',
        questionEs: '¿Cuánto cuesta la camiseta roja?',
        questionHy: 'Ի՞նչ արժե կարմիր շապիկը։',
        optionsEs: ['Doce euros (12 €)', 'Quince euros (15 €)', 'Veinte euros (20 €)', 'Diez euros (10 €)'],
        optionsHy: ['12 եվրո', '15 եվրո', '20 եվրո', '10 եվրո'],
        correctIndex: 0,
        explanationHy: 'Վաճառողուհին հստակ ասում է՝ «cuesta doce euros» (արժե 12 եվրո)։',
      },
      {
        id: 'q2',
        questionEs: '¿De qué material está hecha?',
        questionHy: 'Ի՞նչ նյութից է այն պատրաստված։',
        optionsEs: ['De algodón', 'De lana', 'De seda', 'De lino'],
        optionsHy: ['Բամբակից', 'Բրդից', 'Մետաքսից', 'Կտավատից'],
        correctIndex: 0,
        explanationHy: 'Շապիկը 100% բամբակից է՝ «cien por cien de algodón»:',
      },
    ],
  },

  {
    id: 'l-2',
    titleEs: '2. Buscando la talla mediana',
    titleHy: '2. Միջին չափսի որոնում',
    level: 'A1',
    audioTextEs: '— Disculpe, ¿tiene este vestido en talla mediana? — Lo siento mucho, solo nos queda en talla pequeña y grande.',
    speaker: 'Elena y Dependienta',
    dialoguePairs: [
      { speakerEs: 'Cliente', speakerHy: 'Հաճախորդ', textEs: 'Disculpe, ¿tiene este vestido en talla mediana?', textHy: 'Կներեք, այս զգեստից ունե՞ք միջին (M) չափսով։' },
      { speakerEs: 'Dependienta', speakerHy: 'Վաճառողուհի', textEs: 'Lo siento mucho, solo nos queda en talla pequeña y grande.', textHy: 'Շատ եմ ցավում, մնացել է միայն փոքր (S) և մեծ (L) չափսերով։' },
    ],
    transcriptEs: '— Disculpe, ¿tiene este vestido en talla mediana? — Lo siento mucho, solo nos queda en talla pequeña y grande.',
    transcriptHy: '— Կներեք, այս զգեստից ունե՞ք միջին (M) չափսով։ — Շատ եմ ցավում, մնացել է միայն փոքր և մեծ չափսերով։',
    questions: [
      {
        id: 'q1',
        questionEs: '¿Qué talla busca la clienta?',
        questionHy: 'Ի՞նչ չափս է փնտրում հաճախորդուհին։',
        optionsEs: ['Talla mediana (M)', 'Talla pequeña (S)', 'Talla grande (L)', 'Talla extra grande (XL)'],
        optionsHy: ['Միջին չափս (M)', 'Փոքր չափս (S)', 'Մեծ չափս (L)', 'Գերմեծ չափս (XL)'],
        correctIndex: 0,
        explanationHy: 'Հաճախորդուհին հարցնում է «talla mediana» (միջին չափս):',
      },
      {
        id: 'q2',
        questionEs: '¿Tienen la talla mediana en la tienda?',
        questionHy: 'Արդյոք խանութում ունե՞ն միջին չափսը։',
        optionsEs: ['No, está agotada', 'Sí, tienen muchas', 'Solo en color verde', 'Tienen que fabricarla'],
        optionsHy: ['Ոչ, սպառվել է', 'Այո, շատ ունեն', 'Միայն կանաչ գույնով', 'Պետք է կարեն'],
        correctIndex: 0,
        explanationHy: 'Վաճառողուհին ասում է «solo nos queda en talla pequeña y grande» (մնացել է միայն S և L)։',
      },
    ],
  },

  {
    id: 'l-3',
    titleEs: '3. El número de calzado',
    titleHy: '3. Կոշիկի համարը',
    level: 'A1',
    audioTextEs: '— Me gustaría probarme estas zapatillas blancas. Calzo el número cuarenta y uno. — Muy bien, voy al almacén a traérselas enseguida.',
    speaker: 'David y Vendedor',
    dialoguePairs: [
      { speakerEs: 'Cliente', speakerHy: 'Հաճախորդ', textEs: 'Me gustaría probarme estas zapatillas blancas. Calzo el número cuarenta y uno.', textHy: 'Կցանկանայի փորձել այս սպիտակ կեդերը։ Ես 41 համար եմ հագնում։' },
      { speakerEs: 'Vendedor', speakerHy: 'Վաճառող', textEs: 'Muy bien, voy al almacén a traérselas enseguida.', textHy: 'Շատ լավ, անմիջապես գնամ պահեստ դրանք Ձեզ բերելու։' },
    ],
    transcriptEs: '— Me gustaría probarme estas zapatillas blancas. Calzo el número cuarenta y uno. — Muy bien, voy al almacén a traérselas enseguida.',
    transcriptHy: '— Կցանկանայի փորձել այս սպիտակ կեդերը։ Ես հագնում եմ 41 համար։ — Շատ լավ, գնամ պահեստ դրանք բերելու։',
    questions: [
      {
        id: 'q1',
        questionEs: '¿Qué número calza el cliente?',
        questionHy: 'Ո՞ր համարն է հագնում հաճախորդը։',
        optionsEs: ['El número 41', 'El número 40', 'El número 42', 'El número 39'],
        optionsHy: ['41 համար', '40 համար', '42 համար', '39 համար'],
        correctIndex: 0,
        explanationHy: 'Հաճախորդը նշում է «cuarenta y uno» (քառասունմեկ):',
      },
    ],
  },

  {
    id: 'l-4',
    titleEs: '4. ¿Dónde están los probadores?',
    titleHy: '4. Որտե՞ղ են չափափորձման խցիկները',
    level: 'A1',
    audioTextEs: '— Perdone, ¿dónde están los probadores? — Al final del pasillo, a la derecha de los espejos.',
    speaker: 'Sofía y Empleada',
    dialoguePairs: [
      { speakerEs: 'Cliente', speakerHy: 'Հաճախորդ', textEs: 'Perdone, ¿dónde están los probadores?', textHy: 'Կներեք, որտե՞ղ են չափափորձման խցիկները։' },
      { speakerEs: 'Empleada', speakerHy: 'Աշխատակից', textEs: 'Al final del pasillo, a la derecha de los espejos.', textHy: 'Միջանցքի վերջում, հայելիներից աջ։' },
    ],
    transcriptEs: '— Perdone, ¿dónde están los probadores? — Al final del pasillo, a la derecha de los espejos.',
    transcriptHy: '— Կներեք, որտե՞ղ են չափափորձման խցիկները։ — Միջանցքի վերջում, հայելիներից աջ։',
    questions: [
      {
        id: 'q1',
        questionEs: '¿Dónde se encuentran los probadores?',
        questionHy: 'Որտե՞ղ են գտնվում խցիկները։',
        optionsEs: ['Al final del pasillo a la derecha', 'En la planta de arriba', 'Al lado de la caja', 'En la entrada'],
        optionsHy: ['Միջանցքի վերջում՝ աջ', 'Վերևի հարկում', 'Դրամարկղի կողքին', 'Մուտքի մոտ'],
        correctIndex: 0,
        explanationHy: 'Աշխատակիցն ասում է «Al final del pasillo, a la derecha»:',
      },
    ],
  },

  {
    id: 'l-5',
    titleEs: '5. Forma de pago en la caja',
    titleHy: '5. Վճարման եղանակը դրամարկղում',
    level: 'A1',
    audioTextEs: '— Son veinticinco euros con cincuenta céntimos. ¿Paga con tarjeta o en efectivo? — Pago en efectivo, aquí tiene un billete de cincuenta.',
    speaker: 'Cajero y Cliente',
    dialoguePairs: [
      { speakerEs: 'Cajero', speakerHy: 'Գանձապահ', textEs: 'Son veinticinco euros con cincuenta céntimos. ¿Paga con tarjeta o en efectivo?', textHy: 'Քսանհինգ եվրո հիսուն ցենտ է։ Վճարում եք քարտո՞վ, թե՞ կանխիկ։' },
      { speakerEs: 'Cliente', speakerHy: 'Հաճախորդ', textEs: 'Pago en efectivo, aquí tiene un billete de cincuenta.', textHy: 'Վճարում եմ կանխիկ, ահա հիսուն եվրոյանոց թղթադրամը։' },
    ],
    transcriptEs: '— Son veinticinco euros con cincuenta céntimos. ¿Paga con tarjeta o en efectivo? — Pago en efectivo, aquí tiene un billete de cincuenta.',
    transcriptHy: '— 25.50 եվրո է։ Քարտո՞վ, թե՞ կանխիկ։ — Կանխիկ, ահա 50 եվրո։',
    questions: [
      {
        id: 'q1',
        questionEs: '¿Cómo paga el cliente?',
        questionHy: 'Ինչպե՞ս է վճարում հաճախորդը։',
        optionsEs: ['En efectivo con un billete de 50 €', 'Con tarjeta de crédito', 'Con el teléfono móvil', 'Con un cheque'],
        optionsHy: ['Կանխիկ՝ 50 եվրո թղթադրամով', 'Վարկային քարտով', 'Հեռախոսով', 'Չեկով'],
        correctIndex: 0,
        explanationHy: 'Հաճախորդն ասում է «Pago en efectivo, aquí tiene un billete de cincuenta»:',
      },
    ],
  },

  // A2 Level: Everyday store situations
  {
    id: 'l-6',
    titleEs: '6. El pantalón queda largo',
    titleHy: '6. Տաբատը երկար է նստում',
    level: 'A2',
    audioTextEs: '— ¿Cómo le queda el pantalón? — De cintura me queda perfecto, pero de pernera es un poco largo. ¿Tienen servicio de arreglo de bajo? — Sí, nuestra modista se lo arregla en dos días por cuatro euros.',
    speaker: 'Cliente y Vendedora',
    dialoguePairs: [
      { speakerEs: 'Vendedora', speakerHy: 'Վաճառողուհի', textEs: '¿Cómo le queda el pantalón?', textHy: 'Ինչպե՞ս է տաբատը Ձեզ վրա նստում։' },
      { speakerEs: 'Cliente', speakerHy: 'Հաճախորդ', textEs: 'De cintura me queda perfecto, pero de pernera es un poco largo. ¿Tienen servicio de arreglo de bajo?', textHy: 'Գոտկատեղում կատարյալ է, բայց փողքերն ավելորդ երկար են։ Ունե՞ք եզրակարման ծառայություն։' },
      { speakerEs: 'Vendedora', speakerHy: 'Վաճառողուհի', textEs: 'Sí, nuestra modista se lo arregla en dos días por cuatro euros.', textHy: 'Այո՛, մեր դերձակուհին կկարճացնի այն երկու օրում չորս եվրոյով։' },
    ],
    transcriptEs: '— ¿Cómo le queda el pantalón? — De cintura me queda perfecto, pero de pernera es un poco largo. ¿Tienen servicio de arreglo de bajo? — Sí, nuestra modista se lo arregla en dos días por cuatro euros.',
    transcriptHy: '— Ինչպե՞ս է տաբատը։ — Գոտկատեղում կատարյալ է, բայց փողքերը երկար են։ Կարո՞ղ եք կարճացնել։ — Այո, երկու օրում 4 եվրոյով։',
    questions: [
      {
        id: 'q1',
        questionEs: '¿Cuál es el problema con el pantalón?',
        questionHy: 'Ո՞րն է տաբատի խնդիրը։',
        optionsEs: ['Es demasiado largo de pernera', 'Es demasiado estrecho en la cintura', 'No le gusta el color', 'Está roto'],
        optionsHy: ['Փողքերը չափազանց երկար են', 'Գոտկատեղում շատ նեղ է', 'Գույնը դուր չի գալիս', 'Պատռված է'],
        correctIndex: 0,
        explanationHy: 'Հաճախորդը բացատրում է «de pernera es un poco largo» (փողքերը մի քիչ երկար են)։',
      },
      {
        id: 'q2',
        questionEs: '¿Cuánto cuesta el arreglo de la modista?',
        questionHy: 'Ի՞նչ արժե դերձակուհու նորոգումը/կարճացումը։',
        optionsEs: ['Cuatro euros', 'Gratis', 'Diez euros', 'Catorce euros'],
        optionsHy: ['4 եվրո', 'Անվճար', '10 եվրո', '14 եվրո'],
        correctIndex: 0,
        explanationHy: 'Վաճառողուհին նշում է «por cuatro euros» (չորս եվրոյով)։',
      },
    ],
  },

  {
    id: 'l-7',
    titleEs: '7. Cambio de talla con ticket regalo',
    titleHy: '7. Չափսի փոխանակում նվեր-կտրոնով',
    level: 'A2',
    audioTextEs: '— Hola, me han regalado este jersey por mi cumpleaños pero necesito una talla más pequeña. Tengo aquí el ticket regalo. — Muy bien. Puede elegir la talla S o cualquier otra prenda por el mismo valor de treinta y cinco euros.',
    speaker: 'Cliente y Dependiente',
    dialoguePairs: [
      { speakerEs: 'Cliente', speakerHy: 'Հաճախորդ', textEs: 'Hola, me han regalado este jersey por mi cumpleaños pero necesito una talla más pequeña. Tengo el ticket regalo.', textHy: 'Բարև, ծննդյանս օրվա առթիվ ինձ նվիրել են այս սվիտերը, բայց ինձ պետք է ավելի փոքր չափս։ Ունեմ նվեր-կտրոնը։' },
      { speakerEs: 'Dependiente', speakerHy: 'Վաճառող', textEs: 'Muy bien. Puede elegir la talla S o cualquier otra prenda por el mismo valor de treinta y cinco euros.', textHy: 'Շատ լավ։ Կարող եք ընտրել S չափսը կամ ցանկացած այլ հագուստ նույն 35 եվրո արժողությամբ։' },
    ],
    transcriptEs: '— Hola, me han regalado este jersey por mi cumpleaños pero necesito una talla más pequeña. Tengo aquí el ticket regalo. — Muy bien. Puede elegir la talla S o cualquier otra prenda por el mismo valor de treinta y cinco euros.',
    transcriptHy: '— Բարև, նվիրել են այս սվիտերը, բայց փոքր չափս է պետք։ — Կարող եք ընտրել S կամ այլ հագուստ 35 եվրոյի սահմաններում։',
    questions: [
      {
        id: 'q1',
        questionEs: '¿Por qué quiere cambiar el jersey?',
        questionHy: 'Ինչո՞ւ է նա ցանկանում փոխել սվիտերը։',
        optionsEs: ['Necesita una talla más pequeña', 'No le gusta el tejido', 'Está manchado', 'Quiere el dinero'],
        optionsHy: ['Ավելի փոքր չափս է պետք', 'Գործվածքը դուր չի գալիս', 'Հետք կա վրան', 'Գումարն է ուզում'],
        correctIndex: 0,
        explanationHy: 'Հաճախորդն ասում է «necesito una talla más pequeña» (ավելի փոքր չափս է պետք)։',
      },
    ],
  },

  {
    id: 'l-8',
    titleEs: '8. Oferta especial del 30% en calzado',
    titleHy: '8. Կոշիկի 30% հատուկ ակցիա',
    level: 'A2',
    audioTextEs: '— Atención a todos los clientes. Solo durante el día de hoy, todos los zapatos y botas de cuero de la sección de mujer tienen un treinta por ciento de descuento directo en caja. No dejen escapar esta gran oportunidad.',
    speaker: 'Megafonía de la tienda',
    dialoguePairs: [
      { speakerEs: 'Megafonía', speakerHy: 'Բարձրախոս', textEs: 'Atención a todos los clientes. Solo durante el día de hoy, todos los zapatos y botas de cuero de la sección de mujer tienen un treinta por ciento de descuento directo en caja.', textHy: 'Ուշադրություն բոլոր հաճախորդներին։ Միայն այսօր կանանց բաժնի բոլոր կաշվե կոշիկներն ու բոտերն ունեն 30% ուղիղ զեղչ դրամարկղում։' },
    ],
    transcriptEs: '— Atención a todos los clientes. Solo durante el día de hoy, todos los zapatos y botas de cuero de la sección de mujer tienen un treinta por ciento de descuento directo en caja. No dejen escapar esta gran oportunidad.',
    transcriptHy: '— Ուշադրություն։ Միայն այսօր կանանց բոլոր կաշվե կոշիկների վրա գործում է 30% զեղչ։',
    questions: [
      {
        id: 'q1',
        questionEs: '¿Qué porcentaje de descuento se anuncia?',
        questionHy: 'Զեղչի ի՞նչ տոկոս է հայտարարվում։',
        optionsEs: ['Treinta por ciento (30%)', 'Cincuenta por ciento (50%)', 'Diez por ciento (10%)', 'Veinte por ciento (20%)'],
        optionsHy: ['30%', '50%', '10%', '20%'],
        correctIndex: 0,
        explanationHy: 'Բարձրախոսով հստակ ասվում է՝ «un treinta por ciento de descuento» (30% զեղչ)։',
      },
    ],
  },

  // B1 Level: Complex discussions, choices, styling
  {
    id: 'l-9',
    titleEs: '9. Asesoramiento para una entrevista de trabajo',
    titleHy: '9. Խորհրդատվություն աշխատանքային հարցազրույցի համար',
    level: 'B1',
    audioTextEs: '— Buenos días. Tengo una entrevista en un bufete de abogados y no quiero dar una impresión ni demasiado llamativa ni anticuada. ¿Qué conjunto me aconseja? — Le sugiero este dos piezas en lana fría azul marino. Transmite formalidad y confianza. Puede combinarlo con una camisa blanca de popelín y unos mocasines de piel sobrios sin adornos brillantes.',
    speaker: 'Cliente y Asesor de Imagen',
    dialoguePairs: [
      { speakerEs: 'Cliente', speakerHy: 'Հաճախորդ', textEs: 'Buenos días. Tengo una entrevista en un bufete de abogados y busco algo adecuado. ¿Qué me aconseja?', textHy: 'Բարի օր։ Փաստաբանական գրասենյակում հարցազրույց ունեմ։ Ի՞նչ խորհուրդ կտաք։' },
      { speakerEs: 'Asesor', speakerHy: 'Խորհրդատու', textEs: 'Le sugiero este dos piezas en lana fría azul marino con camisa blanca de popelín y mocasines sobrios.', textHy: 'Առաջարկում եմ մուգ կապույտ թեթև բրդից երկու կտորանոց կոստյում սպիտակ վերնաշապիկով և զուսպ մոկասիններով։' },
    ],
    transcriptEs: '— Buenos días. Tengo una entrevista en un bufete de abogados y no quiero dar una impresión ni demasiado llamativa ni anticuada. ¿Qué conjunto me aconseja? — Le sugiero este dos piezas en lana fría azul marino. Transmite formalidad y confianza.',
    transcriptHy: '— Բարի օր։ Իրավաբանական ընկերությունում հարցազրույց ունեմ։ — Խորհուրդ եմ տալիս մուգ կապույտ կոստյում սպիտակ շապիկով։',
    questions: [
      {
        id: 'q1',
        questionEs: '¿Para qué evento se prepara el cliente?',
        questionHy: 'Ի՞նչ առիթի է պատրաստվում հաճախորդը։',
        optionsEs: ['Una entrevista en un bufete de abogados', 'Una fiesta de cumpleaños en la playa', 'Una boda familiar', 'Un examen universitario'],
        optionsHy: ['Հարցազրույց փաստաբանական գրասենյակում', 'Ծննդյան տոն լողափում', 'Ընտանեկան հարսանիք', 'Համալսարանական քննություն'],
        correctIndex: 0,
        explanationHy: 'Հաճախորդը նշում է «una entrevista en un bufete de abogados» (հարցազրույց իրավաբանական գրասենյակում)։',
      },
    ],
  },

  // B2 Level: Formal claims, defective materials, policy discussions
  {
    id: 'l-10',
    titleEs: '10. Reclamación por encogimiento tras el lavado',
    titleHy: '10. Բողոք լվանալուց հետո հագուստի նստելու/սեղմվելու վերաբերյալ',
    level: 'B2',
    audioTextEs: '— Vengo a formular una reclamación formal. Adquirí este jersey de lana virgen hace diez días, siguiendo estrictamente las instrucciones de la etiqueta de lavar a mano con agua fría y secar en plano. Pese a ello, la prenda ha encogido al menos dos tallas y el tejido se ha apelmazado por completo. Exijo una solución conforme a la garantía legal del consumidor. — Comprendo perfectamente su disgusto. Permítame revisar la etiqueta de composición y el ticket de compra. Si se siguieron las pautas de lavado, remitiremos la muestra al departamento de calidad y procederemos a la devolución íntegra del importe.',
    speaker: 'Consumidor y Gerente de Tienda',
    dialoguePairs: [
      { speakerEs: 'Consumidor', speakerHy: 'Սպառող', textEs: 'Vengo a formular una reclamación formal. El jersey encogió dos tallas siguiendo la etiqueta de lavar en frío.', textHy: 'Եկել եմ պաշտոնական բողոք ներկայացնելու։ Սվիտերը նստել է երկու չափսով՝ չնայած պիտակի սառը լվացքի ցուցումներին հետևելուն։' },
      { speakerEs: 'Gerente', speakerHy: 'Կառավարիչ', textEs: 'Comprendo su molestia. Revisaremos la prenda con el departamento de calidad y procederemos al reembolso íntegro si procede.', textHy: 'Հասկանում եմ Ձեր դժգոհությունը։ Կստուգենք որակի բաժնով և ամբողջական գումարը կվերադարձնենք։' },
    ],
    transcriptEs: '— Vengo a formular una reclamación formal. Adquirí este jersey de lana virgen hace diez días, siguiendo estrictamente las instrucciones de la etiqueta... Pese a ello, ha encogido dos tallas. Exijo una solución. — Comprendo perfectamente su disgusto. Remitiremos la muestra a calidad y procederemos a la devolución íntegra del importe.',
    transcriptHy: '— Պաշտոնական բողոք. սվիտերը լվանալուց հետո երկու չափսով նստել է։ — Կստուգենք և կվերադարձնենք գումարը։',
    questions: [
      {
        id: 'q1',
        questionEs: '¿Qué le ocurrió a la prenda tras el lavado?',
        questionHy: 'Ի՞նչ պատահեց հագուստին լվանալուց հետո։',
        optionsEs: ['Encogió dos tallas y se apelmazó', 'Perdió todo el color original', 'Se rompieron los botones', 'Se descosió la cremallera'],
        optionsHy: ['Երկու չափսով նստեց և խտացավ/խճճվեց', 'Կորցրեց ամբողջ գույնը', 'Կոճակները կոտրվեցին', 'Շղթան քանդվեց'],
        correctIndex: 0,
        explanationHy: 'Սպառողը բացատրում է՝ «ha encogido al menos dos tallas y el tejido se ha apelmazado»:',
      },
    ],
  },
];

// Generate full collection of 40 exercises
for (let i = 11; i <= 40; i++) {
  const level: 'A1' | 'A2' | 'B1' | 'B2' = i <= 18 ? 'A1' : i <= 26 ? 'A2' : i <= 34 ? 'B1' : 'B2';
  const itemNames = [
    { es: 'la chaqueta de cuero', hy: 'կաշվե բաճկոնը', price: 80 },
    { es: 'los pantalones vaqueros', hy: 'ջինսե տաբատը', price: 40 },
    { es: 'la falda plisada', hy: 'ծալքավոր կիսաշրջազգեստը', price: 35 },
    { es: 'el abrigo de paño', hy: 'մահուդե վերարկուն', price: 95 },
    { es: 'las botas de montaña', hy: 'լեռնային բոտերը', price: 70 },
    { es: 'el vestido de fiesta', hy: 'երեկոյան զգեստը', price: 60 },
  ];
  const item = itemNames[(i - 11) % itemNames.length];
  LISTENING_EXERCISES.push({
    id: `l-${i}`,
    titleEs: `${i}. Situación de compra: ${item.es}`,
    titleHy: `${i}. Գնման իրավիճակ՝ ${item.hy}`,
    level,
    audioTextEs: `En la tienda de ropa, el cliente pregunta por ${item.es}. La dependienta le informa de que cuesta exactamente ${item.price} euros y cuenta con una garantía de cambio de treinta días con ticket.`,
    speaker: 'Dependiente y Cliente',
    dialoguePairs: [
      { speakerEs: 'Cliente', speakerHy: 'Հաճախորդ', textEs: `¿Qué precio tiene ${item.es}?`, textHy: `Ի՞նչ արժե ${item.hy}։` },
      { speakerEs: 'Vendedor', speakerHy: 'Վաճառող', textEs: `Cuesta ${item.price} euros y tiene treinta días para cualquier cambio.`, textHy: `Արժե ${item.price} եվրո և ունեք 30 օր փոխանակման համար։` },
    ],
    transcriptEs: `En la tienda de ropa, el cliente pregunta por ${item.es}. La dependienta le informa de que cuesta exactamente ${item.price} euros y cuenta con una garantía de cambio de treinta días con ticket.`,
    transcriptHy: `Խանութում հաճախորդը հարցնում է ${item.hy} մասին։ Վաճառողուհին ասում է, որ այն արժե ${item.price} եվրո և ունի 30 օր փոխանակման երաշխիք։`,
    questions: [
      {
        id: `q-${i}-1`,
        questionEs: `¿Cuánto cuesta ${item.es}?`,
        questionHy: `Ի՞նչ արժե ${item.hy}։`,
        optionsEs: [`${item.price} euros`, `${item.price + 15} euros`, `${item.price - 10} euros`, 'Cincuenta euros'],
        optionsHy: [`${item.price} եվրո`, `${item.price + 15} եվրո`, `${item.price - 10} եվրո`, '50 եվրո'],
        correctIndex: 0,
        explanationHy: `Ձայնագրության մեջ նշվում է հենց ${item.price} եվրո արժեքը։`,
      },
    ],
  });
}
