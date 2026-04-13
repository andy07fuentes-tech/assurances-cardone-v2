/*
Style Reminder — Sovereign Signal / Digital Vault
This file must reinforce a sovereign, high-trust digital vault atmosphere.
Use asymmetrical composition, ceremonial pacing, smoky glass surfaces, metallic gold emphasis,
and motion that feels like systems authenticating rather than generic SaaS animation.
*/

import { Button } from "@/components/ui/button";
import { motion, useReducedMotion, type Variants } from "framer-motion";
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
        "Assurances Cardone présente la couverture comme une stratégie protégée. De l’automobile de prestige aux résidences et à la continuité d’entreprise, chaque conversation commence dans un système d’admission structuré pour la discrétion, la rapidité et la confiance.",
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
        "Le site présente l’assurance comme une expérience-conseil haut de gamme. Au lieu d’exposer des produits commoditisés, il formule une philosophie de protection sécurisée pour des clients qui attendent de la clarté, de la discrétion et une structure intelligente.",
      featureEyebrow: "Pilier signature",
      featureTitle: "Un héritage rehaussé par un langage de sécurité moderne.",
      featureDescription:
        "L’univers visuel emprunte à l’autorité héraldique et à la retenue des banques privées, puis le traduit en grilles contrôlées, surfaces fumées et signaux numériques de précision.",
      pillars: [
        {
          title: "Héritage et confiance",
          eyebrow: "Confiance privée",
          description:
            "Cardone conjugue une autorité de marque cérémoniale avec un accompagnement attentif pour les clients qui protègent leur personne, leur famille et leur exposition commerciale.",
          stat: "Protocole d’admission d’élite",
        },
        {
          title: "Gestion stratégique du risque",
          eyebrow: "Analyse assistée par IA",
          description:
            "Chaque demande est structurée comme un dossier d’actifs sécurisé afin d’accélérer la qualification et de renforcer le contexte de souscription.",
          stat: "Réponse concierge en 60 secondes",
        },
        {
          title: "Protection d’actifs à haute valeur",
          eyebrow: "Auto · Résidence · Entreprise",
          description:
            "L’agence aborde la protection comme une stratégie, en harmonisant l’architecture d’assurance avec les réalités du patrimoine, de l’immobilier et de l’entreprise.",
          stat: "Conçu pour les profils complexes",
        },
      ],
    },
    services: {
      eyebrow: "Détails des services",
      title:
        "Des cartes de services bordées d’or qui dévoilent la couche stratégique derrière chaque protection.",
      description:
        "Chaque carte agit comme un panneau protégé. La première face introduit l’offre. Le revers explique comment la couverture s’inscrit dans le modèle-conseil haut de gamme de Cardone.",
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
        "Une expérience d’assurance haut de gamme présentée comme un coffre-fort numérique sécurisé.",
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
      badge: "Premium insurance intelligence for high-value profiles",
      kicker: "A sovereign system for risk, legacy, and protection",
      title: "Insurance designed like a",
      highlight: "high-security asset vault",
      description:
        "Assurances Cardone positions coverage as a protected strategy. From luxury auto to estates and business continuity, each policy conversation begins inside a structured intake system built for discretion, speed, and confidence.",
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
        "The site frames insurance as a premium advisory experience. Instead of presenting commodity products, it articulates a secure protection philosophy designed for clients who expect clarity, discretion, and intelligent structure.",
      featureEyebrow: "Signature pillar",
      featureTitle: "Heritage elevated by modern security language.",
      featureDescription:
        "The visual world borrows from heraldic authority and private-banking restraint, then resolves it through controlled grids, smoked surfaces, and digital precision cues.",
      pillars: [
        {
          title: "Heritage & Trust",
          eyebrow: "Private-client confidence",
          description:
            "Cardone combines ceremonial brand authority with attentive advisory care for clients protecting personal, family, and commercial exposure.",
          stat: "Elite intake protocol",
        },
        {
          title: "Strategic Risk Management",
          eyebrow: "AI-assisted review",
          description:
            "Every application is structured like a secure asset file, allowing rapid qualification, sharper underwriting context, and a more precise coverage conversation.",
          stat: "60-second concierge response",
        },
        {
          title: "High-Value Asset Protection",
          eyebrow: "Auto · Estate · Business",
          description:
            "The agency positions protection as strategy, aligning premium insurance design with the realities of wealth, property, and enterprise continuity.",
          stat: "Structured for complex profiles",
        },
      ],
    },
    services: {
      eyebrow: "Service Details",
      title:
        "Gold-edged service cards that reveal the strategic layer beneath the coverage.",
      description:
        "Each card behaves like a protected panel. The first face introduces the offering. The reverse explains how the coverage is positioned inside Cardone’s premium advisory model.",
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
        "Premium insurance advisory presented in a secure digital-vault experience.",
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

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [locale, setLocale] = useState<Locale>("fr");
  const [scrollY, setScrollY] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState<FormState>(initialFormState);

  const t = content[locale];

  useEffect(() => {
    document.documentElement.lang = locale === "fr" ? "fr-CA" : "en-CA";
  }, [locale]);

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

  const stepProgress = useMemo(() => `${(activeStep / 3) * 100}%`, [activeStep]);

  const handleField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((previous) => ({ ...previous, [key]: value }));
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
      <main className="overflow-x-hidden">
        <section id="top" className="relative min-h-screen overflow-hidden border-b border-[rgba(201,162,39,0.16)]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(3,3,3,0.24) 0%, rgba(3,3,3,0.72) 55%, rgba(3,3,3,0.96) 100%), url(${heroImage})`,
              transform: reduceMotion ? undefined : `translateY(${scrollY * 0.18}px) scale(1.06)`,
            }}
          />
          <div className="vault-grid absolute inset-0 opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,175,74,0.2),transparent_30%),radial-gradient(circle_at_70%_10%,rgba(255,255,255,0.06),transparent_20%)]" />

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

            <div className="grid items-end gap-14 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
              <motion.div initial="hidden" animate="visible" variants={reveal} className="max-w-3xl">
                <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[rgba(214,175,74,0.22)] bg-black/25 px-4 py-2 text-[11px] uppercase tracking-[0.34em] text-white/70 backdrop-blur-xl">
                  <ShieldCheck className="h-4 w-4 text-[var(--vault-gold)]" />
                  {t.hero.badge}
                </div>

                <div className="mb-8 max-w-md">
                  <img
                    src={logoImage}
                    alt="Assurances Cardone official logo"
                    className="w-full object-contain mix-blend-screen brightness-[1.08] contrast-[1.08] drop-shadow-[0_18px_65px_rgba(214,175,74,0.16)]"
                  />
                </div>

                <p className="vault-eyebrow mb-4">{t.hero.kicker}</p>
                <h1 className="max-w-4xl font-display text-5xl leading-[0.94] text-[var(--vault-text)] sm:text-6xl lg:text-8xl">
                  {t.hero.title} <span className="gold-text">{t.hero.highlight}</span>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 md:text-lg">{t.hero.description}</p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <a href="#application-vault">
                    <Button className="vault-button group rounded-full px-8 py-6 text-xs uppercase tracking-[0.28em]">
                      {t.hero.primaryCta}
                      <ArrowRight className="ml-2 h-4 w-4 transition duration-500 group-hover:translate-x-1" />
                    </Button>
                  </a>
                  <a href="#services">
                    <Button
                      variant="outline"
                      className="rounded-full border-[rgba(214,175,74,0.28)] bg-[rgba(18,18,18,0.62)] px-8 py-6 text-xs uppercase tracking-[0.28em] text-[var(--vault-text)] hover:bg-[rgba(214,175,74,0.08)] hover:text-[var(--vault-gold)]"
                    >
                      {t.hero.secondaryCta}
                    </Button>
                  </a>
                </div>
              </motion.div>

              <motion.div initial="hidden" animate="visible" variants={reveal} className="relative mx-auto w-full max-w-xl lg:max-w-none">
                <div className="vault-orb absolute -left-8 top-8 h-28 w-28 rounded-full blur-3xl" />
                <div className="vault-panel relative overflow-hidden rounded-[2rem] p-6 md:p-8">
                  <div className="absolute inset-0 opacity-35" style={{ backgroundImage: `url(${servicesImage})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                  <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.14),transparent_34%,rgba(214,175,74,0.06)_100%)]" />
                  <div className="relative space-y-8">
                    <div className="flex items-center justify-between border-b border-[rgba(214,175,74,0.16)] pb-5">
                      <div>
                        <p className="vault-eyebrow">{t.hero.badge}</p>
                        <h2 className="mt-2 font-display text-3xl text-[var(--vault-text)]">{t.hero.overviewTitle}</h2>
                      </div>
                      <span className="rounded-full border border-[rgba(214,175,74,0.22)] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/55">
                        {t.hero.encrypted}
                      </span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {t.hero.overviewItems.map(([label, value]) => (
                        <div key={label} className="rounded-[1.4rem] border border-white/8 bg-black/35 p-4 backdrop-blur-xl">
                          <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">{label}</p>
                          <p className="mt-3 text-lg text-[var(--vault-text)]">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-[1.5rem] border border-[rgba(214,175,74,0.18)] bg-[rgba(8,8,8,0.66)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="vault-eyebrow">{t.hero.sequenceTitle}</p>
                          <p className="mt-2 text-sm leading-7 text-white/68">{t.hero.sequenceDescription}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-[var(--vault-gold)]" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid gap-5 border-t border-[rgba(214,175,74,0.14)] pt-8 md:grid-cols-3">
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
