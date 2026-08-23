import {
  getKundli,
  Observer,
  calculateVimshottariDasha,
  checkMangalDosha,
} from "@ishubhamx/panchangam-js";

/* =========================================================
   HINDI TRANSLATION
========================================================= */

const HI = {
  planets: {
    Sun: "सूर्य",
    Moon: "चंद्र",
    Mercury: "बुध",
    Venus: "शुक्र",
    Mars: "मंगल",
    Jupiter: "गुरु",
    Saturn: "शनि",
    Uranus: "अरुण",
    Neptune: "वरुण",
    Pluto: "यम",
    Rahu: "राहु",
    Ketu: "केतु",
  },

  rashis: {
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

  rashisByIndex: {
    0: "मेष",
    1: "वृषभ",
    2: "मिथुन",
    3: "कर्क",
    4: "सिंह",
    5: "कन्या",
    6: "तुला",
    7: "वृश्चिक",
    8: "धनु",
    9: "मकर",
    10: "कुंभ",
    11: "मीन",
  },

  nakshatras: {
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
};


/* =========================================================
   HELPER
========================================================= */

const translate = (value, dictionary) => {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return null;
  }

  return dictionary[value] || value;
};


/* =========================================================
   RASHI TRANSLATION
========================================================= */

const getRashiHindi = (value) => {
  if (
    value === undefined ||
    value === null
  ) {
    return null;
  }

  // If package returns numeric Rashi index
  if (
    typeof value === "number" &&
    HI.rashisByIndex[value]
  ) {
    return HI.rashisByIndex[value];
  }

  return (
    HI.rashis[value] ||
    value
  );
};


/* =========================================================
   NAKSHATRA TRANSLATION
========================================================= */

const getNakshatraHindi = (value) => {
  if (!value) {
    return null;
  }

  return (
    HI.nakshatras[value] ||
    value
  );
};


/* =========================================================
   PLANET TRANSLATION
========================================================= */

const translatePlanet = (
  planetName,
  planetData
) => {
  if (!planetData) {
    return null;
  }

  return {
    ...planetData,

    name:
      planetName,

    nameHindi:
      HI.planets[planetName] ||
      planetName,

    rashiHindi:
      getRashiHindi(
        planetData.rashi
      ),

    rashiNameHindi:
      getRashiHindi(
        planetData.rashiName
      ),

    nakshatraHindi:
      getNakshatraHindi(
        planetData.nakshatra
      ),

    nakshatraNameHindi:
      getNakshatraHindi(
        planetData.nakshatraName
      ),
  };
};


/* =========================================================
   PLANET TRANSLATION
========================================================= */

const translatePlanets = (
  planets
) => {
  if (!planets) {
    return {};
  }

  const result = {};

  for (
    const [planetName, planetData]
    of Object.entries(planets)
  ) {

    result[planetName] =
      translatePlanet(
        planetName,
        planetData
      );
  }

  return result;
};


/* =========================================================
   ASCENDANT TRANSLATION
========================================================= */

const translateAscendant = (
  ascendant
) => {
  if (!ascendant) {
    return null;
  }

  return {
    ...ascendant,

    rashiHindi:
      getRashiHindi(
        ascendant.rashi
      ),

    rashiNameHindi:
      getRashiHindi(
        ascendant.rashiName
      ),

    nakshatraHindi:
      getNakshatraHindi(
        ascendant.nakshatra
      ),

    nakshatraNameHindi:
      getNakshatraHindi(
        ascendant.nakshatraName
      ),

    nakshatraLordHindi:
      HI.planets[
        ascendant.nakshatraLord
      ] ||
      ascendant.nakshatraLord ||
      null,
  };
};


/* =========================================================
   HOUSES TRANSLATION
========================================================= */

const translateHouses = (
  houses
) => {

  if (!Array.isArray(houses)) {
    return [];
  }

  return houses.map(
    (house) => ({
      ...house,

      rashiHindi:
        getRashiHindi(
          house.rashi
        ),

      rashiNameHindi:
        getRashiHindi(
          house.rashiName
        ),

      planetsHindi:
        Array.isArray(
          house.planets
        )
          ? house.planets.map(
              (planet) =>
                HI.planets[planet] ||
                planet
            )
          : [],
    })
  );
};


/* =========================================================
   VARGAS TRANSLATION
========================================================= */

const translateVargas = (
  vargas
) => {

  if (!vargas) {
    return {};
  }

  /*
    We don't destroy the package's
    original Vargas structure.

    We only add Hindi fields
    where possible.
  */

  const result = {};

  for (
    const [key, value]
    of Object.entries(vargas)
  ) {

    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {

      result[key] = {
        ...value,

        rashiHindi:
          getRashiHindi(
            value.rashi
          ),

        rashiNameHindi:
          getRashiHindi(
            value.rashiName
          ),
      };

    } else {

      result[key] = value;
    }
  }

  return result;
};


/* =========================================================
   CREATE DATE FROM LOCAL TIME + TIMEZONE
========================================================= */

const createBirthDate = (
  dateOfBirth,
  timeOfBirth,
  timezoneOffsetMinutes
) => {

  /*
    Example:

    dateOfBirth:
    1999-05-03

    timeOfBirth:
    14:30

    India offset:
    +330

    We convert:

    1999-05-03 14:30
    Asia/Kolkata

    into UTC:

    1999-05-03 09:00 UTC
  */

  const [
    year,
    month,
    day
  ] = dateOfBirth
    .split("-")
    .map(Number);


  const [
    hour,
    minute
  ] = timeOfBirth
    .split(":")
    .map(Number);


  if (
    !year ||
    !month ||
    !day ||
    hour === undefined ||
    minute === undefined
  ) {
    return null;
  }


  /*
    Date.UTC creates a UTC date.

    Then subtract the timezone
    offset to convert local birth
    time into UTC.
  */

  const utcMillis =
    Date.UTC(
      year,
      month - 1,
      day,
      hour,
      minute,
      0
    ) -
    timezoneOffsetMinutes *
      60 *
      1000;


  const date =
    new Date(
      utcMillis
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return null;
  }

  return date;
};


/* =========================================================
   TIMEZONE OFFSET
========================================================= */

const getTimezoneOffsetMinutes = (
  timezone,
  date
) => {

  try {

    const parts =
      new Intl.DateTimeFormat(
        "en-US",
        {
          timeZone: timezone,
          timeZoneName:
            "longOffset",
        }
      ).formatToParts(date);


    const timezonePart =
      parts.find(
        (part) =>
          part.type ===
          "timeZoneName"
      );


    if (
      !timezonePart ||
      !timezonePart.value
    ) {
      return null;
    }


    const match =
      timezonePart.value.match(
        /GMT([+-])(\d{1,2})(?::(\d{2}))?/
      );


    /*
      Special case:

      GMT
      means UTC +0
    */

    if (
      timezonePart.value ===
      "GMT"
    ) {
      return 0;
    }


    if (!match) {
      return null;
    }


    const sign =
      match[1] === "+"
        ? 1
        : -1;


    const hours =
      Number(match[2]);


    const minutes =
      Number(
        match[3] || 0
      );


    return (
      sign *
      (
        hours * 60 +
        minutes
      )
    );

  } catch (
    error
  ) {

    return null;
  }
};


/* =========================================================
   MAIN CONTROLLER
========================================================= */

export const generateKundali =
  async (
    req,
    res
  ) => {

    try {

      const {

        name,

        dateOfBirth,

        timeOfBirth,

        city,

        state,

        country,

        latitude,

        longitude,

        elevation = 0,

        timezone,

        houseSystem = "whole_sign",

      } = req.body;


      /* ===================================================
         VALIDATION
      =================================================== */

      if (
        !name ||
        !name.trim()
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Name is required",

        });

      }


      if (!dateOfBirth) {

        return res.status(400).json({

          success: false,

          message:
            "Date of birth is required",

        });

      }


      if (!timeOfBirth) {

        return res.status(400).json({

          success: false,

          message:
            "Time of birth is required",

        });

      }


      if (
        latitude ===
          undefined ||
        latitude ===
          null
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Latitude is required",

        });

      }


      if (
        longitude ===
          undefined ||
        longitude ===
          null
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Longitude is required",

        });

      }


      if (!timezone) {

        return res.status(400).json({

          success: false,

          message:
            "Timezone is required",

        });

      }


      /* ===================================================
         VALIDATE COORDINATES
      =================================================== */

      const lat =
        Number(latitude);

      const lon =
        Number(longitude);

      const elev =
        Number(elevation);


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


      if (
        lat < -90 ||
        lat > 90
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Latitude must be between -90 and 90",

        });

      }


      if (
        lon < -180 ||
        lon > 180
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Longitude must be between -180 and 180",

        });

      }


      /* ===================================================
         VALIDATE DATE
      =================================================== */

      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(
          dateOfBirth
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Date of birth must be YYYY-MM-DD",

        });

      }


      /* ===================================================
         VALIDATE TIME
      =================================================== */

      if (
        !/^\d{2}:\d{2}$/.test(
          timeOfBirth
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Time of birth must be HH:mm",

        });

      }


      /* ===================================================
         CREATE INITIAL DATE
      =================================================== */

      const temporaryDate =
        new Date(
          `${dateOfBirth}T${timeOfBirth}:00Z`
        );


      /* ===================================================
         TIMEZONE OFFSET
      =================================================== */

      const timezoneOffset =
        getTimezoneOffsetMinutes(
          timezone,
          temporaryDate
        );


      if (
        timezoneOffset ===
        null
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid timezone",

        });

      }


      /* ===================================================
         CREATE ACTUAL UTC DATE
      =================================================== */

      const birthDate =
        createBirthDate(
          dateOfBirth,
          timeOfBirth,
          timezoneOffset
        );


      if (!birthDate) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid birth date or birth time",

        });

      }


      /* ===================================================
         OBSERVER
      =================================================== */

      const observer =
        new Observer(
          lat,
          lon,
          elev
        );


      /* ===================================================
         HOUSE SYSTEM
      =================================================== */

      const selectedHouseSystem =
        houseSystem ===
        "equal_house"
          ? "equal_house"
          : "whole_sign";


      /* ===================================================
         GET KUNDALI
      =================================================== */

      const kundali =
        getKundli(
          birthDate,
          observer,
          {
            houseSystem:
              selectedHouseSystem,
          }
        );


      /* ===================================================
         HINDI DATA
      =================================================== */

      const ascendant =
        translateAscendant(
          kundali.ascendant
        );


      const planets =
        translatePlanets(
          kundali.planets
        );


      const houses =
        translateHouses(
          kundali.houses
        );


      const vargas =
        translateVargas(
          kundali.vargas
        );


      /* ===================================================
         MANGAL DOSHA
      =================================================== */

      let mangalDosha =
        null;

      try {

        /*
          Different versions may expose
          different signatures.

          We attempt the common form.
        */

        mangalDosha =
          checkMangalDosha(
            kundali
          );

      } catch (
        error
      ) {

        mangalDosha =
          null;

      }


      /* ===================================================
         RESPONSE
      =================================================== */

      return res.status(200).json({

        success: true,

        message:
          "Kundali generated successfully",


        /* =================================================
           USER BIRTH DETAILS
        ================================================= */

        birthDetails: {

          name:
            name.trim(),

          dateOfBirth,

          timeOfBirth,

          city:
            city?.trim() ||
            null,

          state:
            state?.trim() ||
            null,

          country:
            country?.trim() ||
            null,

          latitude:
            lat,

          longitude:
            lon,

          elevation:
            elev,

          timezone,

          timezoneOffset,

          timezoneOffsetSeconds:
            timezoneOffset *
            60,

          utcDate:
            birthDate.toISOString(),

        },


        /* =================================================
           ASCENDANT
        ================================================= */

        ascendant,


        /* =================================================
           PLANETS
        ================================================= */

        planets,


        /* =================================================
           HOUSES
        ================================================= */

        houses,


        /* =================================================
           DASHA
        ================================================= */

        dasha:
          kundali.dasha ||
          null,


        /* =================================================
           VARGAS
        ================================================= */

        vargas,


        /* =================================================
           MANGAL DOSHA
        ================================================= */

        mangalDosha,


        /* =================================================
           ORIGINAL PACKAGE DATA
        =================================================

           Keeping original data makes your API
           future-proof and allows frontend developers
           to use anything provided by the package.
        */

        raw: {

          birthDetails:
            kundali.birthDetails,

          ascendant:
            kundali.ascendant,

          planets:
            kundali.planets,

          houses:
            kundali.houses,

          dasha:
            kundali.dasha,

          vargas:
            kundali.vargas,

        },

      });

    } catch (
      error
    ) {

      console.error(
        "======================================"
      );

      console.error(
        "KUNDALI GENERATION ERROR"
      );

      console.error(
        "======================================"
      );

      console.error(error);


      return res.status(500).json({

        success: false,

        message:
          "Something went wrong while generating Kundali",

        error:
          process.env.NODE_ENV ===
          "development"
            ? error.message
            : undefined,

      });

    }

  };