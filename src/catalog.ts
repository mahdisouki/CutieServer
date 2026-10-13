export type Category = "Rings" | "Necklaces" | "Bracelets" | "Watches";

export type Translation = {
  name: string;
  material: string;
  description: string;
  label?: string;
};

export type CatalogProduct = {
  slug: string;
  category: Category;
  price: number;
  image: string;
  position: number;
  translations: { en: Translation; fr: Translation; ar: Translation };
};

export const catalog: CatalogProduct[] = [
  {
    slug: "solis-necklace",
    category: "Necklaces",
    price: 580,
    image: "https://images.unsplash.com/photo-1722410180644-5955f83ec8b1?auto=format&fit=crop&w=1200&q=85",
    position: 0,
    translations: {
      en: {
        name: "The Solis Necklace",
        material: "18k recycled gold",
        label: "New",
        description: "A fluid, light-catching chain inspired by the first warmth of morning. Designed to sit effortlessly at the collarbone.",
      },
      fr: {
        name: "Collier Solis",
        material: "Or recyclé 18 carats",
        label: "Nouveau",
        description: "Une chaîne fluide qui capte la lumière, inspirée de la première chaleur du matin. Elle se pose naturellement au creux de la clavicule.",
      },
      ar: {
        name: "عقد سوليس",
        material: "ذهب معاد تدويره عيار 18",
        label: "جديد",
        description: "سلسلة انسيابية تلتقط الضوء، مستوحاة من دفء الصباح الأول. صُممت لتستقر برقة عند عظمة الترقوة.",
      },
    },
  },
  {
    slug: "elan-diamond-ring",
    category: "Rings",
    price: 1240,
    image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?auto=format&fit=crop&w=1200&q=85",
    position: 1,
    translations: {
      en: {
        name: "Élan Diamond Ring",
        material: "18k gold · lab-grown diamond",
        label: "Bestseller",
        description: "A slender gold band set with a brilliant-cut lab-grown diamond. Understated alone and striking when stacked.",
      },
      fr: {
        name: "Bague Élan diamant",
        material: "Or 18 carats · diamant de laboratoire",
        label: "Best-seller",
        description: "Un jonc fin serti d'un diamant de laboratoire taille brillant. Discret seul, saisissant lorsqu'il se superpose.",
      },
      ar: {
        name: "خاتم إيلان بالماس",
        material: "ذهب عيار 18 · ألماس مزروع",
        label: "الأكثر مبيعاً",
        description: "حلقة ذهبية رفيعة مرصّعة بألماس مزروع بقطع لامع. هادئة وحدها، لافتة حين تُرتدى مع غيرها.",
      },
    },
  },
  {
    slug: "dune-signet",
    category: "Rings",
    price: 690,
    image: "https://images.unsplash.com/photo-1689367436629-1d288f1e23b6?auto=format&fit=crop&w=1200&q=85",
    position: 2,
    translations: {
      en: {
        name: "Dune Signet",
        material: "18k recycled gold",
        description: "A softly sculpted signet with an organic profile, hand-polished until every curve catches the light.",
      },
      fr: {
        name: "Chevalière Dune",
        material: "Or recyclé 18 carats",
        description: "Une chevalière aux formes douces et organiques, polie à la main jusqu'à ce que chaque courbe capte la lumière.",
      },
      ar: {
        name: "خاتم دون",
        material: "ذهب معاد تدويره عيار 18",
        description: "خاتم ختم منحوت بنعومة وخطوط عضوية، مصقول يدوياً حتى تلتقط كل انحناءة الضوء.",
      },
    },
  },
  {
    slug: "aria-pendant",
    category: "Necklaces",
    price: 460,
    image: "https://images.unsplash.com/photo-1673131158657-4404fd1f041a?auto=format&fit=crop&w=1200&q=85",
    position: 3,
    translations: {
      en: {
        name: "Aria Pendant",
        material: "18k recycled gold",
        label: "Limited",
        description: "A timeless pendant formed by hand and suspended from our finest trace chain. Made in a limited atelier edition.",
      },
      fr: {
        name: "Pendentif Aria",
        material: "Or recyclé 18 carats",
        label: "Édition limitée",
        description: "Un pendentif intemporel façonné à la main et suspendu à notre plus fine chaîne. Réalisé en édition limitée d'atelier.",
      },
      ar: {
        name: "قلادة آريا",
        material: "ذهب معاد تدويره عيار 18",
        label: "إصدار محدود",
        description: "قلادة خالدة شُكّلت يدوياً وعُلّقت بسلسلتنا الأنعم. تُصنع بإصدار محدود من المشغل.",
      },
    },
  },
  {
    slug: "luna-gold-watch",
    category: "Watches",
    price: 1850,
    image: "https://images.unsplash.com/photo-1760532466984-39c3eb7f1254?auto=format&fit=crop&w=1200&q=85",
    position: 4,
    translations: {
      en: {
        name: "Luna Gold Watch",
        material: "Swiss movement · sapphire crystal",
        label: "New",
        description: "A refined gold timepiece with a quiet dial and precise Swiss movement. Designed for an elegant everyday rhythm.",
      },
      fr: {
        name: "Montre Luna or",
        material: "Mouvement suisse · verre saphir",
        label: "Nouveau",
        description: "Une montre en or raffinée, au cadran discret et au mouvement suisse précis. Pensée pour un rythme élégant au quotidien.",
      },
      ar: {
        name: "ساعة لونا الذهبية",
        material: "حركة سويسرية · كريستال ياقوت",
        label: "جديد",
        description: "ساعة ذهبية راقية بقرص هادئ وحركة سويسرية دقيقة. صُممت لإيقاع أنيق كل يوم.",
      },
    },
  },
  {
    slug: "etoile-watch",
    category: "Watches",
    price: 1490,
    image: "https://images.unsplash.com/photo-1517870536153-52969f5ee838?auto=format&fit=crop&w=1200&q=85",
    position: 5,
    translations: {
      en: {
        name: "Étoile Watch",
        material: "Gold vermeil · sapphire crystal",
        label: "Exclusive",
        description: "A petite round case paired with a soft ivory strap, balancing vintage proportion with contemporary restraint.",
      },
      fr: {
        name: "Montre Étoile",
        material: "Vermeil · verre saphir",
        label: "Exclusive",
        description: "Un boîtier rond et menu associé à un bracelet ivoire, entre proportion vintage et retenue contemporaine.",
      },
      ar: {
        name: "ساعة إتوال",
        material: "ذهب مطلي · كريستال ياقوت",
        label: "حصرية",
        description: "علبة دائرية صغيرة مع سوار عاجي ناعم، توازن بين تناسب كلاسيكي ورزانة معاصرة.",
      },
    },
  },
  {
    slug: "celeste-bracelet",
    category: "Bracelets",
    price: 520,
    image: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=1200&q=85",
    position: 6,
    translations: {
      en: {
        name: "Céleste Bracelet",
        material: "18k gold · garnet",
        description: "Warm gold beads punctuated by deep garnet, strung by hand for subtle movement and a comfortable fit.",
      },
      fr: {
        name: "Bracelet Céleste",
        material: "Or 18 carats · grenat",
        description: "Des perles d'or chaud ponctuées de grenat profond, enfilées à la main pour un mouvement souple et un porté confortable.",
      },
      ar: {
        name: "سوار سيليست",
        material: "ذهب عيار 18 · عقيق أحمر",
        description: "خرز من الذهب الدافئ تتخلله حبات عقيق عميقة، تُنظم يدوياً لحركة خفيفة ومقاس مريح.",
      },
    },
  },
  {
    slug: "mira-watch",
    category: "Watches",
    price: 1320,
    image: "https://images.unsplash.com/photo-1760532467646-b9e466403862?auto=format&fit=crop&w=1200&q=85",
    position: 7,
    translations: {
      en: {
        name: "Mira Mesh Watch",
        material: "Stainless steel · Swiss movement",
        description: "A clean silver dial and supple mesh bracelet create a modern classic that moves easily from day to evening.",
      },
      fr: {
        name: "Montre Mira maille",
        material: "Acier inoxydable · mouvement suisse",
        description: "Un cadran argent épuré et un bracelet maille souple composent un classique moderne, du jour au soir.",
      },
      ar: {
        name: "ساعة ميرا الشبكية",
        material: "فولاذ مقاوم للصدأ · حركة سويسرية",
        description: "قرص فضي صافٍ وسوار شبكي مرن يصنعان كلاسيكية عصرية تنتقل بسهولة من النهار إلى المساء.",
      },
    },
  },
];
