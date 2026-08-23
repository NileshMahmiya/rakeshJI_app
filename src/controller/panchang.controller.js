import {
  getPanchangam,
  Observer,
} from "@ishubhamx/panchangam-js";

/* =========================================================
   HINDI TRANSLATION SYSTEM
========================================================= */

const HI = {
  // -----------------------------------------
  // VARA
  // -----------------------------------------
  vara: {
    0: "रविवार",
    1: "सोमवार",
    2: "मंगलवार",
    3: "बुधवार",
    4: "गुरुवार",
    5: "शुक्रवार",
    6: "शनिवार",
  },

  // -----------------------------------------
  // MASA
  // -----------------------------------------
  masa: {
    Chaitra: "चैत्र",
    Vaishakha: "वैशाख",
    Jyeshtha: "ज्येष्ठ",
    Ashadha: "आषाढ़",
    Shravana: "श्रावण",
    Bhadrapada: "भाद्रपद",
    Ashwin: "आश्विन",
    Kartika: "कार्तिक",
    Margashirsha: "मार्गशीर्ष",
    Pausha: "पौष",
    Magha: "माघ",
    Phalguna: "फाल्गुन",
  },

  // -----------------------------------------
  // PAKSHA
  // -----------------------------------------
  paksha: {
    Shukla: "शुक्ल पक्ष",
    Krishna: "कृष्ण पक्ष",
  },

  // -----------------------------------------
  // RITU
  // -----------------------------------------
  ritu: {
    Vasanta: "वसंत",
    Grishma: "ग्रीष्म",
    Varsha: "वर्षा",
    Sharad: "शरद",
    Hemanta: "हेमंत",
    Shishira: "शिशिर",
  },

  // -----------------------------------------
  // AYANA
  // -----------------------------------------
  ayana: {
    Uttarayana: "उत्तरायण",
    Dakshinayana: "दक्षिणायन",
  },

  // -----------------------------------------
  // TITHI
  // -----------------------------------------
  tithi: {
    Pratipada: "प्रतिपदा",
    Dwitiya: "द्वितीया",
    Tritiya: "तृतीया",
    Chaturthi: "चतुर्थी",
    Panchami: "पंचमी",
    Shashthi: "षष्ठी",
    Saptami: "सप्तमी",
    Ashtami: "अष्टमी",
    Navami: "नवमी",
    Dashami: "दशमी",
    Ekadashi: "एकादशी",
    Dwadashi: "द्वादशी",
    Trayodashi: "त्रयोदशी",
    Chaturdashi: "चतुर्दशी",
    Purnima: "पूर्णिमा",
    Amavasya: "अमावस्या",
  },

  // -----------------------------------------
  // NAKSHATRA
  // -----------------------------------------
  nakshatra: {
    Ashwini: "अश्विनी",
    Bharani: "भरणी",
    Krittika: "कृत्तिका",
    Rohini: "रोहिणी",
    Mrigashira: "मृगशिरा",
    Ardra: "आर्द्रा",
    Punarvasu: "पुनर्वसु",
    Pushya: "पुष्य",
    Ashlesha: "आश्लेषा",
    Magha: "मघा",
    PurvaPhalguni: "पूर्वाफाल्गुनी",
    UttaraPhalguni: "उत्तराफाल्गुनी",
    Hasta: "हस्त",
    Chitra: "चित्रा",
    Swati: "स्वाती",
    Vishakha: "विशाखा",
    Anuradha: "अनुराधा",
    Jyeshtha: "ज्येष्ठा",
    Mula: "मूल",
    PurvaAshadha: "पूर्वाषाढ़ा",
    UttaraAshadha: "उत्तराषाढ़ा",
    Shravana: "श्रवण",
    Dhanishtha: "धनिष्ठा",
    Shatabhisha: "शतभिषा",
    PurvaBhadrapada: "पूर्वाभाद्रपद",
    UttaraBhadrapada: "उत्तराभाद्रपद",
    Revati: "रेवती",
  },

  // -----------------------------------------
  // YOGA
  // -----------------------------------------
  yoga: {
    Vishkambha: "विष्कंभ",
    Priti: "प्रीति",
    Ayushman: "आयुष्मान",
    Saubhagya: "सौभाग्य",
    Shobhana: "शोभन",
    Atiganda: "अतिगंड",
    Sukarma: "सुकर्मा",
    Dhriti: "धृति",
    Shula: "शूल",
    Ganda: "गंड",
    Vriddhi: "वृद्धि",
    Dhruva: "ध्रुव",
    Vyaghata: "व्याघात",
    Harshana: "हर्षण",
    Vajra: "वज्र",
    Siddhi: "सिद्धि",
    Vyatipata: "व्यतीपात",
    Variyana: "वरीयान",
    Parigha: "परिघ",
    Shiva: "शिव",
    Siddha: "सिद्ध",
    Sadhya: "साध्य",
    Shubha: "शुभ",
    Shukla: "शुक्ल",
    Brahma: "ब्रह्म",
    Indra: "इंद्र",
    Vaidhriti: "वैधृति",
  },

  // -----------------------------------------
  // KARANA
  // -----------------------------------------
  karana: {
    Bava: "बव",
    Balava: "बालव",
    Kaulava: "कौलव",
    Taitila: "तैतिल",
    Gara: "गर",
    Vanija: "वणिज",
    Vishti: "विष्टि",
    Shakuni: "शकुनि",
    Chatushpada: "चतुष्पद",
    Naga: "नाग",
    Kimstughna: "किंस्तुघ्न",
  },

  // -----------------------------------------
  // RASHI
  // -----------------------------------------
  rashi: {
    Aries: "मेष",
    Taurus: "वृषभ",
    Gemini: "मिथुन",
    Cancer: "कर्क",
    Leo: "सिंह",
    Virgo: "कन्या",
    Libra: "तुला",
    Scorpio: "वृश्चिक",
    Sagittarius: "धनु",
    Capricorn: "मकर",
    Aquarius: "कुंभ",
    Pisces: "मीन",
  },

  // -----------------------------------------
  // CHOGHADIYA
  // -----------------------------------------
  choghadiya: {
    Chal: "चल",
    Labh: "लाभ",
    Amrit: "अमृत",
    Kaal: "काल",
    Rog: "रोग",
    Shubh: "शुभ",
    Udveg: "उद्वेग",
  },

  // -----------------------------------------
  // RATING
  // -----------------------------------------
  rating: {
    good: "शुभ",
    bad: "अशुभ",
    neutral: "सामान्य",
  },

  // -----------------------------------------
  // FESTIVAL TYPES
  // -----------------------------------------
  festivalType: {
    single: "एक दिवसीय",
    multi: "बहु-दिवसीय",
  },

  // -----------------------------------------
  // FESTIVAL CATEGORY
  // -----------------------------------------
  festivalCategory: {
    vrat: "व्रत",
    festival: "त्योहार",
    jayanti: "जयंती",
    utsav: "उत्सव",
    religious: "धार्मिक",
  },

  // -----------------------------------------
  // COMMON OBSERVANCES
  // -----------------------------------------
  observances: {
    "Lakshmi puja": "लक्ष्मी पूजा",
    "Kalasha worship": "कलश पूजा",
    "New saree offered": "नई साड़ी अर्पित करना",
  },

  // -----------------------------------------
  // COMMON FESTIVAL WORDS
  // -----------------------------------------
  festivalWords: {
    Worship: "पूजा",
    Goddess: "देवी",
    wealth: "धन",
    prosperity: "समृद्धि",
    observed: "मनाया जाता है",
    Friday: "शुक्रवार",
    nearest: "निकटतम",
    before: "से पहले",
  },
};


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

/**
 * Translate safely
 */
const translate = (value, dictionary) => {
  if (!value) return null;

  return dictionary[value] || value;
};


/**
 * Convert seconds to minutes
 *
 * 19800 -> 330
 * 18000 -> 300
 * 3600  -> 60
 */
const secondsToMinutes = (seconds) => {
  if (
    seconds === undefined ||
    seconds === null ||
    seconds === ""
  ) {
    return null;
  }

  const number = Number(seconds);

  if (Number.isNaN(number)) {
    return null;
  }

  return number / 60;
};


/**
 * Format time according to selected city timezone
 */
const formatTime = (date, timezone) => {
  if (!date) return null;

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return null;
  }

  return d.toLocaleTimeString("en-IN", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};


/**
 * Format transition
 *
 * Used for:
 * Tithi
 * Nakshatra
 * Yoga
 * Karana
 */
const formatTransition = (
  item,
  timezone,
  dictionary
) => {
  const englishName = item?.name || "Unknown";

  return {
    name: englishName,

    nameHindi:
      translate(englishName, dictionary) ||
      englishName,

    startTime: formatTime(
      item?.startTime,
      timezone
    ),

    endTime: formatTime(
      item?.endTime,
      timezone
    ),
  };
};


/**
 * Format Rashi
 */
const formatRashi = (rashi) => {
  if (!rashi) return null;

  return {
    ...rashi,

    nameHindi:
      translate(
        rashi.name,
        HI.rashi
      ) || rashi.name,
  };
};


/**
 * Format Sun Nakshatra
 */
const formatSunNakshatra = (nakshatra) => {
  if (!nakshatra) return null;

  return {
    ...nakshatra,

    nameHindi:
      translate(
        nakshatra.name,
        HI.nakshatra
      ) || nakshatra.name,
  };
};


/**
 * Translate festival description
 *
 * We keep the original English description
 * and provide a Hindi description.
 *
 * This function handles the known words while
 * preserving names/extra content.
 */
const translateFestivalDescription = (
  description
) => {
  if (!description) return null;

  let hindi = description;

  const replacements = [
    [
      "Worship of Goddess",
      "देवी की पूजा"
    ],
    [
      "for wealth and prosperity",
      "धन और समृद्धि के लिए"
    ],
    [
      "observed on the Friday nearest to",
      "के निकटतम शुक्रवार को मनाया जाता है"
    ],
    [
      "(and before)",
      "और उससे पहले"
    ],
    [
      "Shravana Purnima",
      "श्रावण पूर्णिमा"
    ],
  ];

  for (const [english, hindiText] of replacements) {
    hindi = hindi.replace(
      english,
      hindiText
    );
  }

  return hindi;
};


/**
 * Format festival
 */
const formatFestival = (festival) => {
  if (!festival) return null;

  const category =
    festival.category || null;

  const type =
    festival.type || null;

  return {
    ...festival,

    nameHindi:
      festival.name || null,

    typeHindi:
      HI.festivalType[type] ||
      type ||
      null,

    categoryHindi:
      HI.festivalCategory[category] ||
      category ||
      null,

    descriptionHindi:
      translateFestivalDescription(
        festival.description
      ),

    observancesHindi:
      Array.isArray(festival.observances)
        ? festival.observances.map(
            (item) =>
              HI.observances[item] || item
          )
        : [],
  };
};


/* =========================================================
   MAIN CONTROLLER
========================================================= */

export const getPanchang = async (
  req,
  res
) => {
  try {
    const {
      date,

      city,
      state,
      country,

      latitude,
      longitude,

      elevation = 0,

      // -------------------------------------
      // GEOAPIFY TIMEZONE DATA
      // -------------------------------------

      timezone,

      offset_STD_seconds,

      offset_DST_seconds,
    } = req.query;


    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }


    if (
      latitude === undefined ||
      latitude === null ||
      longitude === undefined ||
      longitude === null
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Latitude and longitude are required",
      });
    }


    if (!timezone) {
      return res.status(400).json({
        success: false,
        message: "Timezone is required",
      });
    }


    /* =====================================================
       VALIDATE LATITUDE / LONGITUDE
    ===================================================== */

    const lat = Number(latitude);
    const lon = Number(longitude);
    const elev = Number(elevation);


    if (
      Number.isNaN(lat) ||
      Number.isNaN(lon)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Latitude and longitude must be valid numbers",
      });
    }


    /* =====================================================
       DATE
    ===================================================== */

    const parsedDate =
      new Date(`${date}T00:00:00`);


    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid date format. Use YYYY-MM-DD",
      });
    }


    /* =====================================================
       TIMEZONE OFFSET
    ===================================================== */

    const timezoneOffset =
      secondsToMinutes(
        offset_STD_seconds
      );


    const timezoneOffsetDST =
      secondsToMinutes(
        offset_DST_seconds
      );


    if (timezoneOffset === null) {
      return res.status(400).json({
        success: false,
        message:
          "Valid timezone offset is required",
      });
    }


    /* =====================================================
       OBSERVER
    ===================================================== */

    const observer =
      new Observer(
        lat,
        lon,
        elev
      );


    /* =====================================================
       GET PANCHANG
    ===================================================== */

    const panchang =
      getPanchangam(
        parsedDate,
        observer,
        {
          timezoneOffset:
            timezoneOffset,
        }
      );


    /* =====================================================
       SAFE OBJECTS
    ===================================================== */

    const rahu =
      panchang.rahuKalam || {};

    const yama =
      panchang.yamagandaKalam || {};

    const guli =
      panchang.gulikaKalam || {};

    const abhijit =
      panchang.abhijitMuhurta || {};

    const brahma =
      panchang.brahmaMuhurta || {};

    const chogh =
      panchang.choghadiya || {
        day: [],
        night: [],
      };


    /* =====================================================
       VARA
    ===================================================== */

    const varaEnglish =
      panchang.vara ?? null;

    const varaHindi =
      HI.vara[varaEnglish] ||
      varaEnglish;


    /* =====================================================
       MASA
    ===================================================== */

    let masa = null;

    if (panchang.masa) {
      masa = {
        ...panchang.masa,

        nameHindi:
          translate(
            panchang.masa.name,
            HI.masa
          ) ||
          panchang.masa.name,
      };
    }


    /* =====================================================
       PAKSHA
    ===================================================== */

    const pakshaEnglish =
      panchang.paksha || null;

    const pakshaHindi =
      HI.paksha[pakshaEnglish] ||
      pakshaEnglish;


    /* =====================================================
       RITU
    ===================================================== */

    const rituEnglish =
      panchang.ritu || null;

    const rituHindi =
      HI.ritu[rituEnglish] ||
      rituEnglish;


    /* =====================================================
       AYANA
    ===================================================== */

    const ayanaEnglish =
      panchang.ayana || null;

    const ayanaHindi =
      HI.ayana[ayanaEnglish] ||
      ayanaEnglish;


    /* =====================================================
       RESPONSE
    ===================================================== */

    return res.status(200).json({

      success: true,

      message:
        "Panchang fetched successfully",

      date: date,


      /* ===================================================
         LOCATION
      =================================================== */

      location: {

        city:
          city?.trim() || null,

        state:
          state?.trim() || null,

        country:
          country?.trim() || null,

        latitude: lat,

        longitude: lon,

        elevation: elev,

        timezone,

        timezoneOffset,

        timezoneOffsetSeconds:
          Number(offset_STD_seconds),

        timezoneOffsetDST,

        timezoneOffsetDSTSeconds:
          offset_DST_seconds !== undefined
            ? Number(offset_DST_seconds)
            : null,
      },


      /* ===================================================
         PANCHANG
      =================================================== */

      panchang: {

        /* -----------------------------------------------
           VARA
        ----------------------------------------------- */

        vara: varaEnglish,

        varaHindi,


        /* -----------------------------------------------
           MASA
        ----------------------------------------------- */

        masa,


        /* -----------------------------------------------
           PAKSHA
        ----------------------------------------------- */

        paksha:
          pakshaEnglish,

        pakshaHindi,


        /* -----------------------------------------------
           RITU
        ----------------------------------------------- */

        ritu:
          rituEnglish,

        rituHindi,


        /* -----------------------------------------------
           AYANA
        ----------------------------------------------- */

        ayana:
          ayanaEnglish,

        ayanaHindi,


        /* -----------------------------------------------
           SAMVAT
        ----------------------------------------------- */

        samvat:
          panchang.samvat || null,


        /* ===============================================
           TITHI
        =============================================== */

        tithi:
          Array.isArray(
            panchang.tithis
          )
            ? panchang.tithis.map(
                (item) =>
                  formatTransition(
                    item,
                    timezone,
                    HI.tithi
                  )
              )
            : [],


        /* ===============================================
           NAKSHATRA
        =============================================== */

        nakshatra:
          Array.isArray(
            panchang.nakshatras
          )
            ? panchang.nakshatras.map(
                (item) =>
                  formatTransition(
                    item,
                    timezone,
                    HI.nakshatra
                  )
              )
            : [],


        /* ===============================================
           YOGA
        =============================================== */

        yoga:
          Array.isArray(
            panchang.yogas
          )
            ? panchang.yogas.map(
                (item) =>
                  formatTransition(
                    item,
                    timezone,
                    HI.yoga
                  )
              )
            : [],


        /* ===============================================
           KARANA
        =============================================== */

        karana:
          Array.isArray(
            panchang.karanas
          )
            ? panchang.karanas.map(
                (item) =>
                  formatTransition(
                    item,
                    timezone,
                    HI.karana
                  )
              )
            : [],


        /* ===============================================
           SUN
        =============================================== */

        sunrise:
          formatTime(
            panchang.sunrise,
            timezone
          ),

        sunset:
          formatTime(
            panchang.sunset,
            timezone
          ),


        /* ===============================================
           MOON
        =============================================== */

        moonrise:
          formatTime(
            panchang.moonrise,
            timezone
          ),

        moonset:
          formatTime(
            panchang.moonset,
            timezone
          ),


        /* ===============================================
           MOON RASHI
        =============================================== */

        moonRashi:
          formatRashi(
            panchang.moonRashi
          ),


        /* ===============================================
           SUN RASHI
        =============================================== */

        sunRashi:
          formatRashi(
            panchang.sunRashi
          ),


        /* ===============================================
           SUN NAKSHATRA
        =============================================== */

        sunNakshatra:
          formatSunNakshatra(
            panchang.sunNakshatra
          ),


        /* ===============================================
           RAHU KALAM
        =============================================== */

        rahuKalam: {

          start:
            formatTime(
              rahu.start ||
                panchang.rahuKalamStart,
              timezone
            ),

          end:
            formatTime(
              rahu.end ||
                panchang.rahuKalamEnd,
              timezone
            ),
        },


        /* ===============================================
           YAMAGANDA
        =============================================== */

        yamagandaKalam: {

          start:
            formatTime(
              yama.start,
              timezone
            ),

          end:
            formatTime(
              yama.end,
              timezone
            ),
        },


        /* ===============================================
           GULIKA
        =============================================== */

        gulikaKalam: {

          start:
            formatTime(
              guli.start,
              timezone
            ),

          end:
            formatTime(
              guli.end,
              timezone
            ),
        },


        /* ===============================================
           ABHIJIT MUHURTA
        =============================================== */

        abhijitMuhurta: {

          start:
            formatTime(
              abhijit.start,
              timezone
            ),

          end:
            formatTime(
              abhijit.end,
              timezone
            ),
        },


        /* ===============================================
           BRAHMA MUHURTA
        =============================================== */

        brahmaMuhurta: {

          start:
            formatTime(
              brahma.start,
              timezone
            ),

          end:
            formatTime(
              brahma.end,
              timezone
            ),
        },


        /* ===============================================
           CHOGHADIYA
        =============================================== */

        choghadiya: {

          day:

            Array.isArray(
              chogh.day
            )
              ? chogh.day.map(
                  (item) => {

                    const englishName =
                      item?.name || null;

                    return {

                      name:
                        englishName,

                      nameHindi:
                        HI.choghadiya[
                          englishName
                        ] ||
                        englishName,

                      startTime:
                        formatTime(
                          item?.startTime,
                          timezone
                        ),

                      endTime:
                        formatTime(
                          item?.endTime,
                          timezone
                        ),

                      rating:
                        item?.rating ||
                        null,

                      ratingHindi:
                        HI.rating[
                          item?.rating
                        ] ||
                        item?.rating ||
                        null,
                    };
                  }
                )
              : [],


          night:

            Array.isArray(
              chogh.night
            )
              ? chogh.night.map(
                  (item) => {

                    const englishName =
                      item?.name || null;

                    return {

                      name:
                        englishName,

                      nameHindi:
                        HI.choghadiya[
                          englishName
                        ] ||
                        englishName,

                      startTime:
                        formatTime(
                          item?.startTime,
                          timezone
                        ),

                      endTime:
                        formatTime(
                          item?.endTime,
                          timezone
                        ),

                      rating:
                        item?.rating ||
                        null,

                      ratingHindi:
                        HI.rating[
                          item?.rating
                        ] ||
                        item?.rating ||
                        null,
                    };
                  }
                )
              : [],
        },


        /* ===============================================
           FESTIVALS
        =============================================== */

        festivals:
          Array.isArray(
            panchang.festivals
          )
            ? panchang.festivals.map(
                formatFestival
              )
            : [],


        /* ===============================================
           GRAHAN
        =============================================== */

        grahan:
          panchang.grahan || null,
      },
    });

  } catch (error) {

    console.error(
      "================================="
    );

    console.error(
      "PANCHANG ERROR"
    );

    console.error(
      "================================="
    );

    console.error(error);


    return res.status(500).json({

      success: false,

      message:
        "Something went wrong while fetching Panchang",

      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};