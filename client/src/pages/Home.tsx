/*
Style Reminder — Sovereign Signal / Digital Vault
This file must reinforce a sovereign, high-trust digital vault atmosphere.
Use asymmetrical composition, ceremonial pacing, smoky glass surfaces, metallic gold emphasis,
and motion that feels like systems authenticating rather than generic SaaS animation.
*/

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CarFront,
  ChevronRight,
  Landmark,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { MapView } from "@/components/Map";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type Locale = "fr" | "en";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  assetType: string;
  coveragePriority: string;
  assetValue: string;
  notes: string;
  consent: boolean;
  preferredContact: string;
};

type BrokerQuoteState = {
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  driverAge: string;
  postalCode: string;
  accidentCount: string;
  ticketCount: string;
  priorInsurance: string;
  historyNotes: string;
};

type VehicleTier = "luxury" | "standard" | "neutral";

type PostalLookupState = {
  status: "idle" | "loading" | "valid" | "outside" | "invalid" | "error";
  normalizedPostalCode: string;
  label: string;
  isMontreal: boolean;
};

type VaultService = {
  title: string;
  label: string;
  front: string;
  back: string;
  icon: typeof CarFront;
};

type Pillar = {
  title: string;
  eyebrow: string;
  description: string;
  stat: string;
};

type CompanyPrinciple = {
  title: string;
  description: string;
};

type Content = {
  nav: {
    advisory: string;
    legacy: string;
    services: string;
    application: string;
    secureQuote: string;
    toggleFr: string;
    toggleEn: string;
  };
  hero: {
    badge: string;
    kicker: string;
    title: string;
    highlight: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    strip: string[];
    overviewTitle: string;
    encrypted: string;
    overviewItems: Array<[string, string]>;
    sequenceTitle: string;
    sequenceDescription: string;
  };
  legacy: {
    eyebrow: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    description: string;
    featureEyebrow: string;
    featureTitle: string;
    featureDescription: string;
    pillars: Pillar[];
  };
  companyInfo: {
    eyebrow: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    description: string;
    positioning: string;
    details: Array<[string, string]>;
    callCta: string;
    principles: CompanyPrinciple[];
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    detailLabel: string;
    advisoryBadge: string;
    cards: VaultService[];
  };
  application: {
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
    steps: string[];
    cardEyebrow: string;
    cardTitle: string;
    progress: string;
    previous: string;
    next: string;
    submit: string;
    submitting: string;
    step1: {
      fullName: string;
      email: string;
      phone: string;
      city: string;
      placeholders: {
        fullName: string;
        email: string;
        phone: string;
        city: string;
      };
    };
    step2: {
      assetType: string;
      coveragePriority: string;
      assetValue: string;
      preferredContact: string;
      notes: string;
      placeholders: {
        assetValue: string;
        notes: string;
      };
      assetOptions: string[];
      priorityOptions: string[];
      contactOptions: string[];
    };
    step3: {
      eyebrow: string;
      title: string;
      description: string;
      clearance: string;
      consent: string;
    };
    validation: {
      step1: string;
      step2: string;
      step3: string;
      success: string;
      error: string;
    };
    success: {
      eyebrow: string;
      title: string;
      description: string;
      reset: string;
    };
  };
  footer: {
    company: string;
    description: string;
  };
};

const heroImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663299064034/Cmhonn52uj4EPDPCSRW5xy/cardone-hero-vault-gcR8UwH3KZuvTnGZdjSp25.webp";
const bentoImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663299064034/Cmhonn52uj4EPDPCSRW5xy/cardone-bento-assets-URWLTLokVir8HLmQnaqd8X.webp";
const servicesImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663299064034/Cmhonn52uj4EPDPCSRW5xy/cardone-services-flipcards-a8uSd2nUJkm9YS6PuXqqgA.webp";
const monogramImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663299064034/Cmhonn52uj4EPDPCSRW5xy/cardone-monogram-seal-ZYkywaju2SRUfZTKre6LZB.webp";
const logoImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663299064034/Cmhonn52uj4EPDPCSRW5xy/cardone-logo_4e7d7166.jpg";

const webhookUrl = "[INSERT YOUR N8N WEBHOOK URL HERE]";

const content: Record<Locale, Content> = {
  fr: {
    nav: {
      advisory: "Conseil en coffre-fort numérique",
      legacy: "Héritage",
      services: "Services",
      application: "Application sécurisée",
      secureQuote: "Obtenir une soumission",
      toggleFr: "FR",
      toggleEn: "EN",
    },
    hero: {
      badge: "Intelligence d’assurance haut de gamme pour profils à haute valeur",
      kicker: "Un système souverain pour le risque, l’héritage et la protection",
      title: "L’assurance conçue comme un",
      highlight: "coffre-fort d’actifs haute sécurité",
      description:
        "À Montréal-Nord, Assurances Cardone présente la couverture comme une stratégie protégée. En tant que courtier d’assurance, l’agence magasine et négocie auprès de plusieurs assureurs afin d’obtenir la meilleure protection possible au meilleur coût, avec une approche structurée pour la discrétion, la rapidité et la confiance.",
      primaryCta: "Ouvrir l’application de soumission sécurisée",
      secondaryCta: "Explorer les protections",
      strip: [
        "Admission structurée avec précision",
        "Identité privée noir et or",
        "Pensé pour des conversations d’assurance prestigieuses et complexes",
      ],
      overviewTitle: "Vue d’ensemble des actifs privés",
      encrypted: "Chiffré",
      overviewItems: [
        ["Fenêtre de réponse", "En moins de 60 secondes"],
        ["Champ de couverture", "Auto · Résidence · Entreprise"],
        ["Moteur d’analyse", "Mila IA souscriptrice"],
        ["Statut d’admission", "Protocole multiétape sécurisé"],
      ],
      sequenceTitle: "Séquence d’application",
      sequenceDescription:
        "L’identité du client, la définition des actifs et l’autorisation sont recueillies dans un flux guidé conçu pour sembler cérémonial et parfaitement maîtrisé.",
    },
    legacy: {
      eyebrow: "L’héritage Cardone",
      titleStart: "Une composition bento fondée sur",
      titleHighlight: "la confiance, la stratégie et le prestige",
      titleEnd: ".",
      description:
        "Le site présente l’assurance comme une expérience-conseil haut de gamme enracinée dans la réalité d’un cabinet de courtage montréalais. Au lieu d’exposer des produits commoditisés, il met en scène une capacité à comparer plusieurs assureurs, à recommander la bonne structure de protection et à accompagner le client jusque dans le sinistre.",
      featureEyebrow: "Pilier signature",
      featureTitle: "Un héritage rehaussé par un langage de sécurité moderne.",
      featureDescription:
        "L’univers visuel emprunte à l’autorité héraldique et à la retenue des banques privées, puis le traduit en grilles contrôlées, surfaces fumées et signaux numériques de précision.",
      pillars: [
        {
          title: "Héritage et confiance",
          eyebrow: "Confiance privée",
          description:
            "Cardone conjugue une autorité de marque cérémoniale avec le rôle concret d’un courtier qui conseille le client selon ses besoins et protège sa famille, son patrimoine et son exposition commerciale.",
          stat: "Protocole d’admission d’élite",
        },
        {
          title: "Gestion stratégique du risque",
          eyebrow: "Analyse assistée par IA",
          description:
            "Chaque demande est structurée comme un dossier d’actifs sécurisé afin d’évaluer les produits offerts par plusieurs assureurs, d’accélérer la qualification et de recommander une protection plus précise.",
          stat: "Réponse concierge en 60 secondes",
        },
        {
          title: "Protection d’actifs à haute valeur",
          eyebrow: "Auto · Résidence · Entreprise",
          description:
            "L’agence aborde la protection comme une stratégie, en harmonisant l’architecture d’assurance avec les réalités de l’automobile, de l’habitation, de l’entreprise et de l’accompagnement lors d’un sinistre.",
          stat: "Conçu pour les profils complexes",
        },
      ],
    },
    companyInfo: {
      eyebrow: "Cabinet & coordonnées",
      titleStart: "Une présence de courtage clairement ancrée à",
      titleHighlight: "Montréal-Nord",
      titleEnd: ".",
      description:
        "Cette section rend le cabinet immédiatement identifiable: qui vous conseille, où le joindre et quelle promesse professionnelle guide l’expérience Cardone au-delà de l’esthétique premium.",
      positioning: "« Votre meilleure assurance est un courtier d’assurance! »",
      details: [
        ["Courtier", "Roberto Cardone"],
        ["Entreprise", "Cardone Assurances générales Inc."],
        ["Adresse", "4210, boulevard Henri-Bourassa Est, Montréal-Nord, QC H1H 1L5"],
        ["Téléphone", "(514) 327-2040"],
      ],
      callCta: "Appeler le cabinet",
      principles: [
        {
          title: "Évaluer les assureurs",
          description:
            "Le cabinet compare les produits offerts sur le marché afin de bâtir une protection plus pertinente pour chaque profil.",
        },
        {
          title: "Conseiller selon les besoins",
          description:
            "La recommandation ne part pas d’un produit générique, mais du contexte réel du client, de ses biens et de son exposition au risque.",
        },
        {
          title: "Recommander la bonne structure",
          description:
            "Cardone articule la couverture comme une architecture de protection, avec une logique claire sur le coût, la responsabilité et la valeur à défendre.",
        },
        {
          title: "Accompagner lors d’un sinistre",
          description:
            "L’accompagnement se prolonge lorsque survient une réclamation, afin que le client ne soit pas seul au moment le plus sensible.",
        },
      ],
    },
    services: {
      eyebrow: "Détails des services",
      title:
        "Des cartes de services bordées d’or qui dévoilent la couche stratégique derrière chaque protection.",
      description:
        "Chaque carte agit comme un panneau protégé. La première face introduit l’offre. Le revers explique comment Cardone évalue les options du marché, conseille le client et accompagne la protection jusqu’au moment critique d’une réclamation.",
      detailLabel: "Détail stratégique",
      advisoryBadge: "Structure-conseil protégée",
      cards: [
        {
          title: "Assurance automobile",
          label: "Protection de mobilité de précision",
          front:
            "Pour les véhicules de luxe, les collections et les conducteurs qui exigent une gestion des réclamations rapide et discrète.",
          back:
            "Cardone structure la protection selon l’usage, la responsabilité, la valeur de remplacement et un accompagnement de niveau concierge pour les actifs de mobilité à haute valeur.",
          icon: CarFront,
        },
        {
          title: "Protection résidentielle",
          label: "Sécurité de patrimoine immobilier",
          front:
            "Pour les résidences principales, propriétés de prestige et immeubles où la qualité de reconstruction compte autant que le prix.",
          back:
            "Le programme résidentiel met l’accent sur la valeur du bâtiment, le contenu, la responsabilité et la continuité afin que la protection reflète réellement le calibre de l’actif.",
          icon: Landmark,
        },
        {
          title: "Continuité d’entreprise",
          label: "Intelligence du risque commercial",
          front:
            "Pour les fondateurs et dirigeants qui protègent les revenus, les infrastructures, les équipes et la continuité réputationnelle.",
          back:
            "La protection des affaires est pensée comme une résilience stratégique reliant la responsabilité, les biens, l’interruption et l’évolution du risque dans une seule conversation-conseil.",
          icon: Building2,
        },
      ],
    },
    application: {
      eyebrow: "Le moteur de soumission",
      title: "L’",
      highlight: "Application Vault",
      description:
        "L’appel à l’action principal est un parcours guidé multiétape. Il recueille l’identité du client, le profil de l’actif et l’autorisation dans un affichage vitré fumé qui évoque davantage un terminal classifié qu’un formulaire classique.",
      steps: [
        "Étape 1 : Détails du client",
        "Étape 2 : Actifs à protéger",
        "Étape 3 : Autorisation",
      ],
      cardEyebrow: "Application de soumission sécurisée",
      cardTitle: "Déposez votre dossier d’actifs protégés.",
      progress: "Progression du protocole",
      previous: "Précédent",
      next: "Continuer de façon sécurisée",
      submit: "Soumettre l’application sécurisée",
      submitting: "Transmission du dossier",
      step1: {
        fullName: "Nom complet",
        email: "Adresse courriel",
        phone: "Téléphone",
        city: "Ville",
        placeholders: {
          fullName: "Entrez le nom du client",
          email: "nom@exemple.com",
          phone: "(000) 000-0000",
          city: "Montréal, Toronto, Miami...",
        },
      },
      step2: {
        assetType: "Actifs à protéger",
        coveragePriority: "Priorité de couverture",
        assetValue: "Valeur estimée des actifs",
        preferredContact: "Méthode de contact préférée",
        notes: "Notes supplémentaires",
        placeholders: {
          assetValue: "250 000 $ et plus",
          notes:
            "Décrivez les actifs, les risques, l’échéancier ou toute attente de service concierge.",
        },
        assetOptions: [
          "Automobile de prestige",
          "Résidence de prestige",
          "Portefeuille d’entreprise",
          "Profil multi-actifs",
        ],
        priorityOptions: [
          "Protection complète",
          "Stratégie de responsabilité",
          "Révision de portefeuille",
          "Performance en réclamations",
        ],
        contactOptions: ["Téléphone", "Courriel", "Message texte"],
      },
      step3: {
        eyebrow: "Autorisation",
        title: "Confirmez la transmission de votre profil d’actifs.",
        description:
          "En autorisant l’envoi, vous permettez à Assurances Cardone de transmettre ce dossier d’admission à son flux d’analyse et d’amorcer rapidement une conversation stratégique sur votre couverture.",
        clearance: "Autorisation client requise",
        consent:
          "J’autorise Assurances Cardone à recevoir et analyser mon application de soumission sécurisée et je comprends qu’un suivi peut être amorcé par Mila, notre IA souscriptrice, ou par un conseiller certifié.",
      },
      validation: {
        step1: "Veuillez compléter les renseignements du client avant de poursuivre.",
        step2: "Veuillez définir le profil des actifs avant de sécuriser l’application.",
        step3: "L’autorisation est requise avant la transmission sécurisée.",
        success: "L’application de soumission sécurisée a été transmise.",
        error: "Le coffre n’a pas pu transmettre le dossier. Veuillez vérifier l’URL du webhook.",
      },
      success: {
        eyebrow: "Transmission confirmée",
        title: "Votre dossier d’actifs à haute valeur a été reçu.",
        description:
          "Mila, notre IA souscriptrice, communiquera avec vous dans les 60 prochaines secondes afin de sécuriser votre stratégie.",
        reset: "Ouvrir un nouveau dossier",
      },
    },
    footer: {
      company: "Assurances Cardone — Assurances Générales Inc.",
      description:
        "Cabinet de courtage d’assurance de Montréal-Nord présenté comme un coffre-fort numérique sécurisé. 4210, boulevard Henri-Bourassa Est · (514) 327-2040.",
    },
  },
  en: {
    nav: {
      advisory: "Digital Vault Advisory",
      legacy: "Legacy",
      services: "Services",
      application: "Application Vault",
      secureQuote: "Secure Quote",
      toggleFr: "FR",
      toggleEn: "EN",
    },
    hero: {
      badge: "Premium insurance intelligence for Montreal high-value profiles",
      kicker: "A sovereign system for risk, legacy, and protection",
      title: "Insurance designed like a",
      highlight: "high-security asset vault",
      description:
        "From Montreal North, Assurances Cardone positions coverage as a protected strategy. As an insurance broker, the firm shops and negotiates across multiple insurers to secure the best possible protection at the right cost, all within a structured intake system built for discretion, speed, and confidence.",
      primaryCta: "Open the Secured Quote Application",
      secondaryCta: "Explore Coverages",
      strip: [
        "Obsessively structured intake",
        "Black-and-gold private client identity",
        "Designed for prestigious, complex coverage conversations",
      ],
      overviewTitle: "Private asset overview",
      encrypted: "Encrypted",
      overviewItems: [
        ["Response Window", "Within 60 seconds"],
        ["Coverage Lens", "Auto · Estate · Business"],
        ["Review Engine", "Mila AI Underwriter"],
        ["Intake Status", "Secured multi-step protocol"],
      ],
      sequenceTitle: "Application sequence",
      sequenceDescription:
        "Client identity, asset definition, and authorization are collected inside a guided intake flow designed to feel ceremonial and highly controlled.",
    },
    legacy: {
      eyebrow: "The Cardone Legacy",
      titleStart: "A bento composition built around",
      titleHighlight: "trust, strategy, and prestige",
      titleEnd: ".",
      description:
        "The site frames insurance as a premium advisory experience grounded in the real work of a Montreal brokerage. Instead of presenting commodity products, it expresses Cardone’s ability to compare insurers, recommend the right protection structure, and support the client through a claim when it matters most.",
      featureEyebrow: "Signature pillar",
      featureTitle: "Heritage elevated by modern security language.",
      featureDescription:
        "The visual world borrows from heraldic authority and private-banking restraint, then resolves it through controlled grids, smoked surfaces, and digital precision cues.",
      pillars: [
        {
          title: "Heritage & Trust",
          eyebrow: "Private-client confidence",
          description:
            "Cardone combines ceremonial brand authority with the practical role of a broker who advises clients according to their needs while protecting personal, family, and commercial exposure.",
          stat: "Elite intake protocol",
        },
        {
          title: "Strategic Risk Management",
          eyebrow: "AI-assisted review",
          description:
            "Every application is structured like a secure asset file, allowing Cardone to evaluate multiple insurer offerings, accelerate qualification, and recommend more precise protection.",
          stat: "60-second concierge response",
        },
        {
          title: "High-Value Asset Protection",
          eyebrow: "Auto · Estate · Business",
          description:
            "The agency positions protection as strategy, aligning premium insurance design with the realities of auto, home, business, and claim-time advocacy.",
          stat: "Structured for complex profiles",
        },
      ],
    },
    companyInfo: {
      eyebrow: "Brokerage & contact",
      titleStart: "A brokerage presence clearly rooted in",
      titleHighlight: "Montreal North",
      titleEnd: ".",
      description:
        "This section makes the firm immediately identifiable: who advises you, where to reach the office, and what professional promise guides the Cardone experience beyond the premium visual language.",
      positioning: '"Your best insurance is an insurance broker."',
      details: [
        ["Broker", "Roberto Cardone"],
        ["Company", "Cardone Assurances générales Inc."],
        ["Address", "4210 Boulevard Henri-Bourassa East, Montréal-Nord, QC H1H 1L5"],
        ["Phone", "(514) 327-2040"],
      ],
      callCta: "Call the brokerage",
      principles: [
        {
          title: "Evaluate insurers",
          description:
            "The brokerage compares products across the market in order to shape protection that is more relevant to each client profile.",
        },
        {
          title: "Advise to actual needs",
          description:
            "The recommendation begins with the client’s context, assets, and exposure rather than with a generic off-the-shelf product.",
        },
        {
          title: "Recommend the right structure",
          description:
            "Cardone frames coverage as a protection architecture, with clearer logic around cost, liability, and the value being defended.",
        },
        {
          title: "Support during claims",
          description:
            "Advisory support continues when a claim occurs, so the client is not left alone at the most sensitive moment.",
        },
      ],
    },
    services: {
      eyebrow: "Service Details",
      title:
        "Gold-edged service cards that reveal the strategic layer beneath the coverage.",
      description:
        "Each card behaves like a protected panel. The first face introduces the offering. The reverse explains how Cardone evaluates market options, advises the client, and supports the protection strategy through the claims stage.",
      detailLabel: "Strategic detail",
      advisoryBadge: "Protected advisory structure",
      cards: [
        {
          title: "Automobile Assurance",
          label: "Precision mobility protection",
          front:
            "For luxury vehicles, collector fleets, and drivers who expect claims handling with discretion and speed.",
          back:
            "Cardone structures coverage around usage patterns, liability posture, replacement value, and concierge-grade support for high-value mobility assets.",
          icon: CarFront,
        },
        {
          title: "Estate Coverage",
          label: "Residential asset security",
          front:
            "For primary residences, prestige homes, and properties where reconstruction quality matters as much as price.",
          back:
            "The estate program focuses on dwelling value, contents, liability, and continuity planning so protection reflects the true caliber of the asset.",
          icon: Landmark,
        },
        {
          title: "Business Continuity",
          label: "Commercial risk intelligence",
          front:
            "For founders and operators safeguarding revenue, physical infrastructure, teams, and reputational continuity.",
          back:
            "Business protection is framed as strategic resilience, connecting liability, property, interruption, and growth-stage risk planning in one advisory conversation.",
          icon: Building2,
        },
      ],
    },
    application: {
      eyebrow: "The Quote Engine",
      title: "The",
      highlight: "Application Vault",
      description:
        "The main call-to-action is a guided, multi-step intake. It collects client identity, asset profile, and authorization inside a smoky glass display that feels more like a classified terminal than a conventional form.",
      steps: [
        "Step 1: Client Details",
        "Step 2: Assets to Protect",
        "Step 3: Authorization",
      ],
      cardEyebrow: "Secured Quote Application",
      cardTitle: "Submit your protected asset file.",
      progress: "Protocol progress",
      previous: "Previous",
      next: "Continue Securely",
      submit: "Submit Secured Application",
      submitting: "Transmitting File",
      step1: {
        fullName: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        city: "City",
        placeholders: {
          fullName: "Enter the client name",
          email: "name@example.com",
          phone: "(000) 000-0000",
          city: "Montreal, Toronto, Miami...",
        },
      },
      step2: {
        assetType: "Assets to Protect",
        coveragePriority: "Coverage Priority",
        assetValue: "Estimated Asset Value",
        preferredContact: "Preferred Contact Method",
        notes: "Additional Notes",
        placeholders: {
          assetValue: "$250,000+",
          notes:
            "Describe the assets, risks, timing, or any concierge expectations.",
        },
        assetOptions: [
          "Luxury Auto",
          "Prestige Home",
          "Business Portfolio",
          "Multi-Asset Profile",
        ],
        priorityOptions: [
          "Comprehensive Protection",
          "Liability Strategy",
          "Portfolio Review",
          "Claims Performance",
        ],
        contactOptions: ["Phone", "Email", "Text Message"],
      },
      step3: {
        eyebrow: "Authorization",
        title: "Confirm the release of your asset profile.",
        description:
          "By authorizing submission, you allow Assurances Cardone to transmit this intake package to its review workflow and begin a rapid response coverage conversation.",
        clearance: "Client clearance required",
        consent:
          "I authorize Assurances Cardone to receive and review my secured quote application and understand that follow-up may be initiated by Mila, our AI Underwriter, or a licensed advisor.",
      },
      validation: {
        step1: "Please complete the client details before proceeding.",
        step2: "Please define the asset profile to secure the application.",
        step3: "Authorization is required before secure submission.",
        success: "The secured quote application has been transmitted.",
        error: "The vault could not transmit the file. Please verify the webhook URL.",
      },
      success: {
        eyebrow: "Transmission confirmed",
        title: "Your high-value asset file has been received.",
        description:
          "Mila, our AI Underwriter, will contact you within 60 seconds to secure your strategy.",
        reset: "Open another file",
      },
    },
    footer: {
      company: "Assurances Cardone — Assurances Générales Inc.",
      description:
        "Montreal-North insurance brokerage advisory, presented as a secure digital-vault experience. 4210, boulevard Henri-Bourassa Est · (514) 327-2040.",
    },
  },
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const initialFormState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  assetType: content.fr.application.step2.assetOptions[0],
  coveragePriority: content.fr.application.step2.priorityOptions[0],
  assetValue: "",
  notes: "",
  consent: false,
  preferredContact: content.fr.application.step2.contactOptions[0],
};

const initialBrokerQuoteState: BrokerQuoteState = {
  vehicleYear: "",
  vehicleMake: "",
  vehicleModel: "",
  driverAge: "",
  postalCode: "",
  accidentCount: "0",
  ticketCount: "0",
  priorInsurance: "active",
  historyNotes: "",
};

const luxuryVehicleBrands = [
  "mercedes",
  "bmw",
  "tesla",
  "audi",
  "porsche",
  "lexus",
  "land rover",
  "range rover",
  "jaguar",
  "maserati",
  "ferrari",
  "lamborghini",
  "bentley",
  "rolls-royce",
  "rolls royce",
  "cadillac",
];

const standardVehicleBrands = [
  "honda",
  "toyota",
  "hyundai",
  "kia",
  "mazda",
  "nissan",
  "subaru",
  "ford",
  "chevrolet",
  "volkswagen",
];

function normalizeQuoteValue(value: string) {
  return value.trim().toLowerCase();
}

function getAgeFactor(driverAge: number) {
  if (driverAge < 25) {
    return { factor: 1.5, bracket: "under-25" as const };
  }

  if (driverAge <= 50) {
    return { factor: 1, bracket: "25-50" as const };
  }

  return { factor: 0.85, bracket: "50-plus" as const };
}

function getVehicleFactor(vehicleDescription: string) {
  const normalized = normalizeQuoteValue(vehicleDescription);

  if (luxuryVehicleBrands.some((brand) => normalized.includes(brand))) {
    return { factor: 1.2, tier: "luxury" as VehicleTier };
  }

  if (standardVehicleBrands.some((brand) => normalized.includes(brand))) {
    return { factor: 0.9, tier: "standard" as VehicleTier };
  }

  return { factor: 1, tier: "neutral" as VehicleTier };
}

function getClaimsFactor(accidentCount: number) {
  if (accidentCount >= 2) {
    return { factor: 1.4, manualReview: true };
  }

  if (accidentCount === 1) {
    return { factor: 1.15, manualReview: false };
  }

  return { factor: 1, manualReview: false };
}

function getLocationFactor(postalCode: string) {
  const normalized = postalCode.replace(/\s+/g, "").toUpperCase();
  const isMontreal = normalized.startsWith("H");

  return {
    factor: isMontreal ? 1.1 : 1,
    isMontreal,
  };
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [locale, setLocale] = useState<Locale>("fr");
  const [scrollY, setScrollY] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [form, setForm] = useState<FormState>(initialFormState);
  const [brokerQuote, setBrokerQuote] = useState<BrokerQuoteState>(initialBrokerQuoteState);
  const [isMapsReady, setIsMapsReady] = useState(false);
  const [postalLookup, setPostalLookup] = useState<PostalLookupState>({
    status: "idle",
    normalizedPostalCode: "",
    label: "",
    isMontreal: false,
  });

  const t = content[locale];
  const brokerQuoteContent =
    locale === "fr"
      ? {
          eyebrow: "Broker Quote Connector",
          titleStart: "Une estimation de",
          titleHighlight: "tarif automobile",
          titleEnd: " pensée pour le premier triage de courtage.",
          description:
            "Ce connecteur applique une base montréalaise de 1 500 $ par année, puis ajuste le prix selon l’âge du conducteur, le type de véhicule, l’historique de sinistres et le code postal.",
          labels: {
            vehicleYear: "Année du véhicule",
            vehicleMake: "Marque",
            vehicleModel: "Modèle",
            driverAge: "Âge du conducteur",
            postalCode: "Code postal",
            accidentCount: "Historique de sinistres",
            ticketCount: "Infractions récentes",
            priorInsurance: "Couverture antérieure",
            historyNotes: "Notes de dossier",
          },
          placeholders: {
            vehicleYear: "Ex. 2022",
            vehicleMake: "Ex. Tesla, Toyota, BMW",
            vehicleModel: "Ex. Model Y, Corolla, X3",
            driverAge: "Ex. 34",
            postalCode: "Ex. H1H 1L5",
            historyNotes: "Ajoutez des éléments utiles : conducteur secondaire, usage commercial, suspension passée, etc.",
          },
          historyTitle: "Détails du dossier conducteur",
          historyDescription:
            "Ajoutez les éléments qui aideront le cabinet à trier le dossier avant une vérification de marché plus complète.",
          accidentOptions: ["0 accident", "1 accident", "2+ accidents"],
          ticketOptions: ["0 contravention récente", "1 contravention récente", "2+ contraventions"],
          priorInsuranceOptions: ["Assuré actuellement", "Aucune couverture active", "Nouvel assuré / historique limité"],
          lookupTitle: "Validation d’adresse en direct",
          lookupIdle: "Entrez un code postal canadien pour lancer une vérification d’adresse en temps réel.",
          lookupLoading: "Validation en cours du code postal auprès d’une source d’adresses publique.",
          lookupValid: "Adresse montréalaise confirmée automatiquement.",
          lookupOutside: "Le code postal est valide, mais l’adresse trouvée semble hors Montréal.",
          lookupInvalid: "Aucune adresse exploitable n’a été trouvée pour ce code postal.",
          lookupError: "La validation en direct est momentanément indisponible. L’estimation continue avec la logique locale.",
          liveRateTitle: "Taux en direct",
          liveRateBody:
            "Aucun fournisseur temps réel n’est encore connecté. Pour l’instant, la sortie affichée repose uniquement sur les règles de courtage définies pour Montréal et ses environs.",
          summaryTitle: "Lecture estimative du dossier",
          summaryPrompt:
            "Entrez l’année, la marque, le modèle, l’âge du conducteur, le code postal et l’historique de conduite pour générer une indication de prime.",
          annualEstimate: "Estimation annuelle",
          monthlyEstimate: "Estimation mensuelle",
          baseRate: "Base Montréal",
          vehicleProfile: "Profil véhicule",
          driverHistoryCapture: "Historique conducteur",
          historyOnlyNote: "Ces détails de conduite sont saisis pour le triage du courtier et n’influencent pas encore automatiquement le calcul.",
          factorAge: "Facteur âge",
          factorVehicle: "Facteur véhicule",
          factorClaims: "Facteur sinistres",
          factorLocation: "Facteur localisation",
          vehicleLuxury: "Véhicule luxe / sport",
          vehicleStandard: "Véhicule standard",
          vehicleNeutral: "Véhicule à classer manuellement",
          locationMontreal: "Code postal de Montréal détecté",
          locationOutside: "Secteur hors Montréal détecté",
          manualReview: "Révision manuelle requise",
          manualReviewBody:
            "Deux accidents ou plus déclenchent automatiquement un triage manuel avant toute indication plus précise du marché.",
          disclaimer:
            "Cette estimation est indicative et non contractuelle. Une soumission réelle dépendra des assureurs comparés, du dossier complet du conducteur et des critères de souscription.",
          cta: "Poursuivre vers l’application sécurisée",
        }
      : {
          eyebrow: "Broker Quote Connector",
          titleStart: "An",
          titleHighlight: "automobile rate estimate",
          titleEnd: " built for first-pass broker triage.",
          description:
            "This connector starts from a Montreal base rate of $1,500 per year, then adjusts the estimate using the driver’s age, vehicle category, claims history, and postal code.",
          labels: {
            vehicleYear: "Vehicle year",
            vehicleMake: "Make",
            vehicleModel: "Model",
            driverAge: "Driver age",
            postalCode: "Postal code",
            accidentCount: "Claims history",
            ticketCount: "Recent tickets",
            priorInsurance: "Prior coverage",
            historyNotes: "Driver file notes",
          },
          placeholders: {
            vehicleYear: "E.g. 2022",
            vehicleMake: "E.g. Tesla, Toyota, BMW",
            vehicleModel: "E.g. Model Y, Corolla, X3",
            driverAge: "E.g. 34",
            postalCode: "E.g. H1H 1L5",
            historyNotes: "Add useful context such as a secondary driver, business use, prior suspension, or other risk notes.",
          },
          historyTitle: "Driver history details",
          historyDescription:
            "Add the profile details that help the brokerage team triage the file before a deeper market check.",
          accidentOptions: ["0 accidents", "1 accident", "2+ accidents"],
          ticketOptions: ["0 recent tickets", "1 recent ticket", "2+ recent tickets"],
          priorInsuranceOptions: ["Currently insured", "No active coverage", "Newly insured / limited history"],
          lookupTitle: "Live address validation",
          lookupIdle: "Enter a Canadian postal code to trigger a real-time address check.",
          lookupLoading: "Validating the postal code against a public address source.",
          lookupValid: "A Montreal address has been confirmed automatically.",
          lookupOutside: "The postal code is valid, but the matched address appears to be outside Montreal.",
          lookupInvalid: "No usable address match was found for this postal code.",
          lookupError: "Live validation is temporarily unavailable. The estimate is continuing with local logic.",
          liveRateTitle: "Live rates",
          liveRateBody:
            "No real-time provider is connected yet. For now, the output shown here is based only on the broker-side pricing rules defined for Montreal and surrounding areas.",
          summaryTitle: "Estimated file reading",
          summaryPrompt:
            "Enter the vehicle year, make, model, driver age, postal code, and driving history to generate a directional premium estimate.",
          annualEstimate: "Estimated annual premium",
          monthlyEstimate: "Estimated monthly premium",
          baseRate: "Montreal base rate",
          vehicleProfile: "Vehicle profile",
          driverHistoryCapture: "Driver history captured",
          historyOnlyNote: "These driving-history details are being captured for broker triage and do not yet alter the automated formula.",
          factorAge: "Age factor",
          factorVehicle: "Vehicle factor",
          factorClaims: "Claims factor",
          factorLocation: "Location factor",
          vehicleLuxury: "Luxury / sport vehicle",
          vehicleStandard: "Standard vehicle",
          vehicleNeutral: "Vehicle to classify manually",
          locationMontreal: "Montreal postal code detected",
          locationOutside: "Outside-Montreal area detected",
          manualReview: "Manual review required",
          manualReviewBody:
            "Two or more accidents automatically trigger a manual brokerage review before any sharper market indication should be shown.",
          disclaimer:
            "This estimate is directional and non-binding. A real quote will still depend on carrier comparisons, the driver’s complete file, and underwriting rules.",
          cta: "Continue to the secured application",
        };

  useEffect(() => {
    document.documentElement.lang = locale === "fr" ? "fr-CA" : "en-CA";
  }, [locale]);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowPreloader(false), reduceMotion ? 260 : 1750);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (showPreloader) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showPreloader]);

  useEffect(() => {
    if (reduceMotion) return;
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduceMotion]);

  useEffect(() => {
    setForm((previous) => ({
      ...previous,
      assetType: t.application.step2.assetOptions.includes(previous.assetType)
        ? previous.assetType
        : t.application.step2.assetOptions[0],
      coveragePriority: t.application.step2.priorityOptions.includes(previous.coveragePriority)
        ? previous.coveragePriority
        : t.application.step2.priorityOptions[0],
      preferredContact: t.application.step2.contactOptions.includes(previous.preferredContact)
        ? previous.preferredContact
        : t.application.step2.contactOptions[0],
    }));
  }, [locale, t.application.step2.assetOptions, t.application.step2.contactOptions, t.application.step2.priorityOptions]);

  useEffect(() => {
    const normalizedPostalCode = brokerQuote.postalCode.replace(/\s+/g, "").toUpperCase();

    if (!normalizedPostalCode) {
      setPostalLookup({
        status: "idle",
        normalizedPostalCode: "",
        label: "",
        isMontreal: false,
      });
      return;
    }

    const canadianPostalCodePattern = /^[A-Z]\d[A-Z]\d[A-Z]\d$/;
    if (!canadianPostalCodePattern.test(normalizedPostalCode)) {
      setPostalLookup({
        status: "invalid",
        normalizedPostalCode,
        label: "",
        isMontreal: false,
      });
      return;
    }

    if (!isMapsReady || !window.google?.maps?.Geocoder) {
      setPostalLookup((previous) => ({
        ...previous,
        status: "loading",
        normalizedPostalCode,
      }));
      return;
    }

    let isCancelled = false;
    const timeout = window.setTimeout(() => {
      setPostalLookup((previous) => ({
        ...previous,
        status: "loading",
        normalizedPostalCode,
      }));

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: `${normalizedPostalCode}, Canada` }, (results, status) => {
        if (isCancelled) {
          return;
        }

        if (status !== "OK" || !results?.[0]) {
          setPostalLookup({
            status: "invalid",
            normalizedPostalCode,
            label: "",
            isMontreal: false,
          });
          return;
        }

        const topResult = results[0];
        const addressComponents = topResult.address_components ?? [];
        const postalComponent = addressComponents.find((component) => component.types.includes("postal_code"));
        const localityParts = addressComponents
          .filter((component) =>
            component.types.some((type) =>
              ["locality", "administrative_area_level_3", "sublocality", "sublocality_level_1", "administrative_area_level_2"].includes(type),
            ),
          )
          .map((component) => component.long_name)
          .join(" ")
          .toLowerCase();
        const resolvedPostalCode = postalComponent?.long_name?.replace(/\s+/g, "").toUpperCase() ?? normalizedPostalCode;
        const isMontreal = /(montreal|montréal)/.test(`${localityParts} ${topResult.formatted_address}`.toLowerCase());

        if (resolvedPostalCode !== normalizedPostalCode) {
          setPostalLookup({
            status: "invalid",
            normalizedPostalCode,
            label: topResult.formatted_address,
            isMontreal: false,
          });
          return;
        }

        setPostalLookup({
          status: isMontreal ? "valid" : "outside",
          normalizedPostalCode,
          label: topResult.formatted_address,
          isMontreal,
        });
      });
    }, 360);

    return () => {
      isCancelled = true;
      window.clearTimeout(timeout);
    };
  }, [brokerQuote.postalCode, isMapsReady]);

  const stepProgress = useMemo(() => `${(activeStep / 3) * 100}%`, [activeStep]);
  const formatBrokerQuoteCurrency = useMemo(
    () =>
      new Intl.NumberFormat(locale === "fr" ? "fr-CA" : "en-CA", {
        style: "currency",
        currency: "CAD",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  const brokerQuoteEstimate = useMemo(() => {
    const normalizedVehicleYear = brokerQuote.vehicleYear.trim();
    const normalizedVehicleMake = brokerQuote.vehicleMake.trim();
    const normalizedVehicleModel = brokerQuote.vehicleModel.trim();
    const normalizedPostalCode = brokerQuote.postalCode.trim();
    const driverAge = Number(brokerQuote.driverAge);
    const accidentCount = Number(brokerQuote.accidentCount);
    const vehicleDescription = `${normalizedVehicleMake} ${normalizedVehicleModel}`.trim();

    if (
      !normalizedVehicleYear ||
      !normalizedVehicleMake ||
      !normalizedVehicleModel ||
      !normalizedPostalCode ||
      !Number.isFinite(driverAge) ||
      driverAge <= 0
    ) {
      return null;
    }

    const baseAnnual = 1500;
    const age = getAgeFactor(driverAge);
    const vehicle = getVehicleFactor(vehicleDescription);
    const claims = getClaimsFactor(accidentCount);
    const lookupBackedLocation = postalLookup.normalizedPostalCode === normalizedPostalCode && (postalLookup.status === "valid" || postalLookup.status === "outside")
      ? { factor: postalLookup.isMontreal ? 1.1 : 1, isMontreal: postalLookup.isMontreal }
      : getLocationFactor(normalizedPostalCode);
    const annual = baseAnnual * age.factor * vehicle.factor * claims.factor * lookupBackedLocation.factor;

    return {
      baseAnnual,
      annual,
      monthly: annual / 12,
      vehicleLabel: `${normalizedVehicleYear} ${normalizedVehicleMake} ${normalizedVehicleModel}`,
      ticketCount: brokerQuote.ticketCount,
      priorInsurance: brokerQuote.priorInsurance,
      historyNotes: brokerQuote.historyNotes.trim(),
      ageFactor: age.factor,
      vehicleFactor: vehicle.factor,
      claimsFactor: claims.factor,
      locationFactor: lookupBackedLocation.factor,
      vehicleTier: vehicle.tier,
      isMontreal: lookupBackedLocation.isMontreal,
      manualReview: claims.manualReview,
    };
  }, [brokerQuote, postalLookup]);

  const handleField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const handleBrokerQuoteField = <K extends keyof BrokerQuoteState>(key: K, value: BrokerQuoteState[K]) => {
    setBrokerQuote((previous) => ({ ...previous, [key]: value }));
  };

  const validateStep = (step: number) => {
    if (step === 1) {
      if (!form.fullName || !form.email || !form.phone) {
        toast.error(t.application.validation.step1);
        return false;
      }
    }

    if (step === 2) {
      if (!form.assetType || !form.coveragePriority || !form.assetValue) {
        toast.error(t.application.validation.step2);
        return false;
      }
    }

    if (step === 3 && !form.consent) {
      toast.error(t.application.validation.step3);
      return false;
    }

    return true;
  };

  const nextStep = () => {
    if (!validateStep(activeStep)) return;
    setActiveStep((current) => Math.min(3, current + 1));
  };

  const previousStep = () => {
    setActiveStep((current) => Math.max(1, current - 1));
  };

  const switchLocale = (nextLocale: Locale) => {
    setLocale(nextLocale);
  };

  const submitApplication = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    const payload = {
      source: "Assurances Cardone Website",
      locale,
      submittedAt: new Date().toISOString(),
      applicant: {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        city: form.city,
        preferredContact: form.preferredContact,
      },
      assetProfile: {
        assetType: form.assetType,
        coveragePriority: form.coveragePriority,
        assetValue: form.assetValue,
        notes: form.notes,
      },
      authorization: {
        consent: form.consent,
      },
    };

    try {
      if (webhookUrl.startsWith("http")) {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Submission failed");
        }
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 1600));
      }

      setIsSuccess(true);
      setForm({
        ...initialFormState,
        assetType: t.application.step2.assetOptions[0],
        coveragePriority: t.application.step2.priorityOptions[0],
        preferredContact: t.application.step2.contactOptions[0],
      });
      setActiveStep(1);
      toast.success(t.application.validation.success);
    } catch (error) {
      console.error(error);
      toast.error(t.application.validation.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background text-foreground selection:bg-[rgba(201,162,39,0.25)] selection:text-[#f5ead0]">
      <AnimatePresence>
        {showPreloader ? (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.24 : 0.7, ease: [0.22, 1, 0.36, 1] } }}
            className="fixed inset-0 z-[120] overflow-hidden bg-[radial-gradient(circle_at_top,rgba(214,175,74,0.16),transparent_26%),linear-gradient(180deg,#050505_0%,#090909_100%)]"
          >
            <div className="vault-grid absolute inset-0 opacity-35" />
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(214,175,74,0.16),transparent_18%),radial-gradient(circle_at_50%_70%,rgba(255,255,255,0.04),transparent_24%)]"
              animate={reduceMotion ? undefined : { opacity: [0.45, 0.9, 0.45], scale: [1, 1.04, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative flex min-h-screen items-center justify-center px-6">
              <div className="relative w-full max-w-xl text-center">
                <motion.div
                  initial={reduceMotion ? false : { scale: 0.92, opacity: 0 }}
                  animate={reduceMotion ? { opacity: 1 } : { scale: [0.96, 1.02, 1], opacity: 1 }}
                  transition={{ duration: reduceMotion ? 0.24 : 1.15, ease: [0.22, 1, 0.36, 1] }}
                  className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-[rgba(214,175,74,0.34)] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.16),transparent_30%),rgba(10,10,10,0.82)] shadow-[0_0_70px_rgba(214,175,74,0.18),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl"
                >
                  <motion.img
                    src={monogramImage}
                    alt="Cardone monogram"
                    className="h-16 w-16 object-contain"
                    animate={reduceMotion ? undefined : { rotate: [0, 3, 0, -3, 0] }}
                    transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : 0.18, duration: reduceMotion ? 0.24 : 0.75, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 space-y-4"
                >
                  <p className="vault-eyebrow">{locale === "fr" ? "Authentification du coffre numérique" : "Digital vault authentication"}</p>
                  <h2 className="font-display text-4xl text-[var(--vault-text)] sm:text-5xl">
                    {locale === "fr" ? "Assurances Cardone" : "Cardone Insurance"}
                  </h2>
                  <p className="mx-auto max-w-md text-sm leading-7 text-white/62 sm:text-base">
                    {locale === "fr"
                      ? "Ouverture d’un environnement de courtage sécurisé, conçu pour les profils patrimoniaux, résidentiels et commerciaux exigeants."
                      : "Initializing a secure brokerage environment built for demanding personal, residential, and commercial protection profiles."}
                  </p>
                </motion.div>
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : 0.28, duration: reduceMotion ? 0.24 : 0.75, ease: [0.22, 1, 0.36, 1] }}
                  className="mx-auto mt-8 max-w-sm"
                >
                  <div className="h-[2px] overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      className="h-full rounded-full bg-[linear-gradient(90deg,rgba(141,106,20,0.35)_0%,#d6af4a_55%,#f5e4b0_100%)]"
                      initial={{ width: "0%", opacity: 0.8 }}
                      animate={{ width: "100%", opacity: 1 }}
                      transition={{ duration: reduceMotion ? 0.3 : 1.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/38">
                    <span>{locale === "fr" ? "Analyse" : "Analysis"}</span>
                    <span>{locale === "fr" ? "Chiffrage" : "Encryption"}</span>
                    <span>{locale === "fr" ? "Admission" : "Admission"}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <main className="overflow-x-hidden">
        <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
          <MapView
            className="h-0 w-0"
            initialCenter={{ lat: 45.554, lng: -73.637 }}
            initialZoom={10}
            onMapReady={() => setIsMapsReady(true)}
          />
        </div>
        <section id="top" className="relative min-h-screen overflow-hidden border-b border-[rgba(201,162,39,0.16)]">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={heroImage}
            style={{ transform: reduceMotion ? undefined : `translateY(${scrollY * 0.12}px) scale(1.03)` }}
          >
            <source src="https://d2xsxph8kpxj0f.cloudfront.net/310519663299064034/Cmhonn52uj4EPDPCSRW5xy/cardone-hero-peace-of-mind-loop_2e4c36ed.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,238,0.22)_0%,rgba(255,245,229,0.1)_16%,rgba(20,17,14,0.42)_42%,rgba(8,7,6,0.72)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.16),transparent_24%),radial-gradient(circle_at_50%_52%,rgba(13,10,8,0.34),transparent_34%),radial-gradient(circle_at_12%_50%,rgba(255,232,179,0.14),transparent_22%),radial-gradient(circle_at_88%_38%,rgba(255,255,255,0.1),transparent_18%)]" />
          <div className="vault-grid absolute inset-0 opacity-15" />

          <div className="container relative z-10 flex min-h-screen flex-col justify-between py-6 md:py-10">
            <header className="vault-panel flex items-center justify-between gap-4 rounded-full px-4 py-3 md:px-6">
              <a href="#top" className="flex items-center gap-3 text-left">
                <span className="inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[rgba(214,175,74,0.3)] bg-black/50 shadow-[0_0_30px_rgba(214,175,74,0.15)]">
                  <img src={monogramImage} alt="Cardone monogram" className="h-9 w-9 object-contain" />
                </span>
                <span>
                  <span className="vault-eyebrow block">Assurances Cardone</span>
                  <span className="text-xs uppercase tracking-[0.36em] text-white/45">{t.nav.advisory}</span>
                </span>
              </a>

              <div className="hidden items-center gap-6 lg:flex">
                <nav className="flex items-center gap-6 text-xs uppercase tracking-[0.28em] text-white/65">
                  <a href="#legacy" className="transition hover:text-[var(--vault-gold)]">{t.nav.legacy}</a>
                  <a href="#services" className="transition hover:text-[var(--vault-gold)]">{t.nav.services}</a>
                  <a href="#application-vault" className="transition hover:text-[var(--vault-gold)]">{t.nav.application}</a>
                </nav>
                <LanguageToggle locale={locale} onChange={switchLocale} frLabel={t.nav.toggleFr} enLabel={t.nav.toggleEn} />
              </div>

              <div className="flex items-center gap-3">
                <div className="lg:hidden">
                  <LanguageToggle locale={locale} onChange={switchLocale} frLabel={t.nav.toggleFr} enLabel={t.nav.toggleEn} />
                </div>
                <a href="#application-vault">
                  <Button className="vault-button rounded-full px-4 py-5 text-[11px] uppercase tracking-[0.26em] md:px-6">
                    {t.nav.secureQuote}
                  </Button>
                </a>
              </div>
            </header>

            <div className="relative flex min-h-[calc(100vh-10rem)] flex-col justify-center py-14 lg:py-18">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={reveal}
                className="relative z-20 mx-auto flex w-full max-w-5xl flex-col items-center rounded-[2.5rem] border border-white/14 bg-[linear-gradient(180deg,rgba(18,14,10,0.18),rgba(18,14,10,0.28))] px-6 py-10 text-center shadow-[0_30px_120px_rgba(10,8,6,0.26),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-[10px] md:px-10 lg:px-14"
              >
                <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/40 bg-[rgba(255,250,242,0.58)] px-4 py-2 text-[11px] uppercase tracking-[0.34em] text-[#4c3b22] shadow-[0_10px_40px_rgba(78,57,18,0.08)] backdrop-blur-xl">
                  <ShieldCheck className="h-4 w-4 text-[var(--vault-gold)]" />
                  {t.hero.badge}
                </div>



                <p className="vault-eyebrow mb-5 text-[rgba(255,244,225,0.82)]">{t.hero.kicker}</p>
                <h1 className="mx-auto max-w-4xl font-display text-5xl leading-[0.94] text-[#fffaf0] drop-shadow-[0_18px_50px_rgba(0,0,0,0.42)] sm:text-6xl lg:text-8xl">
                  {t.hero.title} <span className="gold-text">{t.hero.highlight}</span>
                </h1>
                <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[rgba(255,248,238,0.92)] md:text-lg">
                  {t.hero.description}
                </p>

                <div className="relative z-30 mt-10 flex flex-col items-center gap-4 sm:flex-row">
                  <a href="#application-vault">
                    <Button className="vault-button group rounded-full px-8 py-6 text-xs uppercase tracking-[0.28em]">
                      {t.hero.primaryCta}
                      <ArrowRight className="ml-2 h-4 w-4 transition duration-500 group-hover:translate-x-1" />
                    </Button>
                  </a>
                  <a href="#services">
                    <Button
                      variant="outline"
                      className="rounded-full border-white/50 bg-[rgba(255,249,242,0.16)] px-8 py-6 text-xs uppercase tracking-[0.28em] text-[#fffaf0] backdrop-blur-xl hover:bg-[rgba(255,249,242,0.28)] hover:text-[#fff7df]"
                    >
                      {t.hero.secondaryCta}
                    </Button>
                  </a>
                </div>

                <div className="mt-14 w-full max-w-3xl rounded-[2rem] border border-white/28 bg-[rgba(255,248,238,0.16)] p-4 shadow-[0_30px_100px_rgba(28,20,13,0.22),inset_0_1px_0_rgba(255,255,255,0.26)] backdrop-blur-2xl md:p-5">
                  <div className="grid gap-3 md:grid-cols-3">
                    {t.hero.overviewItems.slice(0, 3).map(([label, value]) => (
                      <div key={label} className="rounded-[1.2rem] border border-white/20 bg-[rgba(77,53,22,0.18)] px-4 py-4 backdrop-blur-xl">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[rgba(255,247,235,0.68)]">{label}</p>
                        <p className="mt-2 text-base text-[#fffaf0]">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-5 border-t border-[rgba(214,175,74,0.14)] pt-8 text-center md:grid-cols-3">
              {t.hero.strip.map((item) => (
                <p key={item} className="text-sm uppercase tracking-[0.22em] text-white/42">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section id="legacy" className="relative py-24 md:py-32">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="vault-eyebrow">{t.legacy.eyebrow}</p>
                <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight text-[var(--vault-text)] md:text-6xl">
                  {t.legacy.titleStart} <span className="gold-text">{t.legacy.titleHighlight}</span>
                  {t.legacy.titleEnd}
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-white/70 md:text-lg">{t.legacy.description}</p>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
              <motion.article initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={reveal} className="vault-panel group relative min-h-[480px] overflow-hidden rounded-[2rem] p-8 md:p-10">
                <div className="absolute inset-0 bg-cover bg-center opacity-35 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-45" style={{ backgroundImage: `url(${bentoImage})` }} />
                <div className="vault-grid absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-50" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,4,4,0.12),rgba(4,4,4,0.9))]" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="max-w-xl">
                    <p className="vault-eyebrow">{t.legacy.featureEyebrow}</p>
                    <h3 className="mt-4 font-display text-4xl text-[var(--vault-text)] md:text-5xl">{t.legacy.featureTitle}</h3>
                  </div>
                  <p className="max-w-xl text-base leading-8 text-white/70">{t.legacy.featureDescription}</p>
                </div>
              </motion.article>

              <div className="grid gap-5">
                {t.legacy.pillars.map((pillar, index) => (
                  <motion.article
                    key={pillar.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={reveal}
                    className={`vault-panel group relative overflow-hidden rounded-[2rem] p-7 md:p-8 ${index === 2 ? "min-h-[220px]" : "min-h-[200px]"}`}
                  >
                    <div className="vault-grid absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-40" />
                    <div className="relative flex h-full flex-col justify-between gap-5">
                      <div>
                        <p className="vault-eyebrow">{pillar.eyebrow}</p>
                        <h3 className="mt-3 font-display text-3xl text-[var(--vault-text)]">{pillar.title}</h3>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-white/68">{pillar.description}</p>
                      </div>
                      <div className="inline-flex w-fit items-center gap-3 rounded-full border border-[rgba(214,175,74,0.18)] bg-black/20 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-[var(--vault-gold-soft)]">
                        <Sparkles className="h-4 w-4" />
                        {pillar.stat}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-24 md:py-32">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={reveal} className="mb-14 grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
              <div>
                <p className="vault-eyebrow">{t.companyInfo.eyebrow}</p>
                <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-[var(--vault-text)] md:text-6xl">
                  {t.companyInfo.titleStart} <span className="gold-text">{t.companyInfo.titleHighlight}</span>
                  {t.companyInfo.titleEnd}
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-white/70 md:text-lg">{t.companyInfo.description}</p>
            </motion.div>

            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <motion.article initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={reveal} className="vault-panel relative overflow-hidden rounded-[2rem] p-8 md:p-10">
                <div className="vault-grid absolute inset-0 opacity-35" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,175,74,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.16))]" />
                <div className="relative flex h-full flex-col justify-between gap-8">
                  <div>
                    <p className="vault-eyebrow">Assurances Cardone</p>
                    <h3 className="mt-4 max-w-xl font-display text-4xl text-[var(--vault-text)] md:text-5xl">{t.companyInfo.positioning}</h3>
                    <p className="mt-6 max-w-2xl text-base leading-8 text-white/68">
                      {locale === "fr"
                        ? "Le cabinet associe une présence locale très concrète à une approche de courtage où l’on compare, recommande et accompagne — y compris lorsqu’un dossier devient sensible."
                        : "The brokerage combines a tangible local presence with a model built around comparison, recommendation, and support — including when a file becomes sensitive."}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {t.companyInfo.details.map(([label, value]) => (
                      <div key={label} className="rounded-[1.4rem] border border-white/8 bg-black/25 p-5 backdrop-blur-xl">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">{label}</p>
                        <p className="mt-3 text-base leading-7 text-[var(--vault-text)]">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <a href="tel:+15143272040">
                      <Button className="vault-button rounded-full px-7 py-6 text-xs uppercase tracking-[0.28em]">
                        {t.companyInfo.callCta}
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.article>

              <div className="grid gap-5 md:grid-cols-2">
                {t.companyInfo.principles.map((principle, index) => (
                  <motion.article
                    key={principle.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={reveal}
                    className="vault-panel group relative overflow-hidden rounded-[2rem] p-7 md:p-8"
                  >
                    <div className="vault-grid absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-40" />
                    <div className="relative flex h-full flex-col justify-between gap-6">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(214,175,74,0.22)] bg-[rgba(214,175,74,0.08)] text-[var(--vault-gold)]">
                        {index % 2 === 0 ? <ShieldCheck className="h-5 w-5" /> : <UserRound className="h-5 w-5" />}
                      </div>
                      <div>
                        <h3 className="font-display text-3xl text-[var(--vault-text)]">{principle.title}</h3>
                        <p className="mt-4 text-base leading-8 text-white/68">{principle.description}</p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="relative border-y border-[rgba(214,175,74,0.08)] py-24 md:py-32">
          <div className="container">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={reveal} className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="vault-eyebrow">{t.services.eyebrow}</p>
                <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-[var(--vault-text)] md:text-6xl">{t.services.title}</h2>
              </div>
              <p className="max-w-xl text-base leading-8 text-white/68">{t.services.description}</p>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-3">
              {t.services.cards.map((service) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.12 }}
                    variants={reveal}
                    className="service-card group h-[390px] [perspective:1600px]"
                  >
                    <div className="service-card-inner relative h-full w-full rounded-[2rem] transition duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                      <article className="service-face vault-panel absolute inset-0 overflow-hidden rounded-[2rem] p-8 [backface-visibility:hidden]">
                        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${servicesImage})` }} />
                        <div className="vault-grid absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-35" />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.28),rgba(10,10,10,0.92))]" />
                        <div className="relative flex h-full flex-col justify-between">
                          <div className="space-y-5">
                            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgba(214,175,74,0.25)] bg-[rgba(214,175,74,0.08)] text-[var(--vault-gold)] shadow-[0_0_30px_rgba(214,175,74,0.12)]">
                              <Icon className="h-6 w-6" />
                            </span>
                            <div>
                              <p className="vault-eyebrow">{service.label}</p>
                              <h3 className="mt-3 font-display text-3xl text-[var(--vault-text)]">{service.title}</h3>
                            </div>
                          </div>
                          <p className="max-w-sm text-base leading-8 text-white/70">{service.front}</p>
                        </div>
                      </article>

                      <article className="service-face vault-panel absolute inset-0 overflow-hidden rounded-[2rem] p-8 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(214,175,74,0.12),rgba(0,0,0,0.1)_20%,rgba(5,5,5,0.94)_100%)]" />
                        <div className="vault-grid absolute inset-0 opacity-40" />
                        <div className="relative flex h-full flex-col justify-between">
                          <div>
                            <p className="vault-eyebrow">{t.services.detailLabel}</p>
                            <h3 className="mt-3 font-display text-3xl text-[var(--vault-text)]">{service.title}</h3>
                          </div>
                          <p className="text-base leading-8 text-white/72">{service.back}</p>
                          <div className="inline-flex w-fit items-center gap-3 rounded-full border border-[rgba(214,175,74,0.2)] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[var(--vault-gold-soft)]">
                            <ShieldCheck className="h-4 w-4" />
                            {t.services.advisoryBadge}
                          </div>
                        </div>
                      </article>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="broker-connector" className="relative border-y border-[rgba(214,175,74,0.08)] py-24 md:py-32">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={reveal} className="lg:sticky lg:top-10">
                <p className="vault-eyebrow">{brokerQuoteContent.eyebrow}</p>
                <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-[var(--vault-text)] md:text-6xl">
                  {brokerQuoteContent.titleStart} <span className="gold-text">{brokerQuoteContent.titleHighlight}</span>
                  {brokerQuoteContent.titleEnd}
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg">{brokerQuoteContent.description}</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-[rgba(214,175,74,0.16)] bg-black/25 p-5 backdrop-blur-xl">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">{brokerQuoteContent.baseRate}</p>
                    <p className="mt-3 text-2xl text-[var(--vault-text)]">{formatBrokerQuoteCurrency.format(1500)}</p>
                    <p className="mt-2 text-sm text-white/55">{locale === "fr" ? "125 $ / mois avant ajustements" : "$125 / month before adjustments"}</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-[rgba(214,175,74,0.16)] bg-black/25 p-5 backdrop-blur-xl">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">{brokerQuoteContent.liveRateTitle}</p>
                    <p className="mt-3 text-sm leading-7 text-white/68">{brokerQuoteContent.liveRateBody}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }} variants={reveal} className="vault-panel relative overflow-hidden rounded-[2.2rem] p-6 md:p-8 lg:p-10">
                <div className="absolute inset-0 bg-cover bg-center opacity-12" style={{ backgroundImage: `url(${servicesImage})` }} />
                <div className="vault-grid absolute inset-0 opacity-25" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_24%,rgba(214,175,74,0.06)_70%,rgba(0,0,0,0.3))]" />

                <div className="relative grid gap-8 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
                  <div className="grid gap-5">
                    <div className="grid gap-4 sm:grid-cols-[0.62fr_1fr]">
                      <Field label={brokerQuoteContent.labels.vehicleYear}>
                        <input
                          value={brokerQuote.vehicleYear}
                          onChange={(event) => handleBrokerQuoteField("vehicleYear", event.target.value)}
                          type="number"
                          min="1990"
                          max="2035"
                          placeholder={brokerQuoteContent.placeholders.vehicleYear}
                          className="vault-input"
                        />
                      </Field>
                      <Field label={brokerQuoteContent.labels.vehicleMake}>
                        <input
                          value={brokerQuote.vehicleMake}
                          onChange={(event) => handleBrokerQuoteField("vehicleMake", event.target.value)}
                          placeholder={brokerQuoteContent.placeholders.vehicleMake}
                          className="vault-input"
                        />
                      </Field>
                    </div>
                    <Field label={brokerQuoteContent.labels.vehicleModel}>
                      <input
                        value={brokerQuote.vehicleModel}
                        onChange={(event) => handleBrokerQuoteField("vehicleModel", event.target.value)}
                        placeholder={brokerQuoteContent.placeholders.vehicleModel}
                        className="vault-input"
                      />
                    </Field>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label={brokerQuoteContent.labels.driverAge}>
                        <input
                          value={brokerQuote.driverAge}
                          onChange={(event) => handleBrokerQuoteField("driverAge", event.target.value)}
                          type="number"
                          min="16"
                          placeholder={brokerQuoteContent.placeholders.driverAge}
                          className="vault-input"
                        />
                      </Field>
                      <Field label={brokerQuoteContent.labels.postalCode}>
                        <input
                          value={brokerQuote.postalCode}
                          onChange={(event) => handleBrokerQuoteField("postalCode", event.target.value.toUpperCase())}
                          placeholder={brokerQuoteContent.placeholders.postalCode}
                          className="vault-input uppercase"
                        />
                      </Field>
                    </div>
                    <div className="rounded-[1.5rem] border border-[rgba(214,175,74,0.14)] bg-black/20 p-5 backdrop-blur-xl">
                      <div className="mb-4 rounded-[1.2rem] border border-[rgba(214,175,74,0.12)] bg-[rgba(255,255,255,0.03)] p-4">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--vault-gold-soft)]">{brokerQuoteContent.lookupTitle}</p>
                        <p className="mt-3 text-sm leading-7 text-white/68">
                          {postalLookup.status === "loading"
                            ? brokerQuoteContent.lookupLoading
                            : postalLookup.status === "valid"
                              ? brokerQuoteContent.lookupValid
                              : postalLookup.status === "outside"
                                ? brokerQuoteContent.lookupOutside
                                : postalLookup.status === "invalid"
                                  ? brokerQuoteContent.lookupInvalid
                                  : postalLookup.status === "error"
                                    ? brokerQuoteContent.lookupError
                                    : brokerQuoteContent.lookupIdle}
                        </p>
                        {postalLookup.label && (
                          <p className="mt-2 text-xs leading-6 text-white/45">{postalLookup.label}</p>
                        )}
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--vault-gold-soft)]">{brokerQuoteContent.historyTitle}</p>
                      <p className="mt-3 text-sm leading-7 text-white/64">{brokerQuoteContent.historyDescription}</p>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <Field label={brokerQuoteContent.labels.accidentCount}>
                          <select
                            value={brokerQuote.accidentCount}
                            onChange={(event) => handleBrokerQuoteField("accidentCount", event.target.value)}
                            className="vault-input"
                          >
                            {brokerQuoteContent.accidentOptions.map((option, index) => (
                              <option key={option} value={index === 2 ? "2" : String(index)}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </Field>
                        <Field label={brokerQuoteContent.labels.ticketCount}>
                          <select
                            value={brokerQuote.ticketCount}
                            onChange={(event) => handleBrokerQuoteField("ticketCount", event.target.value)}
                            className="vault-input"
                          >
                            {brokerQuoteContent.ticketOptions.map((option, index) => (
                              <option key={option} value={index === 2 ? "2" : String(index)}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>
                      <div className="mt-4 grid gap-4">
                        <Field label={brokerQuoteContent.labels.priorInsurance}>
                          <select
                            value={brokerQuote.priorInsurance}
                            onChange={(event) => handleBrokerQuoteField("priorInsurance", event.target.value)}
                            className="vault-input"
                          >
                            <option value="active">{brokerQuoteContent.priorInsuranceOptions[0]}</option>
                            <option value="inactive">{brokerQuoteContent.priorInsuranceOptions[1]}</option>
                            <option value="limited">{brokerQuoteContent.priorInsuranceOptions[2]}</option>
                          </select>
                        </Field>
                        <Field label={brokerQuoteContent.labels.historyNotes}>
                          <textarea
                            value={brokerQuote.historyNotes}
                            onChange={(event) => handleBrokerQuoteField("historyNotes", event.target.value)}
                            placeholder={brokerQuoteContent.placeholders.historyNotes}
                            className="vault-input min-h-[120px] resize-y py-4"
                          />
                        </Field>
                      </div>
                    </div>
                    <a href="#application-vault" className="pt-2">
                      <Button className="vault-button w-full rounded-full px-8 py-6 text-xs uppercase tracking-[0.26em]">
                        {brokerQuoteContent.cta}
                      </Button>
                    </a>
                  </div>

                  <div className="rounded-[1.8rem] border border-[rgba(214,175,74,0.16)] bg-[rgba(8,8,8,0.58)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:p-7">
                    <p className="vault-eyebrow">{brokerQuoteContent.summaryTitle}</p>
                    {brokerQuoteEstimate ? (
                      <div className="mt-5 grid gap-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="rounded-[1.4rem] border border-[rgba(214,175,74,0.16)] bg-black/30 p-5">
                            <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">{brokerQuoteContent.annualEstimate}</p>
                            <p className="mt-3 font-display text-4xl text-[var(--vault-text)]">{formatBrokerQuoteCurrency.format(Math.round(brokerQuoteEstimate.annual))}</p>
                          </div>
                          <div className="rounded-[1.4rem] border border-[rgba(214,175,74,0.16)] bg-black/30 p-5">
                            <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">{brokerQuoteContent.monthlyEstimate}</p>
                            <p className="mt-3 font-display text-4xl text-[var(--vault-text)]">{formatBrokerQuoteCurrency.format(Math.round(brokerQuoteEstimate.monthly))}</p>
                          </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-[1.2rem] border border-white/8 bg-black/20 p-4 sm:col-span-2">
                            <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">{brokerQuoteContent.vehicleProfile}</p>
                            <p className="mt-2 text-base text-[var(--vault-text)]">{brokerQuoteEstimate.vehicleLabel}</p>
                          </div>
                          <div className="rounded-[1.2rem] border border-white/8 bg-black/20 p-4 sm:col-span-2">
                            <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">{brokerQuoteContent.driverHistoryCapture}</p>
                            <p className="mt-2 text-sm leading-7 text-white/70">
                              {brokerQuoteContent.ticketOptions[Number(brokerQuoteEstimate.ticketCount)]} · {brokerQuoteEstimate.priorInsurance === "active"
                                ? brokerQuoteContent.priorInsuranceOptions[0]
                                : brokerQuoteEstimate.priorInsurance === "inactive"
                                  ? brokerQuoteContent.priorInsuranceOptions[1]
                                  : brokerQuoteContent.priorInsuranceOptions[2]}
                            </p>
                            <p className="mt-2 text-xs leading-6 text-white/46">{brokerQuoteEstimate.historyNotes || brokerQuoteContent.historyOnlyNote}</p>
                          </div>
                          <div className="rounded-[1.2rem] border border-white/8 bg-black/20 p-4">
                            <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">{brokerQuoteContent.factorAge}</p>
                            <p className="mt-2 text-base text-[var(--vault-text)]">× {brokerQuoteEstimate.ageFactor.toFixed(2)}</p>
                          </div>
                          <div className="rounded-[1.2rem] border border-white/8 bg-black/20 p-4">
                            <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">{brokerQuoteContent.factorVehicle}</p>
                            <p className="mt-2 text-base text-[var(--vault-text)]">× {brokerQuoteEstimate.vehicleFactor.toFixed(2)}</p>
                            <p className="mt-1 text-xs text-white/50">
                              {brokerQuoteEstimate.vehicleTier === "luxury"
                                ? brokerQuoteContent.vehicleLuxury
                                : brokerQuoteEstimate.vehicleTier === "standard"
                                  ? brokerQuoteContent.vehicleStandard
                                  : brokerQuoteContent.vehicleNeutral}
                            </p>
                          </div>
                          <div className="rounded-[1.2rem] border border-white/8 bg-black/20 p-4">
                            <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">{brokerQuoteContent.factorClaims}</p>
                            <p className="mt-2 text-base text-[var(--vault-text)]">× {brokerQuoteEstimate.claimsFactor.toFixed(2)}</p>
                          </div>
                          <div className="rounded-[1.2rem] border border-white/8 bg-black/20 p-4">
                            <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">{brokerQuoteContent.factorLocation}</p>
                            <p className="mt-2 text-base text-[var(--vault-text)]">× {brokerQuoteEstimate.locationFactor.toFixed(2)}</p>
                            <p className="mt-1 text-xs text-white/50">
                              {brokerQuoteEstimate.isMontreal ? brokerQuoteContent.locationMontreal : brokerQuoteContent.locationOutside}
                            </p>
                          </div>
                        </div>

                        {brokerQuoteEstimate.manualReview && (
                          <div className="rounded-[1.4rem] border border-[rgba(214,175,74,0.24)] bg-[rgba(214,175,74,0.08)] p-5 text-sm leading-7 text-white/78">
                            <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--vault-gold-soft)]">{brokerQuoteContent.manualReview}</p>
                            <p className="mt-3">{brokerQuoteContent.manualReviewBody}</p>
                          </div>
                        )}

                        <p className="text-sm leading-7 text-white/54">{brokerQuoteContent.disclaimer}</p>
                      </div>
                    ) : (
                      <div className="mt-5 rounded-[1.4rem] border border-dashed border-[rgba(214,175,74,0.2)] bg-black/20 p-6 text-sm leading-7 text-white/58">
                        {brokerQuoteContent.summaryPrompt}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="application-vault" className="relative py-24 md:py-32">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={reveal} className="lg:sticky lg:top-10">
                <p className="vault-eyebrow">{t.application.eyebrow}</p>
                <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight text-[var(--vault-text)] md:text-6xl">
                  {t.application.title} <span className="gold-text">{t.application.highlight}</span>
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/70 md:text-lg">{t.application.description}</p>

                <div className="mt-8 grid gap-4">
                  {t.application.steps.map((item, index) => (
                    <div key={item} className={`rounded-[1.35rem] border px-5 py-4 ${activeStep === index + 1 ? "border-[rgba(214,175,74,0.4)] bg-[rgba(214,175,74,0.08)] text-[var(--vault-text)]" : "border-white/8 bg-black/20 text-white/55"}`}>
                      <p className="text-xs uppercase tracking-[0.26em]">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }} variants={reveal} className="vault-panel relative overflow-hidden rounded-[2.2rem] p-6 md:p-8 lg:p-10">
                <div className="absolute inset-0 bg-cover bg-center opacity-18" style={{ backgroundImage: `url(${heroImage})` }} />
                <div className="vault-grid absolute inset-0 opacity-35" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_28%,rgba(214,175,74,0.07)_70%,rgba(0,0,0,0.3))]" />

                <div className="relative">
                  {!isSuccess ? (
                    <>
                      <div className="mb-8 flex flex-col gap-5 border-b border-[rgba(214,175,74,0.16)] pb-6 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="vault-eyebrow">{t.application.cardEyebrow}</p>
                          <h3 className="mt-2 font-display text-3xl text-[var(--vault-text)] md:text-4xl">{t.application.cardTitle}</h3>
                        </div>
                        <div className="w-full max-w-[240px]">
                          <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.26em] text-white/50">
                            <span>{t.application.progress}</span>
                            <span>{activeStep} / 3</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-white/6">
                            <div className="h-full rounded-full bg-[linear-gradient(90deg,#8d6a14_0%,#d6af4a_45%,#f5e4b0_100%)] transition-all duration-500" style={{ width: stepProgress }} />
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-6">
                        {activeStep === 1 && (
                          <div className="grid gap-5 md:grid-cols-2">
                            <Field label={t.application.step1.fullName}>
                              <input value={form.fullName} onChange={(event) => handleField("fullName", event.target.value)} placeholder={t.application.step1.placeholders.fullName} className="vault-input" />
                            </Field>
                            <Field label={t.application.step1.email}>
                              <input value={form.email} onChange={(event) => handleField("email", event.target.value)} type="email" placeholder={t.application.step1.placeholders.email} className="vault-input" />
                            </Field>
                            <Field label={t.application.step1.phone}>
                              <input value={form.phone} onChange={(event) => handleField("phone", event.target.value)} placeholder={t.application.step1.placeholders.phone} className="vault-input" />
                            </Field>
                            <Field label={t.application.step1.city}>
                              <input value={form.city} onChange={(event) => handleField("city", event.target.value)} placeholder={t.application.step1.placeholders.city} className="vault-input" />
                            </Field>
                          </div>
                        )}

                        {activeStep === 2 && (
                          <div className="grid gap-5 md:grid-cols-2">
                            <Field label={t.application.step2.assetType}>
                              <select value={form.assetType} onChange={(event) => handleField("assetType", event.target.value)} className="vault-input">
                                {t.application.step2.assetOptions.map((option) => (
                                  <option key={option}>{option}</option>
                                ))}
                              </select>
                            </Field>
                            <Field label={t.application.step2.coveragePriority}>
                              <select value={form.coveragePriority} onChange={(event) => handleField("coveragePriority", event.target.value)} className="vault-input">
                                {t.application.step2.priorityOptions.map((option) => (
                                  <option key={option}>{option}</option>
                                ))}
                              </select>
                            </Field>
                            <Field label={t.application.step2.assetValue}>
                              <input value={form.assetValue} onChange={(event) => handleField("assetValue", event.target.value)} placeholder={t.application.step2.placeholders.assetValue} className="vault-input" />
                            </Field>
                            <Field label={t.application.step2.preferredContact}>
                              <select value={form.preferredContact} onChange={(event) => handleField("preferredContact", event.target.value)} className="vault-input">
                                {t.application.step2.contactOptions.map((option) => (
                                  <option key={option}>{option}</option>
                                ))}
                              </select>
                            </Field>
                            <Field label={t.application.step2.notes} className="md:col-span-2">
                              <textarea value={form.notes} onChange={(event) => handleField("notes", event.target.value)} rows={5} placeholder={t.application.step2.placeholders.notes} className="vault-input min-h-[150px] resize-none" />
                            </Field>
                          </div>
                        )}

                        {activeStep === 3 && (
                          <div className="grid gap-5">
                            <div className="rounded-[1.6rem] border border-[rgba(214,175,74,0.14)] bg-black/35 p-6">
                              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                <div>
                                  <p className="vault-eyebrow">{t.application.step3.eyebrow}</p>
                                  <h4 className="mt-2 font-display text-2xl text-[var(--vault-text)]">{t.application.step3.title}</h4>
                                  <p className="mt-3 max-w-2xl text-base leading-8 text-white/68">{t.application.step3.description}</p>
                                </div>
                                <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,175,74,0.2)] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[var(--vault-gold-soft)]">
                                  <UserRound className="h-4 w-4" />
                                  {t.application.step3.clearance}
                                </span>
                              </div>
                            </div>

                            <label className="flex items-start gap-4 rounded-[1.4rem] border border-white/8 bg-[rgba(255,255,255,0.03)] p-5 text-sm leading-7 text-white/72">
                              <input type="checkbox" checked={form.consent} onChange={(event) => handleField("consent", event.target.checked)} className="mt-1 h-4 w-4 rounded border-[rgba(214,175,74,0.45)] bg-black accent-[var(--vault-gold)]" />
                              <span>{t.application.step3.consent}</span>
                            </label>
                          </div>
                        )}
                      </div>

                      <div className="mt-8 flex flex-col gap-4 border-t border-[rgba(214,175,74,0.16)] pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <Button
                          variant="outline"
                          onClick={previousStep}
                          disabled={activeStep === 1 || isSubmitting}
                          className="rounded-full border-[rgba(214,175,74,0.22)] bg-[rgba(15,15,15,0.52)] px-7 py-6 text-xs uppercase tracking-[0.24em] text-[var(--vault-text)] disabled:opacity-30"
                        >
                          {t.application.previous}
                        </Button>

                        <div className="flex flex-col gap-4 sm:flex-row">
                          {activeStep < 3 ? (
                            <Button onClick={nextStep} className="vault-button rounded-full px-8 py-6 text-xs uppercase tracking-[0.26em]">
                              {t.application.next}
                            </Button>
                          ) : (
                            <Button onClick={submitApplication} disabled={isSubmitting} className="vault-button rounded-full px-8 py-6 text-xs uppercase tracking-[0.26em] disabled:opacity-60">
                              {isSubmitting ? t.application.submitting : t.application.submit}
                            </Button>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                      <div className="relative mb-10 flex h-32 w-32 items-center justify-center rounded-full border border-[rgba(214,175,74,0.28)] bg-[rgba(214,175,74,0.08)] shadow-[0_0_80px_rgba(214,175,74,0.18)]">
                        <div className="absolute inset-0 rounded-full border border-[rgba(214,175,74,0.2)] animate-ping" />
                        <img src={monogramImage} alt="Cardone gold monogram" className="h-20 w-20 animate-[spin_6s_linear_infinite] object-contain" />
                      </div>
                      <p className="vault-eyebrow">{t.application.success.eyebrow}</p>
                      <h3 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-[var(--vault-text)] md:text-5xl">{t.application.success.title}</h3>
                      <p className="mt-5 max-w-2xl text-base leading-8 text-white/72 md:text-lg">{t.application.success.description}</p>
                      <Button onClick={() => setIsSuccess(false)} className="vault-button mt-10 rounded-full px-8 py-6 text-xs uppercase tracking-[0.26em]">
                        {t.application.success.reset}
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[rgba(214,175,74,0.12)] bg-black/70 py-8">
        <div className="container flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
          <p className="text-[var(--vault-gold-soft)]">{t.footer.company}</p>
          <p className="text-white/44">{t.footer.description}</p>
        </div>
      </footer>
    </div>
  );
}

type FieldProps = {
  label: string;
  className?: string;
  children: ReactNode;
};

function Field({ label, className, children }: FieldProps) {
  return (
    <label className={className}>
      <span className="mb-3 block text-[11px] uppercase tracking-[0.28em] text-[var(--vault-gold-soft)]">{label}</span>
      {children}
    </label>
  );
}

type LanguageToggleProps = {
  locale: Locale;
  onChange: (locale: Locale) => void;
  frLabel: string;
  enLabel: string;
};

function LanguageToggle({ locale, onChange, frLabel, enLabel }: LanguageToggleProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-[rgba(214,175,74,0.2)] bg-[rgba(8,8,8,0.72)] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl">
      <button
        type="button"
        onClick={() => onChange("fr")}
        className={`rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.24em] transition ${locale === "fr" ? "bg-[linear-gradient(135deg,#8d6a14_0%,#d6af4a_45%,#f5e4b0_100%)] text-black" : "text-white/60 hover:text-[var(--vault-gold)]"}`}
      >
        {frLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange("en")}
        className={`rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.24em] transition ${locale === "en" ? "bg-[linear-gradient(135deg,#8d6a14_0%,#d6af4a_45%,#f5e4b0_100%)] text-black" : "text-white/60 hover:text-[var(--vault-gold)]"}`}
      >
        {enLabel}
      </button>
    </div>
  );
}
