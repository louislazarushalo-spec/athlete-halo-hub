// Sponsor logo imports
import sponsorLacoste from "@/assets/sponsor-lacoste.png";
import sponsorBabolat from "@/assets/sponsor-babolat.png";
import sponsorExtia from "@/assets/sponsor-extia.png";
import sponsorAdidas from "@/assets/sponsor-adidas.png";
import sponsorUBB from "@/assets/sponsor-ubb.png";
import sponsorOakley from "@/assets/sponsor-oakley.png";
import sponsorSpecialized from "@/assets/sponsor-specialized.png";
import sponsorWeleda from "@/assets/sponsor-weleda.png";
import sponsorNutripure from "@/assets/sponsor-nutripure.png";
import sponsorHuawei from "@/assets/sponsor-huawei.png";
import sponsorNike from "@/assets/sponsor-nike.png";
import sponsorTaylormade from "@/assets/sponsor-taylormade.png";
import sponsorTagheuer from "@/assets/sponsor-tagheuer.png";
import sponsorGivenchy from "@/assets/sponsor-givenchy.jpeg";
import sponsorAix from "@/assets/sponsor-aix.jpeg";
import sponsorHawkers from "@/assets/sponsor-hawkers.jpeg";
import sponsorIntegraconnect from "@/assets/sponsor-integraconnect.jpeg";
import sponsorMoser from "@/assets/sponsor-moser.jpeg";
import sponsorReebok from "@/assets/sponsor-reebok.jpeg";
import sponsorSonic from "@/assets/sponsor-sonic.jpeg";
import sponsorTudor from "@/assets/sponsor-tudor.png";
import sponsorMoncler from "@/assets/sponsor-moncler.png";
import sponsorSisley from "@/assets/sponsor-sisley.png";
import sponsorPyzel from "@/assets/sponsor-pyzel.png";
import sponsorYamaha from "@/assets/sponsor-yamaha.png";
import sponsorHurley from "@/assets/sponsor-hurley.png";
import sponsorAG1 from "@/assets/sponsor-ag1.png";

export interface SponsorLogo {
  src: string;
  alt: string;
}

export const athleteSponsors: Record<string, SponsorLogo[]> = {
  "arthur-cazaux": [
    { src: sponsorLacoste, alt: "Lacoste" },
    { src: sponsorBabolat, alt: "Babolat" },
    { src: sponsorExtia, alt: "Extia" },
  ],
  "matthieu-jalibert": [
    { src: sponsorAdidas, alt: "Adidas" },
    { src: sponsorUBB, alt: "UBB" },
  ],
  "cassandre-beaugrand": [
    { src: sponsorOakley, alt: "Oakley" },
    { src: sponsorSpecialized, alt: "Specialized" },
    { src: sponsorWeleda, alt: "Weleda" },
    { src: sponsorNutripure, alt: "Nutripure" },
    { src: sponsorHuawei, alt: "Huawei" },
  ],
  "tommy-fleetwood": [
    { src: sponsorNike, alt: "Nike" },
    { src: sponsorTaylormade, alt: "TaylorMade" },
    { src: sponsorTagheuer, alt: "TAG Heuer" },
  ],
  "pierre-gasly": [
    { src: sponsorGivenchy, alt: "Givenchy" },
    { src: sponsorReebok, alt: "Reebok" },
    { src: sponsorAix, alt: "Aix" },
    { src: sponsorHawkers, alt: "Hawkers" },
    { src: sponsorMoser, alt: "Moser" },
    { src: sponsorIntegraconnect, alt: "IntegraConnect" },
    { src: sponsorSonic, alt: "Sonic" },
  ],
  "nic-von-rupp": [
    { src: sponsorTudor, alt: "Tudor" },
    { src: sponsorMoncler, alt: "Moncler" },
    { src: sponsorSisley, alt: "Sisley" },
    { src: sponsorPyzel, alt: "Pyzel" },
    { src: sponsorYamaha, alt: "Yamaha" },
    { src: sponsorHurley, alt: "Hurley" },
    { src: sponsorAG1, alt: "AG1" },
  ],
};
