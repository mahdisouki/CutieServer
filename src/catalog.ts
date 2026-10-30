export type Category = "Rings" | "Necklaces" | "Bracelets" | "Watches";

export type Translation = {
  name: string;
  material: string;
  description: string;
  label?: string;
};

export type ProductVariant = {
  id: string;
  color: string;
  image: string;
  quantity: number;
};

export type CatalogProduct = {
  slug: string;
  category: Category;
  price: number;
  position: number;
  variants: ProductVariant[];
  translations: { en: Translation; fr: Translation; ar: Translation };
};

export const catalog: CatalogProduct[] = [
  {
    slug: "solis-necklace",
    category: "Necklaces",
    price: 580,
    variants: [{ id: "default", color: "Default", image: "https://images.unsplash.com/photo-1722410180644-5955f83ec8b1?auto=format&fit=crop&w=1200&q=85", quantity: 10 }],
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
    variants: [{ id: "default", color: "Default", image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?auto=format&fit=crop&w=1200&q=85", quantity: 10 }],
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
    variants: [{ id: "default", color: "Default", image: "https://images.unsplash.com/photo-1689367436629-1d288f1e23b6?auto=format&fit=crop&w=1200&q=85", quantity: 10 }],
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
    variants: [{ id: "default", color: "Default", image: "https://images.unsplash.com/photo-1673131158657-4404fd1f041a?auto=format&fit=crop&w=1200&q=85", quantity: 10 }],
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
    variants: [{ id: "default", color: "Default", image: "https://images.unsplash.com/photo-1760532466984-39c3eb7f1254?auto=format&fit=crop&w=1200&q=85", quantity: 10 }],
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
    variants: [{ id: "default", color: "Default", image: "https://images.unsplash.com/photo-1517870536153-52969f5ee838?auto=format&fit=crop&w=1200&q=85", quantity: 10 }],
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
    variants: [{ id: "default", color: "Default", image: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=1200&q=85", quantity: 10 }],
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
    variants: [{ id: "default", color: "Default", image: "https://images.unsplash.com/photo-1760532467646-b9e466403862?auto=format&fit=crop&w=1200&q=85", quantity: 10 }],
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
  {
    slug: "cartier-panthere-diamond",
    category: "Watches",
    price: 4200,
    variants: [{ id: "default", color: "Default", image: "https://res.cloudinary.com/dfxeaeebv/image/upload/v1792499074/cuties/watches/cartier-panthere-diamond.webp", quantity: 10 }],
    position: 8,
    translations: {
      en: {
        name: "Cartier Panthère Diamond",
        material: "Yellow gold · diamond pavé",
        label: "Exclusive",
        description: "A square gold case framed in brilliant diamonds, paired with an S-link bracelet fully set in pavé. An icon of quiet, luminous luxury.",
      },
      fr: {
        name: "Cartier Panthère diamant",
        material: "Or jaune · pavé de diamants",
        label: "Exclusive",
        description: "Un boîtier carré en or entouré de diamants brillants, associé à un bracelet à maillons S entièrement pavé. Une icône de luxe lumineux.",
      },
      ar: {
        name: "كارتييه بانثير بالماس",
        material: "ذهب أصفر · رصف ماسي",
        label: "حصرية",
        description: "علبة مربعة من الذهب محاطة بالماس اللامع، مع سوار بحلقات S مرصّع بالكامل. أيقونة من الفخامة الهادئة والمشرقة.",
      },
    },
  },
  {
    slug: "patek-philippe-black-diamond",
    category: "Watches",
    price: 5800,
    variants: [{ id: "default", color: "Default", image: "https://res.cloudinary.com/dfxeaeebv/image/upload/v1792499074/cuties/watches/patek-philippe-black-diamond.jpg", quantity: 10 }],
    position: 9,
    translations: {
      en: {
        name: "Patek Philippe Black Diamond",
        material: "White gold · diamond bezel",
        label: "Exclusive",
        description: "A matte black dial set against a fully diamond-set bezel and polished brick-link bracelet. Precision meets understated brilliance.",
      },
      fr: {
        name: "Patek Philippe noir diamant",
        material: "Or blanc · lunette diamants",
        label: "Exclusive",
        description: "Un cadran noir mat face à une lunette entièrement sertie de diamants et un bracelet à maillons briques poli. La précision rencontre l'éclat discret.",
      },
      ar: {
        name: "باتيك فيليب أسود بالماس",
        material: "ذهب أبيض · إطار ماسي",
        label: "حصرية",
        description: "قرص أسود مطفي مقابل إطار مرصّع بالماس بالكامل وسوار بحلقات طوب مصقول. الدقة تلتقي بالبريق الهادئ.",
      },
    },
  },
  {
    slug: "michael-kors-silver-crystal",
    category: "Watches",
    price: 980,
    variants: [{ id: "default", color: "Default", image: "https://res.cloudinary.com/dfxeaeebv/image/upload/v1792499075/cuties/watches/michael-kors-silver-crystal.jpg", quantity: 10 }],
    position: 10,
    translations: {
      en: {
        name: "Michael Kors Silver Crystal",
        material: "Stainless steel · crystal markers",
        label: "New",
        description: "A bright white dial with crystal hour markers and a polished silver link bracelet. Clean, sparkling, and effortlessly wearable.",
      },
      fr: {
        name: "Michael Kors argent cristal",
        material: "Acier inoxydable · index cristaux",
        label: "Nouveau",
        description: "Un cadran blanc éclatant aux index en cristal et un bracelet argent poli. Claire, scintillante, et facile à porter.",
      },
      ar: {
        name: "مايكل كورس فضي بالكريستال",
        material: "فولاذ مقاوم للصدأ · علامات كريستال",
        label: "جديد",
        description: "قرص أبيض مشرق بعلامات ساعات كريستالية وسوار فضي مصقول. نظيفة ولامعة وسهلة الارتداء.",
      },
    },
  },
  {
    slug: "michael-kors-navy-twotone",
    category: "Watches",
    price: 1120,
    variants: [{ id: "default", color: "Default", image: "https://res.cloudinary.com/dfxeaeebv/image/upload/v1792499076/cuties/watches/michael-kors-navy-twotone.jpg", quantity: 10 }],
    position: 11,
    translations: {
      en: {
        name: "Michael Kors Navy Two-Tone",
        material: "Steel · rose gold · crystal pavé",
        label: "Bestseller",
        description: "A deep navy dial with a rose-gold MK monogram, framed by a crystal bezel and a two-tone jubilee bracelet.",
      },
      fr: {
        name: "Michael Kors navy bicolore",
        material: "Acier · or rose · pavé cristal",
        label: "Best-seller",
        description: "Un cadran navy profond au monogramme MK or rose, entouré d'une lunette cristal et d'un bracelet jubilee bicolore.",
      },
      ar: {
        name: "مايكل كورس كحلي ثنائي اللون",
        material: "فولاذ · ذهب وردي · رصف كريستال",
        label: "الأكثر مبيعاً",
        description: "قرص كحلي عميق بشعار MK ذهبي وردي، محاط بإطار كريستالي وسوار جوبيلي ثنائي اللون.",
      },
    },
  },
  {
    slug: "chopard-gold-roman",
    category: "Watches",
    price: 3200,
    variants: [{ id: "default", color: "Default", image: "https://res.cloudinary.com/dfxeaeebv/image/upload/v1792499078/cuties/watches/chopard-gold-roman.jpg", quantity: 10 }],
    position: 12,
    translations: {
      en: {
        name: "Chopard Gold Roman",
        material: "Gold tone · steel bracelet",
        label: "New",
        description: "A warm gold dial with Roman numerals and a two-tone link bracelet. Classic proportion with a soft, luminous finish.",
      },
      fr: {
        name: "Chopard or romain",
        material: "Ton or · bracelet acier",
        label: "Nouveau",
        description: "Un cadran or chaud aux chiffres romains et un bracelet bicolore. Proportion classique et finition lumineuse.",
      },
      ar: {
        name: "شوبارد ذهبية بأرقام رومانية",
        material: "طلاء ذهبي · سوار فولاذي",
        label: "جديد",
        description: "قرص ذهبي دافئ بأرقام رومانية وسوار ثنائي اللون. تناسب كلاسيكي ولمسة مشرقة ناعمة.",
      },
    },
  },
  {
    slug: "michael-kors-cream-twotone",
    category: "Watches",
    price: 1050,
    variants: [{ id: "default", color: "Default", image: "https://res.cloudinary.com/dfxeaeebv/image/upload/v1792499078/cuties/watches/michael-kors-cream-twotone.jpg", quantity: 10 }],
    position: 13,
    translations: {
      en: {
        name: "Michael Kors Cream Two-Tone",
        material: "Steel · gold tone",
        description: "A cream guilloché dial with Roman XII and VI, set in a two-tone case and bracelet for a refined daytime look.",
      },
      fr: {
        name: "Michael Kors crème bicolore",
        material: "Acier · ton or",
        description: "Un cadran crème guilloché aux chiffres XII et VI, dans un boîtier et bracelet bicolores pour un look diurne raffiné.",
      },
      ar: {
        name: "مايكل كورس كريمي ثنائي اللون",
        material: "فولاذ · طلاء ذهبي",
        description: "قرص كريمي بنقش غيوشيه مع XII و VI، في علبة وسوار ثنائي اللون لمظهر نهاري راقٍ.",
      },
    },
  },
  {
    slug: "michael-kors-pave-mk-logo",
    category: "Watches",
    price: 1180,
    variants: [{ id: "default", color: "Default", image: "https://res.cloudinary.com/dfxeaeebv/image/upload/v1792499079/cuties/watches/michael-kors-pave-mk-logo.jpg", quantity: 10 }],
    position: 14,
    translations: {
      en: {
        name: "Michael Kors Pavé MK Logo",
        material: "Steel · gold tone · crystal pavé",
        label: "Bestseller",
        description: "A bold gold MK monogram on a silver dial, bordered by a pavé crystal bezel and crystal-set bracelet links.",
      },
      fr: {
        name: "Michael Kors pavé logo MK",
        material: "Acier · ton or · pavé cristal",
        label: "Best-seller",
        description: "Un monogramme MK or sur cadran argent, entouré d'une lunette pavée et de maillons sertis de cristaux.",
      },
      ar: {
        name: "مايكل كورس مرصّعة بشعار MK",
        material: "فولاذ · طلاء ذهبي · رصف كريستال",
        label: "الأكثر مبيعاً",
        description: "شعار MK ذهبي جريء على قرص فضي، محاط بإطار كريستالي وحلقات سوار مرصّعة.",
      },
    },
  },
  {
    slug: "gucci-gold-honeycomb",
    category: "Watches",
    price: 1650,
    variants: [{ id: "default", color: "Default", image: "https://res.cloudinary.com/dfxeaeebv/image/upload/v1792499080/cuties/watches/gucci-gold-honeycomb.jpg", quantity: 10 }],
    position: 15,
    translations: {
      en: {
        name: "Gucci Gold Honeycomb",
        material: "Gold tone · crystal indices",
        label: "New",
        description: "A champagne dial with diamond hour markers and a signature honeycomb-link bracelet in polished gold tone.",
      },
      fr: {
        name: "Gucci or honeycomb",
        material: "Ton or · index cristaux",
        label: "Nouveau",
        description: "Un cadran champagne aux index diamant et un bracelet signature à maillons honeycomb en ton or poli.",
      },
      ar: {
        name: "غوتشي ذهبية بخلية النحل",
        material: "طلاء ذهبي · علامات كريستال",
        label: "جديد",
        description: "قرص شمباني بعلامات ساعات ماسية وسوار بخلية نحل مميزة بطلاء ذهبي مصقول.",
      },
    },
  },
  {
    slug: "michael-kors-rosegold-crystal",
    category: "Watches",
    price: 1100,
    variants: [{ id: "default", color: "Default", image: "https://res.cloudinary.com/dfxeaeebv/image/upload/v1792499081/cuties/watches/michael-kors-rosegold-crystal.jpg", quantity: 10 }],
    position: 16,
    translations: {
      en: {
        name: "Michael Kors Rose Gold Crystal",
        material: "Steel · rose gold · crystal markers",
        description: "A rose-gold dial with crystal indices and a two-tone oyster bracelet. Soft metallic warmth with a modern edge.",
      },
      fr: {
        name: "Michael Kors or rose cristal",
        material: "Acier · or rose · index cristaux",
        description: "Un cadran or rose aux index cristaux et un bracelet oyster bicolore. Chaleur métallique douce au trait moderne.",
      },
      ar: {
        name: "مايكل كورس ذهب وردي بالكريستال",
        material: "فولاذ · ذهب وردي · علامات كريستال",
        description: "قرص ذهب وردي بعلامات كريستالية وسوار أويستر ثنائي اللون. دفء معدني ناعم بلمسة عصرية.",
      },
    },
  },
  {
    slug: "patek-philippe-gold-diamond",
    category: "Watches",
    price: 6200,
    variants: [{ id: "default", color: "Default", image: "https://res.cloudinary.com/dfxeaeebv/image/upload/v1792499082/cuties/watches/patek-philippe-gold-diamond.jpg", quantity: 10 }],
    position: 17,
    translations: {
      en: {
        name: "Patek Philippe Gold Diamond",
        material: "Yellow gold · diamond bezel",
        label: "Exclusive",
        description: "A silvery sunburst dial within a diamond-set gold bezel and tank-link bracelet. Timeless haute horlogerie presence.",
      },
      fr: {
        name: "Patek Philippe or diamant",
        material: "Or jaune · lunette diamants",
        label: "Exclusive",
        description: "Un cadran argenté soleil dans une lunette or sertie de diamants et un bracelet tank. Présence intemporelle haute horlogerie.",
      },
      ar: {
        name: "باتيك فيليب ذهبية بالماس",
        material: "ذهب أصفر · إطار ماسي",
        label: "حصرية",
        description: "قرص فضي مشع ضمن إطار ذهبي مرصّع بالماس وسوار تانك. حضور خالد من عالم الساعات الراقية.",
      },
    },
  },
  {
    slug: "dior-gold-honeycomb",
    category: "Watches",
    price: 2400,
    variants: [{ id: "default", color: "Default", image: "https://res.cloudinary.com/dfxeaeebv/image/upload/v1792499083/cuties/watches/dior-gold-honeycomb.jpg", quantity: 10 }],
    position: 18,
    translations: {
      en: {
        name: "Dior Gold Honeycomb",
        material: "Gold tone · crystal markers",
        label: "Limited",
        description: "A white honeycomb-textured dial with crystal markers at the quarters, framed in polished gold tone.",
      },
      fr: {
        name: "Dior or honeycomb",
        material: "Ton or · index cristaux",
        label: "Édition limitée",
        description: "Un cadran blanc texturé honeycomb aux index cristaux aux quarts, entouré d'un ton or poli.",
      },
      ar: {
        name: "ديور ذهبية بخلية النحل",
        material: "طلاء ذهبي · علامات كريستال",
        label: "إصدار محدود",
        description: "قرص أبيض بنسيج خلية النحل وعلامات كريستالية عند الأرباع، ضمن إطار ذهبي مصقول.",
      },
    },
  },
  {
    slug: "gucci-twotone-honeycomb",
    category: "Watches",
    price: 1580,
    variants: [{ id: "default", color: "Default", image: "https://res.cloudinary.com/dfxeaeebv/image/upload/v1792499085/cuties/watches/gucci-twotone-honeycomb.jpg", quantity: 10 }],
    position: 19,
    translations: {
      en: {
        name: "Gucci Two-Tone Honeycomb",
        material: "Steel · gold tone",
        description: "A silver sunray dial with diamond markers and a two-tone honeycomb bracelet — light, graphic, and distinctly Gucci.",
      },
      fr: {
        name: "Gucci bicolore honeycomb",
        material: "Acier · ton or",
        description: "Un cadran argent soleil aux index diamant et un bracelet honeycomb bicolore — léger, graphique, et nettement Gucci.",
      },
      ar: {
        name: "غوتشي ثنائية اللون بخلية النحل",
        material: "فولاذ · طلاء ذهبي",
        description: "قرص فضي مشع بعلامات ماسية وسوار خلية نحل ثنائي اللون — خفيف وواضح وبصمة غوتشي.",
      },
    },
  },
  {
    slug: "michael-kors-gold-pave-mk",
    category: "Watches",
    price: 1250,
    variants: [{ id: "default", color: "Default", image: "https://res.cloudinary.com/dfxeaeebv/image/upload/v1792499085/cuties/watches/michael-kors-gold-pave-mk.jpg", quantity: 10 }],
    position: 20,
    translations: {
      en: {
        name: "Michael Kors Gold Pavé MK",
        material: "Gold tone · crystal pavé",
        label: "New",
        description: "Full gold tone with a large MK monogram, pavé crystal bezel, and crystal-set center links for maximum sparkle.",
      },
      fr: {
        name: "Michael Kors or pavé MK",
        material: "Ton or · pavé cristal",
        label: "Nouveau",
        description: "Ton or complet avec grand monogramme MK, lunette pavée et maillons centraux sertis pour un éclat maximal.",
      },
      ar: {
        name: "مايكل كورس ذهبية مرصّعة MK",
        material: "طلاء ذهبي · رصف كريستال",
        label: "جديد",
        description: "طلاء ذهبي كامل مع شعار MK كبير وإطار مرصّع وحلقات وسطى كريستالية لأقصى لمعان.",
      },
    },
  },
  {
    slug: "michael-kors-twotone-chrono",
    category: "Watches",
    price: 1350,
    variants: [{ id: "default", color: "Default", image: "https://res.cloudinary.com/dfxeaeebv/image/upload/v1792499086/cuties/watches/michael-kors-twotone-chrono.jpg", quantity: 10 }],
    position: 21,
    translations: {
      en: {
        name: "Michael Kors Two-Tone Chronograph",
        material: "Steel · gold tone · chronograph",
        description: "A silver dial with three sub-dials and Roman XII, paired with a two-tone oyster bracelet for sporty elegance.",
      },
      fr: {
        name: "Michael Kors chrono bicolore",
        material: "Acier · ton or · chronographe",
        description: "Un cadran argent à trois compteurs et XII romain, associé à un bracelet oyster bicolore pour une élégance sportive.",
      },
      ar: {
        name: "مايكل كورس كرونوغراف ثنائي اللون",
        material: "فولاذ · طلاء ذهبي · كرونوغراف",
        description: "قرص فضي بثلاثة عدادات و XII روماني، مع سوار أويستر ثنائي اللون لأناقة رياضية.",
      },
    },
  },
  {
    slug: "versace-gold-medusa",
    category: "Watches",
    price: 1480,
    variants: [{ id: "default", color: "Default", image: "https://res.cloudinary.com/dfxeaeebv/image/upload/v1792499088/cuties/watches/versace-gold-medusa.jpg", quantity: 10 }],
    position: 22,
    translations: {
      en: {
        name: "Versace Gold Medusa",
        material: "Gold tone · Medusa emblem",
        label: "Exclusive",
        description: "A guilloché silver dial crowned by the Medusa at twelve, with Roman numerals and a polished gold link bracelet.",
      },
      fr: {
        name: "Versace or Méduse",
        material: "Ton or · emblème Méduse",
        label: "Exclusive",
        description: "Un cadran argent guilloché couronné de la Méduse à midi, chiffres romains et bracelet or poli.",
      },
      ar: {
        name: "فيرساتشي ذهبية ميدوسا",
        material: "طلاء ذهبي · شعار ميدوسا",
        label: "حصرية",
        description: "قرص فضي منقوش تعلوه ميدوسا عند الثانية عشرة، بأرقام رومانية وسوار ذهبي مصقول.",
      },
    },
  },
  {
    slug: "michael-kors-silver-chrono",
    category: "Watches",
    price: 1280,
    variants: [{ id: "default", color: "Default", image: "https://res.cloudinary.com/dfxeaeebv/image/upload/v1792499089/cuties/watches/michael-kors-silver-chrono.jpg", quantity: 10 }],
    position: 23,
    translations: {
      en: {
        name: "Michael Kors Silver Chronograph",
        material: "Stainless steel · chronograph",
        description: "An all-silver chronograph with three sub-dials, a date window, and a classic oyster bracelet for everyday polish.",
      },
      fr: {
        name: "Michael Kors chrono argent",
        material: "Acier inoxydable · chronographe",
        description: "Un chronographe tout argent à trois compteurs, guichet date et bracelet oyster classique pour un poli quotidien.",
      },
      ar: {
        name: "مايكل كورس كرونوغراف فضي",
        material: "فولاذ مقاوم للصدأ · كرونوغراف",
        description: "كرونوغراف فضي بالكامل بثلاثة عدادات ونافذة تاريخ وسوار أويستر كلاسيكي للّمعة اليومية.",
      },
    },
  },
  {
    slug: "dior-navy-twotone",
    category: "Watches",
    price: 2600,
    variants: [{ id: "default", color: "Default", image: "https://res.cloudinary.com/dfxeaeebv/image/upload/v1792499089/cuties/watches/dior-navy-twotone.jpg", quantity: 10 }],
    position: 24,
    translations: {
      en: {
        name: "Dior Navy Two-Tone",
        material: "Steel · gold tone · diamond bezel",
        label: "Limited",
        description: "A gold-to-navy gradient dial with Roman numerals, diamond bezel, and a sculptural two-tone chevron bracelet.",
      },
      fr: {
        name: "Dior navy bicolore",
        material: "Acier · ton or · lunette diamants",
        label: "Édition limitée",
        description: "Un cadran dégradé or-navy aux chiffres romains, lunette diamants et bracelet chevron bicolore sculptural.",
      },
      ar: {
        name: "ديور كحلي ثنائي اللون",
        material: "فولاذ · طلاء ذهبي · إطار ماسي",
        label: "إصدار محدود",
        description: "قرص متدرج من الذهب إلى الكحلي بأرقام رومانية وإطار ماسي وسوار شيفرون ثنائي اللون منحوت.",
      },
    },
  },
  {
    slug: "michael-kors-gold-crystal",
    category: "Watches",
    price: 1150,
    variants: [{ id: "default", color: "Default", image: "https://res.cloudinary.com/dfxeaeebv/image/upload/v1792499090/cuties/watches/michael-kors-gold-crystal.jpg", quantity: 10 }],
    position: 25,
    translations: {
      en: {
        name: "Michael Kors Gold Crystal",
        material: "Gold tone · crystal markers",
        description: "An octagonal gold case with crystal hour markers on a quilted white dial — bold geometry with soft sparkle.",
      },
      fr: {
        name: "Michael Kors or cristal",
        material: "Ton or · index cristaux",
        description: "Un boîtier or octogonal aux index cristaux sur cadran blanc matelassé — géométrie affirmée et éclat doux.",
      },
      ar: {
        name: "مايكل كورس ذهبية بالكريستال",
        material: "طلاء ذهبي · علامات كريستال",
        description: "علبة ذهبية ثمانية بعلامات كريستالية على قرص أبيض مبطن — هندسة جريئة ولمعان ناعم.",
      },
    },
  },
];
