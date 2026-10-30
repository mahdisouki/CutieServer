import path from "node:path";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import type { CatalogProduct } from "./catalog";
import { readEnv } from "./config";
import { connectDb } from "./db";
import { Product } from "./models";

const watchesDir = path.resolve(__dirname, "../assets/watches");

type WatchSeed = Omit<CatalogProduct, "variants"> & { file: string; quantity: number };

const watches: WatchSeed[] = [
  {
    slug: "cartier-panthere-diamond",
    category: "Watches",
    price: 4200,
    quantity: 10,
    position: 8,
    file: "cartier-panthere-diamond.webp",
    translations: {
      en: {
        name: "Cartier Panthère Diamond",
        material: "Yellow gold · diamond pavé",
        label: "Exclusive",
        description:
          "A square gold case framed in brilliant diamonds, paired with an S-link bracelet fully set in pavé. An icon of quiet, luminous luxury.",
      },
      fr: {
        name: "Cartier Panthère diamant",
        material: "Or jaune · pavé de diamants",
        label: "Exclusive",
        description:
          "Un boîtier carré en or entouré de diamants brillants, associé à un bracelet à maillons S entièrement pavé. Une icône de luxe lumineux.",
      },
      ar: {
        name: "كارتييه بانثير بالماس",
        material: "ذهب أصفر · رصف ماسي",
        label: "حصرية",
        description:
          "علبة مربعة من الذهب محاطة بالماس اللامع، مع سوار بحلقات S مرصّع بالكامل. أيقونة من الفخامة الهادئة والمشرقة.",
      },
    },
  },
  {
    slug: "patek-philippe-black-diamond",
    category: "Watches",
    price: 5800,
    quantity: 10,
    position: 9,
    file: "patek-philippe-black-diamond.jpg",
    translations: {
      en: {
        name: "Patek Philippe Black Diamond",
        material: "White gold · diamond bezel",
        label: "Exclusive",
        description:
          "A matte black dial set against a fully diamond-set bezel and polished brick-link bracelet. Precision meets understated brilliance.",
      },
      fr: {
        name: "Patek Philippe noir diamant",
        material: "Or blanc · lunette diamants",
        label: "Exclusive",
        description:
          "Un cadran noir mat face à une lunette entièrement sertie de diamants et un bracelet à maillons briques poli. La précision rencontre l'éclat discret.",
      },
      ar: {
        name: "باتيك فيليب أسود بالماس",
        material: "ذهب أبيض · إطار ماسي",
        label: "حصرية",
        description:
          "قرص أسود مطفي مقابل إطار مرصّع بالماس بالكامل وسوار بحلقات طوب مصقول. الدقة تلتقي بالبريق الهادئ.",
      },
    },
  },
  {
    slug: "michael-kors-silver-crystal",
    category: "Watches",
    price: 980,
    quantity: 10,
    position: 10,
    file: "michael-kors-silver-crystal.jpg",
    translations: {
      en: {
        name: "Michael Kors Silver Crystal",
        material: "Stainless steel · crystal markers",
        label: "New",
        description:
          "A bright white dial with crystal hour markers and a polished silver link bracelet. Clean, sparkling, and effortlessly wearable.",
      },
      fr: {
        name: "Michael Kors argent cristal",
        material: "Acier inoxydable · index cristaux",
        label: "Nouveau",
        description:
          "Un cadran blanc éclatant aux index en cristal et un bracelet argent poli. Claire, scintillante, et facile à porter.",
      },
      ar: {
        name: "مايكل كورس فضي بالكريستال",
        material: "فولاذ مقاوم للصدأ · علامات كريستال",
        label: "جديد",
        description:
          "قرص أبيض مشرق بعلامات ساعات كريستالية وسوار فضي مصقول. نظيفة ولامعة وسهلة الارتداء.",
      },
    },
  },
  {
    slug: "michael-kors-navy-twotone",
    category: "Watches",
    price: 1120,
    quantity: 10,
    position: 11,
    file: "michael-kors-navy-twotone.jpg",
    translations: {
      en: {
        name: "Michael Kors Navy Two-Tone",
        material: "Steel · rose gold · crystal pavé",
        label: "Bestseller",
        description:
          "A deep navy dial with a rose-gold MK monogram, framed by a crystal bezel and a two-tone jubilee bracelet.",
      },
      fr: {
        name: "Michael Kors navy bicolore",
        material: "Acier · or rose · pavé cristal",
        label: "Best-seller",
        description:
          "Un cadran navy profond au monogramme MK or rose, entouré d'une lunette cristal et d'un bracelet jubilee bicolore.",
      },
      ar: {
        name: "مايكل كورس كحلي ثنائي اللون",
        material: "فولاذ · ذهب وردي · رصف كريستال",
        label: "الأكثر مبيعاً",
        description:
          "قرص كحلي عميق بشعار MK ذهبي وردي، محاط بإطار كريستالي وسوار جوبيلي ثنائي اللون.",
      },
    },
  },
  {
    slug: "chopard-gold-roman",
    category: "Watches",
    price: 3200,
    quantity: 10,
    position: 12,
    file: "chopard-gold-roman.jpg",
    translations: {
      en: {
        name: "Chopard Gold Roman",
        material: "Gold tone · steel bracelet",
        label: "New",
        description:
          "A warm gold dial with Roman numerals and a two-tone link bracelet. Classic proportion with a soft, luminous finish.",
      },
      fr: {
        name: "Chopard or romain",
        material: "Ton or · bracelet acier",
        label: "Nouveau",
        description:
          "Un cadran or chaud aux chiffres romains et un bracelet bicolore. Proportion classique et finition lumineuse.",
      },
      ar: {
        name: "شوبارد ذهبية بأرقام رومانية",
        material: "طلاء ذهبي · سوار فولاذي",
        label: "جديد",
        description:
          "قرص ذهبي دافئ بأرقام رومانية وسوار ثنائي اللون. تناسب كلاسيكي ولمسة مشرقة ناعمة.",
      },
    },
  },
  {
    slug: "michael-kors-cream-twotone",
    category: "Watches",
    price: 1050,
    quantity: 10,
    position: 13,
    file: "michael-kors-cream-twotone.jpg",
    translations: {
      en: {
        name: "Michael Kors Cream Two-Tone",
        material: "Steel · gold tone",
        description:
          "A cream guilloché dial with Roman XII and VI, set in a two-tone case and bracelet for a refined daytime look.",
      },
      fr: {
        name: "Michael Kors crème bicolore",
        material: "Acier · ton or",
        description:
          "Un cadran crème guilloché aux chiffres XII et VI, dans un boîtier et bracelet bicolores pour un look diurne raffiné.",
      },
      ar: {
        name: "مايكل كورس كريمي ثنائي اللون",
        material: "فولاذ · طلاء ذهبي",
        description:
          "قرص كريمي بنقش غيوشيه مع XII و VI، في علبة وسوار ثنائي اللون لمظهر نهاري راقٍ.",
      },
    },
  },
  {
    slug: "michael-kors-pave-mk-logo",
    category: "Watches",
    price: 1180,
    quantity: 10,
    position: 14,
    file: "michael-kors-pave-mk-logo.jpg",
    translations: {
      en: {
        name: "Michael Kors Pavé MK Logo",
        material: "Steel · gold tone · crystal pavé",
        label: "Bestseller",
        description:
          "A bold gold MK monogram on a silver dial, bordered by a pavé crystal bezel and crystal-set bracelet links.",
      },
      fr: {
        name: "Michael Kors pavé logo MK",
        material: "Acier · ton or · pavé cristal",
        label: "Best-seller",
        description:
          "Un monogramme MK or sur cadran argent, entouré d'une lunette pavée et de maillons sertis de cristaux.",
      },
      ar: {
        name: "مايكل كورس مرصّعة بشعار MK",
        material: "فولاذ · طلاء ذهبي · رصف كريستال",
        label: "الأكثر مبيعاً",
        description:
          "شعار MK ذهبي جريء على قرص فضي، محاط بإطار كريستالي وحلقات سوار مرصّعة.",
      },
    },
  },
  {
    slug: "gucci-gold-honeycomb",
    category: "Watches",
    price: 1650,
    quantity: 10,
    position: 15,
    file: "gucci-gold-honeycomb.jpg",
    translations: {
      en: {
        name: "Gucci Gold Honeycomb",
        material: "Gold tone · crystal indices",
        label: "New",
        description:
          "A champagne dial with diamond hour markers and a signature honeycomb-link bracelet in polished gold tone.",
      },
      fr: {
        name: "Gucci or honeycomb",
        material: "Ton or · index cristaux",
        label: "Nouveau",
        description:
          "Un cadran champagne aux index diamant et un bracelet signature à maillons honeycomb en ton or poli.",
      },
      ar: {
        name: "غوتشي ذهبية بخلية النحل",
        material: "طلاء ذهبي · علامات كريستال",
        label: "جديد",
        description:
          "قرص شمباني بعلامات ساعات ماسية وسوار بخلية نحل مميزة بطلاء ذهبي مصقول.",
      },
    },
  },
  {
    slug: "michael-kors-rosegold-crystal",
    category: "Watches",
    price: 1100,
    quantity: 10,
    position: 16,
    file: "michael-kors-rosegold-crystal.jpg",
    translations: {
      en: {
        name: "Michael Kors Rose Gold Crystal",
        material: "Steel · rose gold · crystal markers",
        description:
          "A rose-gold dial with crystal indices and a two-tone oyster bracelet. Soft metallic warmth with a modern edge.",
      },
      fr: {
        name: "Michael Kors or rose cristal",
        material: "Acier · or rose · index cristaux",
        description:
          "Un cadran or rose aux index cristaux et un bracelet oyster bicolore. Chaleur métallique douce au trait moderne.",
      },
      ar: {
        name: "مايكل كورس ذهب وردي بالكريستال",
        material: "فولاذ · ذهب وردي · علامات كريستال",
        description:
          "قرص ذهب وردي بعلامات كريستالية وسوار أويستر ثنائي اللون. دفء معدني ناعم بلمسة عصرية.",
      },
    },
  },
  {
    slug: "patek-philippe-gold-diamond",
    category: "Watches",
    price: 6200,
    quantity: 10,
    position: 17,
    file: "patek-philippe-gold-diamond.jpg",
    translations: {
      en: {
        name: "Patek Philippe Gold Diamond",
        material: "Yellow gold · diamond bezel",
        label: "Exclusive",
        description:
          "A silvery sunburst dial within a diamond-set gold bezel and tank-link bracelet. Timeless haute horlogerie presence.",
      },
      fr: {
        name: "Patek Philippe or diamant",
        material: "Or jaune · lunette diamants",
        label: "Exclusive",
        description:
          "Un cadran argenté soleil dans une lunette or sertie de diamants et un bracelet tank. Présence intemporelle haute horlogerie.",
      },
      ar: {
        name: "باتيك فيليب ذهبية بالماس",
        material: "ذهب أصفر · إطار ماسي",
        label: "حصرية",
        description:
          "قرص فضي مشع ضمن إطار ذهبي مرصّع بالماس وسوار تانك. حضور خالد من عالم الساعات الراقية.",
      },
    },
  },
  {
    slug: "dior-gold-honeycomb",
    category: "Watches",
    price: 2400,
    quantity: 10,
    position: 18,
    file: "dior-gold-honeycomb.jpg",
    translations: {
      en: {
        name: "Dior Gold Honeycomb",
        material: "Gold tone · crystal markers",
        label: "Limited",
        description:
          "A white honeycomb-textured dial with crystal markers at the quarters, framed in polished gold tone.",
      },
      fr: {
        name: "Dior or honeycomb",
        material: "Ton or · index cristaux",
        label: "Édition limitée",
        description:
          "Un cadran blanc texturé honeycomb aux index cristaux aux quarts, entouré d'un ton or poli.",
      },
      ar: {
        name: "ديور ذهبية بخلية النحل",
        material: "طلاء ذهبي · علامات كريستال",
        label: "إصدار محدود",
        description:
          "قرص أبيض بنسيج خلية النحل وعلامات كريستالية عند الأرباع، ضمن إطار ذهبي مصقول.",
      },
    },
  },
  {
    slug: "gucci-twotone-honeycomb",
    category: "Watches",
    price: 1580,
    quantity: 10,
    position: 19,
    file: "gucci-twotone-honeycomb.jpg",
    translations: {
      en: {
        name: "Gucci Two-Tone Honeycomb",
        material: "Steel · gold tone",
        description:
          "A silver sunray dial with diamond markers and a two-tone honeycomb bracelet — light, graphic, and distinctly Gucci.",
      },
      fr: {
        name: "Gucci bicolore honeycomb",
        material: "Acier · ton or",
        description:
          "Un cadran argent soleil aux index diamant et un bracelet honeycomb bicolore — léger, graphique, et nettement Gucci.",
      },
      ar: {
        name: "غوتشي ثنائية اللون بخلية النحل",
        material: "فولاذ · طلاء ذهبي",
        description:
          "قرص فضي مشع بعلامات ماسية وسوار خلية نحل ثنائي اللون — خفيف وواضح وبصمة غوتشي.",
      },
    },
  },
  {
    slug: "michael-kors-gold-pave-mk",
    category: "Watches",
    price: 1250,
    quantity: 10,
    position: 20,
    file: "michael-kors-gold-pave-mk.jpg",
    translations: {
      en: {
        name: "Michael Kors Gold Pavé MK",
        material: "Gold tone · crystal pavé",
        label: "New",
        description:
          "Full gold tone with a large MK monogram, pavé crystal bezel, and crystal-set center links for maximum sparkle.",
      },
      fr: {
        name: "Michael Kors or pavé MK",
        material: "Ton or · pavé cristal",
        label: "Nouveau",
        description:
          "Ton or complet avec grand monogramme MK, lunette pavée et maillons centraux sertis pour un éclat maximal.",
      },
      ar: {
        name: "مايكل كورس ذهبية مرصّعة MK",
        material: "طلاء ذهبي · رصف كريستال",
        label: "جديد",
        description:
          "طلاء ذهبي كامل مع شعار MK كبير وإطار مرصّع وحلقات وسطى كريستالية لأقصى لمعان.",
      },
    },
  },
  {
    slug: "michael-kors-twotone-chrono",
    category: "Watches",
    price: 1350,
    quantity: 10,
    position: 21,
    file: "michael-kors-twotone-chrono.jpg",
    translations: {
      en: {
        name: "Michael Kors Two-Tone Chronograph",
        material: "Steel · gold tone · chronograph",
        description:
          "A silver dial with three sub-dials and Roman XII, paired with a two-tone oyster bracelet for sporty elegance.",
      },
      fr: {
        name: "Michael Kors chrono bicolore",
        material: "Acier · ton or · chronographe",
        description:
          "Un cadran argent à trois compteurs et XII romain, associé à un bracelet oyster bicolore pour une élégance sportive.",
      },
      ar: {
        name: "مايكل كورس كرونوغراف ثنائي اللون",
        material: "فولاذ · طلاء ذهبي · كرونوغراف",
        description:
          "قرص فضي بثلاثة عدادات و XII روماني، مع سوار أويستر ثنائي اللون لأناقة رياضية.",
      },
    },
  },
  {
    slug: "versace-gold-medusa",
    category: "Watches",
    price: 1480,
    quantity: 10,
    position: 22,
    file: "versace-gold-medusa.jpg",
    translations: {
      en: {
        name: "Versace Gold Medusa",
        material: "Gold tone · Medusa emblem",
        label: "Exclusive",
        description:
          "A guilloché silver dial crowned by the Medusa at twelve, with Roman numerals and a polished gold link bracelet.",
      },
      fr: {
        name: "Versace or Méduse",
        material: "Ton or · emblème Méduse",
        label: "Exclusive",
        description:
          "Un cadran argent guilloché couronné de la Méduse à midi, chiffres romains et bracelet or poli.",
      },
      ar: {
        name: "فيرساتشي ذهبية ميدوسا",
        material: "طلاء ذهبي · شعار ميدوسا",
        label: "حصرية",
        description:
          "قرص فضي منقوش تعلوه ميدوسا عند الثانية عشرة، بأرقام رومانية وسوار ذهبي مصقول.",
      },
    },
  },
  {
    slug: "michael-kors-silver-chrono",
    category: "Watches",
    price: 1280,
    quantity: 10,
    position: 23,
    file: "michael-kors-silver-chrono.jpg",
    translations: {
      en: {
        name: "Michael Kors Silver Chronograph",
        material: "Stainless steel · chronograph",
        description:
          "An all-silver chronograph with three sub-dials, a date window, and a classic oyster bracelet for everyday polish.",
      },
      fr: {
        name: "Michael Kors chrono argent",
        material: "Acier inoxydable · chronographe",
        description:
          "Un chronographe tout argent à trois compteurs, guichet date et bracelet oyster classique pour un poli quotidien.",
      },
      ar: {
        name: "مايكل كورس كرونوغراف فضي",
        material: "فولاذ مقاوم للصدأ · كرونوغراف",
        description:
          "كرونوغراف فضي بالكامل بثلاثة عدادات ونافذة تاريخ وسوار أويستر كلاسيكي للّمعة اليومية.",
      },
    },
  },
  {
    slug: "dior-navy-twotone",
    category: "Watches",
    price: 2600,
    quantity: 10,
    position: 24,
    file: "dior-navy-twotone.jpg",
    translations: {
      en: {
        name: "Dior Navy Two-Tone",
        material: "Steel · gold tone · diamond bezel",
        label: "Limited",
        description:
          "A gold-to-navy gradient dial with Roman numerals, diamond bezel, and a sculptural two-tone chevron bracelet.",
      },
      fr: {
        name: "Dior navy bicolore",
        material: "Acier · ton or · lunette diamants",
        label: "Édition limitée",
        description:
          "Un cadran dégradé or-navy aux chiffres romains, lunette diamants et bracelet chevron bicolore sculptural.",
      },
      ar: {
        name: "ديور كحلي ثنائي اللون",
        material: "فولاذ · طلاء ذهبي · إطار ماسي",
        label: "إصدار محدود",
        description:
          "قرص متدرج من الذهب إلى الكحلي بأرقام رومانية وإطار ماسي وسوار شيفرون ثنائي اللون منحوت.",
      },
    },
  },
  {
    slug: "michael-kors-gold-crystal",
    category: "Watches",
    price: 1150,
    quantity: 10,
    position: 25,
    file: "michael-kors-gold-crystal.jpg",
    translations: {
      en: {
        name: "Michael Kors Gold Crystal",
        material: "Gold tone · crystal markers",
        description:
          "An octagonal gold case with crystal hour markers on a quilted white dial — bold geometry with soft sparkle.",
      },
      fr: {
        name: "Michael Kors or cristal",
        material: "Ton or · index cristaux",
        description:
          "Un boîtier or octogonal aux index cristaux sur cadran blanc matelassé — géométrie affirmée et éclat doux.",
      },
      ar: {
        name: "مايكل كورس ذهبية بالكريستال",
        material: "طلاء ذهبي · علامات كريستال",
        description:
          "علبة ذهبية ثمانية بعلامات كريستالية على قرص أبيض مبطن — هندسة جريئة ولمعان ناعم.",
      },
    },
  },
];

function requireCloudinaryEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable ${name}`);
  return value;
}

async function seedWatches() {
  const env = readEnv();
  cloudinary.config({
    cloud_name: requireCloudinaryEnv("CLOUDINARY_CLOUD_NAME"),
    api_key: requireCloudinaryEnv("CLOUDINARY_API_KEY"),
    api_secret: requireCloudinaryEnv("CLOUDINARY_API_SECRET"),
    secure: true,
  });

  await connectDb(env.mongodbUri);

  const seeded: CatalogProduct[] = [];

  for (const watch of watches) {
    const filePath = path.join(watchesDir, watch.file);
    const upload = await cloudinary.uploader.upload(filePath, {
      folder: "cuties/watches",
      public_id: watch.slug,
      overwrite: true,
      resource_type: "image",
    });

    const product: CatalogProduct = {
      slug: watch.slug,
      category: watch.category,
      price: watch.price,
      position: watch.position,
      variants: [{ id: "default", color: "Default", image: upload.secure_url, quantity: watch.quantity }],
      translations: watch.translations,
    };

    await Product.findOneAndUpdate(
      { slug: product.slug },
      { $set: product, $unset: { image: "", quantity: "" } },
      { upsert: true, runValidators: true },
    );

    seeded.push(product);
    console.log(`Uploaded ${product.slug} → ${product.variants[0].image}`);
  }

  console.log(`Seeded ${seeded.length} watches`);
  console.log(JSON.stringify(seeded.map((p) => ({ slug: p.slug, image: p.variants[0].image })), null, 2));

  await mongoose.disconnect();
}

seedWatches().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
