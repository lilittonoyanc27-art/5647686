/**
 * 21 comprehensive Spanish grammar topics with clothing & shopping contexts,
 * complete with Spanish theory, Armenian explanations, real examples, and interactive quizzes.
 */
import { GrammarTopic } from './types';

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'g-querer',
    titleEs: 'Querer + infinitivo',
    titleHy: 'Querer + անորոշ դերբայ (Ցանկանալ + բայ)',
    level: 'A1',
    icon: '💭',
    summaryEs: 'Se utiliza para expresar deseos o intenciones de compra.',
    summaryHy: 'Օգտագործվում է ցանկություն կամ գնման մտադրություն արտահայտելու համար։',
    theoryEs: [
      'El verbo "querer" es irregular con cambio vocálico: (e -> ie).',
      'Yo quiero, Tú quieres, Él/Ella quiere, Nosotros queremos, Vosotros queréis, Ellos quieren.',
      'Cuando va seguido de otro verbo, este segundo verbo siempre va en infinitivo (forma básica sin conjugar).',
    ],
    theoryHy: [
      '«Querer» (ուզել, ցանկանալ) բայը անկանոն է՝ արմատական ձայնավորի փոփոխությամբ (e -> ie):',
      'Խոնարհումը՝ Yo quiero (ես ուզում եմ), Tú quieres (դու ուզում ես), Él/Ella quiere (նա ուզում է), Nosotros queremos (մենք ուզում ենք), Vosotros queréis (դուք ուզում եք), Ellos quieren (նրանք ուզում են):',
      'Երբ այն զուգորդվում է մեկ այլ բայի հետ, երկրորդ բայը միշտ մնում է անորոշ ձևով (infinitivo):',
    ],
    rules: [
      {
        ruleEs: 'Quiero + verbo en infinitivo',
        ruleHy: 'Quiero + անորոշ բայ',
        exampleEs: 'Quiero comprar una camisa blanca.',
        exampleHy: 'Ես ուզում եմ գնել սպիտակ վերնաշապիկ։',
      },
      {
        ruleEs: '¿Quieres + verbo en infinitivo?',
        ruleHy: '¿Quieres + անորոշ բայ (հարցական)',
        exampleEs: '¿Quieres probarte estos pantalones?',
        exampleHy: 'Ուզո՞ւմ ես փորձել այս տաբատը։',
      },
    ],
    quiz: [
      {
        questionEs: 'Yo ________ (querer) comprar una chaqueta negra.',
        questionHy: 'Ես ուզում եմ գնել սև բաճկոն։',
        options: ['quiero', 'quieres', 'quiere', 'queremos'],
        correctIndex: 0,
        explanationHy: '«Yo» (ես) դերանվան համար «querer» բայի ճիշտ ձևն է «quiero»:',
      },
      {
        questionEs: '¿Qué ________ (querer / tú) comprar hoy?',
        questionHy: 'Ի՞նչ ես ուզում գնել այսօր։',
        options: ['quiero', 'quieres', 'quiere', 'quieren'],
        correctIndex: 1,
        explanationHy: '«Tú» (դու) դերանվան համար ճիշտ է «quieres»-ը։',
      },
    ],
  },

  {
    id: 'g-necesitar',
    titleEs: 'Necesitar + infinitivo',
    titleHy: 'Necesitar + անորոշ դերբայ (Կարիք ունենալ, պետք լինել)',
    level: 'A1',
    icon: '🆘',
    summaryEs: 'Expresa una necesidad indispensable en la tienda.',
    summaryHy: 'Արտահայտում է խիստ անհրաժեշտություն խանութում։',
    theoryEs: [
      'El verbo "necesitar" es un verbo regular de la primera conjugación (-ar).',
      'Yo necesito, Tú necesitas, Él/Ella necesita, Nosotros necesitamos, Vosotros necesitáis, Ellos necesitan.',
      'Se usa con sustantivos directos o con verbos en infinitivo.',
    ],
    theoryHy: [
      '«Necesitar» (կարիք ունենալ, անհրաժեշտ լինել) բայը կանոնավոր է (-ar վերջավորությամբ):',
      'Խոնարհումը՝ necesito, necesitas, necesita, necesitamos, necesitáis, necesitan:',
      'Կարող է օգտագործվել ինչպես ուղիղ գոյականի հետ (Necesito una talla 40), այնպես էլ անորոշ բայի հետ (Necesito cambiar esta ropa):',
    ],
    rules: [
      {
        ruleEs: 'Necesito + sustantivo',
        ruleHy: 'Necesito + գոյական',
        exampleEs: 'Necesito una talla más grande.',
        exampleHy: 'Ինձ պետք է մեկ չափս ավելի մեծը։',
      },
      {
        ruleEs: 'Necesito + infinitivo',
        ruleHy: 'Necesito + անորոշ բայ',
        exampleEs: 'Necesito cambiar este vestido porque me queda ancho.',
        exampleHy: 'Ինձ պետք է փոխել այս զգեստը, որովհետև այն լայն է ինձ վրա։',
      },
    ],
    quiz: [
      {
        questionEs: 'Nosotros ________ unos zapatos cómodos.',
        questionHy: 'Մեզ պետք են հարմարավետ կոշիկներ։',
        options: ['necesitamos', 'necesito', 'necesitan', 'necesita'],
        correctIndex: 0,
        explanationHy: '«Nosotros»-ի համար ճիշտ խոնարհումն է «necesitamos»:',
      },
    ],
  },

  {
    id: 'g-tener-que',
    titleEs: 'Tener que + infinitivo',
    titleHy: 'Tener que + անորոշ դերբայ (Պարտավոր լինել, պետք է)',
    level: 'A1',
    icon: '⚡',
    summaryEs: 'Obligación o necesidad ineludible al comprar o pagar.',
    summaryHy: 'Պարտադիր անհրաժեշտություն կամ պարտավորություն գնելիս կամ վճարելիս։',
    theoryEs: [
      'Tener es irregular: tengo, tienes, tiene, tenemos, tenéis, tienen.',
      'La estructura "tener que + infinitivo" expresa obligación personal.',
    ],
    theoryHy: [
      '«Tener»-ը անկանոն բայ է (tengo, tienes, tiene, tenemos, tenéis, tienen):',
      '«Tener que + infinitivo» կառույցը թարգմանվում է որպես «պետք է անել / պարտավոր եմ անել»:',
    ],
    rules: [
      {
        ruleEs: 'Tengo que + infinitivo',
        ruleHy: 'Tengo que + անորոշ բայ',
        exampleEs: 'Tengo que pagar en la caja.',
        exampleHy: 'Ես պետք է վճարեմ դրամարկղում։',
      },
    ],
    quiz: [
      {
        questionEs: 'Tú ________ pagar antes de salir de la tienda.',
        questionHy: 'Դու պետք է վճարես խանութից դուրս գալուց առաջ։',
        options: ['tienes que', 'tengo que', 'tiene que', 'tenemos que'],
        correctIndex: 0,
        explanationHy: '«Tú»-ի համար ճիշտ է «tienes que»:',
      },
    ],
  },

  {
    id: 'g-poder',
    titleEs: 'Poder + infinitivo',
    titleHy: 'Poder + անորոշ դերբայ (Կարողանալ / Թույլտվություն)',
    level: 'A1',
    icon: '🔑',
    summaryEs: 'Pedir permiso, preguntar si es posible hacer algo en la tienda.',
    summaryHy: 'Թույլտվություն խնդրել, հարցնել՝ արդյոք հնարավոր է փորձել կամ վճարել։',
    theoryEs: [
      'Verbo irregular con cambio vocálico: (o -> ue). Puedo, puedes, puede, podemos, podéis, pueden.',
      'Se usa para preguntas de cortesía al dependiente: "¿Puedo probarme...?", "¿Puede ayudarme...?"',
    ],
    theoryHy: [
      'Անկանոն բայ (o -> ue): Puedo, puedes, puede, podemos, podéis, pueden:',
      'Օգտագործվում է վաճառողին ուղղված քաղաքավարի խնդրանքների համար՝ «Կարո՞ղ եմ փորձել...», «Կարո՞ղ եք օգնել ինձ...»:',
    ],
    rules: [
      {
        ruleEs: '¿Puedo + infinitivo?',
        ruleHy: '¿Puedo + անորոշ բայ (Կարո՞ղ եմ ես...)',
        exampleEs: '¿Puedo probarme este vestido en el probador?',
        exampleHy: 'Կարո՞ղ եմ փորձել այս զգեստը հանդերձարանում։',
      },
    ],
    quiz: [
      {
        questionEs: '¿________ (usted / poder) decirme el precio de esta chaqueta?',
        questionHy: 'Կարո՞ղ եք (Դուք) ասել ինձ այս բաճկոնի գինը։',
        options: ['Puede', 'Puedo', 'Puedes', 'Pueden'],
        correctIndex: 0,
        explanationHy: '«Usted» (Դուք՝ հարգալից) ձևի համար օգտագործվում է «Puede»:',
      },
    ],
  },

  {
    id: 'g-gustar',
    titleEs: 'El verbo Gustar',
    titleHy: 'Gustar բայը (Դուր գալ, սիրել)',
    level: 'A1',
    icon: '💖',
    summaryEs: 'Estructura especial con pronombres de objeto indirecto.',
    summaryHy: 'Հատուկ կառույց անուղղակի խնդրի դերանուններով (ինձ դուր է գալիս)։',
    theoryEs: [
      'No se conjuga como otros verbos. Solo usa "gusta" (singular) y "gustan" (plural).',
      'Requiere pronombres: me, te, le, nos, os, les.',
      'Me gusta la camiseta (singular) / Me gustan los zapatos (plural).',
    ],
    theoryHy: [
      'Չի խոնարհվում սովորական բայերի պես։ Օգտագործվում են հիմնականում «gusta» (եզակի) և «gustan» (հոգնակի) ձևերը։',
      'Պահանջում է դերանուններ՝ me (ինձ), te (քեզ), le (նրան), nos (մեզ), os (ձեզ), les (նրանց)։',
      'Եթե գոյականը եզակի է կամ բայ է՝ gusta: Եթե հոգնակի է՝ gustan:',
    ],
    rules: [
      {
        ruleEs: 'Me gusta + sustantivo singular / infinitivo',
        ruleHy: 'Me gusta + եզակի գոյական կամ անորոշ բայ',
        exampleEs: 'Me gusta este color azul.',
        exampleHy: 'Ինձ դուր է գալիս այս կապույտ գույնը։',
      },
      {
        ruleEs: 'Me gustan + sustantivo plural',
        ruleHy: 'Me gustan + հոգնակի գոյական',
        exampleEs: 'Me gustan mucho esas botas marrones.',
        exampleHy: 'Ինձ շատ են դուր գալիս այդ շագանակագույն բոտերը։',
      },
    ],
    quiz: [
      {
        questionEs: 'A mí me ________ esos pantalones vaqueros.',
        questionHy: 'Ինձ դուր են գալիս այդ ջինսե տաբատները։',
        options: ['gustan', 'gusta', 'gusto', 'gustas'],
        correctIndex: 0,
        explanationHy: 'Քանի որ «los pantalones»-ը հոգնակի թիվ է, պետք է օգտագործել «gustan»:',
      },
    ],
  },

  {
    id: 'g-preferir',
    titleEs: 'El verbo Preferir',
    titleHy: 'Preferir բայը (Նախընտրել, գերադասել)',
    level: 'A2',
    icon: '⚖️',
    summaryEs: 'Elegir entre diferentes prendas, tallas o colores.',
    summaryHy: 'Տարբեր հագուստների, չափսերի կամ գույների միջև ընտրություն կատարել։',
    theoryEs: [
      'Verbo con cambio vocálico: (e -> ie). Prefiero, prefieres, prefiere, preferimos, preferís, prefieren.',
      'Estructura: Preferir + [cosa A] + a + [cosa B].',
    ],
    theoryHy: [
      'Արմատական փոփոխությամբ բայ (e -> ie): Prefiero, prefieres, prefiere, preferimos, preferís, prefieren:',
      'Կառույցը՝ Նախընտրել A-ն B-ից (Prefiero el rojo al azul):',
    ],
    rules: [
      {
        ruleEs: 'Prefiero + prenda',
        ruleHy: 'Prefiero + հագուստ',
        exampleEs: 'Prefiero la falda negra a la falda roja.',
        exampleHy: 'Ես նախընտրում եմ սև կիսաշրջազգեստը կարմիրից։',
      },
    ],
    quiz: [
      {
        questionEs: '¿Cuál de las dos camisas ________ tú?',
        questionHy: 'Այս երկու վերնաշապիկներից ո՞րն ես դու նախընտրում։',
        options: ['prefieres', 'prefiero', 'prefiere', 'preferimos'],
        correctIndex: 0,
        explanationHy: '«Tú» դերանվան համար ճիշտ է «prefieres»:',
      },
    ],
  },

  {
    id: 'g-costar',
    titleEs: 'El verbo Costar',
    titleHy: 'Costar բայը (Արժենալ, գին ունենալ)',
    level: 'A1',
    icon: '💶',
    summaryEs: 'Preguntar y responder sobre los precios de las prendas.',
    summaryHy: 'Հագուստի գների մասին հարցնելն ու պատասխանելը։',
    theoryEs: [
      'Verbo con diptongación: (o -> ue). Solo se usan: "cuesta" (singular) y "cuestan" (plural).',
      '¿Cuánto cuesta la falda? — Cuesta veinte euros.',
      '¿Cuánto cuestan los zapatos? — Cuestan cincuenta euros.',
    ],
    theoryHy: [
      'Բայ (o -> ue) փոփոխությամբ։ Օգտագործվում են գրեթե միայն «cuesta» (եզակի) և «cuestan» (հոգնակի) ձևերը։',
      'Ի՞նչ արժե կիսաշրջազգեստը։ — Արժե քսան եվրո (Cuesta):',
      'Ի՞նչ արժեն կոշիկները։ — Արժեն հիսուն եվրո (Cuestan):',
    ],
    rules: [
      {
        ruleEs: '¿Cuánto cuesta + singular?',
        ruleHy: 'Ի՞նչ արժե + եզակի',
        exampleEs: '¿Cuánto cuesta este abrigo de lana?',
        exampleHy: 'Ի՞նչ արժե բրդյա այս վերարկուն։',
      },
      {
        ruleEs: '¿Cuánto cuestan + plural?',
        ruleHy: 'Ի՞նչ արժեն + հոգնակի',
        exampleEs: '¿Cuánto cuestan estas gafas de sol?',
        exampleHy: 'Ի՞նչ արժեն այս արևային ակնոցները։',
      },
    ],
    quiz: [
      {
        questionEs: '¿Cuánto ________ esas zapatillas de deporte?',
        questionHy: 'Ի՞նչ արժեն այդ սպորտային կոշիկները։',
        options: ['cuestan', 'cuesta', 'costar', 'cuesten'],
        correctIndex: 0,
        explanationHy: 'Քանի որ «las zapatillas»-ը հոգնակի է, ճիշտ է «cuestan»:',
      },
    ],
  },

  {
    id: 'g-llevar',
    titleEs: 'El verbo Llevar',
    titleHy: 'Llevar բայը (Հագնել, կրել, տանել)',
    level: 'A1',
    icon: '👗',
    summaryEs: 'Describir qué ropa lleva puesta una persona.',
    summaryHy: 'Նկարագրել, թե ինչ հագուստ է կրում տվյալ մարդը։',
    theoryEs: [
      'Llevar es un verbo regular de la primera conjugación: llevo, llevas, lleva, llevamos, lleváis, llevan.',
      'Significa vestir o portar una prenda, accesorio o color.',
    ],
    theoryHy: [
      '«Llevar»-ը կանոնավոր բայ է (llevo, llevas, lleva, llevamos, lleváis, llevan):',
      'Նշանակում է հագնել, կրել կամ վերցնել/տանել գնումը (Me lo llevo — Ես վերցնում եմ այն):',
    ],
    rules: [
      {
        ruleEs: 'Llevar + prenda',
        ruleHy: 'Llevar + հագուստ',
        exampleEs: 'Hoy llevo una camiseta verde y vaqueros.',
        exampleHy: 'Այսօր ես հագել եմ կանաչ շապիկ և ջինսեր։',
      },
      {
        ruleEs: 'Me lo llevo / Me la llevo',
        ruleHy: 'Ես վերցնում/գնում եմ այն (խանութում)',
        exampleEs: 'Me gusta mucho este suéter, me lo llevo.',
        exampleHy: 'Շատ է դուր գալիս այս սվիտերը, վերցնում եմ այն։',
      },
    ],
    quiz: [
      {
        questionEs: 'Mi hermano ________ una camisa a cuadros muy bonita.',
        questionHy: 'Եղբայրս հագել է շատ գեղեցիկ վանդակավոր վերնաշապիկ։',
        options: ['lleva', 'llevo', 'llevas', 'llevan'],
        correctIndex: 0,
        explanationHy: '«Mi hermano» (նա՝ él) ձևի համար օգտագործվում է «lleva»:',
      },
    ],
  },

  {
    id: 'g-ponerse',
    titleEs: 'El verbo Ponerse',
    titleHy: 'Ponerse անդրադարձ բայը (Հագնել, վրան դնել)',
    level: 'A2',
    icon: '👕',
    summaryEs: 'Verbo reflexivo para el acto de vestirse con una prenda.',
    summaryHy: 'Անդրադարձ բայ՝ հագուստը մարմնի վրա հագնելու գործողությունը նշելու համար։',
    theoryEs: [
      'Ponerse es un verbo irregular en la primera persona: me pongo, te pones, se pone, nos ponemos, os ponéis, se ponen.',
      'Requiere siempre los pronombres reflexivos: me, te, se, nos, os, se.',
    ],
    theoryHy: [
      '«Ponerse»-ն անկանոն է առաջին դեմքում (me pongo):',
      'Անդրադարձ խոնարհումը՝ me pongo, te pones, se pone, nos ponemos, os ponéis, se ponen:',
      'Նշանակում է հագնել (վրան դնել). Me pongo el abrigo porque hace frío (Հագնում եմ վերարկուն, որովհետև ցուրտ է)։',
    ],
    rules: [
      {
        ruleEs: 'Pronombre + poner conjugado + prenda',
        ruleHy: 'Անդրադարձ դերանուն + poner + հագուստ',
        exampleEs: '¿Qué te vas a poner para la fiesta de esta noche?',
        exampleHy: 'Ի՞նչ ես հագնելու այս երեկոյի տոնակատարության համար։',
      },
    ],
    quiz: [
      {
        questionEs: 'Cuando hace frío, yo siempre me ________ los guantes de lana.',
        questionHy: 'Երբ ցուրտ է, ես միշտ հագնում եմ բրդյա ձեռնոցները։',
        options: ['pongo', 'pones', 'pone', 'ponemos'],
        correctIndex: 0,
        explanationHy: '«Yo me...» ձևի համար ճիշտ է «pongo»:',
      },
    ],
  },

  {
    id: 'g-probarse',
    titleEs: 'El verbo Probarse',
    titleHy: 'Probarse անդրադարձ բայը (Փորձել, չափափորձել)',
    level: 'A1',
    icon: '🚪',
    summaryEs: 'Verbo clave en el probador para verificar cómo queda la ropa.',
    summaryHy: 'Գլխավոր բայ հանդերձարանում՝ ստուգելու, թե ինչպես է նստում հագուստը։',
    theoryEs: [
      'Verbo reflexivo con cambio vocálico: (o -> ue). Me pruebo, te pruebas, se prueba, nos probamos, os probáis, se prueban.',
      'Se usa para ir al probador y probarse una prenda.',
    ],
    theoryHy: [
      'Անդրադարձ բայ (o -> ue) փոփոխությամբ՝ me pruebo, te pruebas, se prueba, nos probamos, os probáis, se prueban:',
      'Հաճախ օգտագործվում է «¿Puedo probarme...?» (Կարո՞ղ եմ փորձել...) հարցում։',
    ],
    rules: [
      {
        ruleEs: '¿Puedo probarme + prenda?',
        ruleHy: 'Կարո՞ղ եմ փորձել + հագուստ',
        exampleEs: '¿Puedo probarme esta chaqueta en la talla M?',
        exampleHy: 'Կարո՞ղ եմ փորձել այս բաճկոնը M չափսով։',
      },
    ],
    quiz: [
      {
        questionEs: 'Ella se ________ el vestido largo en el probador.',
        questionHy: 'Նա փորձում է երկար զգեստը հանդերձարանում։',
        options: ['prueba', 'pruebo', 'pruebas', 'probamos'],
        correctIndex: 0,
        explanationHy: '«Ella se...» ձևի համար ճիշտ է «prueba»:',
      },
    ],
  },

  {
    id: 'g-quedar-bien-mal',
    titleEs: 'Quedar bien / Quedar mal',
    titleHy: 'Quedar bien / mal (Սազել, լավ/վատ նստել)',
    level: 'A2',
    icon: '✨',
    summaryEs: 'Valorar cómo sienta una prenda a una persona.',
    summaryHy: 'Գնահատել, թե ինչպես է հագուստը նստում մարդու վրա։',
    theoryEs: [
      'Funciona de manera idéntica a "gustar": Me queda bien / Me quedan bien.',
      'Me queda pequeño (նեղ/փոքր է նստում), Me queda grande (լայն/մեծ է նստում).',
    ],
    theoryHy: [
      'Գործում է «gustar» բայի պես՝ անուղղակի դերանուններով (me, te, le, nos, os, les):',
      'Queda bien/mal (եզակի առարկայի դեպքում), Quedan bien/mal (հոգնակի առարկաների դեպքում)։',
      'Me queda estrecho — Ինձ նեղ է։ Me queda genial — Ինձ հիանալի է սազում։',
    ],
    rules: [
      {
        ruleEs: 'Te queda + adjetivo',
        ruleHy: 'Te queda + ածական',
        exampleEs: 'Ese vestido te queda fantástico.',
        exampleHy: 'Այդ զգեստը քեզ ֆանտաստիկ է սազում։',
      },
      {
        ruleEs: 'Los pantalones me quedan largos',
        ruleHy: 'Տաբատը երկար է նստում ինձ վրա',
        exampleEs: 'Estos pantalones me quedan demasiado largos.',
        exampleHy: 'Այս տաբատը չափազանց երկար է նստում ինձ վրա։',
      },
    ],
    quiz: [
      {
        questionEs: 'Esos zapatos te ________ estupendamente.',
        questionHy: 'Այդ կոշիկները քեզ հիանալի են սազում։',
        options: ['quedan', 'queda', 'quedo', 'quedamos'],
        correctIndex: 0,
        explanationHy: '«Los zapatos»-ը հոգնակի է, ուստի պահանջվում է «quedan»:',
      },
    ],
  },

  {
    id: 'g-ser-estar',
    titleEs: 'Ser y Estar en la tienda',
    titleHy: 'Ser և Estar բայերը խանութում',
    level: 'A2',
    icon: '🔄',
    summaryEs: 'Diferencia entre características esenciales y estados o ubicaciones.',
    summaryHy: 'Տարբերությունը հիմնարար հատկանիշների և ժամանակավոր վիճակների կամ գտնվելու վայրի միջև։',
    theoryEs: [
      'SER se usa para: material (es de lana), color permanente (es azul), precio (son 20 euros).',
      'ESTAR se usa para: estado temporal (está sucio, está arrugado), oferta (está rebajado), ubicación (los probadores están al fondo).',
    ],
    theoryHy: [
      'SER-ն օգտագործվում է՝ նյութի համար (es de seda — մետաքսից է), մշտական որակի/գույնի (la falda es elegante) և գնի (son 30 euros)։',
      'ESTAR-ն օգտագործվում է՝ ժամանակավոր վիճակի (la camisa está limpia), զեղչերի (está en oferta) և գտնվելու վայրի համար (la caja está aquí)։',
    ],
    rules: [
      {
        ruleEs: 'Es de + material',
        ruleHy: 'Es de + նյութ',
        exampleEs: 'Este jersey es de algodón cien por cien.',
        exampleHy: 'Այս սվիտերը հարյուր տոկոս բամբակից է։',
      },
      {
        ruleEs: 'Está en + estado/ubicación',
        ruleHy: 'Está en + վիճակ / տեղ',
        exampleEs: 'Esta chaqueta está en oferta hoy.',
        exampleHy: 'Այս բաճկոնը այսօր զեղչված է (ակցիայի մեջ է)։',
      },
    ],
    quiz: [
      {
        questionEs: 'Esta bufanda ________ de lana pura.',
        questionHy: 'Այս շարֆը մաքուր բրդից է։',
        options: ['es', 'está', 'son', 'están'],
        correctIndex: 0,
        explanationHy: 'Նյութը նշելու համար միշտ օգտագործվում է SER բայը (es de lana):',
      },
    ],
  },

  {
    id: 'g-demostrativos',
    titleEs: 'Este, ese, aquel (Demostrativos)',
    titleHy: 'Ցուցական դերանուններ՝ este, ese, aquel',
    level: 'A1',
    icon: '👉',
    summaryEs: 'Indicar la distancia espacial de la prenda respecto al hablante.',
    summaryHy: 'Նշել հագուստի հեռավորությունը խոսողի նկատմամբ (սա, դա, նա)։',
    theoryEs: [
      'Este / esta / estos / estas: cerca del que habla (aquí).',
      'Ese / esa / esos / esas: cerca del que escucha o a distancia media (ahí).',
      'Aquel / aquella / aquellos / aquellas: lejos de ambos (allí / allá).',
    ],
    theoryHy: [
      'Este (արական), Esta (իգական) — Սա / Այս (խոսողի մոտ՝ ձեռքի հասանելիության մեջ)։',
      'Ese (արական), Esa (իգական) — Դա / Այդ (լսողի մոտ կամ միջին հեռավորության վրա)։',
      'Aquel (արական), Aquella (իգական) — Այն (երկուսից էլ հեռու՝ ցուցափեղկի խորքում)։',
    ],
    rules: [
      {
        ruleEs: 'Este + prenda cercana',
        ruleHy: 'Este + մոտ գտնվող առարկա',
        exampleEs: 'Me gusta este pantalón que tengo en la mano.',
        exampleHy: 'Ինձ դուր է գալիս այս տաբատը, որը ձեռքիս մեջ է։',
      },
      {
        ruleEs: 'Aquel + prenda lejana',
        ruleHy: 'Aquel + հեռու գտնվող առարկա',
        exampleEs: 'Por favor, muéstreme aquel abrigo de la pared del fondo.',
        exampleHy: 'Խնդրում եմ, ցույց տվեք այն վերարկուն հեռավոր պատի վրա։',
      },
    ],
    quiz: [
      {
        questionEs: '¿Cuánto cuesta ________ (ahí, cerca de usted) camisa azul?',
        questionHy: 'Ի՞նչ արժե այդ (Ձեր մոտ գտնվող) կապույտ վերնաշապիկը։',
        options: ['esa', 'esta', 'aquella', 'estos'],
        correctIndex: 0,
        explanationHy: 'Զրուցակցի մոտ («ahí») գտնվող իգական գոյականի համար օգտագործվում է «esa»:',
      },
    ],
  },

  {
    id: 'g-comparativos',
    titleEs: 'Más que / Menos que (Comparativos)',
    titleHy: 'Համեմատական աստիճան (más que / menos que / tan como)',
    level: 'A2',
    icon: '📊',
    summaryEs: 'Comparar precios, tamaños y comodidades de prendas.',
    summaryHy: 'Համեմատել հագուստի գները, չափսերը և հարմարավետությունը։',
    theoryEs: [
      'Superioridad: más + adjetivo + que (más caro que).',
      'Inferioridad: menos + adjetivo + que (menos caro que).',
      'Igualdad: tan + adjetivo + como (tan cómodo como).',
    ],
    theoryHy: [
      'Առավելական՝ más [ածական] que (ավելի թանկ, քան...)։',
      'Նվազական՝ menos [ածական] que (պակաս թանկ, քան...)։',
      'Հավասարություն՝ tan [ածական] como (այնքան հարմարավետ, որքան...)։',
    ],
    rules: [
      {
        ruleEs: 'Más caro que',
        ruleHy: 'Ավելի թանկ, քան',
        exampleEs: 'La chaqueta de cuero es más cara que el chaleco.',
        exampleHy: 'Կաշվե բաճկոնն ավելի թանկ է, քան ժիլետը։',
      },
    ],
    quiz: [
      {
        questionEs: 'Este vestido es ________ elegante como el otro.',
        questionHy: 'Այս զգեստը նույնքան էլեգանտ է, որքան մյուսը։',
        options: ['tan', 'más', 'tanto', 'menos'],
        correctIndex: 0,
        explanationHy: 'Ածականի հետ հավասարության համեմատության համար օգտագործվում է «tan... como»:',
      },
    ],
  },

  {
    id: 'g-muy-mucho',
    titleEs: 'Muy vs. Mucho',
    titleHy: 'Muy ընդդեմ Mucho (Շատ)',
    level: 'A1',
    icon: '🔥',
    summaryEs: 'Evitar el error común entre el adverbio y el cuantificador.',
    summaryHy: 'Խուսափել մակբայի (շատ գեղեցիկ) և քանակական բառի (շատ փող) տարածված սխալից։',
    theoryEs: [
      'MUY es invariable y siempre acompaña a adjetivos o adverbios: muy bonito, muy caro, muy bien.',
      'MUCHO cambia de género y número con sustantivos: mucho dinero, mucha ropa, muchos zapatos, muchas camisetas. También va tras verbos: me gusta mucho.',
    ],
    theoryHy: [
      'MUY-ն անփոփոխ է և դրվում է ածականներից կամ մակբայներից առաջ՝ muy caro (շատ թանկ), muy elegante (շատ էլեգանտ)։',
      'MUCHO-ն համաձայնեցվում է գոյականի հետ՝ mucho dinero (շատ փող), mucha ropa (շատ հագուստ), muchos vestidos (շատ զգեստներ), կամ դրվում է բայից հետո՝ Me gusta mucho (ինձ շատ է դուր գալիս)։',
    ],
    rules: [
      {
        ruleEs: 'Muy + adjetivo',
        ruleHy: 'Muy + ածական',
        exampleEs: 'Esta falda es muy bonita.',
        exampleHy: 'Այս կիսաշրջազգեստը շատ գեղեցիկ է։',
      },
      {
        ruleEs: 'Mucho / mucha + sustantivo',
        ruleHy: 'Mucho/mucha + գոյական',
        exampleEs: 'Tengo mucho dinero en el presupuesto.',
        exampleHy: 'Ես շատ գումար ունեմ բյուջեում։',
      },
    ],
    quiz: [
      {
        questionEs: 'Estos zapatos son ________ caros.',
        questionHy: 'Այս կոշիկները շատ թանկ են։',
        options: ['muy', 'mucho', 'muchos', 'mucha'],
        correctIndex: 0,
        explanationHy: '«Caros»-ը ածական է, ուստի ածականից առաջ դրվում է «muy»:',
      },
    ],
  },

  {
    id: 'g-un-poco',
    titleEs: 'Un poco vs. Un poco de',
    titleHy: 'Un poco ընդդեմ Un poco de (Մի քիչ / Մի փոքր)',
    level: 'A2',
    icon: '🤏',
    summaryEs: 'Matizar opiniones sobre la ropa o pedir cantidades.',
    summaryHy: 'Հագուստի մասին կարծիքը նրբացնել կամ քանակություն խնդրել։',
    theoryEs: [
      'Un poco + adjetivo: "Este pantalón me queda un poco grande" (un matiz).',
      'Un poco de + sustantivo incontable: "Necesito un poco de ayuda" (cantidad).',
    ],
    theoryHy: [
      'Un poco + ածական՝ «Այս տաբատը ինձ մի քիչ մեծ է նստում» (Me queda un poco grande):',
      'Un poco de + գոյական՝ «Ինձ պետք է մի քիչ օգնություն» (Un poco de ayuda):',
    ],
    rules: [
      {
        ruleEs: 'Un poco + adjetivo',
        ruleHy: 'Un poco + ածական',
        exampleEs: 'La manga está un poco larga.',
        exampleHy: 'Թևքը մի քիչ երկար է։',
      },
    ],
    quiz: [
      {
        questionEs: 'Esta camiseta me aprieta, me queda un ________ estrecha.',
        questionHy: 'Այս շապիկը սեղմում է, մի քիչ նեղ է նստում ինձ վրա։',
        options: ['poco', 'poco de', 'mucho', 'muy'],
        correctIndex: 0,
        explanationHy: 'Ածականից առաջ («estrecha») օգտագործվում է «un poco»:',
      },
    ],
  },

  {
    id: 'g-preterito-perfecto',
    titleEs: 'Pretérito Perfecto Compuesto',
    titleHy: 'Pretérito Perfecto Compuesto (Բարդ անցյալ՝ He comprado)',
    level: 'A2',
    icon: '⏰',
    summaryEs: 'Acciones de compra recientes o dentro de un periodo que aún continúa.',
    summaryHy: 'Վերջերս կատարված գնումների գործողություններ (այսօր, այս շաբաթ)։',
    theoryEs: [
      'Se forma con el presente del verbo auxiliar HABER + participio del verbo principal (-ado, -ido).',
      'He, has, ha, hemos, habéis, han + comprado / elegido.',
      'Marcadores temporales: hoy, esta mañana, esta semana, ya, todavía no.',
    ],
    theoryHy: [
      'Կազմվում է HABER օժանդակ բայի ներկայով (he, has, ha, hemos, habéis, han) + հիմնական բայի հարակատար դերբայով (-ado / -ido):',
      'Ցույց է տալիս ներկայի հետ կապ ունեցող կամ այսօր կատարված գործողություն՝ Hoy he comprado una camisa (Այսօր ես վերնաշապիկ եմ գնել)։',
    ],
    rules: [
      {
        ruleEs: 'Haber + participio',
        ruleHy: 'Haber + հարակատար դերբայ',
        exampleEs: 'Esta mañana he comprado un bañador en las rebajas.',
        exampleHy: 'Այս առավոտ ես զեղչերից լողազգեստ եմ գնել։',
      },
    ],
    quiz: [
      {
        questionEs: 'Hoy nosotros ________ (comprar) tres camisetas de algodón.',
        questionHy: 'Այսօր մենք գնել ենք երեք բամբակյա շապիկ։',
        options: ['hemos comprado', 'han comprado', 'he comprado', 'compramos'],
        correctIndex: 0,
        explanationHy: '«Nosotros» դերանվան համար Pretérito Perfecto-ն «hemos comprado» է։',
      },
    ],
  },

  {
    id: 'g-preterito-indefinido',
    titleEs: 'Pretérito Indefinido',
    titleHy: 'Pretérito Indefinido (Պարզ անցյալ՝ Compré ayer)',
    level: 'A2',
    icon: '📜',
    summaryEs: 'Compras realizadas en un momento pasado totalmente concluido.',
    summaryHy: 'Անցյալում լիովին ավարտված գնումների գործողություններ (երեկ, անցյալ շաբաթ)։',
    theoryEs: [
      'Acciones puntuales terminadas: ayer, la semana pasada, hace un mes, en 2024.',
      'Comprar: compré, compraste, compró, compramos, comprasteis, compraron.',
      'Ir: fui, fuiste, fue, fuimos, fuisteis, fueron.',
    ],
    theoryHy: [
      'Ցույց է տալիս անցյալում ավարտված կոնկրետ գործողություն՝ ayer (երեկ), el mes pasado (անցած ամիս):',
      'Խոնարհումը (comprar)՝ compré (գնեցի), compraste, compró, compramos, comprasteis, compraron:',
    ],
    rules: [
      {
        ruleEs: 'Verbo en indefinido + marcador pasado',
        ruleHy: 'Բայը պարզ անցյալում + անցյալի ցուցիչ',
        exampleEs: 'Ayer compré un traje gris para la boda.',
        exampleHy: 'Երեկ ես գնեցի մոխրագույն կոստյում հարսանիքի համար։',
      },
    ],
    quiz: [
      {
        questionEs: 'Ayer mi amiga ________ (probarse) varios sombreros.',
        questionHy: 'Երեկ իմ ընկերուհին մի քանի գլխարկ փորձեց։',
        options: ['se probó', 'se prueba', 'se ha probado', 'se probaron'],
        correctIndex: 0,
        explanationHy: 'Երեկվա («ayer») գործողության համար երրորդ դեմքում ճիշտ է «se probó»:',
      },
    ],
  },

  {
    id: 'g-futuro-simple',
    titleEs: 'Futuro Simple',
    titleHy: 'Futuro Simple (Պարզ ապառնի՝ Compraré)',
    level: 'B1',
    icon: '🚀',
    summaryEs: 'Planes futuros de compra o suposiciones en la tienda.',
    summaryHy: 'Ապագա գնումների ծրագրեր կամ ենթադրություններ։',
    theoryEs: [
      'Se añade al infinitivo completo las terminaciones: -é, -ás, -á, -emos, -éis, -án.',
      'Compraré, comprarás, comprará, compraremos, compraréis, comprarán.',
    ],
    theoryHy: [
      'Կազմվում է անորոշ բային ավելացնելով հետևյալ վերջավորությունները՝ -é, -ás, -á, -emos, -éis, -án:',
      'Օրինակ՝ Compraré ropa nueva el mes que viene (Ես նոր հագուստ կգնեմ հաջորդ ամիս)։',
    ],
    rules: [
      {
        ruleEs: 'Infinitivo + terminación de futuro',
        ruleHy: 'Անորոշ բայ + ապառնիի վերջավորություն',
        exampleEs: 'Mañana volveré a la tienda a buscar mi talla.',
        exampleHy: 'Վաղը ես կվերադառնամ խանութ՝ իմ չափսը վերցնելու։',
      },
    ],
    quiz: [
      {
        questionEs: 'En las rebajas de enero nosotros ________ (comprar) abrigos.',
        questionHy: 'Հունվարյան զեղչերին մենք վերարկուներ կգնենք։',
        options: ['compraremos', 'compraré', 'comprarán', 'compraríamos'],
        correctIndex: 0,
        explanationHy: '«Nosotros»-ի համար ապառնի ժամանակի ճիշտ ձևն է «compraremos»:',
      },
    ],
  },

  {
    id: 'g-condicional-simple',
    titleEs: 'Condicional Simple de Cortesía',
    titleHy: 'Condicional Simple (Քաղաքավարի պայմանական՝ Me gustaría)',
    level: 'B1',
    icon: '🎩',
    summaryEs: 'Fórmula de máxima cortesía al pedir algo a los dependientes.',
    summaryHy: 'Առավելագույն քաղաքավարության ձև՝ վաճառողներից որևէ բան խնդրելիս։',
    theoryEs: [
      'Expresa deseos o peticiones amables: desearía, me gustaría, querría, podría.',
      'En lugar de "Quiero ver esa camisa", es mucho más educado decir "Me gustaría ver esa camisa" o "¿Podría mostrarme...?"',
    ],
    theoryHy: [
      'Արտահայտում է քաղաքավարի խնդրանք կամ ցանկություն՝ «Ես կցանկանայի», «Կարո՞ղ էիք արդյոք»։',
      '«Quiero» (ուզում եմ) ասելու փոխարեն շատ ավելի քաղաքավարի է ասել «Me gustaría ver...» (Կցանկանայի տեսնել...) կամ «¿Podría...?» (Կկարողանայի՞ք...):',
    ],
    rules: [
      {
        ruleEs: 'Me gustaría + infinitivo',
        ruleHy: 'Me gustaría + անորոշ բայ (Ես կցանկանայի...)',
        exampleEs: 'Me gustaría probarme ese vestido que está en el escaparate.',
        exampleHy: 'Ես կցանկանայի փորձել այդ զգեստը, որը ցուցափեղկում է։',
      },
    ],
    quiz: [
      {
        questionEs: 'Por favor, ¿________ (usted / poder) cambiarme este billete?',
        questionHy: 'Խնդրում եմ, կկարողանայի՞ք մանրել այս թղթադրամը։',
        options: ['podría', 'puede', 'podrías', 'puedo'],
        correctIndex: 0,
        explanationHy: 'Քաղաքավարի պայմանականում («usted») ճիշտ է «podría»:',
      },
    ],
  },

  {
    id: 'g-imperativo-subjuntivo',
    titleEs: 'Imperativo y Subjuntivo en compras',
    titleHy: 'Հրամայական և Ըղձական եղանակներ (Imperativo & Subjuntivo)',
    level: 'B2',
    icon: '🎯',
    summaryEs: 'Instrucciones del vendedor y oraciones de deseo o duda.',
    summaryHy: 'Վաճառողի ցուցումները և ցանկության կամ կասկածի նախադասությունները։',
    theoryEs: [
      'Imperativo formal (Usted): Pase al probador, Mire en el espejo, Firme aquí.',
      'Subjuntivo: Se usa con expresiones de deseo o cuando buscamos algo indefinido: "Busco una prenda que sea cómoda y no cueste mucho".',
    ],
    theoryHy: [
      'Հրամայական հարգալից ձև (Usted)՝ Pase al probador (Անցեք հանդերձարան), Mire (Նայեք), Firme aquí (Ստորագրեք այստեղ)։',
      'Ըղձական (Subjuntivo)՝ Օգտագործվում է, երբ փնտրում ենք դեռ չգտնված կամ որոշակի հատկանիշ ունեցող առարկա՝ Busco un vestido que sea de lino (Փնտրում եմ զգեստ, որը լինի կտավատից)։',
    ],
    rules: [
      {
        ruleEs: 'Busco algo que + presente de subjuntivo',
        ruleHy: 'Busco algo que + ընձական եղանակ',
        exampleEs: 'Busco una chaqueta que no pese mucho y abrigue bien.',
        exampleHy: 'Փնտրում եմ բաճկոն, որը շատ ծանր չլինի և լավ տաքացնի։',
      },
    ],
    quiz: [
      {
        questionEs: 'Busco unos zapatos que ________ (ser) impermeables para la lluvia.',
        questionHy: 'Փնտրում եմ կոշիկներ, որոնք լինեն անջրանցիկ անձրևի համար։',
        options: ['sean', 'son', 'serán', 'serían'],
        correctIndex: 0,
        explanationHy: 'Անորոշ հատկանիշով փնտրվող առարկայի դեպքում օգտագործվում է Subjuntivo՝ «sean»:',
      },
    ],
  },
];
