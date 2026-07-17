/* ============================================================================
   My Voice — landing page content (English + Russian)
   ========================================================================== */

export const MV_CONFIG = {
  githubUrl:   'https://github.com/Xentention/my-voice-info',
  demoUrl:     '#',                                                
  surveyUrlEN:   'https://forms.gle/KffYTdSY7yLiJ4Uu5',
  surveyUrlRU:   'https://forms.gle/KkgMjyqgsL5AYK8GA',
  email:       'xvtimoshenko@gmail.com',
  siteOrigin:  'https://Xentention.github.io/my-voice-info',
  windowsAppUrl: 'https://github.com/Xentention/windows-grammarcheck-service',
};

export const MV_CONTENT = {

  /* ========================================================================
     ENGLISH
     ====================================================================== */
  en: {
    lang: 'en',
    brand: 'My Voice',
    flag: 'us',

    a11y: {
      contrastLabel:  'High contrast',
      contrastOn:     'High contrast on',
      contrastOff:    'High contrast off',
      boardPreviewLabel: 'My Voice app interface preview',
      boardPreviewAlt:
        'Preview of the My Voice app interface, shown on a tablet.\n\n' +

        'Two stacked utterance bars sit above the board. ' +
        'The upper bar holds the raw pictogram input, ' +
        'and the lower bar shows the same selection as a grammatically auto-inflected sentence. ' +
        'The user can speak either the raw words or the finished sentence. Surrounding controls ' +
        'include a voice emotion selector, a backspace to clear the last tile, a trash button ' +
        'to empty the whole utterance, an edit button, a tense selector, ' +
        'and a "more actions" dropdown menu, intended for actions like "hold that thought".\n\n' +

        'The board is a 6 rows by 10 columns grid that mixes tiles of several sizes and subtypes, ' +
        'each illustrated with an ARASAAC pictogram:\n' +
        'Displayed types of tiles are word tiles (single vocabulary items), ' +
        'chunks (reusable sentence fragments), phrases (voiced immediately), ' +
        'popup tiles (open an overlay of related words), and folders (navigate to other boards). ' +
        'Tiles are colour-coded in the modified Fitzgerald-key tradition, the overall style is ' +
        'in warm pastels\n\n' +

        'Navigation Rail on the right is a vertical strip of utility buttons: menu, ' +
        'home, search, emergency board, return, alert/attention bell, keyboard, and a whiteboard.\n' +
        'Above them is a status area showing battery level and the current time and date.',
      goToCard:       'Go to card',
      cardRailLabel:  'Scrollable card list',
    },

    meta: {
      title: 'My Voice',
      description:
        'My Voice is a free easy-to-use communication app, designed for people who find spoken language difficult.',
    },

    nav: {
      links: [
        { label: 'Why',                href: '#landscape' },
        { label: 'Grammar Engine',     href: '#grammar' },
        { label: 'Core Concepts',      href: '#capabilities' },
      ],
      githubLabel: 'Read more',
      langLabel:   'Сменить язык на русский',
      langHref:    'ru/',         
      langFlag:    'ru', 
      emailLabel: 'Email us',      
    },

    hero: {
      title:   'My Voice AAC',
      lead:
        'My Voice is a free easy-to-use communication app, designed for people who find spoken language difficult. ' +
        'It is intended to provide a robust vocabulary right out-of-the-box while allowing ' +
        'space for personalization. ',
      ctaPrimary:   { label: 'Help us improve',    href: '#research' },
      ctaSecondary: { label: 'Learn more',  href: 'github' },
    },

    landscape: {
      id: 'landscape',
      title:   'Why Another AAC App?',
      intro:
        'There are a lot of excellent, robust communication apps, and we respect the work  ' +
        'they\'ve taken. My Voice is here for the people who can\'t access these for various reasons: ' +
        'regional restrictions, unreliable connection, inability to afford an iPad or even the app itself.',
      gaps: [
        { need: 'Languages Beyond English',
          body: 'Most robust boards are built English-first, and diverse languages ' +
                'still stay underserved. My Voice is being built language-neutral, ' +
                'with a clear pathway of adding a new language — even if its grammar ' +
                'is vastly different from English.' },
        { need: 'Rich Inflection Support',
          body: 'Most AAC apps don\'t handle inflection well; they speak words as-is and leave the user to figure out grammar. ' +
                'This, aided by prefixes- and -suffixes, works fine for lightly-inflected languages like English. ' +
                'But most Slavic languages can have around 50 forms for each word, all used in everyday speech!' },
        { need: 'Free and Open Source',
          body: 'My Voice is completely free and its code will be opened ' +
                'once it reaches its beta-testing phase. We would love having you contribute ' +
                'to the project on Github or reach out about translation into a different language.' },
        { need: 'Portable',
          body: 'My Voice is a crossplatform app, meaning it will be available on both iOS and Android devices. ' +
                'In addition, it will also support Open Board Format Specification (.obf, .obz) import/export, ' +
                'so its data can be synced with other apps.' },
      ],
    },

    grammar: {
      id: 'grammar',
      title:   'Acknowledging Unique Grammar',
      intro:
        'My Voice treats every word as data carrying its own morphological structure. ' +
        'The app\'s core is only able to simply concatenate words without adding any grammatical changes, ' +
        'more complex agreement is handled by loading language-specific modules. This structure allows ' +
        'adding proper grammar to any language — as long as its module has been implemented. ' +
        'Or keep the simple concatenation as a quick-start.',

      // Pictograms are ARASAAC ids
      tapLabel:   'Input',
      speakLabel: 'Result',
      tenseInfo:  'present',
      tiles: [
        { label: 'I',     pic: '6632' },
        { label: 'be',     pic: '5858' },
        { label: 'go',  pic: '8142' },
        { label: 'the',  pic: '8477' },
        { label: 'cinema', pic: '4602' },
      ],
      outputs: 'I am going to the cinema',
      stages: [
        { n: '1', name: 'Build',
          body: 'Selected tiles are added to the utterance. This stage only supports simple logic: ' +
                'concatenating words, prefixes (space isn\'t added after), suffixes (space isn\'t added before), ' +
                'and capitalisation of the first letter in a sentence.\n\n' +
                'This stage is considered Tier 3, and is supported for most languages.' }, 
        { n: '2', name: 'Inflect',
          body: 'This stage applies rule-based corrections to the utterance, applying tenses and simple inflections.' +
                'This is what can often be seen in different AAC apps, and can actually be enough for some languages.\n\n' +
                'This stage is considered Tier 2, and requires an implemented language module.' }, 
        { n: '3', name: 'Refine',
          body: 'Sometimes grammar rules get so context-dependent, that rule-based processing is unable to truly cover it. ' +
                'These cases require extending the language module with a lightweight model, pre-trained on normalized text reconstruction. ' +
                'My Voice only uses tiny models, able to run locally on mobile devices, preventing data leaks and connection dependence.\n\n' +
                'This stage is considered Tier 1, and is the most complex one to implement.' }, 
      ],
    },

    capabilities: {
      id: 'capabilities',
      title: 'A closer look at some of My Voice\'s concepts.',
      items: [
        { title:  'Created with Fusional Languages in Mind', feature: true,
          body:   'My Voice is created with a goal of broadening existing complex grammar solutions, without limiting users to a few options. ' +
                  'It handles word agreement automatically, allowing more natural speech with less cognitive effort.' }, 
        { title:  'Robust Vocabulary',
          body:   'My Voice comes with an extensive category-based vocabulary that covers most everyday topics, ' +
                  'so it can be used right away, adding custom words as they\'re needed. ' },
        { title:  'Customizable',
          body:   'My Voice is designed to be highly customizable: not only it supports changing the look of the buttons but also ' +
                  'changing grid size, making buttons of different sizes on the same board, hidding them, and many more. ' },
        { title:  'Bilingual Support',
          body:   'Switching between different languages is integrated into daily use — ' +
                  'no need to go into settings or edit mode.' }, 
        { title:  'Private & On-device',
          body:   'My Voice respects your privacy. It processes your speech locally, and all your ' +
                  'information remains on your device with an exception of an optional Google ' + 
                  'account linking for cloud backups and device synchronization.' }, 
      ],
    },

    research: {
      id: 'research',
      title:   'Help Us Improve',
      body:
        'If you or your loved ones use grid-based AAC, or you work closely with someone who does, please, take a survey.\n' +
        'A few minutes of your time will help us focus on what is most important.',
      cta: { label: 'Take the Survey', href: 'survey-en' }, 
      note: 'anonymous Google Form questionnaire',
    },

    footer: {
      title:   'My Voice',
      body:
        'Interested in contributing to the project?\n ' +
        'Sign up for a future beta testing, let us know if you have any ideas, or want ' +
        'to help with adding new languages!',
      sourceCta:  { label: 'Read more', href: 'github' },
      emailLabel: 'Email us',
      tagline:    'Everyone deserves to be heard.',
      license:    'GPL-3.0-or-later', // TODO: add link to license
    },
  },


  /* ========================================================================
     РУССКИЙ
     ====================================================================== */
  ru: {
    lang: 'ru',
    brand: 'Мой голос',
    flag: 'ru',

    a11y: {
      contrastLabel:  'Высокий контраст',
      contrastOn:     'Высокий контраст включён',
      contrastOff:    'Высокий контраст выключен',
      boardPreviewLabel: 'Предпросмотр интерфейса приложения «Мой голос»',
      boardPreviewAlt:
        'Предпросмотр интерфейса приложения «Мой голос»:\n\n' +

        'Над доской расположены две строки высказывания. ' +
        'Верхняя строка содержит необработанный ввод, а нижняя показывает тот же набор как ' +
        'автоматически согласованное предложение. Пользователь может озвучить любой из вариантов. ' +
        'Рядом расположены элементы управления: изменения эмоции, стирания последней плитки, ' +
        'очистки всего высказывания, редактирования, выбора глагольного времени ' +
        'и выпадающее меню «больше», открывающее дополнительные действия.\n\n' +

        'Доска представляет собой сетку из 6 строк и 10 столбцов, в которой сочетаются плитки разных ' +
        'размеров и подтипов, каждая проиллюстрирована пиктограммой ARASAAC:\n' +
        'показаны такие типы плиток: слова (единичные), ' +
        'фрагменты или чанки (переиспользуемые части предложения), фразы (озвучиваются сразу), ' +
        'поп апы (раскрывают связанные слова) и папки (переход к другим доскам). ' +
        'Плитки имеют цветовую кодировку по модифицированной системе Фицджеральда; общий стиль приложения ' +
        'в тёплых пастельных тонах.\n\n' +

        'Справа находится панель навигации: на ней расположены кнопки меню, ' +
        'домой, поиск, экстренная доска, возврат, колокольчик для привлечения внимания, клавиатура ' +
        'и доска для рисования.\n' +
        'Над ними расположены элементы, показывающие уровень заряда батареи и текущее время и дату.',
      goToCard:       'Перейти к карточке',
      cardRailLabel:  'Список карточек с прокруткой',
    },

    meta: {
      title: 'Мой голос',
      description:
        '«Мой голос» — бесплатное и простое в использовании коммуникационное ' +
        'приложение для тех, кому трудно даётся устная речь.',
    },

    promo: {
      badge: 'Может быть интересно',
      text:  'Инструмент исправления грамматики для Windows, совместимый с Communicator 5 и другими системами (Beta)',
      cta:   'Перейти',
      href:  'windows',
    },

    nav: {
      links: [
        { label: 'Зачем',        href: '#landscape' },
        { label: 'Грамматика',   href: '#grammar' },
        { label: 'Принципы',     href: '#capabilities' },
        { label: 'Контакты',     href: '#research' },
      ],
      githubLabel: 'Читать далее',
      langLabel:   'Switch language to English',
      langHref:    '../',         
      langFlag:    'us',  
      emailLabel: 'Написать нам',       
    },

    hero: {
      title:   'Мой голос',
      lead:
        '«Мой голос» — бесплатное и простое в использовании коммуникационное ' +
        'приложение для тех, кому трудно даётся устная речь. Оно сразу даёт ' +
        'богатый словарь «из коробки» и при этом оставляет простор, чтобы ' +
        'настроить его под свои нужды.',
      ctaPrimary:   { label: 'Помочь проекту', href: '#research' },
      ctaSecondary: { label: 'Узнать больше',            href: 'github' },
    },

    landscape: {
      id: 'landscape',
      title:   'Зачем ещё одно АДК-приложение?',
      intro:
        'Есть множество продуманных коммуникационных приложений, и мы ' +
        'уважаем труд их создателей. «Мой голос» — для тех, кто не может ими ' +
        'пользоваться по разным причинам: региональные ограничения, ненадёжное интернет-' +
        'соединение, дороговизна iOS-устройств и подписок.',
      gaps: [
        { need: 'Поддержка грамматики русского языка',
          body: 'В русском языке у каждого слова могут быть десятки разных форм, ' +
                'и автоматическое согласование слов с минимумом усилий со стороны пользователя ' +
                'является нетривиальной задачей. «Мой голос» создается с учетом специфики ' +
                'морфологически богатых языков. ' },
        { need: 'Портируемость',
          body: '«Мой голос» — кроссплатформенное приложение: оно будет доступно и ' +
                'на iOS, и на Android. Кроме того, оно поддерживает импорт и экспорт ' +
                'в формате Open Board Format (.obf, .obz), так что данные можно ' +
                'синхронизировать с другими приложениями.' },
        { need: 'Работа оффлайн',
          body: '«Мой голос» работает полностью автономно: словарь, грамматические ' +
                'модули и синтез речи не требуют подключения к сети. Даже крошечные ' +
                'языковые модели запускаются прямо на устройстве, так что общение ' +
                'не пострадает из-за нестабильного интернета.' },
        { need: 'Бесплатно и с открытым кодом',
          body: '«Мой голос» полностью бесплатен, а его код будет открыт, как ' +
                'только проект дойдёт до стадии бета-тестирования. Если у вас ' +
                'есть навыки программирования, будем рады видеть вас в контрибьюторах.' },
      ],
    },

    grammar: {
      id: 'grammar',
      title:   'Поддержка грамматики русского языка',
      intro:
        '«Мой голос» считает каждое слово данными, несущими собственную ' +
        'морфологическую структуру. Ядро приложения умеет лишь просто соединять ' +
        'слова, не внося изменений; более сложное согласование берут ' +
        'на себя подключаемые модули. Такая архитектура позволяет ' +
        'добавить полноценную грамматику любому языку, не переусложняя приложение. ',

      tapLabel:   'Ввод',
      speakLabel: 'Результат',
      tenseInfo:   'настоящее',
      tiles: [
        { label: 'я',      pic: '6632' },
        { label: 'хотеть', pic: '5441' },
        { label: 'горячий', pic: '26716' },
        { label: 'молоко',   pic: '2445' },
      ],
      outputs: 'Я хочу горячее молоко',
      stages: [
        { n: '1', name: 'Сборка',
          body: 'Выбранные ячейки добавляются в высказывание. На этом этапе ' +
                'доступна только простая логика: соединение слов, приставки, ' +
                'суффиксы и заглавная буква в начале предложений.\n\n' +
                'Это Уровень 3.' },
        { n: '2', name: 'Словоизменение',
          body: 'На этом этапе к высказыванию применяются правила: времена и простое ' +
                'согласование. Такое часто встречается в разных АДК-приложениях.\n\n' +
                'Это Уровень 2, для него уже нужен реализованный модуль языка.' },
        { n: '3', name: 'Завершение',
          body: 'Иногда грамматика настолько зависит от контекста, что ' +
                'обработки по правилам мало. Для русского языка модуль ' +
                'дополняется лёгкой моделью, предобученной на восстановлении ' +
                'нормализованного текста. «Мой голос» использует только крошечные ' +
                'модели, работающие локально на мобильных устройствах, не допуская ' +
                'утечек данных и зависимости от качества интернета.\n\n' +
                'Это Уровень 1, самый сложный в реализации.' },
      ],
    },

    capabilities: {
      id: 'capabilities',
      title: 'Немного о том, как устроен «Мой голос».',
      items: [
        { title: 'Обширный словарь', feature: true,
          body:  '«Мой голос» поставляется с обширным словарём, ' +
                 'охватывающим большинство повседневных тем. Приложением можно начать ' +
                 'пользоваться сразу, добавляя свои слова по мере необходимости.' },
        { title: 'Создано с учётом флективных языков',
          body:  '«Мой голос» создаётся, чтобы расширить существующие решения для ' +
                 'сложной грамматики, не ограничивая пользователя парой вариантов. ' +
                 'Он автоматически согласует слова, делая речь естественнее и снижая ' +
                 'когнитивную нагрузку.' },
        { title: 'Персонализация',
          body:  '«Мой голос» предоставляет широкие возможности для кастомизации: ' +
                 'возможно изменить не только внешний вид ячеек, но и сделать их разного размера, скрыть, ' +
                 'изменить размер самой доски и многое другое.' },
        { title: 'Поддержка нескольких языков',
          body:  'Переключение между языками встроено в повседневное использование — ' +
                 'не нужно заходить в настройки или режим редактирования. ' },
        { title: 'Работает на устройстве',
          body:  'Речь обрабатывается локально, и вся ваша информация остаётся на устройстве — '+
                 'за исключением необязательной привязки аккаунта для облачных копий и ' +
                 'синхронизации между устройствами.' },
      ],
    },

    research: {
      id: 'research',
      title:   'Помогите нам стать лучше',
      body:
        'Если вы или ваши близкие пользуетесь символьным АДК, или вы тесно работаете с теми, '+
        'кто пользуется, — пожалуйста, пройдите опрос.\n' +
        'Несколько минут вашего времени помогут нам сосредоточиться на самом важном.',
      cta: { label: 'Пройти опрос', href: 'survey-ru' },
      note: 'анонимная анкета в Google Forms',
    },

    footer: {
      title:   'Мой голос',
      body:
        'Хотите поучаствовать в проекте?\nЗапишитесь на бета-тестирование, ' +
        'поделитесь идеями и расскажите о проекте другим.',
      sourceCta:  { label: 'Подробнее', href: 'github' },
      emailLabel: 'Написать нам',
      tagline:    'Каждый заслуживает быть услышанным.',
      license:    'GPL-3.0-or-later',
    },
  },
};
