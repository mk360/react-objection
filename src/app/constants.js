import godotImage from "./profiles/godot.png"
import frannyImage from "./profiles/franny.png"
import phoenixImage from "./profiles/phoenix.png"
import karmaImage from "./profiles/karma.png"
import edgeworthImage from "./profiles/edgeworth.png"
import edgeworth2Image from "./profiles/edgeworth2.png"
import apolloImage from './profiles/apollo.png'
import payneImage from './profiles/payne1.png'
import payne2Image from './profiles/payne2.png'
import klavierImage from './profiles/klavier.png'
import miaImage from './profiles/mia.png'
import payne3Image from './profiles/payne3.png'

let collection = {
  phoenix: {
    name: "Phoenix Wright",
    image: phoenixImage,
    nametag: "Phoenix",
    side: "Defense Attorney"
  },
  payne: {
    name: "Winston Payne",
    image: payneImage,
    nametag: "Payne"
  },
  edgeworth: {
    name: "Miles Edgeworth",
    image: edgeworthImage,
    nametag: "Edgeworth",
    style: {
      left: "2.8px",
      letterSpacing: "-0.25px"
    }
  },
  karma: {
    name: "Manfred von Karma",
    image: karmaImage,
    nametag: "von Karma",
    style: {
      left: "1px",
      letterSpacing: "-1px",
      fontSize: "7px"
    }
  },
  franny: {
    name: "Franziska von Karma",
    image: frannyImage,
    nametag: "von Karma",
    style: {
      left: "1px",
      letterSpacing: "-1px",
      fontSize: "7px"
    }
  },
  godot: {
    name: "Godot",
    image: godotImage,
    nametag: "Godot"
  },
  payne2: {
    name: "Winston Payne",
    image: payne2Image,
    nametag: "Payne"
  },
  edgeworth2: {
    name: "Miles Edgeworth",
    image: edgeworth2Image,
    nametag: "Edgeworth",
    style: {
      left: "2.3px",
      letterSpacing: "-0.25px",
      fontSize: "7px"
    }
  },
  apollo: {
    name: "Apollo Justice",
    image: apolloImage,
    nametag: "Apollo",
    side: "Defense Attorney"
  },
  klavier: {
    name: "Klavier Gavin",
    image: klavierImage,
    nametag: "Klavier"
  },
  mia: {
    name: "Mia Fey",
    image: miaImage,
    nametag: "Mia",
    side: "Defense Attorney"
  },
  payne3: {
    name: "Winston Payne",
    image: payne3Image,
    nametag: "Payne"
  }
}

for (let name in collection) {
  collection[name].objection = require("./objection/" + collection[name].name + ".ogg")
  let obj = {
    normal: require("./gifs/normal/" + name + ".gif"),
    speaking: require("./gifs/speaking/" + name + ".gif")
  }
  collection[name].gifs = obj
}

const fixedCollection = Object.assign({}, collection)

export default fixedCollection
