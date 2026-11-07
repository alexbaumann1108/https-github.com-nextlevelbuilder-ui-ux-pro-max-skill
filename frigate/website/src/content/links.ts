/**
 * Outside resources. Each link was checked against the publisher's own
 * site. Limits and seasons change, so the site links to FWC instead of
 * repeating the numbers.
 */
export const fwc = {
  name: "Florida Fish and Wildlife Conservation Commission (FWC)",
  allRules: "https://myfwc.com/fishing/saltwater/recreational/full-rule/",
  license: "https://myfwc.com/license/recreational/do-i-need-one/",
  species: [
    { name: "Snook", url: "https://myfwc.com/fishing/saltwater/recreational/snook/" },
    { name: "Redfish (red drum)", url: "https://myfwc.com/fishing/saltwater/recreational/red-drum/" },
    { name: "Tarpon", url: "https://myfwc.com/fishing/saltwater/recreational/tarpon/" },
    { name: "Spotted seatrout", url: "https://myfwc.com/fishing/saltwater/recreational/spotted-seatrout/" },
  ],
};

export const windfinder = {
  forecast: "https://www.windfinder.com/forecast/sanibel_island",
  superforecast: "https://www.windfinder.com/weatherforecast/sanibel_island",
  tides: "https://www.windfinder.com/tide/sanibel_island",
};

/** SCCF RECON: live readings from its weather stations around Sanibel. */
export const sccfRecon = {
  latestReadings: "https://recon.sccf.org/weather",
};
